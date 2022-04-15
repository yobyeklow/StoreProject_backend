const User = require("../models/user");

exports.RegisterValidator = function(req,res,next){
    req.check('email','Email không đúng').isEmail();
    req.check('email','Email bị bỏ trống').not().isEmpty();
    // req.check('firstname','Tên không được bỏ trống').not().isEmpty();
    // req.check('firstname','Tên không được ít hơn 3 chữ').isLength({min:3});
    // req.check('firstname','Tên không được nhiều hơn 20 chữ').isLength({max:20});
    // req.check('lastname','Họ không được bỏ trống').not().isEmpty();
    // req.check('lastname','Họ không được ít hơn 3 chữ').isLength({min:3});
    // req.check('lastname','Họ không được nhiều hơn 20 chữ').isLength({max:20});
    req.check('password', 'Mật khẩu không được bỏ tróng.').not().isEmpty();
    req.check('password', 'Mật khẩu phải nhiều hơn 6 kí tự').isLength({min:6});

    const errors = req.validationErrors();
    if(errors){
        const listError = errors.map(function(err){
            return  err.param + ":" + err.msg;
        })
        return res.status(400).json({listError});
    }
    next();
}

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