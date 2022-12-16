import { Box, Divider, Typography } from "@mui/material";
import styles from "./main.module.css"

import { useContext,useState,useEffect,createContext } from "react";
import { isMobileContext } from "../../pages/channels";


function Main({showSub, children}) {
    const mobileCtx = useContext(isMobileContext)
  

   

    return (
        <Box className={styles.box} 
            style={{
                animation : ((mobileCtx.isMobile & !showSub) | (!mobileCtx.isMobile) ) ? "none" : "slidein 0.8s"
            }}
        >
            { children}
        </Box>
      );
}

export default Main;