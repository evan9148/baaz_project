const mongoose = require("mongoose");

const dash_schedule_schema = new mongoose.Schema({
  merchant_id: { type: String, unique: true },
  merchant_name: String,
  type: String,
  days: String,
  start_time: Number,
  end_time: Number,
  slots: [{ start_time: Number, end_time: Number }],
  created_at: { type: Date, default: Date.now },
});

module.exports = new mongoose.model("Dash_call_Schedule", dash_schedule_schema);
