const express = require('express'); 
const router = express.Router();
const passwordValidator = require('password-validator');
const validator = require("email-validator");


//Schema for password-validator

let schema = new passwordValidator();
 
schema
.is().min(6)
.is().max(8)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()

router.get('/', function (req, res) { 

    const sampleDB= [];

    sampleDB.push({img:'img/carousel-1.jpg',title:'Room in house'});

    sampleDB.push({img:'img/carousel-2.jpg',title:'Hammock in garden'});

    sampleDB.push({img:'img/carousel-3.jpg',title:'Small house'});

    sampleDB.push({img:'img/carousel-4.jpg',title:'Big house'});

    sampleDB.push({img:'img/carousel-5.jpg',title:'Spacious living room'});

    sampleDB.push({img:'img/carousel-6.jpg',title:'House on hill'});

    res.render("general/home",{
        title: "Home",
        headingInfo : "Home Page",
        home : sampleDB

    });

}); 

router.get('/reg', function (req, res) { 

    res.render('general/reg',{

        title: "Registration",
        headingInfo : "Registration Page"

    });  

}); 

// Registration Page: Username and Password validation

router.post("/reg",(req,res)=>{

  const errorsReg = [];

if(req.body.emailReg=="")
{
  errorsReg.push("You need to enter an EMAIL ADDRESS before you can sign in.");

}

if(validator.validate(req.body.emailReg) == false)
{
  errorsReg.push("You need to enter a valid EMAIL ADDRESS.");

}

if(req.body.firstNameReg=="")
{
  errorsReg.push("You need to enter a FIRST NAME before you can sign in.");

}

if(req.body.lastNameReg=="")
{
  errorsReg.push("You need to enter a LAST NAME before you can sign in.");

}

if(req.body.passwordReg=="")
{
  errorsReg.push("You need to enter a PASSWORD before you can sign in.")
}

if(schema.validate(req.body.passwordReg) == false)
{
  errorsReg.push("Your PASSWORD must be 6-8 characters long, with one uppercase and one lowercase letter, no spaces, and atleast one numerical value.")
}


if(errorsReg.length > 0)
{
  res.render("general/reg",{
    messages : errorsReg
  })
}

else if(errorsReg.length == 0)
{
  const {firstNameReg,lastNameReg,emailReg} = req.body;

  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  const msg = {
  to: `kadeem.best@hotmail.com`,
  from: `${emailReg}`,
  subject: 'Registration Form Submit',
  html: 
  `Customer's Full Name ${firstNameReg} ${lastNameReg} <br><br>
  Visitor's email address ${emailReg} <br><br>
  
  `,
  };

  sgMail.send(msg)
  .then(()=>{
    res.redirect("/");
  })
  .catch(err=>{
    console.log(`Error ${err}`);
  })

}
});


router.get('/login', function (req, res) { 

    res.render('general/login',{

        title: "Login",
        headingInfo : "Login Page"

    }); 

}); 

// Login Page: Username and Password validation

router.post("/login",(req,res)=>{

  const errors= [];

if(req.body.email=="")
{
  errors.push("You need to enter an EMAIL ADDRESS before you can sign in");

}

if(validator.validate(req.body.email) == false)
{
  errors.push("You need to enter a valid EMAIL ADDRESS.");

}

if(req.body.password=="")
{
  errors.push("You need to enter a PASSWORD before you can sign in.")
}

if(errors.length > 0)
{
  res.render("general/login",{
    messages : errors
  })
}

// else(errors.length == 0)
// {
//   res.render('home',{

//     // title: "Home",
//     // headingInfo : "Home Page",

//   })  
// }

});

module.exports = router;