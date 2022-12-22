import { Box, Typography } from "@mui/material";
import { CustomColor } from "../../../customs/colors";
import styles from "./subbarme.module.css"
import {FaDiscord, FaUserFriends} from "react-icons/fa"
import { useEffect } from "react";
import { useContext } from "react";
import { DirectMessageContext } from "../../../pages/channels/@me";
import CustomBadge from "../../../customs/badge";
import { FriendsContext } from "../../../pages/channels";
import { useNavigate, useParams } from "react-router-dom";


function SubbarMe() {
    const msgCtx = useContext(DirectMessageContext);
    const FriendsCtx = useContext(FriendsContext);
    const navigate = useNavigate();
    const params = useParams();
    
    useEffect(()=>{
        
    },[])

    console.log(msgCtx.msgList)
    let direct = [];
    // 다이렉트 메세지가 있을 때
    msgCtx.msgList.forEach(channel=>{
        // 친구 리스트 중 일치하는 유저를 찾아서 출력하기.
        FriendsCtx.friends.friends.forEach(user=>{
            if(channel.joiner.includes(user.email)){
                direct.push(
                    <Box key={user._id} className={params?.channel == channel._id && styles.select_box} sx={[{display : "flex", alignItems : "center",padding :"4px", cursor :"pointer"}]} onClick={()=>{navigate(`/channels/@me/${channel._id}`)}}>
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
    
    const onMoveMe = ()=>{
        navigate("/channels/@me")
    }



    return (
        <Box sx={{width: "calc(100% - 24px)", height : "100%", position : "absolute"}}>
            <Box className={styles.search_box}
            >
                <Typography color={"lightgray"} fontSize={"13px"}>대화 찾기 또는 시작하기</Typography>
            </Box>
            <hr style={{borderColor : CustomColor.deepgray, width:"100%"}}/>
            <Box className={[styles.icon_box, params?.channel ?? styles.select_box]} onClick={()=>{onMoveMe()}}>
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