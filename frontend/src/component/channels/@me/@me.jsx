import { Box } from "@mui/material";
import { CustomColor } from "../../../customs/colors";
import SideBar from "../sidebar";



function ChannelsMe() {
    return (
        <Box sx={{width: "100vw" , height : "100vh", backgroundColor : CustomColor.gray, position : "absolute"}}>
            <SideBar/>

        </Box>
    );
}

export default ChannelsMe;