const User = require("../models/users");
const Product = require("../models/product")

// Get api ...!
exports.userProduct = async (req, res) => {
    try {
        const getUser = await User.findOne({ username: req.params.username })
        if (getUser) {
            console.log(getUser)
            const user_id = getUser._id
            const getProduct = await Product.find({ userId: user_id })
            res.status(200).json({
                data: getProduct
            })
        } else {
            res.status(400).json({
                massage: "user not found"
            })
        }
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
}


// post Api...!
exports.newUser = async (req, res) => {
    try {
        const { username, email, mobile } = req.body;
        const userDetails = await User.find({email : req.body.email})
        // console.log(userDetails,userDetails.mobile)
        if (userDetails[0].mobile == req.body.mobile) {
            // console.log("dgdyufgsd")
            return res.status(400).json({
                Used: "mobile allready existed...!"
            })
        } else {
            const user = new User({
                username,
                email,
                mobile
            })

            user.save()
            return res.status(201).json({
                status: true,
                message: "successfully user created....!",
                userDetails
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            message: "Something went wrong.You might have missed some field",
            error,
        })
    }
}


