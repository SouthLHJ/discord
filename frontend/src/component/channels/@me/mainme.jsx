import { Badge, Box, Divider, Typography } from "@mui/material";
import styles from "./mainme.module.css"
import { useContext,useState,useEffect,createContext } from "react";
import {FaDiscord, FaUserFriends} from "react-icons/fa"

import AddFriends from "./mainbody/addfriend";
import OnlineMe from "./mainbody/online";
import AllFriendsMe from "./mainbody/all";
import StayFriendsMe from "./mainbody/staying";
import { CustomColor } from "../../../customs/colors";
import { FriendsContext } from "../../../pages/channels";

function MainMe() {
    const [menu, setMenu] = useState(0);
    const FriendsCtx = useContext(FriendsContext);

    let body ;
    switch(menu){
        case 0 :
            body = <OnlineMe/>
            break;
        case 1 :
            body = <AllFriendsMe/>
            break;
        case 2 :
            body = <StayFriendsMe/>
            break;
        case 3 :
            body = <AddFriends/>
            break;
    }

    console.log(FriendsCtx.friends.receive.length !== 0 || FriendsCtx.friends.send.length !== 0)

    return (
        <>
            <Box className={styles.header_box}>
                <Box className={styles.icon_box}>
                    <FaUserFriends style={{fontSize : "25px", color : "white", opacity : 0.5}}/>
                    <p className={styles.icon_text}>친구</p>
                </Box>

                <Divider orientation="vertical" sx={{borderColor :"gray"}}/>

                <Box className={[styles.list_box, menu === 0 && styles.select_box]} onClick={()=>setMenu(0)}>
                    <p className={styles.list_text}>온라인</p>
                </Box>

                <Box className={[styles.list_box, menu === 1 && styles.select_box]} onClick={()=>setMenu(1)}>
                    <p className={styles.list_text}>모두</p>
                </Box>

                {
                    FriendsCtx.friends.receive.length !== 0 || FriendsCtx.friends.send.length !== 0 ?
                    <Badge color="error" overlap="circular" badgeContent=" ">
                        <Box className={[styles.list_box, menu === 2 && styles.select_box]} onClick={()=>setMenu(2)}>
                            <p className={styles.list_text}>대기중</p>
                        </Box>    
                    </Badge>
                    :
                    <Box className={[styles.list_box, menu === 2 && styles.select_box]} onClick={()=>setMenu(2)}>
                        <p className={styles.list_text}>대기중</p>
                    </Box>
                }

                <Box className={styles.button_box} onClick={()=>setMenu(3)}>
                    <p className={styles.list_text}>친구 추가하기</p>
                </Box>

            </Box>
            <hr style={{borderColor : CustomColor.deepgray, width:"100%"}}/>
            <Box className={styles.body_box}>
                {body}
            </Box>
        </>
      );
}

export default MainMe;