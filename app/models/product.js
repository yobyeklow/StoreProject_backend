const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    image:String,
    updatedAt:{
        type:Date,
        default:Date.now,
    }
})
module.exports = mongoose.model('Product',productSchema);