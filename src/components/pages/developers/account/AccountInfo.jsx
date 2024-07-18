import React from "react";
import { FaSave } from "react-icons/fa";

const AccountInfo = () => {
  return (
    <>
      <div className="pt-2 lg:pt-4 lg:w-[600px] pb-16">
        <h2 className="border-b-2">INFORMATION</h2>
        <div className=" py-5 lg:py-8 lg:indent-4">
          <ul className="grid grid-cols-[50px_1fr] lg:grid-cols-[200px_1fr] gap-y-4 lg:gap-y-6 text-pretty">
            <li className="font-bold">Name:</li>
            <li className="truncate">Louren Isobel</li>
            <li className="font-bold">Email:</li>
            <li className="truncate">Louren@gmail.com</li>
          </ul>
        </div>
        <h2 className="border-b-2">PASSWORD</h2>
        <div className="py-5 lg:py-8 lg:indent-4 grid lg:grid-cols-[215px_1fr] gap-y-3 lg:gap-y-7 items-center">
          <h3>Current Password: </h3>
          <input type="text" placeholder="Current Password" />
          <h3>New Password:</h3>
          <input type="text" placeholder="New Password" />
          <h3>Confirm New Password:</h3>
          <input type="text" placeholder="Confirm New Password" />
        </div>
        <div className="w-20 float-right">
          <button className="btn-modal-submit flex items-center gap-1.5">
            <FaSave />
            <span>Save</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
