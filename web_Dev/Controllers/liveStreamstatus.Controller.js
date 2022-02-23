const User = require("../models/users");
const Livestream = require("../models/livestreamstatus");

// get api ...!
exports.getUserLivestream = async (req,res) => {
    try {
        const getdata = await User.findOne({ username: req.params.username });
        // console.log(getdata)
        if (getdata){
            const userId = getdata._id
            const getLivestream = await Livestream.find({ userid: userId });
            console.log(getLivestream,"kkkkk")
            res.status(201).json({
                message : "here is your liveStreamdata..!",
                getLivestream
            })
        }else {
            res.status(400).json({
                notfound : `user not found...!`
            })
        }
    }catch (error){
        console.log(error, "ghdkfj")
        res.status(400).json({
            err : error
        })
    }
}