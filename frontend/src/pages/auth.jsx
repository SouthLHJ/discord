import { Button, Typography } from "@mui/material";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, Routes  } from "react-router-dom";
import Login from "../component/auth/login";
import Register from "../component/auth/register";




const Auth = ()=>{
    return (
        <>
            <Typography>Text</Typography>
            <Routes>
                <Route path="login" element={<Login />}/>
                <Route path="register" element={<Register />} />
            </Routes>
        </>
    );
}

export default Auth