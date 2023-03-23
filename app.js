const express = require('express')
const bodyparser = require('body-parser')
var fs = require('fs');
const path = require('path');
const app = express();


app.use(bodyparser.urlencoded({
    extended:true
}));

app.use(express.static('docs'))

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/addUser",function(req,res){
    var username = req.body.username;
    var dob = req.body.dob;
    var profession = req.body.profession;
    var obj = {};
    var key = req.body.userId;
    var newUser = {
        "name" : username,
        "dob" : dob,
        "profession" : profession
    }
    obj[key] = newUser;

    fs.readFile("user.json","utf8",function(err,data){
        data = JSON.parse(data);
        data[key] = obj[key];
        console.log(data);
        var updateUser = JSON.stringify(data)
        fs.writeFile("user.json",updateUser,function (err) {
            res.end(JSON.stringify(data));
        })
    })
});

app.post("/particularUser",function(req,res){
    fs.readFile("user.json","utf8",function(err,data){
        var users = JSON.parse(data)
        var user = users[req.body.urId];
        console.log(user)
        res.end(JSON.stringify(user));
    });
});


app.post("/deleteUser",function(req,res){
    fs.readFile("user.json","utf8",function(err,data){
        data = JSON.parse(data)
        delete data[req.body.uId];
        console.log(data)
        var updateUser = JSON.stringify(data);
        fs.writeFile("user.json",updateUser,function (err) {
            res.end(JSON.stringify(data));
        })
    });
});


app.get("/AllUsers",function (req,res) {
    fs.readFile("user.json","utf8",function(err,data){
        console.log(data)
        res.end(data)
    });
})

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});