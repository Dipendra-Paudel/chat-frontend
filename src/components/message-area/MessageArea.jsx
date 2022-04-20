import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageAreaTitle from "./title/MessageAreaTitle";
import Messages from "./messages/Messages";
import SendMessage from "./send-message/SendMessage";
import UserInfo from "./user-info/UserInfo";
import { TOGGLE_FETCHING_MESSAGE } from "../../store/actions/actionTypes";

const MessageArea = ({ scrollMessages }) => {
  const { selectedUser } = useSelector((state) => state.users);
  const [scrollBottom, setScrollBottom] = useState(0);
  const container = useRef();
  const sendMessageRef = useRef();
  const dispatch = useDispatch();

  const handleScroll = (delay = 0) => {
    setTimeout(() => {
      const element = container.current;
      if (element) {
        const options = { top: element.scrollHeight - scrollBottom };
        element.scrollTo(options);
      }
    }, delay);
  };

  const handleScrollToTop = () => {
    const element = container.current;
    if (element.scrollTop === 0) {
      setScrollBottom(element.scrollHeight);
      dispatch({
        type: TOGGLE_FETCHING_MESSAGE,
        payload: {
          fetchingMessage: true,
        },
      });
    }
  };

  scrollMessages(handleScroll);

  const selectedUserId = selectedUser?._id;

  useEffect(() => {
    setScrollBottom(0);

    // eslint-disable-next-line
  }, [selectedUserId]);

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
            onScroll={handleScrollToTop}
          >
            <Messages handleScroll={handleScroll} />
          </div>
          <div ref={sendMessageRef} className="p-4">
            <SendMessage
              handleScroll={handleScroll}
              setScrollBottom={setScrollBottom}
            />
          </div>
        </div>

        <UserInfo />
      </div>
    </div>
  );
};

export default MessageArea;
