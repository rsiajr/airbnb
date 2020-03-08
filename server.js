//Require Express and Handlebars

const express = require('express'); 
const exphbs = require('express-handlebars'); 
const bodyParser = require('body-parser');
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


//Invoke express

const app = express(); 

//To customize CSS per handlebar

app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' })); 
app.set('view engine', 'handlebars'); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ extended: false })) 

//Request and Response

app.get('/', function (req, res) { 

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

app.get('/reg', function (req, res) { 

    res.render('general/reg',{

        title: "Registration",
        headingInfo : "Registration Page"

    });  

}); 

// Registration Page: Username and Password validation

app.post("/reg",(req,res)=>{

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


});


app.get('/login', function (req, res) { 

    res.render('general/login',{

        title: "Login",
        headingInfo : "Login Page"

    }); 

}); 

// Login Page: Username and Password validation

app.post("/login",(req,res)=>{

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


app.get("/rooms",(req,res)=>{

    const prodDB= [];

    prodDB.push({img:'img/forrent-1.jpg',title:'Room for rent', desc:'Sunny bedroom room for rent', rate:`649.99`});

    prodDB.push({img:'img/forrent-2.jpg',title:'House for rent',desc:'Tuscan-inspired house for rent',rate:`749.99`});

    prodDB.push({img:'img/forrent-3.jpg',title:'Rooms for rent',desc:'Chic 3-bedroom house for rent',rate:`849.99`});

    prodDB.push({img:'img/forrent-4.jpg',title:'Tree house for rent',desc:'Treehouse in the jungle for rent',rate:`949.99`});

    prodDB.push({img:'img/forrent-5.jpg',title:'Room for rent',desc:'Quaint room in the city for rent',rate:`1049.99`});

    prodDB.push({img:'img/forrent-6.jpg',title:'Room for rent',desc:'Castle-like room for rent',rate:`1149.99`});

    res.render("products/rooms",{
        title: "Rooms",
        headingInfo : "Room Listings Page",
        rooms : prodDB

    });
});


//Port creation

const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Web Server Started`);
});

