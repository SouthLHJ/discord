import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { isMobileContext } from "../../../../pages/channels";
import styles  from "./addfriends.module.css"
import { InputField } from "./inputfield";

function AddFriends() {
    const mobileCtx = useContext(isMobileContext);
    const [username, setUsername]= useState();

    //func
    const onAddFriend = ()=>{
        const token = localStorage.getItem("token");

    }

    const sendButton = (
        <Box className={styles.send_button}  style={{cursor : username ? "pointer": "no-drop"}} onClick={()=>onAddFriend()}>
            <span style={{color : "white", fontSize : "13px", userSelect : "none"}}>친구 요청 보내기</span>
        </Box>
    )

    return (
        <>
            <Box >
                <p className={styles.title}>친구 추가하기</p>
                <p className={styles.subtitle}>Discord Tag를 사용하여 친구를 추가할 수 있어요. 대문자, 소문자를 구별한답니다!</p>
            </Box>
            <Box sx={{width: "100%" }}>
                <InputField
                    sx={{
                        width : "100%",
                        pb : "12px",
                    }}
                    placeholder={"사용자명#0000 입력"}
                    value={username}
                    onChange={(evt)=>setUsername(evt.target.value)}
                    disable={!username}
                    InputProps={{
                        endAdornment : mobileCtx.isMobile ? <></> : sendButton
                    }}
                />

                {
                    mobileCtx.isMobile ? sendButton :  <></>
                }
            </Box>
        </>
      );
}

export default AddFriends;