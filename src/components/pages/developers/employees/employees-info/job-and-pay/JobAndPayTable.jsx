import useQueryData from "@/components/custom-hooks/useQueryData";
import {
  formatDate,
  getUrlParam,
} from "@/components/helpers/functions-general";
import NoData from "@/components/partials/NoData";
import FetchingSpinner from "@/components/partials/spinner/FetchingSpinner";
import TableSpinner from "@/components/partials/spinner/TableSpinner";
import TableLoading from "@/components/partials/TableLoading";
import { setIsAdd } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { getSuperviorName } from "./functions";

const JobAndPayTable = ({ setItemEdit, setEditShow, tenure }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const id = getUrlParam().get("id"); // used to extract a query parameter named "id" from the URL and assign its value to a constant named "id".

  const {
    isLoading,
    isFetching,
    error,
    status,
    data: employees,
  } = useQueryData(
    `/v2/employees/${id}`, // endpoint
    "get", // method
    "job-pay" // key
  );

  const {
    isLoadingDirectReport,
    isFetchingDirectReport,
    errorDirectReport,
    statusDirectReport,
    data: directReport,
  } = useQueryData(
    `/v2/direct-report`, // endpoint
    "get", // method
    "direct-report" // key
  );

  const handleJob = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handlePay = (item) => {
    setEditShow(true);
    setItemEdit(item);
  };

  return (
    <div className="pt-2 lg:pt-2 lg:w-[600px] pb-16 relative">
      {isFetching && status !== "loading" && <FetchingSpinner />}

      <div className="relative">
        {isLoading && status !== "pending" && <TableSpinner />}
        {error && (
          <div>
            <NoData />
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
                <div className="text-base">
                  <h2>DAILY JOB AND PAY</h2>
                </div>
                <div className="flex gap-3 items-center my-3">
                  {employees?.data.map((item, key) => (
                    <h2 className="uppercase text-sm" key={key}>
                      {item.employees_lname}, {item.employees_fname}
                    </h2>
                  ))}
                </div>
                <div className="border-b-2 flex justify-between p-1">
                  <h2>JOB INFORMATION</h2>
                  <button
                    className="flex items-center gap-1 text-primary"
                    onClick={() => handleJob(employees.data[0])}
                  >
                    <FaPencilAlt />
                    Update
                  </button>
                </div>

                <div className=" py-5 mb-2 lg:py-3 lg:indent-4">
                  <ul className="grid grid-cols-[160px_1fr] lg:grid-cols-[220px_1fr] gap-y-4 lg:gap-y-2 text-pretty">
                    <li className="font-bold">Employee Number:</li>
                    <li>
                      {item.employees_number
                        ? item.employees_number
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Department:</li>
                    <li>
                      {item.employees_department_name
                        ? item.employees_department_name
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Job Level:</li>
                    <li>
                      {item.employees_job_level_name
                        ? item.employees_job_level_name
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Job Title:</li>
                    <li>
                      {item.employees_job_title_name
                        ? item.employees_job_title_name
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Supervisor:</li>
                    <li>
                      {directReport?.data.map((item, key) => {
                        <div key={key}>
                          {item.direct_report_supervisor_name}
                          {console.log(item.direct_report_supervisor_name)}
                        </div>
                      })}
                    </li>

                    <li className="font-bold">Work Email:</li>
                    <li>
                      {item.employees_work_email
                        ? item.employees_work_email
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Date Hired:</li>
                    <li>
                      {formatDate(item.employees_date_hire)
                        ? item.employees_date_hire
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Regularized On:</li>
                    <li>
                      {formatDate(item.employees_regularized_date)
                        ? item.employees_regularized_date
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Date Separated:</li>
                    <li>
                      {formatDate(item.employees_separated_date)
                        ? item.employees_separated_date
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Tenure:</li>
                    <li>
                      {tenure.years} years and {tenure.months} months
                    </li>
                    <li className="font-bold">TIN:</li>
                    <li>
                      {item.employees_tin_number
                        ? item.employees_tin_number
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Philhealth Number:</li>
                    <li>
                      {item.employees_philhealth_number
                        ? item.employees_philhealth_number
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">SSS Number:</li>
                    <li>
                      {item.employees_sss_number
                        ? item.employees_sss_number
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Pag-ibig Number:</li>
                    <li>
                      {item.employees_pagibig_number
                        ? item.employees_pagibig_number
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Drive Link:</li>
                    <li>
                      {item.employees_drive_link
                        ? item.employees_drive_link
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Comment:</li>
                    <li>
                      {item.employees_comment
                        ? item.employees_comment
                        : "Unspecified"}
                    </li>
                  </ul>
                </div>

                <div className="border-b-2 flex justify-between p-1 mt-5">
                  <h2>PAY INFORMATION</h2>
                  <button
                    className="flex items-center gap-1 text-primary"
                    onClick={() => handlePay(employees.data[0])}
                  >
                    <FaPencilAlt />
                    Update
                  </button>
                </div>
                <div className="py-5 lg:py-3 lg:indent-4">
                  <ul className="grid grid-cols-[160px_1fr] lg:grid-cols-[220px_1fr] gap-y-4 lg:gap-y-2 text-pretty">
                    <li className="font-bold">Payroll Eligibility:</li>
                    <li>
                      {item.employees_eligibility
                        ? item.employees_eligibility
                        : "No"}
                    </li>
                    <li className="font-bold">Pay Type:</li>
                    <li>
                      {item.employees_pay_type
                        ? item.employees_pay_type
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Per Hour:</li>
                    <li>
                      {item.employees_per_hour && (
                        <span className="mr-1">&#8369;</span>
                      )
                        ? item.employees_per_hour
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Pay Frequency:</li>
                    <li>
                      {item.employees_pay_frequency
                        ? item.employees_pay_frequency
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Working Days:</li>
                    <li>
                      {item.employees_working_days
                        ? item.employees_working_days
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Rest Day:</li>
                    <li>
                      {item.employees_rest_day
                        ? item.employees_rest_day
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Working Hours:</li>
                    <li>
                      {item.employees_working_hours_start
                        ? item.employees_working_hours_start
                        : "Unspecified"}
                    </li>
                    <li className="font-bold">Hours Per Day:</li>
                    <li>
                      {item.employees_hours_per_day
                        ? item.employees_hours_per_day
                        : "0"}
                    </li>
                    <li className="font-bold">Bank Account:</li>
                    <li>
                      {item.employees_bank_account
                        ? item.employees_bank_account
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

export default JobAndPayTable;
