import React, { useState, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const SearchBar = () => {
  const searchInput = useRef();
  const [search, setSearch] = useState("");

  const handleChange = (event) => setSearch(event.target.value);
  const handleReset = () => {
    setSearch("");
    searchInput.current.focus();
  };

  return (
    <div className="px-3 py-2">
      <div className="flex items-center space-x-2">
        <div className="text-gray-500">
          <MenuIcon style={{ fontSize: "25px" }} />
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            className={`w-full border-2 border-white placeholder-gray-600 p-2 text-sm transition-all duration-500 focus:border-blue-400 ${
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
