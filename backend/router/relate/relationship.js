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
        const relate = {
            since : new Date(),
            type : 0,
            user1 : user.email,
            user2 : data.email,
            createdAt : new Date(),
        }

        const rst = await relationship.create(relate)
        return res.status(201).json({result : true, data : rst})
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
    const datas = await relationship.find({$or : [{user1:email},{user2 :email}]})


})

export default router;