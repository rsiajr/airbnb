//Require Express and Handlebars

const express = require('express'); 
const exphbs = require('express-handlebars'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config({path:"./config/keys.env"});

//Invoke express

const app = express(); 

//To customize CSS per handlebar

app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' })); 
app.set('view engine', 'handlebars'); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ extended: false })) 

//Mongoose code
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to MongoDB Database`);
})
.catch(err=>console.log(`Error occured when connecting to the database ${err}`));


//Load controllers

const generalController = require("./controllers/general");
const productController = require("./controllers/product");

//Map each controller to the app object
app.use("/",generalController);
app.use("/products",productController);

//Port creation

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Web Server Started`);
});

