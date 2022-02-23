import {
  ADD_CONNECTED_USERS,
  CHANGE_SELECTED_USER,
  UPDATE_CONNECTED_USERS,
} from "../actions/actionTypes";

const initialState = {
  connectedUsers: [],
  connectedUsersFetched: false,
  selectedUser: {},
};

const usersReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_CONNECTED_USERS: {
      return {
        ...state,
        connectedUsersFetched: true,
        connectedUsers: payload.users,
      };
    }

    case UPDATE_CONNECTED_USERS: {
      const { _id, lastMessage, username, receiver } = payload.newMessage;
      const { connectedUsers } = state;

      let isUserAlreadyConnected = false;
      let index = "";

      const userId = receiver || _id;

      for (let i = 0; i < connectedUsers.length; i++) {
        if (connectedUsers[i]._id === userId) {
          connectedUsers[i].lastMessage = lastMessage;
          isUserAlreadyConnected = true;
          index = i;
          i = connectedUsers.length;
        }
      }

      if (!isUserAlreadyConnected) {
        connectedUsers.unshift({ userId, lastMessage, username });
      } else {
        const oldUserMessage = connectedUsers[index];
        connectedUsers.splice(index, 1);
        connectedUsers.unshift(oldUserMessage);
      }

      return {
        ...state,
        connectedUsers,
      };
    }

    case CHANGE_SELECTED_USER: {
      return {
        ...state,
        selectedUser: payload.user,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default usersReducer;
