import { Box } from "@mui/material";
import { useContext } from "react";
import { FriendsContext } from "../@me";

function StayFriendsMe() {
    const friendsCtx = useContext(FriendsContext);

    
    let receive;
    const send = friendsCtx.friends.send.map(one=>{
        return (
            <Box key={one._id}>
                <span>{one.name}</span>            
                <span>보낸요청</span>
            </Box>
        )
    })  

    return (
        <>
            <Box>
                {
                    send
                }
            </Box>
        </>
      );
}

export default StayFriendsMe;