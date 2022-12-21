import styles from "./chat.module.css"
import { Box, Divider } from "@mui/material";
import {FaDiscord, FaUserFriends} from "react-icons/fa"
import { useContext, useRef } from "react";
import { useEffect } from "react";
import { isMobileContext } from "../../../../pages/channels";

function DirectChat({channel,user,user2Data, msgLog}) {
    const {isMobile} = useContext(isMobileContext)
    const formatDate = new Intl.DateTimeFormat("ko",{timeStyle : "short"})

    
    let message =[];
    msgLog.reduce((prev, msg, idx)=>{
        // 발언자 구분
        let author ;
        if(msg.author==user2Data.email){
            author = user2Data;
        }else{
            author = user;
        }
        // 날짜 비교... 일자 체크 : prev의 date 값이랑 비교해서 년 월 일 이 바뀌었는지 체크
        const prevD = [new Date(prev).getFullYear(),new Date(prev).getMonth()+1,new Date(prev).getDate()];
        const curD = [new Date(msg.timeStamp).getFullYear(),new Date(msg.timeStamp).getMonth()+1,new Date(msg.timeStamp).getDate()];
        let compare = false;
        for(let i=0; i<prevD.length;i++){
            if(prevD[i] !== curD[i]){
                compare = true;
                break;
            }
        }
        // 날짜가 다르면 현재 msg의 년 월 일 출력하기
        if(compare){
            message.push(
                <Box key={msg._id}>
                    <Box sx={{mt: "4px", mb : "4px"}}>
                        <Divider sx={[{"&::before" :{borderColor :"rgb(114 119 135 / 39%)"}},{"&::after" :{borderColor :"rgb(114 119 135 / 39%)"}}]}><span style={{color : "gray"}}>{curD[0]}년 {curD[1]}월 {curD[2]}일 </span></Divider>
                    </Box>
                    <Box sx={{display : "flex",mt: "12px", mb : "12px"}}>
                        <Box sx={{backgroundColor :  author.avatar, borderRadius : "70%", width : "40px", height :"40px", display : "flex", alignItems : "center", justifyContent :"center"}}>
                            <FaDiscord className={styles.author_icon}/>
                        </Box>
                        <Box  sx={{ml : "8px"}}>
                            <Box sx={{display: "flex", alignItems : "baseline"}}>
                                <Box>
                                    <span className={styles.author_name}>{author.name}</span>
                                </Box>
                                <Box sx={{ml : "8px"}}>
                                    <span className={styles.timestamp}>{curD[0]}.{curD[1]}.{curD[2]}.{formatDate.format(new Date(msg.timeStamp))}</span>
                                </Box>
                            </Box>
                            <Box>
                                <span className={styles.content}>{msg.content}</span>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )
        }else{
            // 이전 작성자가 같은지 다른지 판단
            if(msgLog[idx-1].author === msgLog[idx].author){
                message.push(
                <Box key={msg._id} sx={{display : "flex",mt: "12px", mb : "12px"}}>
                    <Box sx={{borderRadius : "70%", width : "40px", height :"20px", display : "flex", alignItems : "center", justifyContent :"center"}}>
                    </Box>
                    <Box  sx={{ml : "8px"}}>
                        <Box>
                            <span className={styles.content}>{msg.content}</span>
                        </Box>
                    </Box>
                </Box>
                )
            }else{
                message.push(
                  <Box key={msg._id} sx={{display : "flex",mt: "12px", mb : "12px"}}>
                      <Box sx={{backgroundColor :  author.avatar, borderRadius : "70%", width : "40px", height :"40px", display : "flex", alignItems : "center", justifyContent :"center"}}>
                          <FaDiscord className={styles.author_icon}/>
                      </Box>
                      <Box  sx={{ml : "8px"}}>
                          <Box sx={{display: "flex", alignItems : "baseline"}}>
                              <Box>
                                  <span className={styles.author_name}>{author.name}</span>
                              </Box>
                              <Box sx={{ml : "8px"}}>
                                  <span className={styles.timestamp}>{curD[0]}.{curD[1]}.{curD[2]}.{formatDate.format(new Date(msg.timeStamp))}</span>
                              </Box>
                          </Box>
                          <Box>
                              <span className={styles.content}>{msg.content}</span>
                          </Box>
                      </Box>
                  </Box>
                )
            }
        }

        return msg.timeStamp;
    },"1970-01-01")
    
    return (
        <>
            <Box className={styles.first_box}>
              <Box sx={{backgroundColor : user.avatar, borderRadius : "70%", width : "60px", height :"60px", display : "flex", alignItems : "center", justifyContent :"center"}}>
                <FaDiscord className={styles.avatar_icon}/>
              </Box>
              <span className={styles.user_name}>{user.name}</span>
              <p className={styles.first_text}>{user.name}님과 나눈 다이렉트 메시지의 첫부분이에요.</p>
            </Box>
            <Box className={styles.message_box}>
                {
                message
                }
            </Box>
            
        </>
      );
}

export default DirectChat;