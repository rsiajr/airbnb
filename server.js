//Require Express and Handlebars

const express = require('express'); 
const exphbs = require('express-handlebars'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const session = require('express-session');

require('dotenv').config({path:"./config/keys.env"});

//Load controllers

const generalController = require("./controllers/general");
const productController = require("./controllers/product");
const taskController = require("./controllers/task");
const userController = require("./controllers/user");


//Invoke express

const app = express(); 

//bodyParser middleware
app.use(bodyParser.urlencoded({extended:false}));


//express static middleware
app.use(express.static('public')); 

//To customize CSS per handlebar

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })) 

//Handlebars middlware
app.engine('handlebars', exphbs({ defaultLayout: 'main' })); 
app.set('view engine', 'handlebars'); 


//custom middleware functions
app.use((req,res,next)=>{

    if(req.query.method=="PUT")
    {
        req.method="PUT"
    }

    else if(req.query.method=="DELETE")
    {
        req.method="DELETE"
    }

    next();
})

app.use(fileUpload());

app.use(session({secret: `${process.env.SESSION_SECRET}` , resave: false,saveUninitialized: true}))

app.use((req,res,next)=>{

    res.locals.user = req.session.user;
    next();

});


//Map each controller to the app object
app.use("/",generalController);
app.use("/user",userController);
app.use("/products",productController);
app.use("/task",taskController);
app.use("/",(req,res)=>{
    res.render("General/404");
});


//Mongoose code
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to MongoDB Database`);
})
.catch(err=>console.log(`Error occured when connecting to the database ${err}`));

//Port creation

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Web Server Started`);
});

