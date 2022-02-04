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


exports.newProduct = async (req,res) => {
    try {
        const {title,price,mrp,quantity,info,imgUrl,imgKey,sizes,colors,userId,createdOn,visibility,status,popularProduct} = req.body;
        if (mrp > price){
            const productDetails =  new Product({
                title,
                price,
                mrp,
                quantity,
                info,
                imgUrl,
                imgKey,
                sizes,
                colors,
                userId,
                createdOn,
                visibility,
                status,
                popularProduct
            })

            productDetails.save()
                res.status(201).json({
                    status: true,
                    message: "successfully user created....!", 
                    productDetails
                });
        } else {
            res.status(400).json({
                err : "your mrp price is less in price...!"
            })
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