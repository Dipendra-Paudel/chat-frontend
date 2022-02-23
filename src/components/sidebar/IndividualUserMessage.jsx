import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_SELECTED_USER } from "../../store/actions/actionTypes";

const IndividualUserMessage = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.users);
  const { username, lastMessage } = user;
  const { message, time } = lastMessage;

  const date = new Date(time);
  const messageDay = date.getDate();
  const messageMonth = date.getMonth() + 1;
  const messageYear = date.getFullYear();

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  let showingDateTime = "";

  if (messageYear === currentYear) {
    if (messageMonth === currentMonth && messageDay === currentDay) {
      let hours = date.getHours();
      let minutes = date.getMinutes();

      String(hours).length === 1 && (hours = `0${hours}`);
      String(minutes).length === 1 && (minutes = `0${minutes}`);

      showingDateTime = `${hours}:${minutes}`;
    } else {
      showingDateTime = `${date.toLocaleString("default", {
        month: "short",
      })} ${messageDay}`;
    }
  } else {
    showingDateTime = `${messageYear}/${messageMonth}/${messageDay}`;
  }

  const setActiveUser = () => {
    dispatch({
      type: CHANGE_SELECTED_USER,
      payload: {
        user,
      },
    });
  };

  const { _id } = selectedUser;

  return (
    <div
      className={`px-3 py-2 cursor-pointer ${
        _id === user._id ? "bg-primary" : "hover:bg-gray-50"
      } `}
      onClick={setActiveUser}
    >
      <div className="relative">
        <div className="flex space-x-2 items-center">
          <div className="w-10 h-10 flex-shrink-0">
            <img
              src="https://hairmanz.com/wp-content/uploads/2020/03/thomas-shelby-peaky-blinders-haircut-8.jpg"
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="overflow-hidden">
            <div
              className={`font-semibold ${
                _id === user._id ? "text-white" : ""
              }`}
            >
              {username}
            </div>
            <div
              className={`text-sm truncate ${
                _id === user._id ? "text-gray-100" : "text-gray-600"
              }`}
            >
              {message}
            </div>
          </div>
        </div>
        <div
          className={`absolute top-0 right-0 text-sm ${
            _id === user._id ? "text-gray-100" : "text-gray-600"
          }`}
        >
          {showingDateTime}
        </div>
      </div>
    </div>
  );
};

export default IndividualUserMessage;
