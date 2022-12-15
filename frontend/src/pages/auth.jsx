import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useContext } from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, Routes, useNavigate  } from "react-router-dom";
import { UserContext } from "..";
import Login from "../component/auth/login";
import Register from "../component/auth/register";




const Auth = ()=>{
    const navigate = useNavigate();
    const userCtx= useContext(UserContext);
    useEffect(()=>{
        if(userCtx.user){
            // console.log(userCtx.user)
            navigate("/channels/@me")
        }
    },[userCtx])

    return (
        <>
            {/* <Typography>Text</Typography> */}
            <Routes>
                <Route path="login" element={<Login />}/>
                <Route path="register" element={<Register />} />
            </Routes>
        </>
    );
}

export default Auth