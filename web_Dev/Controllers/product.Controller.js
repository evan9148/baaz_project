const Product = require("../models/product")
const fs = require('fs');
// const csv = require('csv-parser');
const multer = require('multer');
const csv = require('fast-csv')
const fileUpload = require("express-fileupload");
const path = require('path');

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

// update api for products collection....!
exports.updateProduct = async (req,res) => {
    try {
        const productUpdate = await Product.findOneAndUpdate({_id: req.params.id},{
            $set:{
                title: req.body.title,
                price: req.body.price,
                mrp: req.body.mrp,
                quantity: req.body.quantity,
                info: req.body.info,
                imgUrl: req.body.imgUrl,
                imgKey: req.body.imgKey,
                sizes: req.body.sizes,
                colors: req.body.colors,
                userId: req.body.userId,
                createdOn: req.body.createdOn,
                visibility: req.body.visibility,
                status: req.body.status,
                popularProduct: req.body.popularProduct
            }
        })
        return res.status(200).json({
                updated: "updated successfully",
                productUpdate
            })
    }catch (err) {
        return res.status(400).json({
            error : err
        })
    }
}


// Delete api for products collections ...!
exports.deleteProduct = async (req,res) => {
    try {
        const productDetail = await Product.findOneAndDelete({_id : req.params.id})
        if (productDetail){
            return res.status(201).json({
                deleted :  "products deleted successfully"
            })
        }
    }catch (err){
        console.log(err)
        return res.status(400).json({
            error : err
        })
    }
} 

// here is file upload api...!
exports.uploadProduct = async (req,res) => {
    var results = [];
    
    // sending a csv file to write on service side and then read the file ....!
    fs.writeFileSync('sample.csv',req.files.product.data)
    csv.parseFile('sample.csv')
    .on('data', (data) => {
        results.push(data)
    })
    .on('end', () => {
         // here where am checking whether the file exists or not and deletes when the file gets read by the server ....!
        const deleteFile = './sample.csv'
        if (fs.existsSync(deleteFile)) {
            fs.unlink(deleteFile, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('deleted');
            })
        }
        var title_index = results[0].indexOf('title')
        var price_index = results[0].indexOf('price')
        var mrp_index = results[0].indexOf('mrp')
        var image_index = results[0].indexOf('image')
        var quantity_index = results[0].indexOf('quantity')
        var sizes_index = results[0].indexOf('sizes')
        var colors_index = results[0].indexOf('colors')
        results.shift();
        for (var result of results) {
            console.log("result",result)
            Product.create ({
                title: result[title_index],
                price: result[price_index],
                mrp: result[mrp_index],
                image: result[image_index],
                quantity: result[quantity_index],
                sizes: result[sizes_index],
                colors: result[colors_index]
            })
        }
        // console.log(results)
        res.status(201).json({
            message : "file uploaded...!",
            results 
        })
    })
}


