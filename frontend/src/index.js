import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Auth from './pages/auth';
import Channels from './pages/channels';

// 로그인 정보 저장
export const UserContext = createContext(null);
function AppProvider({children}) {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const token = localStorage.getItem("token")
    
    if(JSON.parse(token)){
      init();
    }
    async function init (){
      const rcv = await fetch(process.env.REACT_APP_SERVER_URI+"/auth/autologin",{
        method:"post",
        body : JSON.stringify({token : JSON.parse(token)}),
        headers : {
          "content-type" : "application/json"
        }
      })
      const rst = await rcv.json();
      if(rst.result){
        setUser(rst.data);
        // console.log(rst)
      }else{
        setUser(null);
        localStorage.removeItem("token");
        // console.log("??",rst)
      }
    }
  },[])

  // console.log(user);
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename='/discoo'>
      <AppProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/channels/*" element={<Channels />} />
        </Routes>
      </AppProvider>
  </BrowserRouter>
);

