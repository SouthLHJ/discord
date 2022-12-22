import express from "express";
import jwt from "jsonwebtoken";
import account from "../../lib/account.js";
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
        console.log("channels use",e.message)
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

        await relationship.findOneAndUpdate({$or : [{user1 : user.email, user2 : req.body.user2},{user1 : req.body.user2, user2: user.email}]},{channel : rst._id})

        if(rst){
            const io = req.app.get("io");
            const user2 = await account.findOne({email : req.body.user2})
            io.to(user2.socketId).emit("new-direct", rst)
        }


        return res.status(201).json({result : true, datas : rst})
    }catch(e){
        return res.status(422).json({result : false, error : e.message})
    }

})

// 다이렉트 채널 찾기
router.post("/isdirect",async(req,res)=>{
    try{
        // 계정과 관계가 되어있는 사람들 중에, 채널이 있는지 확인한다.
        const datas = await relationship.find({$or : [{user1: user.email},{user2: user.email}]})
        console.log(datas)
        const channelList =[];
        for(let i=0; i<datas.length; i++){
            if(datas[i]?.channel){
                const chan = await channel.findOne({_id : datas[i]?.channel})                
                channelList.push(chan)
            }
        }
        // console.log(channelList)
        return res.status(201).json({result : true, datas : channelList})
    }catch(e){
        return res.status(422).json({result : false, error : e.message})
    }
})

// 메세지 등록
router.post("/:channel/message", async(req,res)=>{
    const channel = req.params.channel;
    try{
    
        const newChat = {
            channel : channel,
            author : user.email,
            content : req.body.content,
            timeStamp : Date.now()
        }
        const rst = await chat.create(newChat)
        
        const io = req.app.get("io");
        // 서버에 만들어놓은 채널 방에 있는 소켓 유저들에게 생성된 메세지 전송
        // console.log(io.in(channel))
        io.in(channel).emit("new-message", rst);

        return res.status(201).json({result : true, datas : rst})
    }catch(e){
        return res.status(422).json({result : false, error : e.message})
    }

})

// 메세지 로그
router.post("/:channel/message-log",async(req,res)=>{
    const channel = req.params.channel;
    const skip = req.body.skip;
    // console.log(channel)
    try{
        const datas = await chat.find({channel : channel}).sort("-timeStamp").skip(skip).limit(50).lean();

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