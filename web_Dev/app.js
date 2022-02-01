var express = require('express'); 
var app = express();
const mongoose = require("mongoose");
const Product = require("../Web_Dev/product")
const User = require("../Web_Dev/users")
const Str = require('@supercharge/strings')
const port = 5000;


mongoose
    .connect(
        `mongodb+srv://baaz_evanjali:ymP6SbK79wPtAyUg@cluster0.rluns.mongodb.net/MVCFormat`,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
    )
    .then(() => {
        console.log("connected with mongodb");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());

app.get("/search/:title" , (req,res) => {
    const {page = 1,limit = 8} = req.query
    if (page <= 0){
        res.status(400).json({
            error : `page number not found ${page}`
        })
    }
    Product.find({
        title: { $regex: ".*" + req.params.title + ".*" , $options: "i" },
        }).limit(limit*1)
        .skip((page - 1) * limit)
        .exec((err, data) => {
        if (err) {
            console.log(err);
            res.status(400).json({
                error: err,
            });
        } else if (data) {
            res.status(200).json({
                message: data.length
                    ? `Found ${data.length} results for the searched term`
                    : `Found nothing`,
                My_data: data
            });
        }
    });
})


app.get("/Shop/:username" , (req,res) => {
    // User.findOne({username : req.params.username},{_id : req.params.id})
    // User.aggregate([
    //     {
    //         $lookup :
    //         {
    //             from : "Products",
    //             localField : "_id",
    //             foriegnField : "_id",
    //             as : "customers_details"
    //         }
    //     }
    // ]).toArray ( function (err,data){
    //     if (err){
    //         res.status(400).json({
    //             error : err
    //         })
    //     }else if (data) {
    //         console.log(data)
    //         res.status(200).json({
    //             data : data
    //         })
    //     }
    // })
    User.findOne({username : req.params.username})
    .exec((err,data) => {
        if (err){
            res.status(400).json({
                error : err
            })
        }else if (data) {
            console.log(data)
            const user_id = data._id
            Product.find({userId : user_id}).exec((err,data) => {
                if (err){
                    res.status(400).json({
                        error : err
                    })
                }else if (data){
                    res.status(200).json({
                        data : data
                    })
                }
            })
        }
    })
})


app.listen(port,()=>{
    console.log(`server running at port:${port}`)
})