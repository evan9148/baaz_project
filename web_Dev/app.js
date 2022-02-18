const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const fileupload = require("express-fileupload");
app.use(fileupload());
const csv = require("fast-csv");
const multer = require("multer");
const upload = multer({ dest: 'tmp/csv/' })
const fs = require('fs');
const path = require('path');
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const newRoute = require("./routes/user.route");
const proRoute = require("./routes/product.route");
const UpdateProductRoute = require("./routes/product.route");
const deleteUserRoute = require("./routes/user.route");
const deleteProductRoute = require("./routes/product.route");
const AddCartRoute = require("./routes/cart.route");
const dash_schedule_route = require("./routes/dash_schedule_slots");
const uploadRoute = require("./routes/product.route");
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

// changing into express json....!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// middlewares....!
app.use(cookieParser());

// creating sessions and cookies...!
const oneDay = 1000 * 60 * 60 * 24;
app.use(
    sessions({
        key: "New_id",
        secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
        resave: false,
    })
);

// route middlewares...!
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/newUser", newRoute);
app.use("/api/newProduct", proRoute);
app.use("/api/Productsupdate", UpdateProductRoute);
app.use("/api/Userdelete", deleteUserRoute);
app.use("/api/productdelete", deleteProductRoute);
app.use("/api/Cart", AddCartRoute);
app.use("/api/upload" , uploadRoute);
app.use("/live/call", dash_schedule_route);


// server is running on this port ....!
app.listen(port, () => {
  console.log(`server running at port:${port}`);
});
