import { Box } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { useEffect, useRef } from "react";
import { CustomColor } from "../../../customs/colors";
import { isMobileContext } from "../../../pages/channels";
import SideBar from "../sidebar";
import MainMe from "./main";
import SubbarMe from "./subbar";



function ChannelsMe() {
    const mobileCtx = useContext(isMobileContext);

    const [showSub, setShowSub] = useState(true);

    useEffect(()=>{
        if(mobileCtx.isMobile){
            setShowSub(false)
        }
    },[])

    return (
        <Box sx={{width: "100vw" , height : "100vh", backgroundColor : CustomColor.gray, position : "absolute", display : "flex", flexDirection : "row"}}>
            <SideBar setShowSub={setShowSub} showSub={showSub}/>
            {
                showSub &&
                <SubbarMe/>
            }
            {
                (mobileCtx.isMobile & !showSub) | (!mobileCtx.isMobile)  ?
                <MainMe/>
                :
                <></>
            }
        </Box>
    );
}

export default ChannelsMe;