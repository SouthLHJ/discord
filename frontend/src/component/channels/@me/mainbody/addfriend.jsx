import { Box, CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import { CustomColor } from "../../../../customs/colors";
import { isMobileContext } from "../../../../pages/channels";
import styles  from "./addfriends.module.css"
import { InputField } from "./inputfield";

function AddFriends() {
    const mobileCtx = useContext(isMobileContext);

    const [load, setLoad] = useState(false);
    const [username, setUsername]= useState();
    const [err, setErr] = useState(null);

    //func
    const onAddFriend = async()=>{
        if(!username)return;

        setLoad(true);
        const token = localStorage.getItem("token");
        // console.log(token)
        const rcv = await fetch(process.env.REACT_APP_SERVER_URI+"/relation/send",{
            method : "post",
            headers : {"content-type" : "application/json"},
            body : JSON.stringify({
                token : JSON.parse(token),
                name : username.split("#")[0],
                id : username.split("#")[1],
            })
        })
        const rst = await rcv.json();
        console.log(rst)
        if(rst.result){
            setLoad(false);
        }else{
            setErr(true);
            setLoad(false);
        }
    }

    const sendButton = (
        <Box className={styles.send_button}  style={{cursor : username ? "pointer": "no-drop"}} onClick={()=>onAddFriend()}>
            {
            load ?
            <CircularProgress size={"20px"} color="inherit" />
            :
            <span style={{color : "white", fontSize : "13px", userSelect : "none"}}>친구 요청 보내기</span>
            }
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
                    helperText = {
                        err &&
                        <p style={{color : CustomColor.error}}>다시 한번 확인해보세요. 잘못된 유저인 것 같네요.</p>
                    }
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