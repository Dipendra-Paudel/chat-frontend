import React from "react";
import { useSelector } from "react-redux";
import IndividualUserMessage from "./IndividualUserMessage";

const UsersSearchResult = () => {
  const { users } = useSelector((state) => state.search);

  return (
    <div>
      <div>
        {users.map((user, index) => (
          <IndividualUserMessage key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersSearchResult;
