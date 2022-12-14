import { Box, Divider, Typography } from "@mui/material";
import styles from "./subbar.module.css"
import {FaDiscord, FaUserFriends} from "react-icons/fa"
import {AiFillSetting} from "react-icons/ai"
import {BsFillMicFill,BsFillMicMuteFill}from "react-icons/bs"
import {MdHeadset,MdHeadsetOff} from "react-icons/md"
import { CustomColor } from "../../customs/colors";
import { useContext, useState } from "react";
import { isMobileContext } from "../../pages/channels";
import { UserContext } from "../..";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthUpdateAPI } from "../../customs/api/auth";

function Subbar({children}) {
    const mobileCtx = useContext(isMobileContext);
    const userCtx = useContext(UserContext);
    
    const [profile, setProfile] = useState(false);
    const [color, setColor] = useState("#fff");
    
    useEffect(()=>{
        if(userCtx.user){
            setColor(userCtx.user.avatar)
            // console.log(userCtx.user.avatar)
        }
    },[userCtx.user])

    //func
    const navigate = useNavigate();
    const onLogout = ()=>{
        localStorage.removeItem("token");
        userCtx.setUser(null);
        navigate("/auth/login");
    }

    const onColorChange = (color)=>{
        setColor(color);
    }

    const onUpdate = async()=>{
        const rst = await AuthUpdateAPI({email : userCtx.user.email,avatar : color})
        // console.log(rst);
        if(rst.status == 201){
            userCtx.setUser(rst.data.data)
            setProfile(false);
        }
    }


    if(!userCtx.user){
        return <p>???????</p>
    }
 
    return (
        <>
            <Box className={styles.box}
                style={{animation : mobileCtx.isMobile ? "slidein 0.8s" : "none"}}
            >   
                {children}
                <Box className={styles.user_box} style={{top : `calc(${window.innerHeight}px - 60px)`}}>
                    <Box sx={{display : "flex", alignItems : "center"}}>
                        <Box sx={{backgroundColor : userCtx.user.avatar, borderRadius : "70%", width : "40px", height :"40px", display : "flex", alignItems : "center", justifyContent :"center"}}
                            onClick={()=>setProfile(c=>!c)}
                        >
                            <FaDiscord style={{fontSize : "30px", color : "white"}}/>
                        </Box>
                        <Box sx={{ml : "12px", height:"100%", display : "flex", flexDirection :"column", alignItems : "center", justifyContent :"center"}}>
                            <span style={{fontSize : "20px", color : "white"}}>{userCtx.user.name}</span>
                            <span style={{fontSize : "13px", color : "gray"}}>#{userCtx.user.id}</span>
                        </Box>
                    </Box>
                    <Box sx={{ml : "12px",height:"100%", display : "flex", alignItems : "center", justifyContent :"center"}}>
                        <Box>
                            <BsFillMicFill style={{fontSize : "20px", color : "gray"}}/>
                        </Box>
                        <Box sx={{ml : "8px"}}>
                            <MdHeadset style={{fontSize : "20px", color : "gray"}}/>
                        </Box>
                        <Box onClick={()=>onLogout()} sx={{ml : "8px", cursor : "pointer"}}>
                            <AiFillSetting style={{fontSize : "20px", color : "gray"}}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {
                profile &&
                <Box className={styles.profile_box} sx={{top : `calc(${window.innerHeight}px - 340px)`}} >
                    <Box sx={{display : "flex", alignItems : "center", justifyContent : "center"}}>
                        <span style={{fontSize:"20px", fontWeight : "bold",color :"white"}}>????????? ??????</span>
                    </Box>
                    <Box >
                        <input title="Color Picker" type={"color"} value={color} onChange={(e)=>{onColorChange(e.target.value)}}/>
                        <span style={{color : "white"}}>{color}</span>
                    </Box>
                    <Box sx={{width:"calc(100% - 24px)",bottom: 10,position: "absolute", display : "flex", flexDirection : "row", justifyContent:"flex-end", cursor  : "pointer"}}>
                        <Box onClick={()=>onUpdate()} >
                            <span style={{color:"white"}}>??????</span>
                        </Box>
                        <Box sx={{ml : "12px"}} onClick={()=>setProfile(false)}>
                            <span  style={{color:"red"}}>??????</span>
                        </Box>
                    </Box>
                </Box>
            }
        </>
      );
}

export default Subbar;