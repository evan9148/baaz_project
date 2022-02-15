const mongoose = require("mongoose");

var liveRequestSchema = new mongoose.Schema({
  name: {type: 
    String
  },
  email: {
    type: String
  },
  visibility: { 
    type: Boolean, 
    default: true 
  },
  storeId: {
    type: String
  },
  cookieId: {
    type: String
  },
  roomId: {
    type: String
  },
  action: { 
    type: String, 
    default: "requested" 
  },
  notificationStatus: { 
    type: Boolean, 
    default: false 
  },
  createdOn: { 
    type: Date, 
    default: Date.now 
  },
  logs: [
    {
      name: String,
      time: { type: Date, default: Date.now },
    },
  ],
  callStatus: { 
    type: String, 
    default: "created" 
  },
  discount_type: { 
    type: String, 
    default: "percentage" 
  },
  discount: { 
    type: Boolean, 
    default: false 
  },
  discountValue: {
    type: Number
  },
  type: { 
    type: String, 
    default: "standard" 
  },
  scheduledTime: {
    type: Date,
  },
  incomingTime: {
    type: Date
  },
  gift_added: {
    type: String
  },
  source: {
    type: String
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Livestreamproduct",
    },
  ],
});

module.exports = new mongoose.model("live_request", liveRequestSchema);
