import React, { useEffect, useRef } from 'react';
import { HubConnectionBuilder } from "@microsoft/signalr";

const SignalRComponent = ({ username }) => {
    const signalRConnection = useRef(null);

    useEffect(() => {
        // Create the SignalR connection
        signalRConnection.current = new HubConnectionBuilder()
            .withUrl("https://your-api-url/hubs/connectionuser")
            .withAutomaticReconnect()
            .build();

        // Start the connection
        const startConnection = async () => {
            try {
                await signalRConnection.current.start();
                console.log("Connection started");
            } catch (err) {
                console.error("Error while starting connection: ", err);
            }
        };

        startConnection();

        // Listen for "User  Connected" event
        signalRConnection.current.on("User  Connected", (message) => {
            console.log("User  connected: ", message);
        });

        // Cleanup on component unmount
        return () => {
            if (signalRConnection.current) {
                signalRConnection.current.stop();
            }
        };
    }, []);

    const sendMessage = async (message) => {
        if (signalRConnection.current) {
            try {
                await signalRConnection.current.send("SendMessage", username, message);
                console.log("Message sent: ", message);
            } catch (err) {
                console.error("Error while sending message: ", err);
            }
        } else {
            console.error("Connection not established");
        }
    };

    return (
        <div>
            <h1>SignalR Chat</h1>
            <button onClick={() => sendMessage("Hello from " + username)}>Send Message</button>
        </div>
    );
};

export default SignalRComponent;