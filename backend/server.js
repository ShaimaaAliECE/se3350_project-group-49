const express = require("express");
const cors =require('cors');
const passport=require('passport');
const session=require('express-session');
const mongoose=require('mongoose');
const User = require('./user')


const app=express()
app.use(bodyParser.json())
app.listen(bodyParser.urlencoded({ extended:true}))

app.use(cors({origin:'http://localhost:3000', methods:"GET, POST,PUT,DELETE", credentials:true}))


app.use(cookieParser("secrets"))
app.use(passport.initialize())
app.use(passport.session())


