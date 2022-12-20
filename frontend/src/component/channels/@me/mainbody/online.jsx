import { Box, IconButton, Tooltip } from "@mui/material";
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import styles from "./all.module.css"
import { InputField } from "./inputfield";
import {GoSearch} from "react-icons/go"
import {AiFillMessage} from "react-icons/ai"
import {BsThreeDotsVertical} from "react-icons/bs"
import {FaDiscord, FaUserFriends} from "react-icons/fa"
import { useContext } from "react";
import { FriendsContext, isMobileContext } from "../../../../pages/channels";
import { CustomColor } from "../../../../customs/colors";
import CustomBadge from "../../../../customs/badge";
import { IsDirectAPI, NewChannelAPI } from "../../../../customs/api/channel";
import { useNavigate } from "react-router-dom";
import { DirectMessageContext } from "../../../../pages/channels/@me";

function OnlineMe() {
    const navigate = useNavigate();
    const mobileCtx = useContext(isMobileContext);
    const FriendsCtx  = useContext(FriendsContext);
    const DmsgCtx = useContext(DirectMessageContext);
    const [username , setUsername] =useState();

    let sendButton = (
        <Box sx={{cursor :"pointer", width : "35px", display : "flex", alignItems :"center", justifyContent : "center"}}>
            <GoSearch/>
        </Box>
    )

    const onMessage = async(user2Email)=>{
        let isC = null;
        if(DmsgCtx.msgList.length !== 0 ){
            DmsgCtx.msgList.forEach(msg=>{
                // console.log(msg.joiner.includes(user2Email))
                if(msg.joiner.includes(user2Email)){
                    // console.log(msg._id)
                    isC = msg._id;
                }
            })
        }
        if(isC){
            navigate(`/channels/@me/${isC}`)
        }else{
            const token = localStorage.getItem("token")
            const rst2  = await NewChannelAPI(JSON.parse(token),user2Email);
            
            if(rst2.result){
                DmsgCtx.setMsgList(current =>[...current,rst2])
                navigate(`/channels/@me/${rst2.datas._id}`)
            }else{
                console.log("/channels/@me newchannel server Err : ", rst2.error)
            }
        }
    }

    const online = FriendsCtx.friends.friends.map(one=>{
        if(one.socketId){
            return (
                <Box key={one._id} className={styles.list_box}>
                    <Box sx={{display : "flex", alignItems : "center"}}>
                        <CustomBadge backgroundColor={one.avatar} color={"success"} online={true}/>
                        <Box  className={styles.user_box}>
                            <span className={styles.user_name}>{one.name}</span>            
                                <span className={styles.user_type}>온라인</span>
                        </Box>
                    </Box>
                    <Box >
                        <Tooltip title="메세지 보내기" placement="top" arrow>
                            <IconButton onClick={()=>onMessage(one.email)}>
                                <AiFillMessage style={{color : "gray", fontSize :"30px",cursor : "pointer"}}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="기타" placement="top" arrow>
                            <IconButton onClick={()=>{}}>
                                <BsThreeDotsVertical style={{color : "gray", fontSize :"28px"}}/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                
            )
        }
    })

    return (
        <>
            <Box sx={{width : "100%"}}>
                <InputField
                    sx={{
                        width : "100%"
                    }}
                    placeholder="검색하기"
                    value={username}
                    onChange={(evt)=>setUsername(evt.target.value)}

                    InputProps={{
                        endAdornment : sendButton
                    }}
                />
            </Box>
            <Box>
                {online}
            </Box>
        </>
      );
}

export default OnlineMe;


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: "5px",
      top: "35px",
      border: `3px solid ${CustomColor.deepgray}`,
      borderRadius : "70%",
      padding: '6px',
    },
  }));