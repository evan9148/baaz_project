const express = require("express");
const router = express.Router();
const {search_users} = require("../controllers/product.Controller");

router.get("/search/:title" , search_users)

module.exports = router