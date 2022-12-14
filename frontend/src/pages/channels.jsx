import { Button, Typography } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, Routes  } from "react-router-dom";
import Login from "../component/auth/login";
import Register from "../component/auth/register";
import ChannelsMe from "../component/channels/@me/@me";


export const isMobileContext = createContext(null);

const Channels = ()=>{
    const [isMobile,setIsMobile] = useState(false);

    useEffect(()=>{
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