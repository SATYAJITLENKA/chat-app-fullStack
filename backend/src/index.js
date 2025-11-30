import express from "express"
import dotenv from "dotenv"
import authroutes from "../routes/auth.route.js"
import meaageRoutes from "../routes/message.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { server , app , io } from "../lib/socket.js"
import path from "path"

dotenv.config({})

// const app = express()
const PORT = process.env.PORT ;
const __dirname = path.resolve()
import { connectdb } from "../lib/db.js"

app.use(express.json({ limit: "20mb" }))
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use("/api/auth" , authroutes)
app.use("/api/message" , meaageRoutes)

if(process.env.NODE_ENV === "production"){
 app.use(express.static(path.join(__dirname , "../frontend/dist")));

 app.get("*" , (req, res)=>{
    res.sendFile(path.join(__dirname , "../frontend" , "dist" , "index.html"))
 })
}

server.listen(PORT , ()=>{
    console.log("Server is running on the port " + PORT);
    connectdb();
})