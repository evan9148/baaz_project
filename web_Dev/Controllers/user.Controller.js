const User = require("../models/users");
const Product = require("../models/product")


exports.userProduct = async (req,res) => {
    try {
        const getUser = await User.findOne({username : req.params.username})
            if (getUser) {
                console.log(getUser)
                const user_id = getUser._id
                const getProduct = await Product.find({userId : user_id})
                    res.status(200).json({
                        data : getProduct
                    })
            }else {
                res.status(400).json({
                    massage : "user not found"
                })
            }
    }catch (err){
        res.status(400).json({
            error : err
        })
    }
}
