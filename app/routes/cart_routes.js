const express = require("express");
const Cart = require("../controller/cart");
const {verifyToken} = require("../routes/verifyToken");
module.exports = (app)=>{
    const router = express.Router();
    router.post("/cart/addtocart",verifyToken,Cart.addItemToCart);
    router.get("/cart/",verifyToken,Cart.getCartItems);
    router.post("/cart/delete",verifyToken,Cart.deleteCart);
    router.get("/cart/money",verifyToken,Cart.totalPrice);
    app.use("/api",router);
}