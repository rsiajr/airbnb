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

    res.render('home',{

        title: "Home",
        style: "home.css"

    }); 

}); 

app.get('/reg', function (req, res) { 

    res.render('reg',{

        title: "Registration",
        style: "registration.css"

    });  

}); 

app.get('/rooms', function (req, res) { 

    res.render('roomlisting',{

        title: "Rooms",
        style: "listing.css"

    }); 

}); 

app.get('/', function (req, res) { 

    res.render('main',{

        title: "Main",
        style: "main.css"

    }); 

}); 

//Port creation

const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Web Server Started`);
});

