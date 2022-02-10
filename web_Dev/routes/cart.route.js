const express = require("express");
const router = express.Router();
const {addProduct} = require("../Controllers/cart.Controller");

router.post("/AddtoCart", addProduct)

module.exports = router