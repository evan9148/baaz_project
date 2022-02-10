const mongoose = require("mongoose");

var liveRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  visibility: { type: Boolean, default: true },
  storeId: String,
  cookieId: String,
  roomId: String,
  action: { type: String, default: "requested" },
  notificationStatus: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now },
  logs: [
    {
      name: String,
      time: { type: Date, default: Date.now },
    },
  ],
  callStatus: { type: String, default: "created" },
  discount_type: { type: String, default: "percentage" },
  discount: { type: Boolean, default: false },
  discountValue: Number,
  type: { type: String, default: "standard" },
  scheduledTime: Date,
  incomingTime: Date,
  gift_added: [String],
  source: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Livestreamproduct",
    },
  ],
});

module.exports = new mongoose.model("Live_Request", liveRequestSchema);
