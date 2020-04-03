const express = require('express');
const router = express.Router();

//Load the taskModel
const taskModel = require("../models/Task.js")

router.get("/loginwelc",(req,res)=>
{
    res.render("task/loginwelc",{

        title: "Login Welcome Page",
        headingInfo : "Login Welcome Page",
    });
})

router.post("/loginwelc",(req,res)=>{

    const newUser = {
        title : req.body.title,
        description : req.body.description,
        price : req.body.price
    }
    
    const task = new taskModel(newUser);
    task.save()
    .then(()=>{
        res.redirect("/dashboard");
    })
    .catch(err=>console.log(`Error occurred when insterting in the database: ${err}`))
})

router.get("/list",(req,res)=>
{
    res.render("task/taskDashboard");
})

module.exports = router;