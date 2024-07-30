import Header from "@/components/partials/Header";
import React from "react";
import Navigation from "../Navigation";
import { StoreContext } from "@/store/StoreContext";
import { setIsAdd, setIsSettingsOpen } from "@/store/StoreAction";
import { FaPlus } from "react-icons/fa6";
import EmployeesTable from "./EmployeesTable";
import Footer from "@/components/partials/Footer";
import ModalAddEmployees from "./ModalAddEmployees";
import ModalSuccess from "@/components/partials/ModalSuccess";
import ModalError from "@/components/partials/ModalError";
import useQueryData from "@/components/custom-hooks/useQueryData";
import PersonalInfo from "../employeesInfo/PersonalInfo";

const Employees = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  const {
    isLoading: departmentIsLoading,
    isFetching: departmentIsFetching,
    error: departmentError,
    data: departmentData,
  } = useQueryData(
    `/v2/department`, // endpoint
    "get", // method
    "department" // key
  );

  return (
    <>
      <Header />
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-2"}`}>
        <Navigation menu="employees" />
        <div className="py-3 ml-2 flex justify-between">
          <div className="text-base ml-2">
            <h2>Employees</h2>
          </div>
          <button
            className="flex items-center gap-1 text-primary"
            onClick={handleAdd}
          >
            <FaPlus />
            Add
          </button>
        </div>
        <div className="pb-4">
          <EmployeesTable setItemEdit={setItemEdit} departmentData={departmentData} />
        </div>
        <Footer />
      </div>

      {store.isAdd && (
        <ModalAddEmployees itemEdit={itemEdit} departmentData={departmentData} />
      )}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Employees;
