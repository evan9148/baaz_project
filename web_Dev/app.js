const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
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

// route middlewares...!
app.use("/api/user", userRoute);
app.use("/api/product", productRoute)


app.listen(port,()=>{
    console.log(`server running at port:${port}`)
})