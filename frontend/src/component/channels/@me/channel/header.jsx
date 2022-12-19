import { Divider,Box } from "@mui/material";
import styles from "./header.module.css";


function DirectHeader() {
    return (
        <Box className={styles.header_box} >
            <Box className={styles.icon_box}>
                <p className={styles.icon_text}>유저 이름</p>
            </Box>

            <Divider orientation="vertical" sx={{ borderColor: "gray" }} />

        </Box>
    );
}

export default DirectHeader;