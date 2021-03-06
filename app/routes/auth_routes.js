const express = require("express");
const user = require("../controller/auth");
const {LoginValidator,isRequestValidated} = require("../validators/validators");


module.exports = app=>{
    const router = express.Router();
    
    router.post('/user/register',user.signup);
    router.post('/user/login',LoginValidator,isRequestValidated,user.signin);

    app.use("/api",router);
};