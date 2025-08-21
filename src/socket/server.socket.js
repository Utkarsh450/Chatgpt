const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const aiService = require("../services/ai.service");
const messageModel = require("../models/message.model");
const { createMemory, queryMemory } = require("../services/vector.service");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {});

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

    if (!cookies.token) {
      next(new Error("Authentication error: No token provided"));
    }

    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);

      const user = await userModel.findById(decoded.id);

      socket.user = user;

      next();
    } catch (err) {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("ai-message", async (messagePayload) => {
   /*   const message = await messageModel.create({
        chat: messagePayload.chat,
        user: socket.user._id,
        content: messagePayload.content,
        role: "user",
      });

      const vectors = await aiService.generateVector(messagePayload.content);
      console.log("Vectors generated", vectors); */

      const [ message, vectors ] = await Promise.all([ // now they will start at the same time
         messageModel.create({
        chat: messagePayload.chat,
        user: socket.user._id,
        content: messagePayload.content,
        role: "user",
      }),
      aiService.generateVector(messagePayload.content),
        createMemory({
        vectors,
        messageId: message._id,
        metadata: {
          chat: messagePayload.chat,
          user: socket.user._id,
        },
      })
      ])

    /*  const memory = await queryMemory({
        queryVector: vectors,
        limit: 3,
        metadata: {},
      });

//       // vectors = embedding of the current message.

// The vector DB finds the most similar past messages (based on cosine similarity or dot product).

// You only pull top limit: 3 closest matches.

// These matches are not from the last 20 messages only — they could be from weeks/months ago, as long as they’re stored.

// This makes your bot “remember” old conversations beyond the short chat history.

      const chatHistory = await messageModel
        .find({
          chat: messagePayload.chat,
        })
        .sort({ createdAt: -1 })
        .limit(20)
        .lean(); */
        const [memory, chatHistory] = await Promise.all([
          queryMemory({
        queryVector: vectors,
        limit: 3,
        metadata: {
          user: socket.user._id
        },
      }),
      messageModel
        .find({
          chat: messagePayload.chat,
        })
        .sort({ createdAt: -1 })
        .limit(20)
        .lean()

        ])

      const stm = chatHistory.map((item) => {
        return {
          role: item.role,
          parts: [{ text: item.content }],
        };
      });
      const ltm = [
        {
          role: "user",
          parts: [
            {
              text: `

                        these are some previous messages from the chat, use them to generate a response

                        ${memory.map((item) => item.metadata.text).join("\n")}
                        
                        `,
            },
          ],
        },
      ];

      console.log(ltm[0]);
      console.log(stm);

      const response = await aiService.main([...ltm, ...stm] // here we used ltm, stm together as telling the ai that these are my ltm messages use them too
      );

   /*   const responseMessage = await messageModel.create({
        chat: messagePayload.chat,
        user: socket.user._id,
        content: response,
        role: "model",
      });

      const responseVectors = await aiService.generateVector(response); */
      const [responseMessage, responseVectors] = await Promise.all([
messageModel.create({
        chat: messagePayload.chat,
        user: socket.user._id,
        content: response,
        role: "model",
      }),
      aiService.generateVector(response)
      ])

      await createMemory({
        vectors: responseVectors,
        messageId: responseMessage._id,
        metadata: {
          chat: messagePayload.chat,
          user: socket.user._id,
        },
      });

      socket.emit("ai-response", {
        content: response,
        chat: messagePayload.chat,
      });
    });
  });
}

module.exports = initSocketServer;
