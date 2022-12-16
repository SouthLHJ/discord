import { Box } from "@mui/material";
import styles from "./staying.module.css"
import {FaDiscord, FaUserFriends} from "react-icons/fa"
import {AiFillCloseCircle,AiFillCheckCircle} from "react-icons/ai"
import { useContext } from "react";
import { useState } from "react";
import { CustomColor } from "../../../../customs/colors";
import { FriendsContext } from "../../../../pages/channels";

function StayFriendsMe() {
    const friendsCtx = useContext(FriendsContext);


    const receive = friendsCtx.friends.receive.map(one=>{
        return (
            <Box key={one._id} sx={{display : "flex", alignItems : "center", mt: "12px", mb : "12px", width : "100%", justifyContent :"space-between"}}>
                <Box sx={{display : "flex", alignItems : "center"}}>
                    <Box sx={{backgroundColor : one.avatar, borderRadius : "70%", width : "35px", height :"35px", display : "flex", alignItems : "center", justifyContent :"center"}}>
                        <FaDiscord style={{fontSize : "30px", color : "white"}}/>
                    </Box>
                    <Box  className={styles.list_box}>
                        <span className={styles.user_name}>{one.name}</span>            
                        <span className={styles.user_type}>받은 친구 요청</span>
                    </Box>
                </Box>
                <Box sx={{cursor : "pointer"}}>
                    <AiFillCheckCircle style={{color : "gray", fontSize :"30px"}}/>
                    <AiFillCloseCircle style={{color : "gray", fontSize :"30px"}}/>
                </Box>
            </Box>
        )
    }) ;


    const send = friendsCtx.friends.send.map(one=>{
        return (
            <Box key={one._id} sx={{display : "flex", alignItems : "center", mt: "12px", mb : "12px", width : "100%", justifyContent :"space-between"}}>
                <Box sx={{display : "flex", alignItems : "center"}}>
                    <Box sx={{backgroundColor : one.avatar, borderRadius : "70%", width : "35px", height :"35px", display : "flex", alignItems : "center", justifyContent :"center"}}>
                        <FaDiscord style={{fontSize : "30px", color : "white"}}/>
                    </Box>
                    <Box  className={styles.list_box}>
                        <span className={styles.user_name}>{one.name}</span>            
                        <span className={styles.user_type}>보낸 친구 요청</span>
                    </Box>
                </Box>
                <Box sx={{cursor : "pointer"}}>
                    <AiFillCloseCircle style={{color : "gray", fontSize :"30px"}}/>
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