//Require Express and Handlebars

const express = require('express'); 
const exphbs = require('express-handlebars'); 

//Invoke express

const app = express(); 

//To customize CSS per handlebar

app.use(express.static('public'));

//Create engines

app.engine('handlebars', exphbs({ defaultLayout: 'main' })); 
app.set('view engine', 'handlebars'); 
app.use(express.static('public')); 

//Request and Response

app.get('/', function (req, res) { 

    res.render('main',{

        title: "Main",

    }); 

}); 

app.get('/home', function (req, res) { 

    res.render('home',{

        title: "Home",
        headingInfo : "Home Page"

    }); 

}); 

app.get('/reg', function (req, res) { 

    res.render('reg',{

        title: "Registration",
        headingInfo : "Registration Page"

    });  

}); 

app.get('/login', function (req, res) { 

    res.render('login',{

        title: "Login",
        headingInfo : "Login Page"

    }); 

}); 

app.get("/rooms",(req,res)=>{

    const prodDB= [];

    prodDB.push({prodImg: 'img/forrent-1', prodTitle: 'Room for rent', prodDesc:'Sun-filled spacious single-bedroom room for rent', Rate:`649.99`});

    prodDB.push({prodImg: 'img/forrent-2', prodTitle: 'House for rent', prodDesc:'Tuscan-inspired house for rent', Rate:`749.99`});

    prodDB.push({prodImg: 'img/forrent-3', prodTitle: 'Rooms for rent', prodDesc:'Chic 3-bedroom house for rent', Rate:`849.99`});

    prodDB.push({prodImg: 'img/forrent-4', prodTitle: 'Tree house for rent', prodDesc:'Treehouse in the jungle for rent', Rate:`949.99`});

    prodDB.push({prodImg: 'img/forrent-5', prodTitle: 'Room for rent', prodDesc:'Quaint room in the city for rent', Rate:`1049.99`});

    prodDB.push({prodImg: 'img/forrent-6', prodTitle: 'Room for rent', prodDesc:'Castle-like room for rent', Rate:`1149.99`});


    res.render("roomlisting",{
        title: "Rooms",
        headingInfo : "Room Listing Page",
        products : prodDB

    });
});

//Port creation

const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Web Server Started`);
});

