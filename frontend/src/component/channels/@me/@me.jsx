import { Box } from "@mui/material";
import { createContext, useState } from "react";
import { useContext } from "react";
import { useEffect, useRef } from "react";
import { CustomColor } from "../../../customs/colors";
import { isMobileContext } from "../../../pages/channels";
import SideBar from "../sidebar";
import MainMe from "./main";
import Subbar from "../subbar";
import SubbarMe from "./subbarme";

export const FriendsContext = createContext(null);

function ChannelsMe() {
    const mobileCtx = useContext(isMobileContext);
    const [friends, setFriends] = useState({friends:[],send:[],receive:[],close:[]});    
    const [showSub, setShowSub] = useState(true);
    
    useEffect(()=>{
        if(mobileCtx.isMobile){
            setShowSub(false)
        }
        init();
    },[])
    
    async function init (){
        const token = localStorage.getItem("token")
        const rcv = await fetch(process.env.REACT_APP_SERVER_URI+"/relation/list",{
            method : "post",
            headers : {"content-type": "application/json"},
            body : JSON.stringify({
                token : JSON.parse(token)
            })
        })
        const rst = await rcv.json();
        // console.log(rst)
        if(rst.result){ 
            setFriends(rst.datas);
        }else{
            console.log("/channels/@me server err : ", rst.error);
        }
    }
    // console.log(friends)

    return (
        <FriendsContext.Provider value={{friends,setFriends}}>
        <Box sx={{width: "100vw" , height : "100vh", backgroundColor : CustomColor.gray, position : "absolute", display : "flex", flexDirection : "row"}}>
            <SideBar setShowSub={setShowSub} showSub={showSub}/>
            {
                showSub &&
                <Subbar>
                    <SubbarMe/>
                </Subbar>
            }
            {
                (mobileCtx.isMobile & !showSub) | (!mobileCtx.isMobile)  ?
                <MainMe/>
                :
                <></>
            }
        </Box>
        </FriendsContext.Provider>
    );
}

export default ChannelsMe;