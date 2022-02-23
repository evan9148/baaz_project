const mongoose = require("mongoose");

var liveStreamStatusSchema = mongoose.Schema ({
  stream_key_id: {
    type: String
  },
  playback_id: {
    type: String
  },
  stream_id: {
    type: String
  },
  chatRoomId: { 
    type: String, 
    unique: true, 
    sparse: true 
  },
  chatRoomStatus: {
    type: String
  },
  booking: { 
    type: Boolean, 
    default: false 
  },
  bookingType: {
    type: String
  },
  status: { 
    type: String, 
    default: "idle" 
  },
  userId: {
    type: String
  },
  simulcasting: { 
    type: Boolean, 
    default: false 
  },
  influencerId: {
    type: String
  },
  influencerName: {
    type: String
  },
  bookingRate: {
    type: Number
  },
  bookingCurrency: {
    type: Number
  },
  payment_status: { 
    type: Boolean, 
    default: false 
  },
  razorpay_payment_id: {
    type: String
  },
  payment_amount: { 
    type: Number, 
    default: 2000 
  },
  bookingStatus: { 
    type: String, 
    default: "no-action" 
  
  },
  mobile: {
    type: Number
  },
  onTime: { 
    type: Date, 
    default: Date.now 
  },
  offTime: { 
    type: Date, 
    default: Date.now 
  },
  createdOn: { 
    type: Date, 
    default: Date.now 
  },
  catalogue_createdOn: {
    type: Date
  },
  bookedOn: {
    type: Date
  },
  catalogueId: {
    type: String
  },
  visits: { 
    type: Number, 
    default: 0 
  },
  uniqueVisits: { 
    type: Number, 
    default: 0 
  },
  likes: { 
    type: Number, 
    default: 0 
  },
  chatCount: { 
    type: Number, 
    default: 0 
  },
  assestStatus: { 
    type: Boolean, 
    default: false 
  },
  assetVisits: { 
    type: Number, 
    default: 0 
  },
  streamType: { 
    type: String, 
    default: "live" 
  },
  scheduledTime: {
    type: Date
  },
  scheduledOn: {
    type: Date
  },
  stream_connection_status: {
    type: String
  },
  sendNotifications: { 
    type: Boolean, 
    default: false 
  },
  visibility: { 
    type: Boolean, 
    default: true 
  },
  simulcasting: { 
    type: Boolean, 
    default: false 
  },
  streamStatus: { 
    type: String, 
    default: "created" 
  },
  liveApproval: { 
    type: String, 
    default: "pending" 
  },
  streamTitle: {
    type: String
  },
  uniqueUsers: {
    type: String
  },
  orderId: {
    type: String
  },
  discount: { 
    type: Boolean, 
    default: false 
  },
  imgUrl: {
    type: String
  },
  discountValue: {
    type: Number
  },
  reward_value: {
    Number
  },
  chatMessage: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Livechat",
    },
  ],
  asset: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wishlistlive",
    },
  ],
  subscribedUsers: {
    type: String
  },
  quiz: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  quiz_data: [
    {
      source: {
        type: String
      },
      cookieId: {
        type: String
      },
      storeId: {
        type: String
      },
      question: {
        type: String
      },
      selected_option: {
        type: String
      },
      reward_status: { 
        type: Boolean, 
        default: false 
      },
      time: { 
        type: Date, 
        default: Date.now() 
      },
    },
  ],
  watch_times: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Watch_Time",
    },
  ],
  product_highlight: [
    {
      next_product_id: {
        type: String
      },
      previous_product_id: {
        type: String
      },
      start_time: { 
        type: Date, 
        default: Date.now 
      },
      end_time: { 
        type: Date, 
        default: Date.now 
      },
    },
  ],
});
module.exports = mongoose.model("Livestreamstatus", liveStreamStatusSchema);
