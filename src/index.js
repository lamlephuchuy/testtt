const express = require('express');
const pasth = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/home", (req, res) => {
    res.render("home");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.pawword
    }

    const userdata = await collection.insertMany(data);
    console.log(userdata)
});

app.post("/", async (req, res) => {
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("user name error");
        }

        const isPassword = await bcrypt.compare(req.body.password, check.password);
        if(isPassword){
            res.render("home");
        }
        else {
            req.send("Password error");
        }
    }catch{
        res.send("Wrong Account")
    }
});

const port = 5000;
app.listen(port, () =>{
    console.log(`Server running on Port: ${port}`);
});