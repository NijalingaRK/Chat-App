import React from "react";
import ReactDom from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter/>
    <AuthContextProvider>
      <SocketContextProvider>
    <App/>
    </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
