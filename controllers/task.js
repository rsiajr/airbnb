const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const taskModel = require("../models/Task");

router.get("/loginwelc",(req,res)=>
{
    res.render("user/loginwelc",{

        title: "Login Welcome Page",
        headingInfo : "Login Welcome Page",
    });
})

router.post("/loginwelc", (req,res) => {

    const newUser = {
        title : req.body.title,
        description : req.body.description,
        price : req.body.price
    }
    
    const task = new taskModel(newUser);
    task.save()
    .then(()=>{
        res.redirect("/task/dashboard");
    })
    .catch(err=>console.log(`Error occurred when inserting in the database: ${err}`))

})

router.get("/dashboard",(req,res)=>
{
    taskModel.find()
    .then((tasks)=>{
  
        const filteredTask = tasks.map(task=>{

                return {
                    id: task._id,
                    title:task.title,
                    description:task.description,
                    price:task.price,
                }
        });

    res.render("products/dashboard",{
        data : filteredTask
    });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

})

router.get("/description",(req,res)=>{

    

})

router.get("/edit/:id",(req,res)=>{

    taskModel.findById(req.params.id)
    .then((task)=>{

        const {_id,title,description,price} = task;
        res.render("products/productEditForm",{
            _id,
            title,
            description,
            price
        })

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

})

router.put("/update/:id",(req,res)=>{

    const task =
    {
        title:req.body.title,
        description:req.body.description,
        price:req.body.price
    }

    taskModel.updateOne({_id:req.params.id},task)
    .then(()=>{
        res.redirect("/task/dashboard");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));


});


router.delete("/delete/:id",(req,res)=>{
    
    taskModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/task/dashboard");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));

});

module.exports = router;