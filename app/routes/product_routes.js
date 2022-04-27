const express = require("express");
const Product = require("../controller/product");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './app/upload')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+'.png'
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage }).single("image")
const {verifyTokenAndAuthorizaiton} = require("../routes/verifyToken");
module.exports = (app)=>{
    const router = express.Router();
    router.get("/items/:id",Product.getProduct);
    router.get("/items",Product.getAllProduct);
    router.post("/items/create",verifyTokenAndAuthorizaiton,upload,Product.addProduct);
    router.delete('/items/:id',verifyTokenAndAuthorizaiton,Product.deleteProduct);
    router.put("/items/:id",upload,verifyTokenAndAuthorizaiton,Product.updateProduct);
    app.use("/api",router);
}