import useQueryData from "@/components/custom-hooks/useQueryData";
import { devNavUrl, getUrlParam } from "@/components/helpers/functions-general";
import BreadCrumbs from "@/components/partials/BreadCrumbs";
import Header from "@/components/partials/Header";
import NoData from "@/components/partials/NoData";
import FetchingSpinner from "@/components/partials/spinner/FetchingSpinner";
import TableSpinner from "@/components/partials/spinner/TableSpinner";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import { GoChevronRight } from "react-icons/go";
import { PiUserListFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import Navigation from "../../Navigation";
import ServerError from "@/components/partials/ServerError";
import Footer from "@/components/partials/Footer";

const EmployeesList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const id = getUrlParam().get("id");

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

  return (
    <>
      <Header />
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-1"} `}>
        <Navigation menu="employees" submenu="view" />
        <div className="py-3 ml-2 pl-0.5 lg:pl-0">
          <BreadCrumbs param={location.search} />
        </div>

        <div className="relative">
          {isFetching && status !== "loading" && <FetchingSpinner />}

          {isLoading && status !== "pending" && <TableSpinner />}
          {error && (
            <div>
              <ServerError />
            </div>
          )}

          {employees?.data.length === 0 ? (
            <div>
              <NoData />
            </div>
          ) : (
            <div>
              {employees?.data.map((item, key) => (
                <div key={key}>
                  <div className="title text-base py-2.5">
                    <h2 className="uppercase">Employee</h2>
                  </div>
                  <div className="title text-base py-1">
                    {employees?.data.map((item, key) => (
                      <h2 className="uppercase" key={key}>
                        {item.employees_lname}, {item.employees_fname}
                      </h2>
                    ))}
                  </div>
                  <div className="list-content mx-0">
                    <div className="list-button border-b border-dark/40">
                      <Link
                        to={`${devNavUrl}/employees/view/info?id=${item.employees_aid}`} // link to personal info page with the id of the employee.
                        className="flex items-center gap-2 py-3 hover:bg-dark/5"
                      >
                        <span className="flex items-center gap-2 ml-2.5 text-xs font-bold">
                          <PiUserListFill className="text-lg" />
                          Personal Information
                        </span>
                        <GoChevronRight className="text-sm" />
                      </Link>
                    </div>
                  </div>
                  <div className="list-content mx-0">
                    <div className="list-button border-b border-dark/40">
                      <Link
                        to={`${devNavUrl}/employees/view/daily-job-pay?id=${item.employees_aid}`}
                        className="flex items-center gap-2 py-3 hover:bg-dark/5"
                      >
                        <span className="flex items-center gap-2 ml-2.5 text-xs font-bold">
                          <PiUserListFill className="text-lg" />
                          Job and Pay
                        </span>
                        <GoChevronRight className="text-sm" />
                      </Link>
                    </div>
                  </div>
                  <div className="list-content mx-0">
                    <div className="list-button border-b border-dark/40">
                      <Link
                        to="/employees/job-history"
                        className="flex items-center gap-2 py-3 hover:bg-dark/5"
                      >
                        <span className="flex items-center gap-2 ml-2.5 text-xs font-bold">
                          <PiUserListFill className="text-lg" />
                          Job History
                        </span>
                        <GoChevronRight className="text-sm" />
                      </Link>
                    </div>
                  </div>
                  <div className="list-content mx-0">
                    <div className="list-button border-b border-dark/40">
                      <Link
                        to="/employees/government"
                        className="flex items-center gap-2 py-3 hover:bg-dark/5"
                      >
                        <span className="flex items-center gap-2 ml-2.5 text-xs font-bold">
                          <PiUserListFill className="text-lg" />
                          Government Deductions
                        </span>
                        <GoChevronRight className="text-sm" />
                      </Link>
                    </div>
                  </div>
                  <div className="list-content mx-0">
                    <div className="list-button border-b border-dark/40">
                      <Link
                        to="/employees/other"
                        className="flex items-center gap-2 py-3 hover:bg-dark/5"
                      >
                        <span className="flex items-center gap-2 ml-2.5 text-xs font-bold">
                          <PiUserListFill className="text-lg" />
                          Other Benefits
                        </span>
                        <GoChevronRight className="text-sm" />
                      </Link>
                    </div>
                  </div>
                  <div className="list-content mx-0">
                    <div className="list-button border-b border-dark/40">
                      <Link
                        to="/employees/de-minimis"
                        className="flex items-center gap-2 py-3 hover:bg-dark/5"
                      >
                        <span className="flex items-center gap-2 ml-2.5 text-xs font-bold">
                          <PiUserListFill className="text-lg" />
                          De minimis
                        </span>
                        <GoChevronRight className="text-sm" />
                      </Link>
                    </div>
                  </div>
                  <div className="list-content mx-0">
                    <div className="list-button border-b border-dark/40">
                      <Link
                        to="/employees/earnings"
                        className="flex items-center gap-2 py-3 hover:bg-dark/5"
                      >
                        <span className="flex items-center gap-2 ml-2.5 text-xs font-bold">
                          <PiUserListFill className="text-lg" />
                          Earnings
                        </span>
                        <GoChevronRight className="text-sm" />
                      </Link>
                    </div>
                  </div>
                  <div className="list-content mx-0">
                    <div className="list-button border-b border-dark/40">
                      <Link
                        to="/employees/deductions"
                        className="flex items-center gap-2 py-3 hover:bg-dark/5"
                      >
                        <span className="flex items-center gap-2 ml-2.5 text-xs font-bold">
                          <PiUserListFill className="text-lg" />
                          Deductions
                        </span>
                        <GoChevronRight className="text-sm" />
                      </Link>
                    </div>
                  </div>
                  <div className="list-content mx-0">
                    <div className="list-button border-b border-dark/40">
                      <Link
                        to="/employees/payslip"
                        className="flex items-center gap-2 py-3 hover:bg-dark/5"
                      >
                        <span className="flex items-center gap-2 ml-2.5 text-xs font-bold">
                          <PiUserListFill className="text-lg" />
                          Payslip
                        </span>
                        <GoChevronRight className="text-sm" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default EmployeesList;
