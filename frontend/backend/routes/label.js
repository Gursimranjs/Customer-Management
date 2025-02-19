// routes/label.js
const express = require("express");
const { generateLabel, getLabels } = require("../controllers/LabelController");

const router = express.Router();

router.post("/generate", generateLabel); // POST /api/labels/generate
router.get("/", getLabels);             // GET  /api/labels

module.exports = router;
