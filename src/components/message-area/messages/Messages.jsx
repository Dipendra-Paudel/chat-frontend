import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "../../../api/message";
import {
  ADD_MESSAGE,
  TOGGLE_FETCHING_MESSAGE,
} from "../../../store/actions/actionTypes";
import IndividualMessage from "./IndividualMessage";

const Messages = ({ handleScroll }) => {
  const {
    users: {
      selectedUser: { _id: userId },
    },
    message: { fetchingMessage, allMessages },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  let messages = [];
  let isMessagesFetched = false;
  let lastMesssageTime = "";

  for (let i = 0; i < allMessages.length; i++) {
    if (allMessages[i].user === userId) {
      messages = [...allMessages[i].messages];
      lastMesssageTime = messages[messages.length - 1]?.time;
      isMessagesFetched = allMessages[i].isMessagesFetched;
      i = allMessages.length;
    }
  }

  useEffect(() => {
    if (isMessagesFetched !== undefined && isMessagesFetched !== true) {
      dispatch({
        type: TOGGLE_FETCHING_MESSAGE,
        payload: {
          fetchingMessage: !isMessagesFetched,
        },
      });
    }

    // eslint-disable-next-line
  }, [userId]);

  useEffect(() => {
    const asyncFetchMessages = async () => {
      const { status, messages } = await getMessages(userId, lastMesssageTime);

      dispatch({
        type: TOGGLE_FETCHING_MESSAGE,
        payload: {
          fetchingMessage: false,
        },
      });

      if (status === "success") {
        dispatch({
          type: ADD_MESSAGE,
          payload: {
            message: {
              user: userId,
              messages: messages,
            },
            old: true,
          },
        });

        handleScroll();
      }
    };

    fetchingMessage && asyncFetchMessages();

    // eslint-disable-next-line
  }, [fetchingMessage, userId, dispatch, handleScroll]);

  if (fetchingMessage && messages.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div className="flex flex-col space-y-2">
        {[...messages].reverse().map((msg, index) => (
          <IndividualMessage key={index} msg={msg} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
