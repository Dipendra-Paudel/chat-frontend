import { combineReducers } from "redux";
import authReducer from "./reducers/auth";
import { messageReducer } from "./reducers/message";
import searchReducer from "./reducers/search";
import settingsReducer from "./reducers/settings";
import usersReducer from "./reducers/users";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  settings: settingsReducer,
  message: messageReducer,
  search: searchReducer,
});

export default rootReducer;
