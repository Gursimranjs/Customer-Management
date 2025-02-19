// controllers/invoiceController.js
const Invoice = require("../models/Invoice");
const Order = require("../models/order");

exports.generateInvoice = async (req, res) => {
  try {
    const { order_id } = req.body;
    if (!order_id) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const order = await Order.findOne({ where: { order_id } });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Example sub_total
    const sub_total = 50.0; // from items total, you’d sum up the OrderItems
    const tax = 5.0;
    const shipping_cost = parseFloat(order.shipping_cost) || 0.0;
    const total = sub_total + tax + shipping_cost;

    const newInvoice = await Invoice.create({
      order_id,
      sub_total,
      tax,
      shipping_cost,
      total,
      payment_status: "pending",
    });

    res.status(201).json({
      message: "Invoice generated",
      invoice: newInvoice,
    });
  } catch (error) {
    console.error("Invoice Generate Error:", error);
    res.status(500).json({ error: "Failed to generate invoice", details: error.message });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.json(invoices);
  } catch (error) {
    console.error("Get Invoices Error:", error);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
};
