import { Box, Typography } from "@mui/material";
import { CustomColor } from "../../../customs/colors";
import styles from "./subbarme.module.css"
import {FaDiscord, FaUserFriends} from "react-icons/fa"
import { useEffect } from "react";
import { IsDirectAPI } from "../../../customs/api/channel";
import { useContext } from "react";
import { DirectMessageContext } from "../../../pages/channels/@me";
import CustomBadge from "../../../customs/badge";
import { FriendsContext } from "../../../pages/channels";


function SubbarMe() {
    const msgCtx = useContext(DirectMessageContext);
    const FriendsCtx = useContext(FriendsContext);

    useEffect(()=>{
        
    },[])

    let direct = [];
    msgCtx.msgList.forEach(channel=>{
        FriendsCtx.friends.friends.forEach(user=>{
            if(channel.joiner.includes(user.email)){
                direct.push(
                    <Box key={user._id} sx={{display : "flex", alignItems : "center"}}>
                        <CustomBadge backgroundColor={user.avatar} color={"success"} online={user.socketId ? true : false}/>
                        <Box  className={styles.user_box}>
                            <span className={styles.user_name}>{user.name}</span>            
                            <span className={styles.user_type}>{user.socketId ? "온라인" : "오프라인"}</span>
                        </Box>
                    </Box>
                )
            }
        })    
    })
    




    return (
        <Box sx={{width: "calc(100% - 24px)", height : "100%", position : "absolute"}}>
            <Box className={styles.search_box}
            >
                <Typography color={"lightgray"} fontSize={"13px"}>대화 찾기 또는 시작하기</Typography>
            </Box>
            <hr style={{borderColor : CustomColor.deepgray, width:"100%"}}/>
            <Box className={[styles.icon_box,styles.select_box]}>
                <FaUserFriends style={{fontSize : "25px", color : "white"}}/>
                <p className={styles.icon_text}>친구</p>
            </Box>

            <Box>
                <Box>
                    <p style={{color : "gray"}}>다이렉트 메세지</p>
                </Box>
                {direct}
            </Box>

        </Box>
      );
}

export default SubbarMe;