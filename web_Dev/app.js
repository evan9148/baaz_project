var express = require('express'); 
var app = express();
const mongoose = require("mongoose");
const Product = require("../Web_Dev/product")
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
            My_data: data,
          });
        }
      });
})


app.listen(port,()=>{
    console.log(`server running at port:${port}`)
})