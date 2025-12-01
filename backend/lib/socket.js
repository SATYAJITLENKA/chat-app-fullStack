import { Server } from "socket.io";
import http from "http";
import express from "express";


const app = express();
const server = http.createServer(app);


const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["*"]  
    : ["http://localhost:5173"]; 

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true
    }
})


export function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}

//used to store online users
const userSocketMap = {}; // { usetId : socketId}





io.on("connection", (socket) => {
    console.log("A user is connected", socket.id);

    const userId = socket.handshake.query?.userId;
    console.log("userId from socket", userId)

    if (userId) {
        userSocketMap[userId] = socket.id;
        //is used to send event to 
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    }

    socket.on("disconnect", () => {
        console.log("A user is disconnectd", socket.id);
        if (userId) {
            delete userSocketMap[userId]
            io.emit("getOnlineUsers", Object.keys(userSocketMap))
        }

    })
})



export { io, server, app }