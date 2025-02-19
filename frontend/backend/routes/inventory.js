const express = require("express");
const router = express.Router();
const { getItems, createItem } = require("../controllers/inventoryController"); // Ensure these exist

// ✅ Define routes
router.get("/", getItems);
router.post("/", createItem); // Ensure createItem exists

module.exports = router;