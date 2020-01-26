//Require Express and Handlebars

const express = require('express'); 
const exphbs = require('express-handlebars'); 

//Invoke express

const app = express(); 

//Create engines

app.engine('handlebars', exphbs()); 
app.set('view engine', 'handlebars'); 
app.use(express.static('public')); 

//Request and Response

app.get('/', function (req, res) { 

    res.render('home'); 

    res.send("Home Page"); 

}); 

app.get('/reg', function (req, res) { 

    res.render('reg'); 

    res.send("Registration Page"); 

}); 

app.get('/rooms', function (req, res) { 

    res.render('roomlisting'); 

    res.send("Rooms Listing Page"); 

}); 


//Port creation

const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Web Server Started`);
});
