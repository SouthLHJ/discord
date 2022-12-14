import { Button, Typography } from "@mui/material";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, Routes  } from "react-router-dom";
import Login from "../component/auth/login";
import Register from "../component/auth/register";
import ChannelsMe from "../component/channels/@me/@me";




const Channels = ()=>{
    return (
        <>
            {/* <Typography>Text</Typography> */}
            <Routes>
                <Route path="@me" element={<ChannelsMe />}/>
                {/* <Route path="register" element={<Register />} /> */}
            </Routes>
        </>
    );
}

export default Channels