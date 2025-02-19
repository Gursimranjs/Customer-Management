// controllers/labelController.js
const Label = require("../models/Label");

exports.generateLabel = async (req, res) => {
  try {
    const { order_id, carrier_name, tracking_number } = req.body;
    if (!order_id || !carrier_name || !tracking_number) {
      return res.status(400).json({ error: "All fields required: order_id, carrier_name, tracking_number" });
    }

    const label_url = `https://example.com/label/${tracking_number}.pdf`; // example

    const newLabel = await Label.create({
      order_id,
      carrier_name,
      tracking_number,
      label_url,
    });

    res.status(201).json({
      message: "Label generated",
      label: newLabel,
    });
  } catch (error) {
    console.error("Label Generate Error:", error);
    res.status(500).json({ error: "Failed to generate label", details: error.message });
  }
};

exports.getLabels = async (req, res) => {
  try {
    const labels = await Label.findAll();
    res.json(labels);
  } catch (error) {
    console.error("Get Labels Error:", error);
    res.status(500).json({ error: "Failed to fetch labels" });
  }
};
