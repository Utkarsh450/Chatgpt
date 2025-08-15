const mongoose = require("mongoose");

async function connectToDB(){

    mongoose.connect("mongodb://127.0.0.1:27017/cohortGPT")
    .then(()=>{
        console.log("connected to db");
        
    }).catch((err)=>{
        console.log(err);
        
    })
}

module.exports = connectToDB;