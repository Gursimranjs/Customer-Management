const bcrypt = require("bcrypt");
const { User, Customer } = require("../models");

exports.registerUser = async (req, res) => {
  try {
    const { full_name, email, phone, password, role } = req.body;

    // ✅ Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // ✅ Check if phone number already exists
    const existingPhone = await User.findOne({ where: { phone } });
    if (existingPhone) {
      return res.status(400).json({ error: "Phone number is already registered" });
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create the user
    const newUser = await User.create({
      full_name,
      email,
      phone,
      password_hash: hashedPassword,
      role: role || "customer", // Default role: customer
    });

    // ✅ Automatically create a customer after registering
    const newCustomer = await Customer.create({
      user_id: newUser.user_id,
      full_name: newUser.full_name,
      billing_address: "",
      preferences: {},
    });

    res.status(201).json({
      message: "User & Customer registered",
      user: newUser,
      customer: newCustomer,
    });
  } catch (error) {
    console.error("Registration Error:", error);

    // ✅ Better error message for validation failures
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ error: "Invalid input", details: error.errors });
    }

    res.status(500).json({ error: "Registration failed", details: error.message });
  }
};