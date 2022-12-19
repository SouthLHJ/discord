import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../..";
import { CustomColor } from "../../../../customs/colors";
import { FriendsContext, isMobileContext } from "../../../../pages/channels";
import Main from "../../main";
import SideBar from "../../sidebar";
import Subbar from "../../subbar";
import SubbarMe from "../subbarme";
import DirectChannelMain from "./[channelId]";


function DirectChannel() {
    const params = useParams();
    const channelId = params.channel;
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
                <DirectChannelMain channelId={channelId}/>
            </Main>
        </Box>
    );
}

export default DirectChannel;