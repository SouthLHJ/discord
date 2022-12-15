import { Box } from "@mui/material";
import { useState } from "react";
import { InputField } from "./inputfield";
import {GoSearch} from "react-icons/go"
import { useContext } from "react";
import { isMobileContext } from "../../../../pages/channels";

function OnlineMe() {
    const mobileCtx = useContext(isMobileContext);

    const [username , setUsername] =useState();

    let sendButton = (
        <Box sx={{cursor :"pointer", width : "35px", display : "flex", alignItems :"center", justifyContent : "center"}}>
            <GoSearch/>
        </Box>
    )

    return (
        <>
            <Box sx={{width : "100%"}}>
                <InputField
                    sx={{
                        width : "100%"
                    }}
                    placeholder="검색하기"
                    value={username}
                    onChange={(evt)=>setUsername(evt.target.value)}

                    InputProps={{
                        endAdornment : sendButton
                    }}
                />
            </Box>
        </>
      );
}

export default OnlineMe;