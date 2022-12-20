import { Divider,Box } from "@mui/material";
import styles from "./header.module.css";
import {MdAlternateEmail} from "react-icons/md"


function DirectHeader({user}) {

    return (
        <Box className={styles.header_box} >
            <Box className={styles.icon_box}>
                <MdAlternateEmail className={styles.icon_text}/>
                <span className={styles.icon_text}>{user.name}</span>
            </Box>
        </Box>
    );
}

export default DirectHeader;