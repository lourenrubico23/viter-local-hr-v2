import React from "react";

const Status = ({ text }) => {
  return (
    <>
      <span
        className={` ${
          text === "Active"
            ? "bg-green-100 text-green-800 border border-green-200 text-xs font-medium mr-2 px-2 py-0.5 rounded-md"
            : text === "Inactive"
            ? "bg-red-100 text-red-800 border border-red-200 text-xs font-medium mr-2 px-2 py-0.5 rounded-md"
            : ""
        }`}
      >
        
        {text}
      </span>
    </>
  );
};

export default Status;
