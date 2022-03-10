const Dash_call_Schedule = require("../models/dash_call_schedule");
const Live_Request = require("../models/live_request");
var moment = require('moment');

exports.getSlots = async (req, res) => {
  try {
    var user_id = req.query.user_id;
    console.log(user_id);
    if (!user_id) {
      throw {
        err_status: true,
        message: `user_id not passed in query`,
      };
    }

    console.log(req.query);
    var current_date =
      req.query.filter == "today"
        ? new Date(Date.now())
        : convert_date(req.query.filter);
    console.log(req.query.filter == "today");
    var days = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'];
    var d = new Date(current_date);
    var dayName = days[d.getDay()];
    var startHour = Date.UTC(
      current_date.getFullYear(),
      current_date.getMonth(),
      current_date.getDate(),
      0,
      0,
      0,
      0
    );
    var endHour = startHour + 86400000;
    // var week = current_date;

  var slot = await Dash_call_Schedule.findOne({ merchant_id: user_id });
  console.log(slot,"hhhhhhh")
  if (slot){
    let allTimes = [];
    if (slot.days.includes(dayName)){
      console.log(dayName,"uuuuuuuuu")
      for (var i of slot.slots){
        let x = {
          slotInterval: 30,
          openTime: i.start_time,
          closeTime: i.end_time
        };

        //Format the time
        let startTime = new Date(x.openTime).getTime();
        console.log(startTime,"sssssss")

        //Format the end time and the next day to it
        let endTime = new Date(x.closeTime).getTime();

        //Loop over the times - only pushes time with 30 minutes interval
        while (startTime < endTime) {
          //Push times
          allTimes.push({
            availability: true,
            time: new Date(startTime).getTime()
          });
          //Add interval of 30 minutes
          startTime = new Date(startTime)
          startTime.setMinutes(startTime.getMinutes()+x.slotInterval);
        }
        console.log(allTimes)
      }
    }
    res.status(201).json({
      massege: "here are your slots",
      allTimes
    })
  }else {
    res.status(400).json({
      error : "slots are not available...!"
    })
  }
  } catch (error) {
    console.log(error);
    if (error.err_status) {
      res.status(400).json(error);
    } else {
      res.status(400).json({ message: "something went wrong!" });
    }
  }
};


var convert_date = (date_str) => {
  var year = date_str.split("-")[0];
  var month = date_str.split("-")[1];
  var day = date_str.split("-")[2];
  return new Date(`${month}/${day}/${year} 05:30:00`);
};