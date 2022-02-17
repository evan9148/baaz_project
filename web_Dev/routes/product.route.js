const express = require("express");
const router = express.Router();
const {search_users,newProduct,updateProduct,deleteProduct,uploadProduct} = require("../Controllers/product.Controller");

router.get("/search/:title" , search_users)
router.post("/product", newProduct)
router.put("/updateProducts/:id" , updateProduct)
router.delete("/deleteProduct/:id", deleteProduct)
router.post("/fileUpload", uploadProduct)

module.exports = router