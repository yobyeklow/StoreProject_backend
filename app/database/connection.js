const mongoose = require("mongoose");

const database = async function(){
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log(`MongoDB connected:${connect.connection.host}`);
    }
    catch(err){
        console.log("Cannot connect to the database!", error);
        process.exit(1);
    }
}

module.exports = database;