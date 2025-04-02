import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder, HttpTransportType  } from '@microsoft/signalr';
import './Notification.css';


const Notification = ({ signalRConnection }) => {
  const [messages, setMessages] = useState([]);

  const handleMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  useEffect(() => {
    if (signalRConnection) {
      signalRConnection.on('ReceiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    })
  }}, [signalRConnection]);

  return (
    <div className="notification-container">
      {messages.map((msg, index) => (
        <div key={index} className="notification">
          {msg}
        </div>
      ))}
    </div>
  );
};

export default Notification;