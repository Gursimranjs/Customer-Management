// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const path = require("path");

// Ensure config path is correct
const sequelize = require(path.join(__dirname, "config", "db"));

const authRoutes = require(path.join(__dirname, "routes", "auth"));
const inventoryRoutes = require(path.join(__dirname, "routes", "inventory"));
const orderRoutes = require(path.join(__dirname, "routes", "order"));
const invoiceRoutes = require(path.join(__dirname, "routes", "invoice"));
const labelRoutes = require(path.join(__dirname, "routes", "label"));
const customerRoutes = require(path.join(__dirname, "routes", "customer")); // ✅ Add customer routes

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/labels", labelRoutes);
app.use("/api/customers", customerRoutes); // ✅ Register customer routes

// ✅ Sync Database & Start Server
sequelize.sync({ force: false }) // Ensure tables aren't dropped
  .then(() => {
    console.log("✅ Database connected");
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Database connection error:", err);
    process.exit(1); // Exit if DB fails
  });