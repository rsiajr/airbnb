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

    const featureDB= [];

    featureDB.push({img:'img/feature-1.jpg',title:'Featured Apartment',price: '$50 per night'})

    featureDB.push({img:'img/feature-2.jpg',title:'Featured House',price: '$200 per night'})

    res.render("general/home",{
        title: "Home",
        headingInfo : "Home Page",
        home : sampleDB,
        feature : featureDB
        
    });

}); 


// Registration Welcome Page

router.get('/welcome', function (req, res) { 

  res.render('general/welcome',{

      title: "Welcome Page",
      headingInfo : "Welcome Page"

  });  

}); 

// Login Welcome Page with add room section

// Welcome Page

// router.get('/loginwelc', function (req, res) { 

//   res.render('general/loginwelc',{

//       title: "Login Welcome Page",
//       headingInfo : "Login Welcome Page"

//   });  

// }); 


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

if(req.body.contactNum=="")
{
  errorsReg.push("You need to enter a MOBILE NUMBER before you can sign in.");

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
  const {firstNameReg,lastNameReg,emailReg,contactNum} = req.body;

  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  const msg = {
  to: `${emailReg}`,
  from: `rsiajr@gmail.com`,
  subject: 'Registration Form Submit',
  html: 
  `Customer's Full Name: ${firstNameReg} ${lastNameReg} <br>
  Visitor's Email Address: ${emailReg} <br>
  Visitor's Contact Number: ${contactNum} <br>
  `,
  };

  const accountSid = process.env.TWILIO_ID;
  const authToken = process.env.TWILIO_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  
  client.messages
    .create({
       body: `A message from Vagabond: Thank you for registering to Vagabond!`,
       from: '+12403293226',
       to: `${req.body.contactNum}`
     })

     sgMail.send(msg)
     .then(()=>{
       res.redirect("/welcome");
     })
     .catch(err=>{
       console.log(`Error ${err}`);
     })
    .then(message => {
      console.log(message.sid);
      res.render("/welcome");
    })
    .catch((err)=>{
        console.log(`Error ${err}`);
    })

}
});

router.get("/login",(req,res)=>
{
    res.render("general/login");

});

router.post("/general/login",(req,res)=>{

  const errors= [];

if(req.body.email=="")
{
  errors.push("You need to enter an EMAIL ADDRESS before you can sign in")

}

if(validator.validate(req.body.email) == false)
{
  errors.push("You need to enter a valid EMAIL ADDRESS.")

}

if(req.body.password=="")
{
  errors.push("You need to enter a PASSWORD before you can sign in.")
}

if(errors.length > 0)
{
  res.render("/login",{
    messages : errors
  });
}

else(errors.length == 0)
{
  res.redirect("/task/loginwelc");  
}

});

// router.get('/login', function (req, res) { 

//     res.render('general/login',{

//         title: "Login",
//         headingInfo : "Login Page"

//     }); 

// }); 

// Login Page: Username and Password validation


module.exports = router;