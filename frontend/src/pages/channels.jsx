import { Button, Typography } from "@mui/material";
import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, Routes, useNavigate  } from "react-router-dom";
import { UserContext } from "..";
import Login from "../component/auth/login";
import Register from "../component/auth/register";
import ChannelsMe from "../component/channels/@me/@me";


export const isMobileContext = createContext(null);

const Channels = ()=>{
    const userCtx= useContext(UserContext);
    const navigate = useNavigate();
    const [isMobile,setIsMobile] = useState(false);

    useEffect(()=>{
        // 로그인 상태인지 아닌지 확인
        if(!userCtx.user){
            navigate("/auth/login")
        }
        // 모바일인지 PC인지 확인
        const user = navigator.userAgent;
        
        if ( user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1 ) {
            setIsMobile(true);
        }
    },[])

    return (
        <>
            {/* <Typography>Text</Typography> */}
            <isMobileContext.Provider value={{isMobile,setIsMobile}}>
                <Routes>
                    <Route path="@me" element={<ChannelsMe />}/>
                    {/* <Route path="register" element={<Register />} /> */}
                </Routes>
            </isMobileContext.Provider>
        </>
    );
}

export default Channels