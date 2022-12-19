import { Box, IconButton, Tooltip } from "@mui/material";
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import {FaDiscord, FaUserFriends} from "react-icons/fa"
import { CustomColor } from "./colors";

const CustomBadge = ({backgroundColor,color, online})=>{
  if(online){
    return (
      <StyledBadge variant="dot" color={color}>
          <Box sx={{backgroundColor : backgroundColor, borderRadius : "70%", width : "40px", height :"40px", display : "flex", alignItems : "center", justifyContent :"center"}}>
            <FaDiscord style={{fontSize : "30px", color : "white"}}/>
          </Box>
      </StyledBadge>
    )
  }else{
    return (
    <StyledBadge2 variant="dot" color={color}>
        <Box sx={{backgroundColor : backgroundColor, borderRadius : "70%", width : "40px", height :"40px", display : "flex", alignItems : "center", justifyContent :"center"}}>
          <FaDiscord style={{fontSize : "30px", color : "white"}}/>
        </Box>
    </StyledBadge2>
    )

  }


}


export default CustomBadge;

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: "5px",
      top: "35px",
      border: `3px solid ${CustomColor.deepgray}`,
      borderRadius : "70%",
      padding: '6px',
      backgroundColor : "green"
    },
  }));

const StyledBadge2 = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: "5px",
      top: "35px",
      border: `3px solid ${CustomColor.deepgray}`,
      borderRadius : "70%",
      padding: '6px',
      backgroundColor : "gray"
    },
  }));