import express from "express";
import jwt from "jsonwebtoken";
import channel from "../../lib/channel.js";
import chat from "../../lib/chat.js";
import relationship from "../../lib/relationship.js";

const router = express.Router();

// 토큰 체크
let user;
router.use(async(req,res,next)=>{
    const token = req.body.token;
    try{
        const data =jwt.verify(token,process.env.JWT_SECRET_KEY);
        user = data;
        next();
    }catch(e){
        console.log(e.message)
    }
})

// 새로운 채널 생성
router.post("/new",async(req,res)=>{
    try{
        const data = {
            joiner : [user.email, req.body.user2],
            createdAt : Date.now()
        }
        const rst = await channel.create(data)

        return res.status(201).json({result : true, datas : rst})
    }catch(e){
        return res.status(422).json({result : false, error : e.message})
    }

})

// 다이렉트 채널 찾기
router.post("/isdirect",async(req,res)=>{
    try{
        const datas = await relationship.findOne({$or : [{user1: user.email,user2: req.body.user2},{user1: req.body.user2,user2: user.email}]})

        if(datas?.channel){
            return res.status(201).json({result : true, datas : datas.channel})
        }else{
            return res.status(201).json({result : true, datas : undefined})
        }
    }catch(e){
        return res.status(422).json({result : false, error : e.message})
    }
})

// 메세지 등록
router.post("/:channel/message", async(req,res)=>{
    const channel = req.params.channel;

    const newChat = {

    }
    try{
        const io = req.app.get("io");
        
        io.to(channel).emit("new-message", one);

        await chat.create({})

        return res.status(201).json({result : true, datas : datas})
    }catch(e){
        return res.status(422).json({result : false, error : e.message})
    }

})



export default router;

/*
    try{
        return res.status(201).json({result : true, datas : datas})
    }catch(e){
        return res.status(422).json({result : false, error : e.message})
    }
*/