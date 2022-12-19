import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate  } from "react-router-dom";
import { UserContext } from "..";
import ChannelsMe from "../component/channels/@me/@me";

import {io} from "socket.io-client";
import { useRef } from "react";
import DirectChannel from "../component/channels/@me/channel/channel";

/** isMobile,setIsMobile */
export const isMobileContext = createContext(null);
/** friends , setFriends */
export const FriendsContext = createContext(null);

const Channels = ()=>{
    const userCtx= useContext(UserContext);
    const navigate = useNavigate();
    const [isMobile,setIsMobile] = useState(false);
    const [friends, setFriends] = useState({friends:[],send:[],receive:[],close:[]});    

    // console.log(friends)
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
        socket.on("connect",async()=>{
            // console.log("connect", )
            await init(socket.id);
            userCtx.setUser({...userCtx.user, socketId : socket.id})
        })
        // 친구 추가 알람
        socket.on("add-friends",async(data)=>{
            console.log("add-friends",data);
            setFriends(current=>{
                const newData = {...current, receive : [...current.receive,data]}
                return newData;
            });
        })
        // 친구 허락 알람
        socket.on("apply-friends",async(data)=>{
            console.log("apply-friends",data);
            setFriends(current =>{
                const newData = {...current, friends : [...current.friends,data]};
                return newData;
            })
        })
        // 친구 취소 알람
        socket.on("cancel-friends",async(data)=>{
            console.log("cancel-friends",data);
            setFriends(current =>{
                const newReceive =  current.receive.filter(one=>{
                    return one.email !== data.email
                })
                return {...current, receive : newReceive};
            })
        })
        // 친구 거절 알람
        socket.on("deny-friends",async(data)=>{
            console.log("deny-friends",data);
            setFriends(current=>{
                const newSend =  current.send.filter(one=>{
                    return one.email !== data.email
                })
                return {...current, receive : newSend};
            })
        })
        // 친구 온라인 알람
        socket.on("login-friends",async(data)=>{
            console.log("login-friends",data);
            setFriends((current=>{
                let newFriends =[];
                for(let i=0; i<current.friends.length; i++){
                    // console.log(current.friends[i])
                    if(current.friends[i].email == data.email){
                        // console.log("data",data)
                        newFriends.push(data)
                    }else{
                        // console.log("one",current.friends[i])
                        newFriends.push( current.friends[i])
                    }
                }
                // console.log("friends",current)
                // console.log("newFriends",newFriends)
                return {...current, friends : newFriends}
            }))
        })

        return ()=>{socket.disconnect()};
    },[])


    async function init (socketId){
        const token = localStorage.getItem("token")
        // console.log(userCtx.user)
        const rcv = await fetch(process.env.REACT_APP_SERVER_URI+"/relation/list",{
            method : "post",
            headers : {"content-type": "application/json"},
            body : JSON.stringify({
                token : JSON.parse(token),
                socketId : socketId
            })
        })
        const rst = await rcv.json();
        // console.log(rst.datas)
        if(rst.result){ 
            // FriendsCtx.setFriends({...FriendsCtx.friends, receive : [...FriendsCtx.friends.receive,...rst.datas.receive]})
            setFriends({...rst.datas})
        }else{
            console.log("/channels server err : ", rst.error);
        }
    }

    return (
        <>
            {/* <Typography>Text</Typography> */}
            <isMobileContext.Provider value={{isMobile,setIsMobile}}>
            <FriendsContext.Provider value={{friends, setFriends}}>
                <Routes>
                    <Route path="@me" element={<ChannelsMe />}/>
                    <Route path="@me/:channel" element={<DirectChannel />} />
                </Routes>
            </FriendsContext.Provider>
            </isMobileContext.Provider>
        </>
    );
}

export default Channels