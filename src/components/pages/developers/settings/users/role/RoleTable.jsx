import NoData from "@/components/partials/NoData";
import ServerError from "@/components/partials/ServerError";
import Status from "@/components/partials/Status";
import TableLoading from "@/components/partials/TableLoading";
import React from "react";
import { FaArchive, FaEdit } from "react-icons/fa";

const RoleTable = () => {
  return (
    <div className="shadow-md rounded-md overflow-y-auto mt-3">
      {/* <FetchingSpinner /> */}
      <table>
        <thead>
          <tr>
            <th className="pl-2">#</th>
            <th>Status</th>
            <th>Role Name</th>
            <th>Role Description</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="relative">
          {/* <TableSpinner /> */}

          <tr className="text-center">
            <td colSpan="100%" className="p-10">
              <TableLoading />
            </td>
          </tr>

          <tr className="text-center">
            <td colSpan="100%" className="p-10">
              <NoData />
            </td>
          </tr>

          <tr className="text-center ">
            <td colSpan="100%" className="p-10">
              <ServerError />
            </td>
          </tr>

          <tr>
            <td className="pl-2">1.</td>
            <td>
              <Status text="Active" />
            </td>
            <td>Developer</td>
            <td>System Developer</td>
            <td className="flex items-center gap-3 justify-end">
              <button className="tooltip-action-table" data-tooltip="Edit">
                <FaEdit className="text-gray-600" />
              </button>
              <button className="tooltip-action-table" data-tooltip="Archive">
                <FaArchive className=" text-gray-600 text-[10px]" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-center mt-5">
        <span className=" pb-10">
          End of List.
        </span>
      </div>
    </div>
  );
};

export default RoleTable;
