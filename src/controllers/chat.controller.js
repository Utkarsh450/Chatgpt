const chatModel = require("../models/chat.model")

async function createchat(req, res){
    const { title } = req.body;
    const user = req.user;

    const chat = await chatModel.create({
        user: user._id,
        title,
    })

    res.status(201).json({
        message:"Chat created success"
    })
}


module.exports = {createchat};