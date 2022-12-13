import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
// .env 사용하기
dotenv.config();

const router = express.Router();


// 로그인
router.post("/login",async(req,res)=>{
    // console.log(req.body);

    try{
        // 로그인 이력 체크
        // const data = await User.find 
        let data = {email : "abc", name :"choco"}

        // 비밀번호 체크
        const savepw = "1234";
        const chk = bcrypt.compareSync(savepw,"$2a$12$gBBtwEQv50mfloYMUlSoz.HzwOjp5UhjYh6b6ZZRRMCLCr8QZ3t26")
        // console.log(chk)

        // 일치하면
        if(chk){
            const token = jwt.sign({email : data.email, name : data.name},process.env.JWT_SECRET_KEY,{expiresIn : "2 days"})   
            return res.status(200).json({result : true, data : token})
        }else{
            return res.status(422).json({result : false, error : "password error"})
        }
    }catch(e){

        return res.status(200).json({result : false, error : e.message})
    }

})

// 회원가입
router.post("/register",(req,res)=>{
    // console.log(req.body);
    try{
        
        // password만
        const hashedPW = bcrypt.hashSync(req.body.password,12);
        console.log(hashedPW);
    
        return res.status(200).json({result : true})
    }catch(e){
        return res.status(200).json({result : false, error : e.message})
    }
})





export default router;