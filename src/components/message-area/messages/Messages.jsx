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
  let page = 1;

  for (let i = 0; i < allMessages.length; i++) {
    if (allMessages[i].user === userId) {
      messages = [...allMessages[i].messages];
      page = allMessages[i].page;
      i = allMessages.length;
    }
  }

  useEffect(() => {
    if (!page || page === 1) {
      dispatch({ type: TOGGLE_FETCHING_MESSAGE });
    }

    // eslint-disable-next-line
  }, [dispatch, page]);

  const limit = 10;

  useEffect(() => {
    const asyncFetchMessages = async () => {
      const { status, messages, nextPage } = await getMessages(
        userId,
        page,
        limit
      );

      dispatch({ type: TOGGLE_FETCHING_MESSAGE });

      if (status === "success") {
        dispatch({
          type: ADD_MESSAGE,
          payload: {
            message: {
              user: userId,
              messages: messages,
              page: nextPage ? page + 1 : null,
            },
          },
        });

        handleScroll();
      }
    };

    fetchingMessage && asyncFetchMessages();
  }, [fetchingMessage, page, userId, dispatch, handleScroll]);

  if (fetchingMessage && page === 1) {
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
