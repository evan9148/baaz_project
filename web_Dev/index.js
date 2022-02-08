const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const app = express();
const PORT = 4000;

const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const myusername = 'user1'
const mypassword = 'mypassword'


var session;

app.get('/',(req,res) => {
    session=req.session;
    if(session.userid){
        res.send("Welcome User");
    }else
    res.send("went wrong...!")
});


