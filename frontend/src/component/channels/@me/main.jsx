import { Box, Divider, Typography } from "@mui/material";
import styles from "../main.module.css"
import {FaDiscord, FaUserFriends} from "react-icons/fa"
import { CustomColor } from "../../../customs/colors";
import { useContext } from "react";
import { isMobileContext } from "../../../pages/channels";

function MainMe() {
    const mobileCtx = useContext(isMobileContext)


    return (
        <Box className={styles.box}>
            <Box className={styles.header_box}>

                <Box className={styles.icon_box}>
                    <FaUserFriends style={{fontSize : "25px", color : "white", opacity : 0.5}}/>
                    <p className={styles.icon_text}>친구</p>
                </Box>

                <Divider orientation="vertical" sx={{borderColor :"gray"}}/>

                <Box className={styles.list_box}>
                    <p className={styles.list_text}>온라인</p>
                </Box>

                <Box className={styles.list_box}>
                    <p className={styles.list_text}>모두</p>
                </Box>

                <Box className={styles.list_box}>
                    <p className={styles.list_text}>대기중</p>
                </Box>

                <Box sx={{backgroundColor : "green", height : "inherit" , display : "flex", alignItems : "center", ml : "12px", pr : "4px", pl : "4px", borderRadius : "3px"}}>
                    <p className={styles.list_text}>친구 추가하기</p>
                </Box>

            </Box>
            <hr style={{borderColor : CustomColor.deepgray, width:"100%"}}/>
            <Box className={[styles.icon_box,styles.select_box]}>
                <FaUserFriends style={{fontSize : "25px", color : "white"}}/>
                <p className={styles.icon_text}>친구</p>
            </Box>
        </Box>
      );
}

export default MainMe;