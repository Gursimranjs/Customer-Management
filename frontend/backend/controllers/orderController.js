const { v4: uuidv4 } = require("uuid");
const { Order, OrderItem, Inventory, Customer, User, sequelize } = require("../models");

const createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { email, pickup_address, dropoff_address, items } = req.body;

    if (!email || !pickup_address || !dropoff_address || !items) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    console.log(`🔍 Looking up user by email: ${email}`);
    const user = await User.findOne({ where: { email }, transaction });

    if (!user) {
      console.log(`❌ No user found with email: ${email}`);
      return res.status(400).json({ error: `No user found with email: ${email}` });
    }

    console.log(`🔍 Looking up customer with user_id: ${user.user_id}`);
    const customer = await Customer.findOne({ where: { user_id: user.user_id }, transaction });

    if (!customer) {
      console.log(`❌ User ${email} is not associated with a customer account.`);
      return res.status(400).json({ error: `User is not associated with a customer account.` });
    }

    console.log(`✅ Creating new order for customer: ${customer.customer_id}`);
    const newOrder = await Order.create(
      {
        order_id: uuidv4(),
        customer_id: customer.customer_id,
        pickup_address,
        dropoff_address,
        status: "pending",
        shipping_cost: 0,
        order_reference: uuidv4(),
      },
      { transaction }
    );

    let totalShipping = 0.0;
    let orderedItems = 0;

    for (const item of items) {
      const { inventory_id, quantity } = item;
      
      console.log(`🔍 Checking inventory for item: ${inventory_id}`);
      const inventoryItem = await Inventory.findOne({ where: { inventory_id }, transaction });

      if (!inventoryItem) {
        console.warn(`⚠️ Skipping item ${inventory_id}, not found in inventory.`);
        continue; // ✅ Skip missing items instead of rolling back
      }

      let finalQuantity = Math.min(inventoryItem.quantity_in_stock, quantity);

      if (finalQuantity === 0) {
        console.warn(`⚠️ Skipping item ${inventoryItem.item_name}, out of stock.`);
        continue; // ✅ Skip out-of-stock items instead of rolling back
      }

      const unitPrice = inventoryItem.unit_price || 0;
      const total_price = unitPrice * finalQuantity;
      totalShipping += total_price * 0.1;

      console.log(`✅ Adding item ${inventoryItem.item_name} to order (Qty: ${finalQuantity})`);
      await OrderItem.create(
        {
          order_item_id: uuidv4(),
          order_id: newOrder.order_id,
          inventory_id,
          quantity: finalQuantity,
          unit_price: unitPrice,
          total_price,
        },
        { transaction }
      );

      await Inventory.update(
        { quantity_in_stock: inventoryItem.quantity_in_stock - finalQuantity },
        { where: { inventory_id }, transaction }
      );

      orderedItems++;
    }

    if (orderedItems === 0) {
      console.log(`❌ No valid items were added to the order. Rolling back.`);
      await transaction.rollback();
      return res.status(400).json({ error: "No valid items could be added to the order." });
    }

    console.log(`✅ Updating total shipping cost: ${totalShipping}`);
    await newOrder.update({ shipping_cost: totalShipping }, { transaction });
    await transaction.commit();

    console.log(`🎉 Order created successfully: ${newOrder.order_id}`);
    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });

  } catch (error) {
    await transaction.rollback();
    console.error("❌ Order Create Error:", error);
    res.status(500).json({ error: "Failed to create order", details: error.message });
  }
};

// ✅ Ensure this function exists
const getOrdersByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    console.log(`🔍 Fetching orders for customer: ${customerId}`);
    
    const orders = await Order.findAll({
      where: { customer_id: customerId },
      include: [OrderItem],
    });

    console.log(`✅ Retrieved ${orders.length} orders for customer ${customerId}`);
    res.json(orders);
  } catch (error) {
    console.error("❌ Get Orders Error:", error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

// ✅ Correctly export functions
module.exports = {
  createOrder,
  getOrdersByCustomer,
};