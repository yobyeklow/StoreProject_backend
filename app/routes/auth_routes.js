const express = require("express");
const user = require("../controller/auth");
const {RegisterValidator,LoginValidator} = require("../validators/validators");
module.exports = app=>{
    const router = express.Router();

    router.post('/user/register',RegisterValidator,user.signup);
    router.post('/user/login',LoginValidator,user.signin);

    // router.get('/',user.find);

    // router.get('/:id',contacts.findOne);

    // router.put('/:id',contacts.update);

    // router.delete('/:id',contacts.delete);

    // router.delete('/',contacts.deleteAll);

    app.use("/api",router);
};