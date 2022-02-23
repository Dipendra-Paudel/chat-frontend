import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MessageTitleMenu from "./MessageTitleMenu";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import { TOGGLE_SCREEN_SPLIT } from "../../../store/actions/actionTypes";

const MessageAreaTitle = ({ username }) => {
  const { screenSplit } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="h-14 py-2 px-4 flex items-center justify-between">
        <div>{username}</div>
        <div className="flex items-center space-x-1">
          <VerticalSplitIcon
            className={`mt-0.5 cursor-pointer ${
              screenSplit ? "text-blue-500" : ""
            }`}
            onClick={() => dispatch({ type: TOGGLE_SCREEN_SPLIT })}
          />
          <MessageTitleMenu />
        </div>
      </div>
    </div>
  );
};

export default MessageAreaTitle;
