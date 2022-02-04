const express = require("express");
const router = express.Router();
const {userProduct,newUser} = require("../controllers/user.Controller");

router.get("/Shop/:username", userProduct)
router.post("/newuser" , newUser)

module.exports = router