const express = require('express');
const router = express.Router();

//Load the taskModel
const taskModel = require("../models/Task.js")

router.get("/loginwelc",(req,res)=>
{
    res.render("general/loginwelc",{

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
        res.redirect("products/dashboard");
    })
    .catch(err=>console.log(`Error occurred when insterting in the database: ${err}`))

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

        title: "Dashboard Page",
        headingInfo : "Dashboard Page",
        data : filteredTask
    });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

})

router.get("/edit/:id",(req,res)=>{

    taskModel.findById(req.params.id)
    .then((task)=>{

        const {_id,title,description,price} = task;
        res.render("products/productEditForm",{
            _id,
            title,
            description,
            price,
        })

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));


})

router.put("/update/:id",(req,res)=>{

    const task =
    {
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
    }

    taskModel.updateOne({_id:req.params.id},task)
    .then(()=>{
        res.redirect("/products/dashboard");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));


});


router.delete("/delete/:id",(req,res)=>{
    
    taskModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/products/dashboard");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));

});

module.exports = router;