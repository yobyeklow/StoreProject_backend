const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:50,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
    },
    phone:{
        type:String,
        required:true,
    },
    hash_password:{
        type:String,
        required:true,
    }
})

userSchema.methods = {
    authenticate: async function(password) {
        return await bcrypt.compare(password, this.hash_password);
    }
}
module.exports = mongoose.model('User',userSchema);