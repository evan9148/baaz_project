const Product = require("../models/product")

exports.search_users = async (req,res) => {
    try {
        const {page = 1,limit = 8} = req.query
        if (page <= 0){
            res.status(400).json({
                error : `page number not found ${page}`
            })
        }
        const products = await Product.find({
            title: { $regex: ".*" + req.params.title + ".*" , $options: "i" }})
            .limit(limit*1)
            .skip((page - 1) * limit)
        res.status(200).json({
            message: products.length
                ? `Found ${products.length} results for the searched term`
                : `Found nothing`,
            My_data: products
        })
    } catch (err) {
        return res.status(400).json({
            error : err
        })
    }
}