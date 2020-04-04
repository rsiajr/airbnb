const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const passwordValidator = require('password-validator');
const validator = require("email-validator");

let schema = new passwordValidator();
 
schema
.is().min(6)
.is().max(8)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()


const userSchma = new Schema({
   
    firstName:
    {
        type:String,
        required:true
    },
    lastName:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    contactNum:
    {
        type:Number,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    profilePic:
    {
        type:String
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    }
  });

userSchma.pre("save",function(next)
{

    bcrypt.genSalt(10)
    .then((salt)=>{
        
        bcrypt.hash(this.password,salt)
        .then((encryptPassword)=>{
            this.password = encryptPassword;
            next();

        })
        .catch(err=>console.log(`Error occured when hasing ${err}`));
    })
    .catch(err=>console.log(`Error occured when salting ${err}`));

})
 const userModel = mongoose.model('User', userSchma);

 module.exports = userModel;