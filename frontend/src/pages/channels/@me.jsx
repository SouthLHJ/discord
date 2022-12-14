import { Route, Routes } from "react-router-dom";
import DirectChannel from "../../component/channels/@me/channel/channel";
import ChannelsMe from "../../component/channels/@me/@me";
import { createContext, useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { IsDirectAPI } from "../../customs/api/channel";
import { SocketContext } from "../channels";

/** msgList,setMsgList */
export const DirectMessageContext = createContext(null);

const PathMe = ()=>{
    const socketCtx = useContext(SocketContext);
    const [msgList,setMsgList] = useState([]);

    // console.log(socketCtx.socket)
    useEffect(()=>{
        msgInit();
    },[])


    useEffect(()=>{
        if(socketCtx.socket){
            // 원래 있던 다이렉트 방을 서버 sockect room에 추가하기
            if(msgList.length !==0){                
                const channels = msgList.map(one=>{
                    return one._id
                })
                socketCtx.socket.emit("new-directChannel",({channel : channels}))
            }
            // 새로운 연결 발생 알람
            socketCtx.socket.on("new-diect",(data)=>{
                setMsgList(current=> [...current,data])
            })
        }
        return ()=>{
            if(socketCtx.socket){
                socketCtx.socket.off("new-diect");
            }
        }
    },[socketCtx.socket,msgList])
    

    async function msgInit(){
        const token = localStorage.getItem("token")
        const rst = await IsDirectAPI(JSON.parse(token))
        console.log("/@me msgInit() : ",rst.datas);
        setMsgList(rst.datas)
    }


    return (
        <DirectMessageContext.Provider value={{msgList,setMsgList}}>
        <Routes>
            <Route path="/" element={<ChannelsMe />}/>
            <Route path="/:channel" element={<DirectChannel />} />
        </Routes>
        </DirectMessageContext.Provider>
    )
}

export default PathMe;