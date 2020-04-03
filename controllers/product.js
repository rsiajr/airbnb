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

// router.get("/productAdd", function (req, res) { 

//   res.render("products/productAdd",{

//       title: "Product Add Form",
//       headingInfo : "Add Product Page",

//   }); 

// }); 


// router.post("/productAdd",(req,res)=>{

//   res.render("products/productAdd",{
  
//   })

// });

module.exports = router;