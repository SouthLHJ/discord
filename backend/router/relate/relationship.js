import express from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import account from "../../lib/account.js";
import relationship from "../../lib/relationship.js";
// .env 사용하기
dotenv.config();

const router = express.Router();

let user;
router.use((req,res,next)=>{
    const token = req.body.token;
    const data =jwt.verify(token,process.env.JWT_SECRET_KEY);
    user = data;
    next();
})

// 친구 추가 요청
router.post("/send",async(req,res)=>{
    // console.log(user);
    const data = await account.findOne({name : req.body.name})
    const id = req.body.id;
    const dataId = data._id.toString();
    // console.log(data,id, dataId.startsWith(id))
    if(user.email == data.email){
        return res.status(201).json({result : false, error : "본인에게는 요청할 수 없어요"})
    }
    if(data && dataId.startsWith(id)){
        // 이미 보낸 요청인지 확인하기
        const datas = await relationship.find({$or : [{user1:user.email,user2:data.email},{user1: data.email,user2 :user.email}]})
        if(datas){
            return res.status(201).json({result : false, error : "이미 존재하는 요청입니다."})
        }else{
            const relate = {
                since : new Date(),
                type : 0,
                user1 : user.email,
                user2 : data.email,
                createdAt : new Date(),
            }
            
            // 요청을 받은 사람의 소켓 아이디를 찾는다.
            if(data.socketId){
                //웹소켓 서버 불러오고
                const io = req.app.get("io");
                io.to(data.socketId).emit("add-friends",data)
            }

            const rst = await relationship.create(relate)
            return res.status(201).json({result : true, data : rst})

        }


    }else{
        if(!data){
            return res.status(200).json({result : false, error : "없는 정보 요청 실패"})
        }else{
            return res.status(200).json({result : false, error : "없는 정보 요청 실패"})
        }
    }

})


// 친구 목록 보내주기
router.post("/list",async(req,res)=>{
    const email = user.email;
    // user1 이나 user2에서 찾을 수 있게.
    try{
        const datas = await relationship.find({$or : [{user1:email},{user2 :email}]})
        let friends= [];
        let send=[];
        let receive=[];
        let close=[];
        for(let i=0; i<datas.length;i++){
            let oppe;
            // user1 기준인데. user랑 다른 값일 경우에는 바꿔서 생각해야함.
            if(datas[i].user1 != user.email){
                switch(datas[i].type){
                    case 0 : 
                    // 원래는 0이 보낸 요청이지만, 기준값이 다르므로, 받은 곳에 저장해야함
                        oppe = await account.findOne({email : datas[i].user1 })
                        receive.push(oppe);
                        break;
                    case 1 : 
                        oppe = await account.findOne({email : datas[i].user1 })
                        send.push(oppe);
                        break;
                    case 2 : 
                        friends.push(datas[i]);
                        break;
                    case 3 : 
                        close.push(datas[i]);
                        break;

                }
            }else{
                switch(datas[i].type){
                    case 0 : 
                        oppe = await account.findOne({email : datas[i].user2 })
                        send.push(oppe);
                        break;
                    case 1 : 
                        oppe = await account.findOne({email : datas[i].user2 })
                        receive.push(oppe);
                        break;
                    case 2 : 
                        friends.push(datas[i]);
                        break;
                    case 3 : 
                        close.push(datas[i]);
                        break;

                }
            }
        }
        return res.status(200).json({result : true, datas : {friends,send,receive,close}})
    }catch(e){
        return res.status(200).json({result : false, error : e.message})
    }

})

export default router;