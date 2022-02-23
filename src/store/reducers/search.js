import {
  ADD_SEARCH_USERS_LIST,
  REMOVE_SEARCH_USERS_LIST,
  UPDATE_SEARCHING_USERS,
} from "../actions/actionTypes";

const initialState = {
  users: [],
  usersSearched: false,
  searchingUsers: false,
};

const searchReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_SEARCH_USERS_LIST: {
      const { users: oldUsers } = state;
      const { users } = payload;

      return {
        ...state,
        users: [...oldUsers, users],
        usersSearched: true,
        searchingUsers: false,
      };
    }

    case REMOVE_SEARCH_USERS_LIST: {
      return {
        ...state,
        users: [],
        usersSearched: false,
        searchingUsers: false,
      };
    }

    case UPDATE_SEARCHING_USERS: {
      const { searchingUsers } = payload;

      return {
        ...state,
        searchingUsers,
      };
    }

    default: {
      return state;
    }
  }
};

export default searchReducer;
