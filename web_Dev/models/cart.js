const mongoose = require("mongoose");

var cart_schema = mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId, ref: "product"
    },
    quantity : {
        type : Number
    }
});

module.exports = new mongoose.model("cart", cart_schema);