import { Box, IconButton, Tooltip } from "@mui/material";
import styles from "./staying.module.css"
import {FaDiscord, FaUserFriends} from "react-icons/fa"
import {AiFillCloseCircle,AiFillCheckCircle} from "react-icons/ai"
import { useContext } from "react";
import { useState } from "react";
import { CustomColor } from "../../../../customs/colors";
import { FriendsContext } from "../../../../pages/channels";
import { RelationApplyAPI, RelationCancelAPI, RelationDenyAPI } from "../../../../customs/api/relationship";

function StayFriendsMe() {
    const friendsCtx = useContext(FriendsContext);


    const onApply = async(user2)=>{
        const token = localStorage.getItem("token");
        const rst = await RelationApplyAPI(JSON.parse(token),{user2 : user2.email})
        // console.log(rst);
        // 수락한거 receive에서 빼고, friends에 추가.
        if(rst.result){
            const newReceive = friendsCtx.friends.receive.filter(one=>{
                return one.email !== user2.email
            })
            const newFriends = [...friendsCtx.friends.friends,user2]
            // console.log(newReceive, newFriends, friendsCtx.friends.receive,friendsCtx.friends.friends)
            friendsCtx.setFriends({...friendsCtx.friends, receive : newReceive, friends : newFriends})

        }else{
            console.log("/channel/@me staying onApply err : ", rst)
        }



    }

    const onCancel = async(user2)=>{
        const token = localStorage.getItem("token");
        const rst = await RelationCancelAPI(JSON.parse(token),{user2 : user2.email})
        // console.log(rst);
        // 요청 보낸거 취소 
        if(rst.result){
            const newSend = friendsCtx.friends.send.filter(one=>{
                return one.email !== user2.email
            })
            friendsCtx.setFriends({...friendsCtx.friends, send : newSend})

        }else{
            console.log("/channel/@me staying onCancel err : ", rst)
        }
    }

    const onDeny = async(user2)=>{
        const token = localStorage.getItem("token");
        const rst = await RelationDenyAPI(JSON.parse(token),{user2 : user2.email})
        // console.log(rst);
        // 요청 받은거 거절
        if(rst.result){
            const newReceive = friendsCtx.friends.receive.filter(one=>{
                return one.email !== user2.email
            })

            // console.log( rst, newReceive,);
            friendsCtx.setFriends({...friendsCtx.friends, receive : newReceive})

        }else{
            console.log("/channel/@me staying onDeny err : ", rst)
        }

    }


    const receive = friendsCtx.friends.receive.map(one=>{
        return (
            <Box key={one._id} className={styles.list_box}>
                <Box sx={{display : "flex", alignItems : "center"}}>
                    <Box sx={{backgroundColor : one.avatar, borderRadius : "70%", width : "40px", height :"40px", display : "flex", alignItems : "center", justifyContent :"center"}}>
                        <FaDiscord style={{fontSize : "30px", color : "white"}}/>
                    </Box>
                    <Box  className={styles.user_box}>
                        <span className={styles.user_name}>{one.name}</span>            
                        <span className={styles.user_type}>받은 친구 요청</span>
                    </Box>
                </Box>
                <Box >
                    <Tooltip title="수락" placement="top" arrow>
                        <IconButton onClick={()=>onApply(one)}>
                            <AiFillCheckCircle style={{color : "gray", fontSize :"30px",cursor : "pointer"}}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="거절" placement="top" arrow>
                        <IconButton onClick={()=>onDeny(one)}>
                            <AiFillCloseCircle style={{color : "gray", fontSize :"30px"}}/>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        )
    }) ;

    // console.log(friendsCtx.friends.send)
    const send = friendsCtx.friends.send.map(one=>{
        return (
            <Box key={one._id} className={styles.list_box}>
                <Box sx={{display : "flex", alignItems : "center"}}>
                    <Box sx={{backgroundColor : one.avatar, borderRadius : "70%", width : "40px", height :"40px", display : "flex", alignItems : "center", justifyContent :"center"}}>
                        <FaDiscord style={{fontSize : "30px", color : "white"}}/>
                    </Box>
                    <Box  className={styles.user_box}>
                        <span className={styles.user_name}>{one.name}</span>            
                        <span className={styles.user_type}>보낸 친구 요청</span>
                    </Box>
                </Box>
                <Box sx={{cursor : "pointer"}}>
                    <Tooltip title="취소" placement="top" arrow>
                        <IconButton onClick={()=>onCancel(one)}>
                            <AiFillCloseCircle style={{color : "gray", fontSize :"30px"}}/>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        )
    })  ;

    return (
        <>
            <Box>
                {send}
                {receive}
            </Box>
        </>
      );
}

export default StayFriendsMe;