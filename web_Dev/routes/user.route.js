const express = require("express");
const router = express.Router();
const {userProduct,newUser,deleteUser} = require("../controllers/user.Controller");

router.get("/Shop/:username", userProduct)
router.post("/newuser" , newUser)
router.delete("/deleteusers/:username", deleteUser)

module.exports = router