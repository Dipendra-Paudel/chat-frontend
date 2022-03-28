import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { searchUsers } from "../../api/users";
import {
  ADD_SEARCH_USERS_LIST,
  REMOVE_SEARCH_USERS_LIST,
  UPDATE_SEARCHING_USERS,
  UPDATE_SEARCHING_VALUE,
} from "../../store/actions/actionTypes";

let timeout;

const SearchBar = () => {
  const { searchingValue: search } = useSelector((state) => state.search);

  const searchInput = useRef();
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const handleSearchUsers = async (value) => {
    const { status, users } = await searchUsers(value, page);

    if (status === "success") {
      dispatch({
        type: ADD_SEARCH_USERS_LIST,
        payload: {
          users,
          replace: true,
        },
      });
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9_ ]+$/gi;
    const result = regex.test(value);
    clearTimeout(timeout);

    if (result || value === "") {
      dispatch({ type: UPDATE_SEARCHING_VALUE, payload: { value } });

      if (value !== "") {
        timeout = setTimeout(() => handleSearchUsers(value.trim()), 100);
      } else {
        dispatch({
          type: REMOVE_SEARCH_USERS_LIST,
        });
      }
    }
  };

  const handleReset = () => {
    dispatch({ type: UPDATE_SEARCHING_VALUE, payload: { value: "" } });
    searchInput.current.focus();

    dispatch({
      type: REMOVE_SEARCH_USERS_LIST,
    });
  };

  return (
    <div className="px-3 py-2">
      <div className="flex items-center space-x-2">
        <div className="text-gray-500">
          <MenuIcon style={{ fontSize: "25px" }} className="cursor-pointer" />
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            className={`w-full border-2 border-white placeholder-gray-600 p-2 pr-9 text-sm transition-all duration-500 focus:border-blue-400 ${
              search ? "border-gray-400 bg-white" : "bg-gray-200 focus:bg-white"
            }`}
            ref={searchInput}
            placeholder="Search"
            value={search}
            onChange={handleChange}
            spellCheck="false"
          />
          {search && (
            <CloseIcon
              className="absolute top-2 right-2 text-gray-600 cursor-pointer"
              onClick={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
