import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { TOGGLE_SCREEN_SPLIT } from "../../../store/actions/actionTypes";

const UserInfo = () => {
  const { screenSplit } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  return (
    <div
      className={`flex-shrink-0 overflow-hidden border-l border-gray-200 ${
        screenSplit ? "w-72" : "w-0"
      }`}
    >
      <div className="w-72">
        <div>
          <div className="flex justify-between items-center h-14 py-2 px-4">
            <div className="font-semibold">User Info</div>
            <div>
              <CloseIcon
                className="text-gray-700 cursor-pointer"
                onClick={() => dispatch({ type: TOGGLE_SCREEN_SPLIT })}
              />
            </div>
          </div>
          <div>
            <div></div>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div>
            <div>
              <div></div>
              <div></div>
            </div>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
