const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");
const PORT = 3000;

const templatePath = path.join(__dirname,'../templates');
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json())
app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.get("/home",(req,res)=>{
    res.render("home")
})

app.get("/furniture",(req,res)=>{
    res.render("furniture")
})

app.get("/vehicles",(req,res)=>{
    res.render("vehicles")
})

app.get("/rentee",(req,res)=>{
    res.render("rentee")
})

app.get("/furniture",(req,res)=>{
    res.render("furniture")
})

app.get("/cart",(req,res)=>{
    res.render("cart")
})


app.post("/signup",async (req,res)=>{
    const data={
        name: req.body.name,
        password: req.body.password
    }

    await collection.insertMany([data]);

    res.render("home", { name: req.body.name });
})

app.post("/login",async (req,res)=>{
    
    try{
        const check = await collection.findOne({name:req.body.name})
        if(check.password == req.body.password){
            res.render("home", { name: req.body.name });
        }
        else{
            res.send("wrong password");
        }
    }
    catch{
        res.send("wrong details");
    }
})


app.listen(PORT,()=>{
    console.log("port connected");
    console.log(`Server started at http://localhost:${PORT}`);
})