var express = require('express'); 
var app = express();
const data = require("./output.js")
// console.log(data);


let port = 8000;

app.get("/search/:title", (req,res) => {
    user = req.params.title
    const filteredUsers = data.filter((users) => {
        if (user == users.title){
            return users
        }
    });
    res.send(filteredUsers)
})


// console.log(require('./output'))
app.listen(port, () => {
    console.log(`Your server port is running ${port}`)
})