import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder, HttpTransportType  } from '@microsoft/signalr';
import './Notification.css';
import { useSelector } from 'react-redux';
import useSignalR from './useSignalR';
import { motion, AnimatePresence } from 'framer-motion';


const NotificationCustom = () => {
    const userAccessToken = useSelector(store => store.auth.accessToken); 
    const { connection } = useSignalR(`${import.meta.env.VITE_API_URL}/hubs/notification`, userAccessToken);
    const [messages, setMessages] = useState([]);

    const handleStartRoomChange = async (e) => {
        // e.preventDefault()
        // Send the message to signal r
        connection?.invoke("SendMessage", "BobSmith@email.com" , "Test")
      }
      
      // useEffect(() => {
      //     if (!connection) {
      //         return
      //       }
      //       // listen for messages from the server
      //       connection.on("ReceiveMessage", (message) => {
      //         console.log("message from the server", message);    
      //         setMessages((prevMessages) => [...prevMessages, message]);
      //       });            
      //       return () => {
      //         connection.off("ReceiveMessage")
      //       }          
      // }, [connection]);

  return (
    <div className="container">
      <h1>SignalR Chat</h1>
      <p>{connection ? "Connected" : "Not connected"}</p>
      <button className='button button-outline' onClick={async () => await handleStartRoomChange()}> <i className="fa fa-gamepad fa-lg"></i></button>
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

export default NotificationCustom;