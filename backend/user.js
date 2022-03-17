const mongoose = require('mongoose')


const user=new mongoose.Schema({
username:String,
password:String,
permissions:Boolean
})

module.exports =mongoose.model("user",user)