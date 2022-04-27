const Product= require("../models/product");
const filesystem = require("fs");


exports.getProduct = async function(req,res,next){
    const id = req.params.id;
    console.log(id);
    try{
        const result = await Product.findById(id);
        res.status(201).json(result);
    }catch(err){
        res.status(400).json(err);
    }
}
exports.getAllProduct = async function(req,res,next){
    try{
        const products= await Product.find();
        res.status(201).send(products);
    }
    catch(err)
    {
        res.status(400).json({message:err.message})
    }
}
exports.addProduct = async function (req,res,next){
    const product = req.body;
    const imagename = req.file.filename;
    product.image = imagename;
    try{
        await Product.create(product);
        res.status(201).json({message:"Product created successfully"});
    }
    catch(err){
        res.status(401).json({message:err.message});
    }
}
exports.deleteProduct = async function(req,res,next){
    const id = req.params.id;
    try{
        const result = await Product.findByIdAndDelete(id);
        if (result.image != ''){
            try{
                filesystem.unlinkSync("./app/upload/"+result.image);
            }
            catch(err){
                console.log (err);
            }
        }
        res.status(200).json({message:"Deleted successfully"});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
}
exports.updateProduct = async function(req,res,next){
    const id = req.params.id;
    var newImage = "";
    if(req.file){
        newImage = req.file.filename;
        try{
            const result = await Product.findById(id);
            filesystem.unlinkSync("./app/upload/"+result.image);
        }
        catch(err){
            res.status(400).json({message:err.message});
        }
    }
    const newProduct = req.body;
    newProduct.image = newImage;

    try{
        await Product.findByIdAndUpdate(id,newProduct);
        res.status(201).json({message:"Updated successfully"});
    }
    catch(err)
    {
        res.status(400).json({message:err.message});
    }
}
