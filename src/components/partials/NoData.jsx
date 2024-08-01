import React from "react";
import { FaFolderOpen } from "react-icons/fa6";

const NoData = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col p-2">
        <div className="text-4xl text-gray-400 flex justify-center w-full">
          <FaFolderOpen />
        </div>
        <span className="font-bold text-gray-300 text-sm">No Data</span>
      </div>
    </>
  );
};

export default NoData;
