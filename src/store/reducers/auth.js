import { LOGIN_USER, LOGOUT_USER } from "../actions/actionTypes";

const initialState = {
  loggedIn: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_USER: {
      return {
        ...state,
        loggedIn: true,
        user: payload.user,
      };
    }

    case LOGOUT_USER: {
      return {
        ...state,
        loggedIn: false,
        user: {},
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default authReducer;
