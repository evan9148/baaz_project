var express = require('express'); 
var app = express();
const mongoose = require("mongoose");
const Product = require("../baazWebDev/product")
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
    Product.findOne({title : req.params.title}).exec((err,data) => {
        if (err){
            console.log(err)
            res.status(400).json({
                error : err
            })
        }else if (data) {
            res.status(200).json({
                My_data : data
            })

        }
    })
})


app.listen(port,()=>{
    console.log(`server running at port:${port}`)
})