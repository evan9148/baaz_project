const mongoose = require("mongoose");

var userSchema = mongoose.Schema ({
  registeredOn: {
    type: Date, 
    default: Date.now 
  },
  approvedOn: {
    type: Date
  },
  mobile: {
    type: Number,
    unique: true 
  },
  token: {
    type: String
  },
  newUser: { 
    type: Boolean,
    default: true 
  },
  newUserWishlist: {
    type: Boolean,
    default: true 
  },
  newUserDetails: { 
    type: Boolean,
    default: true 
  },
  stream_key_id: {
    type: String
  },
  playback_id: {
    type: String
  },
  stream_id: {
    type: String
  },
  productCatalogueId: {
    type: String
  },
  status: { 
    type: String,
    default: "idle" 
  },
  dry_run: { 
    type: Boolean,
    default: false 
  },
  liveStreamTime: {
    type: Date 
  },
  userVerificationStatus: { 
    type: String, 
    default: "pending" 
  },
  businessCategory: {
    type: String, 
    default: "influencer" 
  },
  scheduled: {
    type: Boolean
  },
  scheduleLiveId: {
    type: String
  },
  stream_connection_status: {
    type: String
  },
  username: { 
    type: String, 
    unique: true 
  },

});
module.exports = mongoose.model("User", userSchema);
