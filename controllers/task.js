const express = require('express');
const router = express.Router();
const taskModel = require("../models/Task")

router.get("/loginwelc",(req,res)=>
{
    res.render("Task/taskAddForm");
})

router.post("/loginwelc",(req,res)=>
{

    const newUser = {
        title : req.body.title,
        description : req.body.description,
        price : req.body.price
    }

    const task = new taskModel(newUser);
    task.save()
    .then(()=>{
        res.redirect("/task/list");
    })
    .catch(err=>console.log(`Error occurred when insterting in the database: ${err}`))
})

router.get("/list",(req,res)=>
{
    res.render("Task/taskDashboard");
})