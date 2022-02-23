import React from "react";
import { useSelector } from "react-redux";
import ConnectedUsers from "./ConnectedUsers";
import SearchBar from "./SearchBar";
import UsersSearchResult from "./UsersSearchResult";

const Sidebar = () => {
  const { usersSearched } = useSelector((state) => state.search);

  return (
    <div className="h-full">
      <SearchBar />

      <div className="connected-users">
        {usersSearched && <UsersSearchResult />}
        {!usersSearched && <ConnectedUsers />}
      </div>
    </div>
  );
};

export default Sidebar;
