import Header from "@/components/partials/Header";
import { StoreContext } from "@/store/StoreContext";
import React, { useState } from "react";
import Navigation from "../../../Navigation";
import BreadCrumbs from "@/components/partials/BreadCrumbs";
import JobAndPayTable from "./JobAndPayTable";
import Footer from "@/components/partials/Footer";
import ModalUpdateJobInfo from "./ModalUpdateJobInfo";
import ModalUpdatePayInfo from "./ModalUpdatePayInfo";
import ModalSuccess from "@/components/partials/modals/ModalSuccess";
import ModalError from "@/components/partials/modals/ModalError";
import {
  calculateTenure,
  getUrlParam,
} from "@/components/helpers/functions-general";
import useQueryData from "@/components/custom-hooks/useQueryData";

const JobAndPay = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isEditShow, setEditShow] = React.useState(false);
  const [hireDate, setHireDate] = React.useState("");
  const [tenure, setTenure] = React.useState({ years: 0, months: 0 });
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

  

  return (
    <>
      <Header />
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-2"}`}>
        <Navigation menu="employees" />
        <div className="py-3 ml-2 flex justify-between ">
          <BreadCrumbs param={location.search} />
        </div>
        <JobAndPayTable
          setItemEdit={setItemEdit}
          setEditShow={setEditShow}
          tenure={tenure}
          employees={employees}
          isFetching={isFetching}
          isLoading={isLoading}
          error={error}
          status={status}
        />
        <Footer />
      </div>

      {store.isAdd && (
        <ModalUpdateJobInfo
          itemEdit={itemEdit}
          hireDate={hireDate}
          setHireDate={setHireDate}
          setTenure={setTenure}
        />
      )}
      {isEditShow && (
        <ModalUpdatePayInfo itemEdit={itemEdit} setEditShow={setEditShow} />
      )}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default JobAndPay;
