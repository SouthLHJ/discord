import { Box } from "@mui/material";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { FriendsContext, SocketContext } from "../../../../pages/channels";
import { DirectMessageContext } from "../../../../pages/channels/@me";
import DirectChat from "./chat";
import DirectHeader from "./header";


function DirectChannelMain() {
    const {socket} = useContext(SocketContext);
    const {friends} = useContext(FriendsContext);
    const {msgList} = useContext(DirectMessageContext);
    const {channel} = useParams();
    
    const [user2Data, setUser2Data] = useState();
    const [channelData, setChannelData] = useState();
    
    useEffect(()=>{
        // 채널 정보 얻어오기 msgCtx , 상대방 정보 얻어오기 FriendsCtx
        msgList.forEach(one=>{
            if(one._id == channel){
                setChannelData(one);
                // 상대방 정보 찾기
                friends.friends.forEach(friend=>{
                    if(one.joiner.includes(friend.email)){
                        setUser2Data(friend);
                    }
                })
            }
        })
        // 채팅 로그 얻어오기

    },[msgList])

    console.log(user2Data, channelData)

    return (
        <Box sx={{width: "100%"}}> 
            <Box sx={{width: "100%"}}> 
                <DirectHeader user={user2Data}  />
            </Box>
            <Box sx={[{width: "100%", minHeight : "calc(100vh - 106px)" , overflowY : "scroll" ,border :"1px solid" },{"&::-webkit-scrollbar" : {display: "none"}}]}>
                <DirectChat channel={channelData} user={user2Data}/>
            </Box>
        </Box>
      );
}

export default DirectChannelMain;