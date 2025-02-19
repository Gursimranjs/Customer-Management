const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Ensure this path is correct

// Register User Route
router.post("/register", authController.registerUser);  // This must be defined

module.exports = router;