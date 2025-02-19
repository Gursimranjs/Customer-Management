const { Inventory, Customer, User } = require("../models");

exports.getItems = async (req, res) => {
  try {
    const { email, page = 1, limit = 10 } = req.query;

    if (!email) {
      return res.status(400).json({ error: "User email is required" });
    }

    console.log(`🔍 Looking up user by email: ${email}`);

    // ✅ Fetch user first using email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log(`❌ No user found with email: ${email}`);
      return res.status(400).json({ error: `No user found with email: ${email}` });
    }

    console.log(`🔍 Looking up customer with user_id: ${user.user_id}`);

    // ✅ Fetch customer using user_id (Ensure 'user_id' exists in Customer model)
    const customer = await Customer.findOne({ where: { user_id: user.user_id } });

    if (!customer) {
      console.log(`❌ User ${email} is not associated with a customer account.`);
      return res.status(400).json({ error: `No customer account associated with this email.` });
    }

    console.log(`✅ Customer found: ${customer.customer_id}`);

    // ✅ Fetch inventory items for the customer
    const items = await Inventory.findAll({
      where: { customer_id: customer.customer_id },
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
    });

    console.log(`✅ Fetched ${items.length} inventory items for customer ${customer.customer_id}`);

    res.status(200).json(items);
  } catch (error) {
    console.error("❌ Inventory Get Error:", error);
    res.status(500).json({ error: "Failed to fetch inventory", details: error.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { email, item_name, sku, length, width, height, weight, quantity_in_stock } = req.body;

    if (!email) {
      return res.status(400).json({ error: "User email is required" });
    }

    console.log(`🔍 Looking up user by email: ${email}`);

    // ✅ Fetch user first using email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log(`❌ No user found with email: ${email}`);
      return res.status(400).json({ error: `No user found with email: ${email}` });
    }

    console.log(`🔍 Looking up customer with user_id: ${user.user_id}`);

    // ✅ Fetch customer using user_id
    const customer = await Customer.findOne({ where: { user_id: user.user_id } });

    if (!customer) {
      console.log(`❌ User ${email} is not associated with a customer account.`);
      return res.status(400).json({ error: `No customer account associated with this email.` });
    }

    console.log(`✅ Customer found: ${customer.customer_id}`);

    // ✅ Prevent duplicate SKU entries for the same customer
    const existingItem = await Inventory.findOne({ where: { sku, customer_id: customer.customer_id } });
    if (existingItem) {
      console.log(`❌ SKU ${sku} already exists for customer ${customer.customer_id}`);
      return res.status(400).json({ error: "An item with this SKU already exists in your inventory." });
    }

    // ✅ Create inventory item
    const newItem = await Inventory.create({
      customer_id: customer.customer_id,
      item_name,
      sku,
      length,
      width,
      height,
      weight,
      quantity_in_stock,
    });

    console.log(`✅ Created new inventory item: ${newItem.item_name} (SKU: ${newItem.sku})`);

    res.status(201).json({ message: "Item created successfully", item: newItem });
  } catch (error) {
    console.error("❌ Inventory Create Error:", error);
    res.status(500).json({ error: "Failed to create item", details: error.message });
  }
};