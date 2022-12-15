import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../..";
import { CustomColor } from "../../customs/colors";
import { InputField } from "./inputfield";
import styles from  "./login.module.css";


const Login = ()=>{
    // 로그인 ctx
    const userCtx = useContext(UserContext)

    const [load , setLoad] = useState(false);
    const navigator = useNavigate();
    const [email, setEmail] = useState("");
    const [pw, setPW] = useState("");
    const [err, setErr] = useState(null);

    const ref = useRef();
    
    const onLogin= async()=>{
        if(!email || !pw ){
            return
        }
        setLoad(true);
        // console.log(process.env.REACT_APP_SERVER_URI);
        const rcv = await fetch(`${process.env.REACT_APP_SERVER_URI}/auth/login`,{
            method : "post",
            body : JSON.stringify({
                email,
                pw,
            }),
            headers : {
                "content-type" : "application/json"
            }
        })
        const rst = await rcv.json();
        if(rst.result){
            //context에 저장
            userCtx.setUser(rst.data);
            //localstorage에 저장
            localStorage.setItem("token",JSON.stringify(rst.data));
            
            ref.current.style.setProperty("animation", "fadeout 0.5s")
            const time = setTimeout(()=>{
                navigator("/channels/@me");
            },400)
            setLoad(false);
            return ()=>{
                clearTimeout(time);
            }
        }else{
            if(rcv.status == 200) {
                setErr(rst.error)
            }else{
                console.log("/auth/login onLogin server Error : ", rst.error)
            }
            setLoad(false)
        }
    }

    const onRegister= ()=>{
        ref.current.style.setProperty("animation", "fadeout 0.5s")
        const time = setTimeout(()=>{
            navigator("/auth/register");
        },400)
        return ()=>{
            clearTimeout(time);
        }
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
                        <span className={styles.title_text}>돌아오신 것을 환영해요!</span>
                        <span className={styles.subtitle_text}>다시 만나다니 너무 반가워요!</span>
                    </Box>

                    <Box className={styles.email_box}>
                        <Typography sx={{color : "lightgray", fontSize : "13px", fontWeight : "bold", pb:"12px"}}>이메일 또는 전화번호</Typography>
                        <InputField
                            sx={{width:"100%"}}
                            value={email}
                            onChange={(e)=>{
                                if(e.target.value){
                                    setEmail(e.target.value)
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
                                    setPW(e.target.value)
                                }
                            }}
                        />
                    </Box>
                    <Box sx={{width : "100%", position : "absolute", bottom :0, padding : "24px", display:"flex", flexDirection : "column", alignItems :"center"}}>
                        {   err &&
                            <Typography sx={{color : CustomColor.error, fontSize : "13px", fontWeight : "bold",pb : "12px"}}>{err}</Typography>
                        }
                        <Box className={styles.button_box}
                            onClick={()=>onLogin()}    
                        >
                            <Typography>{load ? <CircularProgress size={"20px"} color="inherit" /> :  "로그인"}</Typography>
                        </Box>

                        <Box 
                            onClick={()=>onRegister()}
                            sx={{pt : "12px"}}   
                        >
                            <Typography sx={{color : CustomColor.sub, cursor :"pointer"}}>가입하기</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box>

                </Box>
            </Box>
        </Box>
    );
}

export default Login
