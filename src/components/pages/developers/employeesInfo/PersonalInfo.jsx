import Header from "@/components/partials/Header";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import Navigation from "../Navigation";
import BreadCrumbs from "@/components/partials/BreadCrumbs";
import { FaPlus } from "react-icons/fa6";
import PersonalInfoTable from "./PersonalInfoTable";
import Footer from "@/components/partials/Footer";
import { getUrlParam } from "@/components/helpers/functions-general";
import ModalUpdatePersonalInfo from "./ModalUpdatePersonalInfo";
import ModalSuccess from "@/components/partials/ModalSuccess";
import ModalError from "@/components/partials/ModalError";
import { FaPencilAlt } from "react-icons/fa";
import useQueryData from "@/components/custom-hooks/useQueryData";

const PersonalInfo = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
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
    "employees" // key
  );
  return (
    <>
      <Header />
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-2"}`}>
        <Navigation menu="employees" submenu="users" />
        <div className="py-3 ml-2 flex justify-between ">
          <BreadCrumbs />
        </div>
        <PersonalInfoTable setItemEdit={setItemEdit} id={id} isLoading={isLoading} isFetching={isFetching} status={status} employees={employees} />
      </div>

      <Footer />

      {store.isAdd && <ModalUpdatePersonalInfo itemEdit={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default PersonalInfo;
