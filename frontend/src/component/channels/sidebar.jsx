import { Badge, Box, Divider, Typography } from "@mui/material";
import styles from "./sidebar.module.css"
import {FaDiscord} from "react-icons/fa"
import { CustomColor } from "../../customs/colors";
import { FriendsContext, isMobileContext } from "../../pages/channels";
import { useContext } from "react";

function SideBar({showSub,setShowSub}) {
    const mobileCtx = useContext(isMobileContext);
    const FriendsCtx = useContext(FriendsContext);

    // console.log(FriendsCtx.friends)
    return (
        <Box className={styles.box}>
            <Box className={styles.icon_box}
                onClick={()=>{
                    if(mobileCtx.isMobile){
                        setShowSub(!showSub)
                    }
                }}
            >
                {
                    FriendsCtx.friends ?
                    <Badge color="error" badgeContent={FriendsCtx.friends.receive.length}>
                        <FaDiscord style={{fontSize : "35px", color : "white"}}/>    
                    </Badge>
                    :
                    <FaDiscord style={{fontSize : "35px", color : "white"}}/>
                }
            </Box>
            <hr style={{borderColor : CustomColor.gray, width : "50%"}}/>
        </Box>
      );
}

export default SideBar;