const app =  require("./src/app");
require("dotenv").config();
const initSocketServer = require("./src/socket/server.socket");
const http = require("http")
const connectToDB = require("./src/db/db");
const httpServer = http.createServer(app);
connectToDB();
initSocketServer(httpServer);

httpServer.listen(3000, ()=>{
    console.log("Server is running on port 3000");
    
})