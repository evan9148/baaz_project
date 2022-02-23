const express = require("express");
const router = express.Router();
const {getUserLivestream} = require("../Controllers/liveStreamstatus.Controller");

router.get("/store-data/:username", getUserLivestream);

module.exports = router