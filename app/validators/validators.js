const User = require("../models/user");
const { check, validationResult } = require('express-validator/check');

exports.LoginValidator = function(req,res,next){
    req.check('email','Email chưa đươc điền').not().isEmpty();
    req.check('email','Email không đúng định dạng').isEmail();
    req.check('password','Mật khẩu chưa dược điền').not().isEmpty();
    const errors = req.validationErrors();
    if(errors){
        const listError = errors.map(function(err){
            return  err.param + ":" + err.msg;
        })
        return res.status(400).json({listError});
    }
    next();
}
exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if( errors.array().length > 0) {
        return res.status(400).json({ errors: errors.array()[0].msg});
    }
    next();
}
