const express = require('express')
const router = express.Router();
const userModel = require("../models/User");
const path = require("path");
const bcrypt = require("bcryptjs");

router.get('/reg', function (req, res) { 

    res.render('user/reg',{

        title: "Registration",
        headingInfo : "Registration Page"

    });  

}); 


router.post("/reg",(req,res)=>
{ 

    const newUser = 
    {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password
    }

    const user = new userModel(newUser);
    user.save()
    .then((user)=>{

        req.files.profilePic.name = `pro_pic_${user._id}${path.parse(req.files.profilePic.name).ext}`;

        req.files.profilePic.mv(`public/uploads/${req.files.profilePic.name}`)
        .then(()=>{


            userModel.updateOne({_id:user._id},{
                profilePic: req.files.profilePic.name
            })
            .then(()=>{
                res.redirect(`/user/profile/${user._id}`)
            })

        })
      
      
       
    })
    .catch(err=>console.log(`Error while inserting into the data ${err}`));
 
});

router.get("/login",(req,res)=>
{
    res.render("user/login");
});

router.post("/login",(req,res)=>
{
    
    const errors=[];

    userModel.findOne({email:req.body.email})
    .then((user)=>{

        if(user==null)
        {
            errors.push("Sorry your email was not found in our database")

            res.render("user/login",{
                errors
            })
        }

        else
        {
            bcrypt.compare(req.body.password,user.password)
            .then((isMatched)=>{

                if(isMatched==true)
                {
                   req.session.user= user;

                   res.redirect("/user/profile")
                }

                else
                {
                    errors.push("Sorry your password was wrong!")

                    res.render("User/login",{
                      errors
                    })
                }

            })
            .catch(err=>console.log(`Error ${err}`));

        }


    })
    .catch(err=>console.log(`Error ${err}`));

});



router.get("/profile/",(req,res)=>{


    res.render("user/userDashboard");
    
})

router.get("/logout",(req,res)=>{

    req.session.destroy();
    res.redirect("/user/login")
});



module.exports=router;