// routes/invoice.js
const express = require("express");
const { generateInvoice, getInvoices } = require("../controllers/InvoiceController");

const router = express.Router();

router.post("/generate", generateInvoice); // POST /api/invoices/generate
router.get("/", getInvoices);             // GET  /api/invoices

module.exports = router;
