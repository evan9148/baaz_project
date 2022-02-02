const express = require("express");
const router = express.Router();
const {userProduct} = require("../controllers/user.Controller");

router.get("/Shop/:username", userProduct)

module.exports = router