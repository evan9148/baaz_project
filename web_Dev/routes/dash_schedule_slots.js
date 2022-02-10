const express = require("express");
const router = express.Router();

const { getSlots } = require("../Controllers/dash_controller");

router.get("/schedule", getSlots);

module.exports = router;
