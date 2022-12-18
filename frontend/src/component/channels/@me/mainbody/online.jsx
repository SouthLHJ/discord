import { Badge, Box, IconButton, Tooltip } from "@mui/material";
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

function OnlineMe() {
    const mobileCtx = useContext(isMobileContext);
    const FriendsCtx  = useContext(FriendsContext);
    const [username , setUsername] =useState();

    let sendButton = (
        <Box sx={{cursor :"pointer", width : "35px", display : "flex", alignItems :"center", justifyContent : "center"}}>
            <GoSearch/>
        </Box>
    )

    const online = FriendsCtx.friends.friends.map(one=>{
        if(one.socketId){
            return (
                <Box key={one._id} className={styles.list_box}>
                    <Box sx={{display : "flex", alignItems : "center"}}>
                        <Box sx={{backgroundColor : one.avatar, borderRadius : "70%", width : "40px", height :"40px", display : "flex", alignItems : "center", justifyContent :"center"}}>
                                <FaDiscord style={{fontSize : "30px", color : "white"}}/>
                        </Box>
                        <Box  className={styles.user_box}>
                            <span className={styles.user_name}>{one.name}</span>            
                            {/* <StyledBadge color="error"> */}
                            <span className={styles.user_type}>온라인</span>
                            {/* </StyledBadge> */}
                        </Box>
                    </Box>
                    <Box >
                        <Tooltip title="메세지 보내기" placement="top" arrow>
                            <IconButton onClick={()=>{}}>
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
      right: 0,
      top: 0,
      border: `0px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));