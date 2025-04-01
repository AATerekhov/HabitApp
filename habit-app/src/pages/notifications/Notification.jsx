import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import './Notification.css';
import { useSelector } from 'react-redux';


const Notification = () => {
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);
  const userAccessToken = useSelector(store => store.auth.accessToken); 

  useEffect(() => {
    const connect = async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_API_URL}/hubs/notification`, {
            accessTokenFactory: () => {
                return userAccessToken;
            }
        }) 
        .withAutomaticReconnect()
        .build();

      newConnection.on('ReceiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      try {
        await newConnection.start();
        console.log('Connected to SignalR');
      } catch (err) {
        console.error('Connection failed: ', err);
      }

      setConnection(newConnection);
    };

    connect();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [connection, userAccessToken]);

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