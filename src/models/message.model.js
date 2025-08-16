const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "user",
    },
    chat:{
        type: mongoose.Schema.ObjectId,
        ref: "chat"
    },
    content: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "model", "system"],
        default: "user"
    },
})

const messageModel = mongoose.model("message", messageSchema);

module.exports = messageModel;