const mongoose = require('mongoose');
const handlePromise = require("../helpers/promise_helper");
const User = require("../models/user");
const {BadRequestError} = require("../errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async function(req,res,next){
    console.log(req.body);
    User.findOne({email:req.body.email})
        .exec(async(error,document)=>{
            if(error){
                return res.status(403).json({
                    message:error
                })
            }
            if(document){
                return res.status(403).send({
                    message:"User already registered"
                })
            }
        })
    
    const hash_password = await bcrypt.hash(req.body.password,10);
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        hash_password:hash_password,  
    })
    console.log(user);
    const [error,document] = await handlePromise(user.save());
    if(error){
        return next(new BadRequestError(500,"An error occurred while creating the contact"));
    }
    if(document){
        return res.status(201).send({
            message:"User created successfully"
        });
    }

    return res.send(req.body);

}

exports.signin = async function(req,res,next){
    User.findOne({email:req.body.email})
        .exec(async function(err,user){
            if(err){
                return res.status(400).send({message:err});
            }
            if(!user){
                return res.send({message:"Email này chưa được đăng kí"});
            }
            const validPassword = await user.authenticate(req.body.password);
            if(validPassword&&(user.role=='user'||user.role=="admin")){
                const token = jwt.sign({id:user._id},process.env.TOKEN_JWT,{expiresIn:"10m"});
                res.header('auth-token',token).send(token);
            }
            else{
                return res.send("Sai mật khẩu");
            }
        })
}
