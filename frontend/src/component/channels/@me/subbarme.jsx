import { Box, Typography } from "@mui/material";
import { CustomColor } from "../../../customs/colors";
import styles from "./subbarme.module.css"
import {FaDiscord, FaUserFriends} from "react-icons/fa"


function SubbarMe() {
    return (
        <Box sx={{width: "calc(100% - 24px)", height : "100%", position : "absolute"}}>
            <Box className={styles.search_box}
            >
                <Typography color={"lightgray"} fontSize={"13px"}>대화 찾기 또는 시작하기</Typography>
            </Box>
            <hr style={{borderColor : CustomColor.deepgray, width:"100%"}}/>
            <Box className={[styles.icon_box,styles.select_box]}>
                <FaUserFriends style={{fontSize : "25px", color : "white"}}/>
                <p className={styles.icon_text}>친구</p>
            </Box>

            <Box>
                <Box>
                    <p style={{color : "gray"}}>다이렉트 메세지</p>
                </Box>

            </Box>

        </Box>
      );
}

export default SubbarMe;