const express=require("express");
const router=express.Router();
const isloggedin=require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");
const userModel=require("../models/user-model");
router.get("/", function(req, res){
    res.render("index", { error: "" });
});

router.get("/shop", isloggedin,async function(req,res){
    let products=await productModel.find();
    res.render("shop",{products});
});

router.get("/cart", isloggedin,async function(req,res){
    let user=await userModel.findOne({email:req.user.email}).populate("cart");

    const bill= Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);
    res.render("cart",{ user, bill });
});

router.get("/addtocart/:id", isloggedin,async function(req,res){
  let user=await userModel.findOne({email:req.user.email});
  user.cart.push(req.params.id);
  await user.save();
   res.redirect("/cart");
});


module.exports=router;