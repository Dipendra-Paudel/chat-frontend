import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getConnectedUsers } from "../../api/users";
import { ADD_CONNECTED_USERS } from "../../store/actions/actionTypes";
import IndividualUserMessage from "./IndividualUserMessage";

const ConnectedUsers = () => {
  const dispatch = useDispatch();
  const { connectedUsers, connectedUsersFetched } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    const asyncFetchConnectedUsers = async () => {
      const { status, users } = await getConnectedUsers();
      if (status === "success") {
        dispatch({ type: ADD_CONNECTED_USERS, payload: { users } });
      }
    };

    !connectedUsersFetched && asyncFetchConnectedUsers();
  }, [connectedUsersFetched, dispatch]);

  if (!connectedUsersFetched) {
    return <div className="px-4 text-center">Loading...</div>;
  }

  return (
    <div>
      <div>
        {connectedUsers.map((user, index) => (
          <IndividualUserMessage key={index} user={user} />
        ))}

        {connectedUsers.length === 0 && (
          <div className="font-semibold text-gray-700 px-4 text-center">
            Search user to start a chat
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectedUsers;
