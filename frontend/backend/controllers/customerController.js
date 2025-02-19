const { Customer, User } = require("../models");

// ✅ Fetch all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    console.error("❌ Get Customers Error:", error);
    res.status(500).json({ error: "Failed to retrieve customers" });
  }
};

// ✅ Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { email, full_name, billing_address, preferences } = req.body;
    if (!email || !full_name) {
      return res.status(400).json({ error: "Email and full name are required" });
    }

    console.log(`🔍 Checking if user exists with email: ${email}`);
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log(`❌ No user found with email: ${email}`);
      return res.status(400).json({ error: `No user found with email: ${email}` });
    }

    console.log(`✅ Creating customer profile for user: ${user.user_id}`);
    const newCustomer = await Customer.create({
      user_id: user.user_id,
      full_name,
      billing_address,
      preferences,
    });

    res.status(201).json({ message: "Customer created", customer: newCustomer });
  } catch (error) {
    console.error("❌ Create Customer Error:", error);
    res.status(500).json({ error: "Failed to create customer" });
  }
};