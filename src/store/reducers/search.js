import {
  ADD_SEARCH_USERS_LIST,
  REMOVE_SEARCH_USERS_LIST,
  UPDATE_SEARCHING_USERS,
  UPDATE_SEARCHING_VALUE,
} from "../actions/actionTypes";

const initialState = {
  users: [],
  searchingValue: "",
  usersSearched: false,
  searchingUsers: false,
};

const searchReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_SEARCH_USERS_LIST: {
      const { users: oldUsers } = state;
      const { users, replace } = payload;

      return {
        ...state,
        users: replace ? users : [...oldUsers, users],
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
      const { searchingUsers, usersSearched } = payload;
      const options = {};
      searchingUsers !== undefined && (options.searchingUsers = searchingUsers);
      usersSearched !== undefined && (options.usersSearched = usersSearched);

      return {
        ...state,
        ...options,
      };
    }

    case UPDATE_SEARCHING_VALUE: {
      const { value } = payload;

      return {
        ...state,
        searchingValue: value,
      };
    }

    default: {
      return state;
    }
  }
};

export default searchReducer;
