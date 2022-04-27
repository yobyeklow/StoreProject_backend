const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
    const authHeader = req.cookies.token;
    if(authHeader){
        jwt.verify(authHeader,process.env.TOKEN_JWT,(err,user)=>{
            if(err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });

    }else{
        return res.status(401).json("You are not authentication");
    }
}
const verifyTokenAndAuthorizaiton = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id ||req.user.role ==="admin"){
            next();
        }
        else{
            res.status(403).json("You are not allow do that!");
        }
    })
}
module.exports={verifyToken,verifyTokenAndAuthorizaiton};