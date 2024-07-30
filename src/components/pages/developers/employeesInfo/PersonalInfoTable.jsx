import useQueryData from "@/components/custom-hooks/useQueryData";
import FetchingSpinner from "@/components/partials/FetchingSpinner";
import NoData from "@/components/partials/NoData";
import ServerError from "@/components/partials/ServerError";
import TableLoading from "@/components/partials/TableLoading";
import TableSpinner from "@/components/partials/TableSpinner";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";

const PersonalInfoTable = ({ setItemEdit, isLoading, isFetching, status, employees }) => {
  const { store, dispatch } = React.useContext(StoreContext);

 
  const handleAdd = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };
  
  return (
    <div className="pt-2 lg:pt-4 lg:w-[600px] pb-16">
      <div className="text-base">
        <h2>PERSONAL INFORMATION</h2>
      </div>
      <div className="flex gap-3 items-center my-3">
        <img
          src="https:/via.placeholder.com/50x50"
          alt=""
          className="rounded-full"
        />
        <h2 className="uppercase">Name</h2>
      </div>

      <div className="border-b-2 flex justify-between p-1">
        <h2>BASIC INFORMATION</h2>
        <button
          className="flex items-center gap-1 text-primary"
          onClick={() => handleAdd(item)}
        >
          <FaPencilAlt />
          Update
        </button>
      </div>
      {isFetching && status !== "loading" && <FetchingSpinner />}

      <div className=" py-5 mb-2 lg:py-3 lg:indent-4">
        {/* {isLoading && status !== "pending" && <TableSpinner />}
        {error && (
          <tr className="text-center ">
            <td colSpan="100%" className="p-10">
              <ServerError />
            </td>
          </tr>
        )}

        {isLoading ? (
          <tr>
            <td>
              <TableLoading cols={2} count={8} />
            </td>
          </tr>
        ) : employees?.data.length === 0 ? (
          <tr>
            <td>
              <NoData />
            </td>
          </tr>
        ) : ( */}
        <>
          {/* {employees?.data.map((item, key) => ( */}
          <ul
            className="grid grid-cols-[50px_1fr] lg:grid-cols-[200px_1fr] gap-y-4 lg:gap-y-2 text-pretty"
            // key={key}
          >
            <li className="font-bold">Code:</li>
            <li>ffdd</li>
            <li className="font-bold">First Name:</li>
            <li>ffdd</li>
            <li className="font-bold">Middle Name:</li>
            <li>ffdd</li>
            <li className="font-bold">Last Name:</li>
            <li>ffdd</li>
            <li className="font-bold">Birth Date:</li>
            <li>ffdd</li>
            <li className="font-bold">Marital Status:</li>
            <li>ffdd</li>
            <li className="font-bold">Street:</li>
            <li>ffdd</li>
            <li className="font-bold">City:</li>
            <li>ffdd</li>
            <li className="font-bold">Province:</li>
            <li>ffdd</li>
            <li className="font-bold">Country:</li>
            <li>ffdd</li>
            <li className="font-bold">Postal Code:</li>
            <li>ffdd</li>
            <li className="font-bold">Mobile Number:</li>
            <li>ffdd</li>
            <li className="font-bold">Telephone Number:</li>
            <li>ffdd</li>
            <li className="font-bold">Personal Email:</li>
            <li>ffdd</li>
          </ul>
          {/* ))} */}
        </>
        {/* )} */}
      </div>

      <div className="border-b-2 flex justify-between p-1">
        <h2>FAMILY INFO.</h2>
      </div>
      <div className="py-5 lg:py-3 lg:indent-4">
            <ul className="grid grid-cols-[50px_1fr] lg:grid-cols-[200px_1fr] gap-y-4 lg:gap-y-2 text-pretty">
                <li className="font-bold">Mother's Maiden Name:</li>
                <li>mother</li>
                <li className="font-bold">Mother's First Name:</li>
                <li>mother</li>
            </ul>
        </div>
    </div>
  );
};

export default PersonalInfoTable;
