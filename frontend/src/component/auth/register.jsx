import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomColor } from "../../customs/colors";
import { InputField, SelectField } from "./inputfield";
import styles from  "./register.module.css";

const Register = ()=>{
    const navigator = useNavigate();

    const [email, setEmail]=useState("");
    const [emailerr, setEmailerr] =useState(null);
    const [name, setName]=useState("");
    const [pw, setPw]=useState("");
    const [birthY, setBirthY]=useState(0);
    const [birthM, setBirthM]=useState(0);
    const [birthD, setBirthD]=useState(0);
    const [chk1, setChk1] = useState(false);
    const [chk2, setChk2] = useState(false);
    const ref= useRef();

    //func
    const onLogin= async()=>{
        navigator("/auth/login")
    }
    
    const onRegister = async()=>{
        if(!email || !pw || !name || !birthY || !birthM || !birthD ){
            return
        }
        const rcv = await fetch(`${process.env.REACT_APP_SERVER_URI}/auth/register`,{
            method : "post",
            body : JSON.stringify({
                email,
                name,
                pw,
                birth : new Date(`${birthY}-${birthM}-${birthD}`)
            }),
            headers : {
                "content-type" : "application/json"
            }
        })
        const rst = await rcv.json();
        
        if(rst.result){
            ref.current.style.setProperty("animation", "fadeout 0.5s")
            const time = setTimeout(()=>{
                console.log("??")
                navigator("/auth/login");
            },400)
            return ()=>{
                clearTimeout(time);
            }
        }else{
            if(rcv.status == 201){
                console.log(rst.error)
                setEmailerr(rst.error);
            }else{
                console.log("/auth/register onRegister server Error : ", rst.error)
            }
        }
        
    }
    
    //년도
    const year = [];
    for(let i=new Date().getFullYear(); i>=1870 ; i--){
        year.push(
            <MenuItem key={`year${i}`} value={i} sx={{backgroundColor :CustomColor.darkgray, color: "lightgray"}}>{i}</MenuItem>
        );
    }
    const month = [];
    for(let i=12; i>0 ; i--){
        month.push(
            <MenuItem key={`month${i}`} value={i} sx={{backgroundColor :CustomColor.darkgray, color: "lightgray"}}>{i}</MenuItem>
        );
    }
    const date = [];
    for(let i=31; i>0 ; i--){
        date.push(
            <MenuItem key={`date${i}`} value={i} sx={{backgroundColor :CustomColor.darkgray, color: "lightgray"}}>{i}</MenuItem>
        );
    }

    return (
        <Box sx={{width :"100vw", height : "100vh", display :"flex", alignItems :"center", justifyContent :"center"}}>
            <Box
                className={styles.box}
                sx={{
                    animation : "fadein 0.5s"
                }}
                ref={ref}
            >
                <Box className={styles.title}>
                    <Box sx={{pb:"12px", display :"flex", flexDirection :"column", alignItems :"center"}}>
                        <text className={styles.title_text}>계정 만들기</text>
                    </Box>

                    <Box className={styles.email_box}>
                        <Typography sx={{color : "lightgray", fontSize : "13px", fontWeight : "bold", pb:"12px"}}>이메일</Typography>
                        <InputField
                            sx={{width:"100%"}}
                            value={email}
                            onChange={(e)=>{
                                if(e.target.value){
                                    setEmail(e.target.value)
                                }else{
                                    setEmail("")
                                }
                            }}
                            error={emailerr}
                        />
                        {   emailerr &&
                            <Typography sx={{color : CustomColor.error, fontSize : "13px", fontWeight : "bold"}}>{emailerr}</Typography>
                        }
                    </Box>

                    <Box className={styles.name_box}>
                        <Typography sx={{color : "lightgray", fontSize : "13px", fontWeight : "bold", pb:"12px"}}>사용자명</Typography>
                        <InputField
                            sx={{width:"100%"}}
                            value={name}
                            onChange={(e)=>{
                                if(e.target.value){
                                    setName(e.target.value)
                                }else{
                                    setName("")
                                }
                            }}
                        />
                    </Box>
                    
                    <Box className={styles.pw_box}>
                        <Typography sx={{color : "lightgray", fontSize : "13px", fontWeight : "bold", pb:"12px"}}>비밀번호</Typography>
                        <InputField
                            sx={{width:"100%"}}
                            value={pw}
                            onChange={(e)=>{
                                if(e.target.value){
                                    setPw(e.target.value)
                                }else{
                                    setPw("")
                                }
                            }}
                        />
                    </Box>

                    <Box className={styles.birth_box}>
                        <Typography sx={{color : "lightgray", fontSize : "13px", fontWeight : "bold", pb:"12px"}}>생년월일</Typography>
                        <FormControl className={styles.formControl} sx={{mr : "12px"} } variant="standard">
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                value={birthY}
                                onChange={(e)=>setBirthY(e.target.value)}
                                input={<SelectField />}
                                MenuProps={{
                                    sx:{
                                        height : "30%",
                                    },
                                    MenuListProps : {
                                        sx: {backgroundColor : CustomColor.darkgray}
                                    }
                                }}
                            >
                                <MenuItem value={0} sx={{backgroundColor :CustomColor.darkgray, color: "lightgray"}}>년</MenuItem>
                                {
                                   year
                                }
                            </Select>
                        </FormControl>

                        <FormControl className={styles.formControl} sx={{mr : "12px"} } variant="standard">
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                value={birthM}
                                onChange={(e)=>setBirthM(e.target.value)}
                                input={<SelectField />}
                                MenuProps={{
                                    sx:{
                                        height : "30%",
                                    },
                                    MenuListProps : {
                                        sx: {backgroundColor : CustomColor.darkgray}
                                    }
                                }}
                            >
                                <MenuItem value={0} sx={{backgroundColor :CustomColor.darkgray, color: "lightgray"}}>월</MenuItem>
                                {
                                   month
                                }
                            </Select>
                        </FormControl>

                        <FormControl className={styles.formControl_end} variant="standard">
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                value={birthD}
                                onChange={(e)=>setBirthD(e.target.value)}
                                input={<SelectField />}
                                MenuProps={{
                                    sx:{
                                        height : "30%",
                                    },
                                    MenuListProps : {
                                        sx: {backgroundColor : CustomColor.darkgray}
                                    }
                                }}
                            >
                                <MenuItem value={0} sx={{backgroundColor :CustomColor.darkgray, color: "lightgray"}}>일</MenuItem>
                                {
                                   date
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{width : "100%", position : "absolute", bottom :0, padding : "24px", display:"flex", flexDirection : "column", alignItems :"center"}}>
                        <Box className={styles.button_box}
                            onClick={()=>onRegister()}    
                        >
                            <Typography>계속하기</Typography>
                        </Box>

                        <Box 
                            onClick={()=>onLogin()}
                            sx={{pt : "12px"}}   
                        >
                            <Typography sx={{color :"#b2aafa", cursor :"pointer"}}>이미 계정이 있으신가요?</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box>

                </Box>
            </Box>
        </Box>
    );
}

export default Register