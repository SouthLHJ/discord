import { Box, Divider, Typography } from "@mui/material";
import styles from "./subbar.module.css"
import {FaDiscord, FaUserFriends} from "react-icons/fa"
import {AiFillSetting} from "react-icons/ai"
import {BsFillMicFill,BsFillMicMuteFill}from "react-icons/bs"
import {MdHeadset,MdHeadsetOff} from "react-icons/md"
import { CustomColor } from "../../customs/colors";
import { useContext } from "react";
import { isMobileContext } from "../../pages/channels";
import { UserContext } from "../..";
import { useNavigate } from "react-router-dom";

function Subbar({children}) {
    const mobileCtx = useContext(isMobileContext);
    const userCtx = useContext(UserContext);
    
    //func
    const navigate = useNavigate();
    const onLogout = ()=>{
        localStorage.removeItem("token");
        navigate("/auth/login");
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
                <Box className={styles.user_box}>
                    <Box sx={{display : "flex", alignItems : "center"}}>
                        <Box sx={{backgroundColor : CustomColor.error, borderRadius : "70%", width : "35px", height :"35px", display : "flex", alignItems : "center", justifyContent :"center"}}>
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
                        <Box onClick={()=>onLogout()} sx={{ml : "8px"}}>
                            <AiFillSetting style={{fontSize : "20px", color : "gray"}}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
      );
}

export default Subbar;