import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate  } from "react-router-dom";
import { UserContext } from "..";
import ChannelsMe from "../component/channels/@me/@me";

import {io} from "socket.io-client";


export const isMobileContext = createContext(null);
export const FriendsContext = createContext(null);

const Channels = ()=>{
    const userCtx= useContext(UserContext);
    const navigate = useNavigate();
    const [isMobile,setIsMobile] = useState(false);
    const [friends, setFriends] = useState({friends:[],send:[],receive:[],close:[]});    


    useEffect(()=>{
        // 로그인 상태인지 아닌지 확인
        if(!userCtx.user){
            navigate("/auth/login")
            return;
        }
        // 모바일인지 PC인지 확인
        const user = navigator.userAgent;
        if ( user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1 ) {
            setIsMobile(true);
        }
        // 웹소켓 연결
        const socket = io(process.env.REACT_APP_SERVER_URI,{query : {email : userCtx.user.email}});
        // 친구 추가 알람
        socket.on("add-friends",(data)=>{
            console.log(data);
            setFriends({...friends, receive : [...friends.receive,data]});
        })

        return ()=>{socket.disconnect()};
    },[])

    return (
        <>
            {/* <Typography>Text</Typography> */}
            <isMobileContext.Provider value={{isMobile,setIsMobile}}>
            <FriendsContext.Provider value={{friends, setFriends}}>
                <Routes>
                    <Route path="@me" element={<ChannelsMe />}/>
                    {/* <Route path="register" element={<Register />} /> */}
                </Routes>
            </FriendsContext.Provider>
            </isMobileContext.Provider>
        </>
    );
}

export default Channels