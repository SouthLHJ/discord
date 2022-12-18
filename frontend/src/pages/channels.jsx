import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate  } from "react-router-dom";
import { UserContext } from "..";
import ChannelsMe from "../component/channels/@me/@me";

import {io} from "socket.io-client";

/** isMobile,setIsMobile */
export const isMobileContext = createContext(null);
/** friends , setFriends */
export const FriendsContext = createContext(null);

const Channels = ()=>{
    const userCtx= useContext(UserContext);
    const navigate = useNavigate();
    const [isMobile,setIsMobile] = useState(false);
    const [friends, setFriends] = useState({friends:[],send:[],receive:[],close:[]});    

    console.log(friends)
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
        socket.on("connect",()=>{
            // console.log("connect", )
            userCtx.setUser({...userCtx.user, socketId : socket.id})
        })
        // 친구 추가 알람
        socket.on("add-friends",(data)=>{
            console.log("add-friends",data);
            setFriends({...friends, receive : [...friends.receive,data]});
        })
        // 친구 허락 알람
        socket.on("apply-friends",(data)=>{
            console.log("apply-friends",data);
            setFriends({...friends, friends : [...friends.friends,data]});
        })
        // 친구 취소 알람
        socket.on("cancel-friends",(data)=>{
            console.log("cancel-friends",data);
            const newReceive = friends.receive.filter(one=>{
                return one.email !== data.email
            })
            setFriends({...friends, receive : newReceive});
        })
        // 친구 거절 알람
        socket.on("deny-friends",(data)=>{
            console.log("deny-friends",data);
            setFriends({...friends, friends : [...friends.friends,data]});
        })
        // 친구 온라인 알람
        socket.on("login-friends",(data)=>{
            console.log("login-friends",data);
            let newFriends =[];
            for(let i=0; i<friends.friends.length; i++){
                console.log(friends.friends[i])
                if(friends.friends[i].email == data.email){
                    console.log("data",data)
                    newFriends.push(data)
                }else{
                    console.log("one",friends.friends[i])
                    newFriends.push( friends.friends[i])
                }
            }
            console.log("friends",friends)
            console.log("newFriends",newFriends)
            
            // setFriends({...friends, friends : newFriends})
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