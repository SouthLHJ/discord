import { Box } from "@mui/material";
import { createContext, useState } from "react";
import { useContext } from "react";
import { useEffect, useRef } from "react";
import { CustomColor } from "../../../customs/colors";
import { FriendsContext, isMobileContext } from "../../../pages/channels";
import SideBar from "../sidebar";
import Subbar from "../subbar";
import SubbarMe from "./subbarme";
import Main from "../main";
import MainMe from "./mainme";
import { UserContext } from "../../..";


function ChannelsMe() {
    const mobileCtx = useContext(isMobileContext);
    const userCtx = useContext(UserContext);
    const FriendsCtx = useContext(FriendsContext);
    const [showSub, setShowSub] = useState(true);
    
    useEffect(()=>{
        if(mobileCtx.isMobile){
            setShowSub(false)
        }
        if(userCtx.user?.socketId){
            init();
        }
    },[userCtx.user])
    
    async function init (){
        const token = localStorage.getItem("token")
        // console.log(userCtx.user)
        const rcv = await fetch(process.env.REACT_APP_SERVER_URI+"/relation/list",{
            method : "post",
            headers : {"content-type": "application/json"},
            body : JSON.stringify({
                token : JSON.parse(token),
                socketId : userCtx.user.socketId
            })
        })
        const rst = await rcv.json();
        // console.log(rst.datas)
        if(rst.result){ 
            // FriendsCtx.setFriends({...FriendsCtx.friends, receive : [...FriendsCtx.friends.receive,...rst.datas.receive]})
            FriendsCtx.setFriends({...rst.datas})
        }else{
            console.log("/channels/@me server err : ", rst.error);
        }
    }
    // console.log(FriendsCtx.friends)

    return (
        <Box sx={{width: "100vw" , height : "100vh", backgroundColor : CustomColor.gray, position : "absolute", display : "flex", flexDirection : "row", overflow: 'hidden',}}>
            <SideBar setShowSub={setShowSub} showSub={showSub}/>
            {
                showSub &&
                <Subbar>
                    <SubbarMe/>
                </Subbar>
            }
            <Main showSub={showSub}>
                <MainMe/>
            </Main>
        </Box>
    );
}

export default ChannelsMe;