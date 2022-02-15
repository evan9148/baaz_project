const mongoose = require("mongoose");

const dash_schedule_schema = new mongoose.Schema({
  merchant_id: { 
    type: String, 
    unique: true 
  },
  merchant_name: {
    type: String
  },
  type: {
    type: String
  },
  days: {
    type: String
  },
  start_time: {
    type: Number
  },
  end_time: {
    type: Number
  },
  slots: [
    { 
      start_time: {
        type: Number
      }, 
      end_time: {
        type: Number 
      }
    }
  ],
  created_at: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = new mongoose.model("Dash_call_Schedule", dash_schedule_schema);
