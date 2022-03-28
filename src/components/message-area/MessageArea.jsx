import React, { useRef } from "react";
import { useSelector } from "react-redux";
import MessageAreaTitle from "./title/MessageAreaTitle";
import Messages from "./messages/Messages";
import SendMessage from "./send-message/SendMessage";
import UserInfo from "./user-info/UserInfo";

const MessageArea = ({ scrollMessages }) => {
  const { selectedUser } = useSelector((state) => state.users);
  const container = useRef();
  const sendMessageRef = useRef();

  const handleScroll = (behavior = "smooth") => {
    setTimeout(() => {
      const element = container.current;
      if (element) {
        const options = { top: element.scrollHeight };
        behavior === "smooth" && (options.behavior = "smooth");
        element.scrollTo(options);
      }
    }, 5);
  };

  scrollMessages(handleScroll);

  if (Object.keys(selectedUser).length === 0) {
    return (
      <div className="grid w-full h-full place-items-center bg-blue-100">
        <div>Select a chat to start messaging</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <MessageAreaTitle username={selectedUser.username} />
          <div
            className="flex-1 bg-blue-50 border-y border-gray-200 message-container p-4 overflow-auto"
            ref={container}
            style={{
              height: `calc(100vh - ${56 + sendMessageRef.clientHeight}px)`,
            }}
          >
            <Messages handleScroll={handleScroll} />
          </div>
          <div ref={sendMessageRef} className="p-4">
            <SendMessage handleScroll={handleScroll} />
          </div>
        </div>

        <UserInfo />
      </div>
    </div>
  );
};

export default MessageArea;
