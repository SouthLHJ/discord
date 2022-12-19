import express from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import account from "../../lib/account.js";
import relationship from "../../lib/relationship.js";
// .env 사용하기
dotenv.config();

const router = express.Router();

let user;
router.use(async(req,res,next)=>{
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
        // console.log(datas);
        if(datas.length !== 0){
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
                // console.log(data.socketId,data)
                const sendUser = await account.findOne({email : user.email})
                io.to(data.socketId).emit("add-friends",sendUser)
            }

            const rst = await relationship.create(relate)
            if(rst){
                return res.status(201).json({result : true, data : data})
            }

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
    // 웹소켓 불러오고
    const io = req.app.get("io");
    // console.log("목록 보내느 중", req.body.socketId)
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
                        oppe = await account.findOne({email : datas[i].user1 })
                        friends.push(oppe);
                        // 친구들 리스트에서 로그인 한 애들한테 신호 줘야함..!! 온라인이라고..
                        // 친구들 소켓 값 있는지 확인해서 소켓 통신 하기
                        if(oppe.socketId){
                            const newUser = await account.findOne({email : user.email});
                            newUser.socketId = req.body.socketId;
                            // console.log("ccc 정보",newUser)
                            io.to(oppe.socketId).emit("login-friends",newUser)
                        }
                        break;
                    case 3 : 
                        oppe = await account.findOne({email : datas[i].user1 })
                        close.push(oppe);
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
                        oppe = await account.findOne({email : datas[i].user2 })
                        friends.push(oppe);
                        // 친구들 리스트에서 로그인 한 애들한테 신호 줘야함..!! 온라인이라고..
                        // 친구들 소켓 값 있는지 확인해서 소켓 통신 하기
                        const newUser = await account.findOne({email : user.email});
                        newUser.socketId = req.body.socketId;
                        // console.log("ccc 정보",newUser)
                        if(oppe.socketId){
                            io.to(oppe.socketId).emit("login-friends",newUser)
                        }
                        break;
                    case 3 : 
                        oppe = await account.findOne({email : datas[i].user2 })
                        close.push(oppe);
                        break;

                }
            }
        }
       

        return res.status(200).json({result : true, datas : {friends,send,receive,close}})
    }catch(e){
        return res.status(200).json({result : false, error : e.message})
    }

})

// 친구요청 수락
router.post("/apply",async(req,res)=>{
    try{
        const user2 = req.body.user2;
        const rst = await relationship.findOneAndUpdate({user2 : user.email, user1 : user2},{type : 2},{returnDocument : "after"})
        
        // 요청을 받은 사람의 소켓 아이디를 찾는다.
        const user2Data = await account.findOne({email: user2})
        // 있으면, 온라인 상태.
        if(user2Data.socketId){
            //웹소켓 서버 불러오고
            const io = req.app.get("io");
            // console.log(data.socketId,data)
            const sendUser = await account.findOne({email : user.email})
            io.to(user2Data.socketId).emit("apply-friends",sendUser)
        }
        return res.status(200).json({result : true, datas : rst})
        
    }catch(e){
        return res.status(200).json({result : false, error : e.message})
    }
})

// 친구요청 취소
router.post("/cancel",async(req,res)=>{
    try{
        const user2 = req.body.user2;
        const rst = await relationship.findOneAndDelete({user1 : user.email, user2 : user2})
        // 요청을 받은 사람의 소켓 아이디를 찾는다.
        const user2Data = await account.findOne({email: user2})
        // console.log(user2,user2Data)
        // 있으면, 온라인 상태.
        if(user2Data.socketId){
            //웹소켓 서버 불러오고
            const io = req.app.get("io");
            const sendUser = await account.findOne({email : user.email})
            // console.log(user2Data.socketId,sendUser)

            io.to(user2Data.socketId).emit("cancel-friends",sendUser)
        }
        return res.status(200).json({result : true})
    }catch(e){
        return res.status(200).json({result : false, error : e.message})
    }
})

// 친구요청 거절
router.post("/deny",async(req,res)=>{
    try{
        const user2 = req.body.user2;
        const rst = await relationship.findOneAndDelete({user2 : user.email, user1 : user2})
        // console.log(rst)
        // 요청을 보낸 사람의 소켓 아이디를 찾는다.
        const user2Data = await account.findOne({email: user2})
        // 있으면, 온라인 상태.
        if(user2Data.socketId){
            //웹소켓 서버 불러오고
            const io = req.app.get("io");
            // console.log(data.socketId,data)
            const sendUser = await account.findOne({email : user.email})
            io.to(user2Data.socketId).emit("deny-friends",sendUser)
        }

        return res.status(200).json({result : true})
    }catch(e){
        return res.status(200).json({result : false, error : e.message})
    }
})


export default router;