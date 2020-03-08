//Require Express and Handlebars

const express = require('express'); 
const exphbs = require('express-handlebars'); 
const bodyParser = require('body-parser');
require('dotenv').config({path:"./config/keys.env"});

//Invoke express

const app = express(); 

//To customize CSS per handlebar

app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' })); 
app.set('view engine', 'handlebars'); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ extended: false })) 

//Load controllers

const generalController = require("./controllers/general");
const productController = require("./controllers/product");

//Map each controller to the app object
app.use("/",generalController);
app.use("/products",productController);

//Port creation

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Web Server Started`);
});

