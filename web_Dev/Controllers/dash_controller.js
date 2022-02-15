const Dash_call_Schedule = require("../models/dash_call_schedule");
const Live_Request = require("../models/live_request");


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

    var slot = await Dash_call_Schedule.findOne({merchant_id: user_id});
    if (slot) {
      slot_check = (slot.current_date,slot.type,slot.days,startHour,endHour, async (check) => {
        var free_slots = [];
        if (check.status) {
          var booked_slots = await Live_Request.find({
            scheduledTime: {
              $gte: check.startHour,
              $lt: check.endHour,
            },
            visibility: true,
          })

          var date = new Date();
          // var coff = 1000 * 60 * 30;
          var temp_time = check.startHour >
            (Math.ceil(date / 1800000) * 1800000) % (date * 2)
              ? (Math.ceil(slot_check.startHour / 1800000) * 1800000) %
                (check.startHour * 2)
              : (Math.ceil(date / 1800000) * 1800000) % (date * 2);

          if (temp_time < check.endHour) {
            var slot_check_bool = false;
            booked_slots.forEach((booked_slot) => {
              console.log(booked_slot.schedule_id == fetch_slot_id(temp_time));
              if (booked_slot.schedule_id == fetch_slot_id(temp_time)) {
                slot_check_bool = true;
              }
            });
            if (slot_check_bool) {
              free_slots.push({
                availability: false,
                time: temp_time,
                slot_id: fetch_slot_id(temp_time),
              });
              temp_time += 1000 * 60 * 30;
            } 
            // else {
            //   free_slots.push({
            //     availability: true,
            //     time: temp_time,
            //     slot_id: fetch_slot_id(temp_time),
            //   });
            //   temp_time += 1000 * 60 * 30;
            // }
          }
          res.status(201).json({
            status: true,
            slots: free_slots,
            days: "jfuefhefk"
          });
        } else {
          res.status(200).json({
            status: false,
            message: "no slots found",
            days: "all",
            slots: free_slots,
          });
        }
      }
      );
    } else {
      res.status(400).json({
        error_message : "your slot is not available ....!"
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

var slot_check = (current_date, type, days, startHour, endHour, callback) => {
  // var current_time = current_date;
  var days_str = ["sun","mon","tue","wed","thur","fri","sat"];
  console.log(
    "(days.search(days_str[current_date.getDay()])", days.search(days_str[current_date.getDay()]));
  var day_check =
    ("weekdays" == days &&  
    current_date.getDay() <= 5 &&
    current_date.getDay()) ||
    days == "all" ||
    (days == "weekends" && current_date.getDay() >= 5) ||
    days.search(days_str[current_date.getDay()]) >= -1;
  if (type == "24x7") { 
    console.log("24x7");
    var startHour = Date.UTC(
      current_date.getFullYear(),
      current_date.getMonth(),
      current_date.getDate(),
      04,
      00,
      0,
      0
    );
    var endHour = Date.UTC(
      current_date.getFullYear(),
      current_date.getMonth(),
      current_date.getDate(),
      16,
      30,
      0,
      0
    );
    if (day_check) {
      callback({
        status: true,
        startHour: startHour,
        endHour: endHour,
      });
    } else {
      callback({
        status: false,
      });
    }
  } else {
    if (day_check) {
      startHour = new Date(startHour);
      endHour = new Date(endHour);
      startHour = Date.UTC(
        current_date.getFullYear(),
        current_date.getMonth(),
        current_date.getDate(),
        startHour.getUTCHours(),
        startHour.getUTCMinutes(),
        startHour.getUTCSeconds()
      );
      endHour = Date.UTC(
        current_date.getFullYear(),
        current_date.getMonth(),
        current_date.getDate(),
        endHour.getUTCHours(),
        endHour.getUTCMinutes(),
        endHour.getUTCSeconds()
      );
      endHour = startHour > endHour ? endHour + 1000 * 60 * 60 * 24 : endHour;
      callback({
        status: true,
        startHour: startHour,
        endHour: endHour,
      });
    } else {
      callback({
        status: false,
      });
    }
  }
};

var fetch_slot_id = (time) => {
  time = new Date(time);
  var yyyy = time.getFullYear();
  var mm =
    time.getMonth() + 1 >= 10 ? time.getMonth() + 1 : `0${time.getMonth() + 1}`;
  var dd = time.getDate() >= 10 ? time.getDate() : `0${time.getDate()}`;
  var hh = time.getHours() >= 10 ? time.getHours() : `0${time.getHours()}`;
  var m = time.getMinutes() >= 10 ? time.getMinutes() : `0${time.getMinutes()}`;
  var date_str = `${yyyy}_${mm}_${dd}_${hh}_${m}`;
  return date_str;
};

var convert_date = (date_str) => {
  var year = date_str.split("-")[0];
  var month = date_str.split("-")[1];
  var day = date_str.split("-")[2];
  return new Date(`${month}/${day}/${year} 05:30:00`);
};
