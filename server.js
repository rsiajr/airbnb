//Require Express and Handlebars

const express = require('express'); 
const exphbs = require('express-handlebars'); 

//Invoke express

const app = express(); 

//Create engines

app.engine('handlebars', exphbs({ defaultLayout: 'main' })); 
app.set('view engine', 'handlebars'); 
app.use(express.static('public')); 

//Request and Response

app.get('/', function (req, res) { 

    res.render('home'); 

}); 

app.get('/reg', function (req, res) { 

    res.render('reg'); 

}); 

app.get('/rooms', function (req, res) { 

    res.render('roomlisting'); 

}); 


//Port creation

const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Web Server Started`);
});
