const Product = require("../models/product")
const Cart = require("../models/cart")


// Add to product api using sessions and cookies....!
exports.addProduct = async (req,res) => {
    try {
        const addCartProduct = await Product.findOne({})
        console.log(addCartProduct._id)
        const {id,quantity} = req.body
        console.log(id)
        console.log(quantity)
        // const Productid = Product._id
        if (id == addCartProduct._id) {
            const products = new Cart({
                id : req.body.id,
                quantity : req.body.quantity
            })
    
            products.save() 
            req.session.products = products
            req.session.save()
            return res.status(201).json({
                newdata : "your cart added ", products
            })
        }else {
            return res.status(400).json({
                Message : "your id not found in product collection....!"
            })
        }
    } catch (err){
        console.log(err)
        return res.status(400).json({
            error : "oops... your product details missed some field"
        })
    }
} 