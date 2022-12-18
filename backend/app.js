import express  from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
const __dirname = path.resolve();

import AuthRouter from "./router/auth/auth.js"
import RelateRouter from "./router/relate/relationship.js"

//Socket io
import { createServer } from "http";
import { Server } from "socket.io";
import account from "./lib/account.js";

const app = express();
dotenv.config();
// 클라이언트에서 받는거 cors 처리하기
app.use(cors());
// post 로 받는 body 받기
app.use(express.json()); 
// static 이미지 경로 설정
app.use("/static",express.static(path.join(__dirname,"static")))

// 경로 설정
app.use("/auth",AuthRouter)
app.use("/relation",RelateRouter)

//Socket io를 사용하기위한 서버 오픈
const httpServer = createServer(app);
// app.listen(8080,()=>{
//     console.log("server open")
// })
//웹소켓 용 서버
const io = new Server(httpServer, {cors : {
    origin : process.env.CLIENT_URL//프론트 서버 주소 작성
}});
io.on("connection", async(socket) => {
    // console.log("클라측으로부터 연결 발생",socket.handshake.query, socket.id);
    const clientData = socket.handshake.query;
    const rcv = await account.findOneAndUpdate({email : clientData.email },{socketId : socket.id},{returnDocument : "after"})
    socket.on("disconnect",async()=>{
        await account.updateOne({email: clientData.email},{socketId : null})
    })
});
// listen 
httpServer.listen(8080);
// 어디에서든지 사용 할 수 있게 셋팅 해버리기.
app.set("io",io)

// DB 연결
!async function(){
    dotenv.config({path : `${process.cwd()}/.env`});
    const uri = process.env.MONGODB_URI;
    // console.log(uri)
    await mongoose.connect(uri, {dbName : "DisordC"})
}();