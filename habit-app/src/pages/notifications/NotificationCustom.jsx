import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder, HttpTransportType  } from '@microsoft/signalr';
import './Notification.css';
import { useSelector } from 'react-redux';
import Notification from './Notification';
import useSignalR from './useSignalR';


const NotificationCustom = () => {
    const { connection } = useSignalR(`${import.meta.env.VITE_API_URL}/hubs/notification`);
    const userAccessToken = useSelector(store => store.auth.accessToken); 
      const [messages, setMessages] = useState([]);

    const handleStartRoomChange = async (e) => {
        // e.preventDefault()
        // Send the message to signal r
        connection?.invoke("SendMessage", "Проверка 1")
      }
      
        useEffect(() => {
            if (!connection) {
                return
              }
              // listen for messages from the server
              connection.on("ReceiveMessage", (message) => {
                console.log("message from the server", message)
                setMessages((prevMessages) => [...prevMessages, message])
              })
            
              return () => {
                connection.off("ReceiveMessage")
              }

          
        }, [connection]);

  return (
    <div className="container">
      <h1>SignalR Chat</h1>
      <p>{connection ? "Connected" : "Not connected"}</p>
      {/* <Notification signalRConnection={connection}/> */}
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