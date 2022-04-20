import {
  TOGGLE_FETCHING_MESSAGE,
  ADD_MESSAGE,
  UPDATE_SUCCESSFULLY_SENT_MESSAGE,
} from "../actions/actionTypes";

const initialState = {
  fetchingMessage: false,
  fetchMessage: false,
  allMessages: [],
};

export const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_FETCHING_MESSAGE: {
      const { fetchingMessage } = payload;
      return {
        ...state,
        fetchingMessage,
      };
    }

    case ADD_MESSAGE: {
      const allMessages = [...state.allMessages];

      const { message: currentMessage, old } = payload;
      const { messageType } = currentMessage;

      let isUserFound = false;
      let addUserMessage = true;

      for (let i = 0; i < allMessages.length; i++) {
        let msg = allMessages[i];
        const msgU = currentMessage.user?._id || currentMessage.user;
        if (msg.user === msgU) {
          if (
            (messageType === "socket" && msg?.messages?.length > 0) ||
            messageType !== "socket"
          ) {
            msg.messages = old
              ? [...msg.messages, ...currentMessage.messages]
              : [...currentMessage.messages, ...msg.messages];

            msg.isMessagesFetched = true;
            allMessages[i] = msg;
            isUserFound = true;
            i = allMessages.length;
          } else {
            addUserMessage = false;
            i = allMessages.length;
          }
        }
      }

      if (!isUserFound && addUserMessage) {
        allMessages.push(currentMessage);
      }

      return {
        ...state,
        allMessages,
      };
    }

    case UPDATE_SUCCESSFULLY_SENT_MESSAGE: {
      const { _id, uniqueToken, time, receiver } = payload;

      const allMessages = [...state.allMessages];

      for (let i = 0; i < allMessages.length; i++) {
        let msg = allMessages[i];
        if (msg.user === receiver?._id) {
          const updateIndex = msg.messages.findIndex(
            (m) => m.uniqueToken === uniqueToken
          );

          msg.messages[updateIndex]._id = _id;
          msg.messages[updateIndex].time = time;
          delete msg.messages[updateIndex].uniqueToken;

          allMessages[i] = msg;
        }
      }

      return {
        ...state,
        allMessages,
      };
    }

    default: {
      return { ...state };
    }
  }
};
