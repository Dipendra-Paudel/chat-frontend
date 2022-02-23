import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import MessageArea from "./components/message-area/MessageArea";
import Sidebar from "./components/sidebar/Sidebar";
import socket from "./socket";
import {
  ADD_MESSAGE,
  UPDATE_CONNECTED_USERS,
  UPDATE_SUCCESSFULLY_SENT_MESSAGE,
} from "./store/actions/actionTypes";

const App = () => {
  const dispatch = useRef();
  dispatch.current = useDispatch();

  const scrollMessages = (fn) => fn("default");

  useEffect(() => {
    const token = localStorage.getItem("token");
    socket.emit("join", { token }, (err) => {
      if (err) {
        const { status } = err;
        if (status === 401) {
          localStorage.removeItem("token");
          window.location = "/signin";
        }
      }
    });

    socket.on("receiveMessage", (data) => {
      if (data) {
        const { _id, message, sender, time, username } = data;

        // add message to redux
        dispatch.current({
          type: ADD_MESSAGE,
          payload: {
            message: {
              user: sender,
              messages: [{ _id, message, received: true, time }],
            },
          },
        });

        // update connected users lastMessage
        dispatch.current({
          type: UPDATE_CONNECTED_USERS,
          payload: {
            newMessage: {
              _id: sender,
              username: username,
              lastMessage: {
                message,
                time,
                received: true,
              },
            },
          },
        });
      }
    });

    socket.on("sendMessageConfirmation", (data) => {
      if (data) {
        const { _id, uniqueToken, time, receiver, sender, message } = data;

        // update the sending message or pending message as sent
        dispatch.current({
          type: UPDATE_SUCCESSFULLY_SENT_MESSAGE,
          payload: {
            _id,
            uniqueToken,
            time,
            receiver,
          },
        });

        // update connected users lastMessage
        dispatch.current({
          type: UPDATE_CONNECTED_USERS,
          payload: {
            newMessage: {
              _id: sender,
              receiver,
              lastMessage: {
                message,
                time,
                received: true,
              },
            },
          },
        });
      }
    });
  }, []);

  return (
    <div className="flex h-screen main-container">
      <div className="flex-shrink-0 w-72 border-r border-gray-200">
        <Sidebar />
      </div>
      <div className="flex-1">
        <MessageArea scrollMessages={scrollMessages} />
      </div>
    </div>
  );
};

export default App;
