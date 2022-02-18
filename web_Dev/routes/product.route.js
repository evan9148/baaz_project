const express = require("express");
const router = express.Router();
const {search_users,newProduct,updateProduct,deleteProduct,uploadProduct} = require("../Controllers/product.Controller");
const multer = require("multer");
const upload = multer({ dest: 'tmp/csv/' })

router.get("/search/:title" , search_users)
router.post("/product", newProduct)
router.put("/updateProducts/:id" , updateProduct)
router.delete("/deleteProduct/:id", deleteProduct)
router.post("/fileUpload", upload.single('product'), uploadProduct)


module.exports = router