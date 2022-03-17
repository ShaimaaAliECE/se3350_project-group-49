const express = require("express");
const cors =require('cors');
const passport=require('passport');
const session=require('express-session');
const mongoose=require('mongoose');
const User = require('./user')


//--END OF IMPORTS--//

/* remove comments when the database is created 
mongoose.connect("mongodb+srv://root:root1@cluster0.4cplb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
useNewUrlParser:true, useUnifiedTopology:true

}, ()=>{console.log("MONGO is CONNECTED")})
*/
const app=express()
app.use(bodyParser.json())
app.listen(bodyParser.urlencoded({ extended:true}))

app.use(cors({origin:'http://localhost:3000', methods:"GET, POST,PUT,DELETE", credentials:true}))


app.use(cookieParser("secrets"))
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport);

/* END OF MIDDLEWARE */

//THIS IS WHERE THE LOGIN FUNCTION WILL BE PLACE
app.post("/login",(req, res, next) => {



})

//REGISTER FUNCTIONALITY HERE
app.post("/register",(req,res, next) => {
User.findOne({username:req.body.username},async(err,doc)=>{
    if(err) throw err;
    if(doc) res.send("User Already Exists")
    if(!doc){
        const newUser=new User({
            username:req.body.username,
            password:req.body.password
        });
        await newUser.save();
        res.status(200).json({success:true})
    }
})

})

//return all user info for the site admin
app.get("/user-info",(req,res,next)=>{


})

//sends a successful login json token thingy majiggy
app.get("login/success",(req,res)=>{
    if(req.user){
        res.status(200).json({
            success:true ,
            user:req.user,
            cookies:req.cookies, 
            messages: "successful"
        })
    }
})

//sends a failed to login json token thingy majiggy
app.get("login/failed",(req,res)=>{
    if(req.user){
        res.status(401).json({
            success:false,
            message:"failure"
        })
    }
})

//redirect to login page on client side
//TODO #6
app.get("logout", (req,res)=>{
    req.logout();
    res.redirect('http://localhost:3000/login')
})

app.listen(4000, ()=>{console.log('SERVER STARTED AT PORT 4000')})
