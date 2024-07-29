import React from "react";
import { FaFolderOpen } from "react-icons/fa6";

const NoData = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col p-2">
        <span className="text-4xl text-gray-400">
          <FaFolderOpen />
        </span>
        <span className="font-bold text-gray-300 text-sm">No Data</span>
      </div>
    </>
  );
};

export default NoData;
