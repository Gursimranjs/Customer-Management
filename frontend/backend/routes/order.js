const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// ✅ Ensure the required functions exist
if (!orderController.createOrder || !orderController.getOrdersByCustomer) {
  throw new Error("Error: One or more route handlers are undefined.");
}

// ✅ Define API Routes
router.post("/", orderController.createOrder);
router.get("/:customerId", orderController.getOrdersByCustomer);

module.exports = router;