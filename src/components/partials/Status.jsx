import React from "react";

const Status = ({ text }) => {
  return (
    <>
      <span
        className={` ${
          text === "Active"
            ? "bg-green-100 text-green-800 border border-green-200 text-xs font-medium mr-2 px-2 py-0.5 rounded-md"
            : text === "Inactive"
            ? "bg-gray-50 text-gray-500 border border-gray-200 text-xs font-medium mr-2 px-2 py-0.5 rounded-md"
            : ""
        }`}
      >
        
        {text}
      </span>
    </>
  );
};

export default Status;
