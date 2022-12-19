import { Box } from "@mui/material";
import { useRef } from "react";
import DirectHeader from "./header";


function DirectChannelMain() {

    return (
        <Box sx={{width: "100%"}}> 
            <Box sx={{width: "100%"}}> 
                <DirectHeader />
            </Box>
            <Box sx={{width: "100%"}}>
                <p>content</p>
            </Box>
        </Box>
      );
}

export default DirectChannelMain;