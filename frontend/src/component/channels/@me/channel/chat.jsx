import styles from "./chat.module.css"
import { Box, Divider } from "@mui/material";
import {FaDiscord, FaUserFriends} from "react-icons/fa"

function DirectChat({channel,user,user2Data, msgLog}) {
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
                <>
                    <Divider><span>{curD[0]}년 {curD[1]}월 {curD[2]}일 </span></Divider>
                    <Box sx={{display : "flex"}}>
                        <Box sx={{backgroundColor :  author.avatar, borderRadius : "70%", width : "40px", height :"40px", display : "flex", alignItems : "center", justifyContent :"center"}}>
                            <FaDiscord className={styles.author_icon}/>
                        </Box>
                        <Box >
                            <Box>
                                <span>{author.name}</span>
                                <span>{curD[0]}.{curD[1]}.{curD[2]}.</span>
                            </Box>
                            <Box>
                                {msg.content}
                            </Box>
                        </Box>
                    </Box>
                </>
            )
        }else{
          message.push(
            <Box sx={{display : "flex"}}>
                <Box sx={{backgroundColor :  author.avatar, borderRadius : "70%", width : "40px", height :"40px", display : "flex", alignItems : "center", justifyContent :"center"}}>
                    <FaDiscord className={styles.author_icon}/>
                </Box>
                <Box >
                    <Box>
                        <span>{author.name}</span>
                        <span>{curD[0]}.{curD[1]}.{curD[0]}.</span>
                    </Box>
                    <Box>
                        {msg.content}
                    </Box>
                </Box>
            </Box>
            )

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
            {
              message
            }
        </>
      );
}

export default DirectChat;