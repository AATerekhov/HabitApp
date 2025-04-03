import React, { useEffect, useState } from 'react';
import './Notification.css';
import { useSelector } from 'react-redux';
import useSignalR from './useSignalR';
import '../views/view.css';
import { signinRedirect, signoutRedirect } from '../../services/userService';


const Broadcaster = () => {
    const userAccessToken = useSelector((store) => store.auth.accessToken);     
    const user = useSelector((state) => state.auth.user);
    
    const { connection } = useSignalR(`${import.meta.env.VITE_API_URL}/hubs/notification`, userAccessToken);
    const [messages, setMessages] = useState([]);

    const handleLogin = () => {
      // Логика для входа
      signinRedirect();
      console.log("Login clicked");
    };
  
    const handleLogout = () => {
      // Логика для выхода
      signoutRedirect();
      console.log("Logout clicked");
    };

    useEffect(() => {
        if (!connection) {
            return
          }
          connection.on("ReceiveMessage", (message) => {   
            setMessages((prevMessages) => [...prevMessages, message]);
          });
        
          return () => {
            connection.off("ReceiveMessage")
          }          
    }, [connection, user]);
   
    useEffect(() => {
        const intervalId = setInterval(() => {
            setMessages([]);
        }, 10000); 

        return () => clearInterval(intervalId); 
    }, []);

  return (
    <div className="standard">
      {user && (<a>{connection ? "Connected" : "Not connected"} in as <b>{user}</b></a>)}      
      {!user && <button  onClick={handleLogin} className="button button-outline mt-2">Login</button>}
      {user && <button  onClick={handleLogout} className="button button-clear mt-2">Sign out</button>}
      <div className="notification-container">
        {messages.map((msg, index) => (
        <div key={index} className="notification">
          {msg}
        </div>
        ))}
      </div>
    </div>
  );
};

export default Broadcaster;