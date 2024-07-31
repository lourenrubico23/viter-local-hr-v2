import useQueryData from "@/components/custom-hooks/useQueryData";
import { getUrlParam } from "@/components/helpers/functions-general";
import FetchingSpinner from "@/components/partials/FetchingSpinner";
import NoData from "@/components/partials/NoData";
import ServerError from "@/components/partials/ServerError";
import TableLoading from "@/components/partials/TableLoading";
import TableSpinner from "@/components/partials/TableSpinner";
import { setIsAdd } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";

const PersonalInfoTable = ({ setItemEdit, setEditShow }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const id = getUrlParam().get("id"); // used to extract a query parameter named "empid" from the URL and assign its value to a constant named "id".

  const {
    isLoading,
    isFetching,
    error,
    status,
    data: employees,
  } = useQueryData(
    `/v2/employees/${id}`, // endpoint
    "get", // method
    "employeesInfo" // key
  );

  const handleAdd = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleEdit = (item) => {
    setEditShow(true);
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
        {employees?.data.map((item, key) => (
          <h2 className="uppercase" key={key}>
            {item.employees_fname} {item.employees_lname}
          </h2>
        ))}
      </div>

      {isFetching && status !== "loading" && <FetchingSpinner />}

      <div className="border-b-2 flex justify-between p-1">
        <h2>BASIC INFORMATION</h2>
        <button
          className="flex items-center gap-1 text-primary"
          onClick={() => handleAdd(employees.data[0])}
        >
          <FaPencilAlt />
          Update
        </button>
      </div>

      <div className=" py-5 mb-2 lg:py-3 lg:indent-4 relative">
        {isLoading && status !== "pending" && <TableSpinner />}
        {error && (
          <div className="text-center ">
            <ServerError />
          </div>
        )}

        {isLoading ? (
          <div>
            <TableLoading cols={2} count={15} />
          </div>
        ) : employees?.data.length === 0 ? (
          <div>
            <NoData />
          </div>
        ) : (
          <div>
            {employees?.data.map((item, key) => (
              <div key={key}>
                <ul className="grid grid-cols-[100px_1fr] lg:grid-cols-[220px_1fr] gap-y-4 lg:gap-y-2 text-pretty">
                  <li className="font-bold">Code:</li>
                  <li>{item.employees_number}</li>
                  <li className="font-bold">First Name:</li>
                  <li>{item.employees_fname}</li>
                  <li className="font-bold">Middle Name:</li>
                  <li>
                    {item.employees_mname
                      ? item.employees_mname
                      : "Unspecified"}
                  </li>
                  <li className="font-bold">Last Name:</li>
                  <li>{item.employees_lname}</li>
                  <li className="font-bold">Birth Date:</li>
                  <li>{item.employees_birth_date}</li>
                  <li className="font-bold">Marital Status:</li>
                  <li>{item.employees_marital_status}</li>
                  <li className="font-bold">Street:</li>
                  <li>
                    {item.employees_street
                      ? item.employees_street
                      : "Unspecified"}
                  </li>
                  <li className="font-bold">City:</li>
                  <li>
                    {item.employees_city ? item.employees_city : "Unspecified"}
                  </li>
                  <li className="font-bold">Province:</li>
                  <li>
                    {item.employees_province
                      ? item.employees_province
                      : "Unspecified"}
                  </li>
                  <li className="font-bold">Country:</li>
                  <li>
                    {item.employees_country
                      ? item.employees_country
                      : "Unspecified"}
                  </li>
                  <li className="font-bold">Postal Code:</li>
                  <li>
                    {item.employees_postal_code
                      ? item.employees_postal_code
                      : "Unspecified"}
                  </li>
                  <li className="font-bold">Mobile Number:</li>
                  <li>{item.employees_mobile_number}</li>
                  <li className="font-bold">Telephone Number:</li>
                  <li>
                    {item.employees_telephone_number
                      ? item.employees_telephone_number
                      : "Unspecified"}
                  </li>
                  <li className="font-bold">Personal Email:</li>
                  <li>{item.employees_personal_email}</li>
                </ul>
                <div className="border-b-2 flex justify-between p-1 mt-5">
                  <h2>FAMILY INFO.</h2>
                  <button
                    className="flex items-center gap-1 text-primary"
                    onClick={() => handleEdit(employees.data[0])}
                  >
                    <FaPencilAlt />
                    Update
                  </button>
                </div>
                <div className="py-5 lg:py-3 lg:indent-4">
                  <ul className="grid grid-cols-[100px_1fr] lg:grid-cols-[220px_1fr] gap-y-4 lg:gap-y-2 text-pretty">
                    <li className="font-bold">Mother's Maiden Name:</li>
                    <li>
                      {item.employees_mother_maiden
                        ? item.employees_mother_maiden
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Mother's First Name:</li>
                    <li>
                      {item.employees_mother_fname
                        ? item.employees_mother_fname
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Father's Last Name:</li>
                    <li>
                      {item.employees_father_lname
                        ? item.employees_father_lname
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Father's First Name:</li>
                    <li>
                      {item.employees_father_fname
                        ? item.employees_father_fname
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Father's Middle Name:</li>
                    <li>
                      {item.employees_father_mname
                        ? item.employees_father_mname
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Family Home Contact:</li>
                    <li>
                      {item.employees_family_contact
                        ? item.employees_family_contact
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Family Home Address:</li>
                    <li>
                      {item.employees_family_address
                        ? item.employees_family_address
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Emergency Contact Name:</li>
                    <li>
                      {item.employees_emergency_contact_name
                        ? item.employees_emergency_contact_name
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">
                      Emergency Contact Relationship:
                    </li>
                    <li>
                      {item.employees_emergency_contact_relationship
                        ? item.employees_emergency_contact_relationship
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Emergency Contact Number:</li>
                    <li>
                      {item.employees_emergency_contact_number
                        ? item.employees_emergency_contact_number
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Emergency Contact Address:</li>
                    <li>
                      {item.employees_emergency_contact_address
                        ? item.employees_emergency_contact_address
                        : "Unspecified"}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoTable;
