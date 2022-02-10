const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const newRoute = require("./routes/user.route");
const proRoute = require("./routes/product.route");
const UpdateProductRoute = require("./routes/product.route");
const deleteUserRoute = require("./routes/user.route");
const deleteProductRoute = require("./routes/product.route");
const AddCartRoute = require("./routes/cart.route");
const port = 5000;


// mongodb connection....!
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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    key : "New_id",
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));



// route middlewares...!
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/newUser", newRoute);
app.use("/api/newProduct", proRoute);
app.use("/api/Productsupdate", UpdateProductRoute);
app.use("/api/Userdelete" ,deleteUserRoute);
app.use("/api/productdelete", deleteProductRoute);
app.use("/api/Cart", AddCartRoute);


app.listen(port,()=>{
    console.log(`server running at port:${port}`)
})