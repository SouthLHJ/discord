import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import account from "../../lib/account.js";
// .env 사용하기
dotenv.config();

const router = express.Router();


// 로그인
router.post("/login",async(req,res)=>{
    console.log(req.body);
    try{
        // 가입 체크
        const user = await account.findOne({email : req.body.email})
        if(user){
            // 비밀번호 체크
            const savepw = req.body.pw;
            const chk = bcrypt.compareSync(savepw,user.pw)
            // console.log(chk)

            // 일치하면
            if(chk){
                const token = jwt.sign({email : user.email, name : user.name},process.env.JWT_SECRET_KEY,{expiresIn : "2 days"})   
                return res.status(200).json({result : true, data : token})
            }else{
                return res.status(200).json({result : false, error : "비밀번호를 확인해주세요"})
            }

        }else{
            return res.status(200).json({result : false, error : "이메일을 확인해주세요"})
        }
    }catch(e){

        return res.status(422).json({result : false, error : e.message})
    }

})

// 회원가입
router.post("/register",async(req,res)=>{
    // console.log(req.body);
    try{
        const emailchk = await account.findOne({email:req.body.email})
        if(emailchk){
            return res.status(201).json({result : false, error : "이미 사용 중인 이메일입니다."})
        }else{
            // password hash처리
            const hashedPW = bcrypt.hashSync(req.body.pw,12);
            const rst = await account.create({...req.body, pw : hashedPW})
            return res.status(201).json({result : true, data : rst})
        }
    }catch(e){
        return res.status(500).json({result : false, error : e.message})
    }
})





export default router;