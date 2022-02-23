import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SendIcon from "@mui/icons-material/Send";
import { ADD_MESSAGE } from "../../../store/actions/actionTypes";
import socket from "../../../socket";
import { randomToken } from "../../../utils/tokenGenerator";

const SendMessage = ({ handleScroll }) => {
  const textarea = useRef();
  const {
    selectedUser: { _id },
  } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value.trimLeft());

    const textArea = textarea.current;
    textArea.style.height = "24px";
    const scrollHeight = textArea.scrollHeight;
    textArea.style.height = `${message ? scrollHeight : "24"}px`;
  };

  const handleSendMessage = (value) => {
    const msg = value.trim();
    if (value.length > 0) {
      const uniqueToken = randomToken();

      dispatch({
        type: ADD_MESSAGE,
        payload: {
          message: {
            user: _id,
            messages: [{ uniqueToken, message, received: false }],
          },
        },
      });

      handleScroll();

      socket.emit("sendMessage", {
        token: localStorage.getItem("token"),
        message: msg,
        receiver: _id,
        uniqueToken,
      });
    }
  };

  const handleResetAndSendMessage = () => {
    handleSendMessage(message);
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      handleResetAndSendMessage();
    }
  };

  return (
    <div className="flex-shrink-0 flex justify-center items-center">
      <div className="flex w-full items-end text-gray-400 space-x-2 px-4">
        <div>
          <AttachFileIcon className="send-message-icon cursor-pointer hover:text-gray-600" />
        </div>
        <div className="flex-1 flex items-center">
          <textarea
            placeholder="Write a message..."
            spellCheck="false"
            className="send-message w-full resize-none text-gray-700"
            style={{ maxHeight: "120px" }}
            rows={1}
            ref={textarea}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          ></textarea>
        </div>
        <div className="flex items-center space-x-2">
          <div>
            <SentimentSatisfiedAltOutlinedIcon className="send-message-icon cursor-pointer hover:text-gray-600" />
          </div>
          {message ? (
            <div>
              <SendIcon
                className="send-message-icon cursor-pointer text-primary"
                onClick={() => {
                  textarea.current.style = "24px";
                  handleResetAndSendMessage();
                }}
              />
            </div>
          ) : (
            <div>
              <KeyboardVoiceOutlinedIcon className="send-message-icon cursor-pointer hover:text-gray-600" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
