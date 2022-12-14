import { Box, Divider, Typography } from "@mui/material";
import styles from "../subbar.module.css"
import {FaDiscord, FaUserFriends} from "react-icons/fa"
import { CustomColor } from "../../../customs/colors";
import { useContext } from "react";
import { isMobileContext } from "../../../pages/channels";

function SubbarMe() {
    const mobileCtx = useContext(isMobileContext)


    return (
        <Box className={styles.box}
            style={{animation : mobileCtx.isMobile ? "slidein 0.8s" : "none"}}
        >
            <Box className={styles.search_box}
            >
                <Typography color={"lightgray"} fontSize={"13px"}>대화 찾기 또는 시작하기</Typography>
            </Box>
            <hr style={{borderColor : CustomColor.deepgray, width:"100%"}}/>
            <Box className={[styles.icon_box,styles.select_box]}>
                <FaUserFriends style={{fontSize : "25px", color : "white"}}/>
                <p className={styles.icon_text}>친구</p>
            </Box>
        </Box>
      );
}

export default SubbarMe;