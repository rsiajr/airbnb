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

// router.post('/login', function(req, res, next) {
//     if (!req.body.username || !req.body.password) {
//         return res.status(400).json({
//             message: 'Please fill out all fields'
//         });
//     }
    
// })(req, res, next);


app.get("/rooms",(req,res)=>{

    const prodDB= [];

    prodDB.push({img:'img/forrent-1.jpg',title:'Room for rent', desc:'Sun-filled spacious single-bedroom room for rent', rate:`649.99`});

    prodDB.push({img:'img/forrent-2.jpg',title:'House for rent',desc:'Tuscan-inspired house for rent',rate:`749.99`});

    prodDB.push({img:'img/forrent-3.jpg',title:'Rooms for rent',desc:'Chic 3-bedroom house for rent',rate:`849.99`});

    prodDB.push({img:'img/forrent-4.jpg',title:'Tree house for rent',desc:'Treehouse in the jungle for rent',rate:`949.99`});

    prodDB.push({img:'img/forrent-5.jpg',title:'Room for rent',desc:'Quaint room in the city for rent',rate:`1049.99`});

    prodDB.push({img:'img/forrent-6.jpg',title:'Room for rent',desc:'Castle-like room for rent',rate:`1149.99`});

    res.render("rooms",{
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

