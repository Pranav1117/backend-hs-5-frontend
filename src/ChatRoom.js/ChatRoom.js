import React, { useEffect, useState } from "react";
import socketClient from "socket.io-client";
import "./style.css";
import sendlogo from "./send-logo.jpg";

export default function App() {
  const [message, SetMessage] = useState("");

  const [allMessage, SetAllMessage] = useState([]);

  const [newMessage, SetNewMessage] = useState("");

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = socketClient("https://node-hs-5-backend.onrender.com");
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (newMessage) {
      SetAllMessage([...allMessage, newMessage]);
    }
  }, [newMessage]);

  useEffect(() => {
    if (socket) {
      socket.on("chat_message", (value) => {
        SetNewMessage(value);
      });
    }
  }, [socket]);

  function sendMessage(e) {
    console.log(message);
    e.preventDefault();
    if (socket) {
      socket.emit("chat_message", message);
    }
  }

  return (
    <div>
      <h1 className="heading">Chat Application</h1>

      <ul>
        {allMessage.map((msg, index) => {
          return (
            <li className="msgs" key={index}>
              {msg}
            </li>
          );
        })}
      </ul>

      <form>
        <input
          id="message"
          className="input"
          value={message}
          placeholder="write messages here..."
          onChange={(e) => {
            SetMessage(e.target.value);
          }}
        ></input>

        <button
          className="btn"
          onClick={(e) => {
            sendMessage(e);
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
