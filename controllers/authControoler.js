const userModel=require("../models/user-model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {generateToken}=require("../utils/generateToken");

module.exports.registerUser = async function (req,res){
    try{
     let{email, password,fullname}=req.body;
     
     let user=await userModel.findOne({email: email});
     if(user) return res.status(401).send("you already have account, please login.");


     bcrypt.genSalt(10, function(err, salt){
         bcrypt.hash(password, salt, async function (err, hash) {
          if(err) return res.send(err.message);
          else{
             let user= await userModel.create({
        email,
        password: hash,
        fullname,
    });
    let token=generateToken(user);
    res.cookie("token",token);   
    res.send("user created succesfully");      
        }  
         });
     });
    res.send(user);
    } catch(err){
        console.log(err.message);
    }
    };

    
    module.exports.loginUser=async function (req,res){
      let{email,password}=req.body;
      let user=await userModel.findOne({email:email});  
      if(!user) return res.send("email or Password incorrect");  
      
      bcrypt.compare(password,user.password,function(err, result){
        if(result){
            let token=generateToken(user);
            res.cookie("token",token);
             return res.redirect("/shop");
        }
        else{
             req.flash("error", "Email or password incorrect");
                return res.redirect("/");
        }
      })
    };
 
    module.exports.logout = function (req, res) {
    // Clear JWT cookie
    res.clearCookie("token");

    // Optional flash message
    req.flash("success", "Logged out successfully");

    // Redirect to home / login page
    res.redirect("/");
};
