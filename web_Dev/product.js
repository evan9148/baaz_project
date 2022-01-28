const mongoose = require("mongoose");

var product_schema = mongoose.Schema ({
    title: {
      type : String
    },
    price: {
      type : Number
    },
    mrp: {
      type : Number
    },
    quantity: {
      Number
    },
    info: {
      type : String
    },
    imgUrl: {
      type : String
    },
    imgUrls: {
      type : String
    },
    imgKey: {
      type : String
    },
    brandName: {
      type : String
    },
    brandId: {
      type : String
    },
    sizes: {
      type : String
    },
    colors: {
      type : String
    },
    brandName: {
      type : String
    },
    brandId: {
      type : String
    },
    userId: {
      type : String
    },
    createdOn: {
      type: Date, 
      default: Date.now 
    },
    visibility: { 
      type: Boolean,
      default: true 
    },
    status: { 
      type: Boolean,
      default: false 
    },
    popularProduct: {
      type: Boolean,
      default: false 
    }
});

module.exports = new mongoose.model("Product", product_schema);