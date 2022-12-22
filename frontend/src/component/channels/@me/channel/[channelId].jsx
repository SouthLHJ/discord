import styles from "./[channelId].module.css"
import { Box, Divider } from "@mui/material";
import { useEffect,useContext,useState,useRef, forwardRef } from "react";
import {AiFillPlusCircle} from "react-icons/ai"
import {IoMdSend} from "react-icons/io"
import {FaDiscord, FaUserFriends} from "react-icons/fa"
import { useParams } from "react-router-dom";
import { CustomColor } from "../../../../customs/colors";
import { FriendsContext, isMobileContext, SocketContext } from "../../../../pages/channels";
import { DirectMessageContext } from "../../../../pages/channels/@me";
import {InputField} from "../mainbody/inputfield.jsx"
import DirectChat from "./chat";
import DirectHeader from "./header";
import { MessageLogAPI, NewMessageAPI } from "../../../../customs/api/chat";
import { UserContext } from "../../../..";


function DirectChannelMain() {
    const {isMobile} = useContext(isMobileContext)
    const {socket} = useContext(SocketContext);
    const {friends} = useContext(FriendsContext);
    const {msgList} = useContext(DirectMessageContext);
    const {user} = useContext(UserContext);
    const {channel} = useParams();
    
    const [user2Data, setUser2Data] = useState();
    const [channelData, setChannelData] = useState();
    const [msgLog, setMsgLog] = useState([]);
    const [text, setText] = useState("");
    const skip = useRef(0);
    const ref= useRef();
    
    useEffect(()=>{
        if(ref.current){
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' }); 
        }
    },[msgLog])

    useEffect(()=>{
        // 채널 정보 얻어오기 msgCtx , 상대방 정보 얻어오기 FriendsCtx
        msgList.forEach(one=>{
            if(one._id == channel){
                setChannelData(one);
                // 상대방 정보 찾기
                friends.friends.forEach(friend=>{
                    if(one.joiner.includes(friend.email)){
                        setUser2Data(friend);
                    }
                })
            }
        })
        // 채팅 로그 얻어오기
        msgLogInit();
        //  ================== 소켓 통신
        if(socket){
            // 새로운 메세지 생성 알람
            socket.on("new-message",(data)=>{
                console.log("new-message", data);
                setMsgLog(current=>[...current,data])
                
            })
        }


        async function msgLogInit(){
            const token = localStorage.getItem("token")
            const rst = await MessageLogAPI(JSON.parse(token), channel, skip.current)
            setMsgLog(rst.datas.reverse());
            // ref.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });  
        }
    },[socket])

    if(!user2Data){
        return(null)
    }
    // console.log(user2Data, channelData)
    
    // func
    const onSendMessage = async()=>{
        if(text.length == 0){
            return;
        }
        const token = localStorage.getItem("token")
        const rst = await NewMessageAPI(JSON.parse(token),channel,text)

        if(rst.result){
            setText("")
        }else{
            console.log("/channels/@me onSendmessage err : ", rst.error)
        }
    }

    

    return (
        <Box sx={{width: "100%"}}> 
            <Box sx={{width: "100%"}}> 
                <DirectHeader user={user2Data}  />
            </Box>

            <Box sx={isMobile ?
                [{width: "100%", height : "calc(100vh - 156px)" , overflowY : "scroll"},{"&::-webkit-scrollbar" : {display: "none"}}]
                :
                [{width: "100%", height : "calc(100vh - 106px)" , overflowY : "scroll"},{"&::-webkit-scrollbar" : {display: "none"}}]
            }>
                <DirectChat channel={channelData} user={user} user2Data={user2Data} msgLog={msgLog}/>
                <Box ref={ref} sx={{height : "0px"}}></Box>
            </Box>
            

            <Box sx={isMobile ?
                {width : "100%",position: "absolute", bottom:57 , minHeight:"52px"}
                :
                {width : "100%",position: "absolute", bottom:0 ,minHeight:"60px"}
            }>
                <InputField
                    value={text}
                    onChange={(evt)=>setText(evt.target.value)}
                    fullWidth
                    multiline={true}
                    maxRows={2}
                    sx={{height : "100%"}}
                    InputProps={{
                        sx : [{height : "60px"},isMobile &&{height : "54px" }],
                        startAdornment: <Box onClick={()=>{}}><AiFillPlusCircle style={{color: "gray", fontSize :"30px", cursor : "pointer"}}/></Box>,
                        endAdornment : <Box className={styles.send_icon} onClick={()=>onSendMessage()}><IoMdSend/></Box>
                    }}
                />
            </Box>
        </Box>
      );
}

export default DirectChannelMain;