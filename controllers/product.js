const express = require('express'); 
const router = express.Router();

//Load the productModel
const productModel = require("../models/product.js")

router.get("/rooms",(req,res)=>{

    res.render("products/rooms",{
        title: "Rooms",
        headingInfo : "Room Listings Page",
        products: productModel.getAllProducts()
    });
});

module.exports = router;