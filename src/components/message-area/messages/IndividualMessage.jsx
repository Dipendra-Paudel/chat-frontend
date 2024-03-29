import React from "react";

const IndividualMessage = ({ msg }) => {
  const { message, received } = msg;
  return (
    <div
      className={`whitespace-pre-line flex ${received ? "" : "justify-end"}`}
    >
      <div
        className={`px-3 py-1 rounded-2xl break-words ${
          received ? "bg-gray-200" : "bg-primary text-white"
        }`}
        style={{ maxWidth: "60%" }}
      >
        {message.trim()}
      </div>
    </div>
  );
};

export default IndividualMessage;
