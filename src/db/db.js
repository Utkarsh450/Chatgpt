const mongoose = require("mongoose");

async function connectToDB(){
    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to db");
    }
    catch(err){
        console.log("Error connecting db");
        
    }
    
}

module.exports = connectToDB;