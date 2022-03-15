const User = require("../models/users");
const Livestream = require("../models/livestreamstatus");
const Wishlist = require("../models/wishlistLiveStatus");

// get api ...!
exports.getUserLivestream = async (req,res) => {
    try {
        const getdata = await User.findOne({ username: req.params.username });
        // console.log(getdata)
        if (getdata){
            const userId = getdata._id
            const getLivestream = await Livestream.find({ userid: userId, assestStatus: true });
            // console.log(getLivestream,"kkkkk")
            for (var i of getLivestream){
                const livestreamstatusId = i._id
                const getwishlistLive = await Wishlist.find({ userid: livestreamstatusId });
                // console.log(getwishlistLive,"wwwwwwwwww")
                res.status(201).json({
                    message : "here is your liveStreamdata..!",
                    getwishlistLive
                })
            }
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