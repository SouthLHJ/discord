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
    },[userCtx.user])


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