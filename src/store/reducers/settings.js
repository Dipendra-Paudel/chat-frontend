import { TOGGLE_SCREEN_SPLIT } from "../actions/actionTypes";

const initialState = {
  screenSplit: true,
};

const settingsReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case TOGGLE_SCREEN_SPLIT: {
      return {
        ...state,
        screenSplit: !state.screenSplit,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default settingsReducer;
