const mongoose = require("mongoose");

var wishlistLiveSchema = mongoose.Schema ({
    urlVid: {
        type: String
    },
    label: { 
        type: String, 
        default: "liveproduct" 
    },
    createdOn: { 
        type: Date, 
        default: Date.now 
    },
    category: {
        type: String
    },
    categoryId: {
        type: String
    },
    livestreamstatusId: {
        type: String
    },
    title: {
        type: String
    },
    imgUrl: {
        type: String
    },
    categories: [
      {
        id: {type: String},
        title: {type: String},
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Livestreamproduct",
      },
    ],
  });
module.exports = mongoose.model("Wishlistlive", wishlistLiveSchema);