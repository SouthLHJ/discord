import { Box, Divider,Typography } from "@mui/material";
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
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
                    FriendsCtx.friends.receive ?
                    <StyledBadge color="error" badgeContent={FriendsCtx.friends.receive.length}>
                        <FaDiscord style={{fontSize : "35px", color : "white"}}/>    
                    </StyledBadge>
                    :
                    <FaDiscord style={{fontSize : "35px", color : "white"}}/>
                }
            </Box>
            <hr style={{borderColor : CustomColor.gray, width : "50%"}}/>
        </Box>
      );
}

export default SideBar;


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 0,
      top: 5,
      border: `0px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));