import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Auth from './pages/auth';
import Channels from './pages/channels';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/channels/*" element={<Channels />} />
    </Routes>
  
  </BrowserRouter>
);

