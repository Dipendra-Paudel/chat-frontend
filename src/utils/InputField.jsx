import React from "react";

const InputField = ({ type, placeholder, value, handleChange, error }) => {
  if (type === "text") {
    return (
      <div>
        <div className="text-gray-600">{placeholder}:</div>
        <div>
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className="border border-gray-300 focus:border-gray-400 w-full px-3 py-2 text-gray-600 focus:text-gray-800"
            autoComplete="none"
            spellCheck="false"
          />
        </div>
        {error && <div className="text-red-400 text-sm mt-1">{error}</div>}
      </div>
    );
  }

  if (type === "password") {
    return (
      <div>
        <div className="text-gray-600">{placeholder}:</div>
        <div>
          <input
            type="password"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className="border border-gray-300 focus:border-gray-400 w-full px-3 py-2"
            autoComplete="none"
          />
        </div>
        {error && <div className="text-red-400 text-sm mt-1">{error}</div>}
      </div>
    );
  }

  return <div>Invalid type</div>;
};

export default InputField;
