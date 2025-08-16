const express = require("express");
const authUser = require("../middlewares/auth.middlewares");
const chatController = require("../controllers/chat.controller")
const router = express.Router();

router.post("/", authUser, chatController.createchat)

module.exports = router;