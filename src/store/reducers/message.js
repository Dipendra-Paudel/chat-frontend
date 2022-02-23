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
      return {
        ...state,
        fetchingMessage: !state.fetchingMessage,
      };
    }

    case ADD_MESSAGE: {
      const allMessages = [...state.allMessages];

      const { message: currentMessage } = payload;
      let isUserFound = false;

      for (let i = 0; i < allMessages.length; i++) {
        let msg = allMessages[i];
        if (msg.user === currentMessage.user) {
          msg.messages = [...currentMessage.messages, ...msg.messages];
          msg.page = currentMessage.page || msg.page || 1;
          allMessages[i] = msg;
          isUserFound = true;
          i = allMessages.length;
        }
      }

      if (!isUserFound) {
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
        if (msg.user === receiver) {
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
