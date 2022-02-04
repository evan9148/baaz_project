const express = require("express");
const router = express.Router();
const {search_users,newProduct} = require("../controllers/product.Controller");

router.get("/search/:title" , search_users)
router.post("/product", newProduct)

module.exports = router