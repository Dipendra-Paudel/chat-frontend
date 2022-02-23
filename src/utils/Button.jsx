import React from "react";

export const AuthButton = ({ label, loading }) => {
  return (
    <button
      className={`bg-blue-600 py-2.5 text-white font-semibold ${
        loading ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {label}
    </button>
  );
};
