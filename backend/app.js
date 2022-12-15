import express  from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
const __dirname = path.resolve();

import AuthRouter from "./router/auth/auth.js"
import RelateRouter from "./router/relate/relationship.js"


const app = express();

// 클라이언트에서 받는거 cors 처리하기
app.use(cors());
// post 로 받는 body 받기
app.use(express.json()); 
// static 이미지 경로 설정
app.use("/static",express.static(path.join(__dirname,"static")))

// 경로 설정
app.use("/auth",AuthRouter)
app.use("/relation",RelateRouter)

app.listen(8080,()=>{
    console.log("server open")
})


!async function(){
    dotenv.config({path : `${process.cwd()}/.env`});
    const uri = process.env.MONGODB_URI;
    // console.log(uri)
    await mongoose.connect(uri, {dbName : "DisordC"})
}();