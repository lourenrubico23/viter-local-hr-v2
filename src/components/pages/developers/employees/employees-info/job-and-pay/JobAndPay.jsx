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

const JobAndPay = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isEditShow, setEditShow] = React.useState(false);
  const [hireDate, setHireDate] = React.useState("");
  const [tenure, setTenure] = React.useState({ years: 0, months: 0 });

  // Function to calculate tenure
  const calculateTenure = (date) => {
    const currentDate = new Date();
    const hire = new Date(date);

    let years = currentDate.getFullYear() - hire.getFullYear();
    let months = currentDate.getMonth() - hire.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (currentDate.getDate() < hire.getDate()) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }

    return { years, months };
  };

  // Handle date change
  const handleDateChange = (e) => {
    const date = e.target.value;
    setHireDate(date);
    setTenure(calculateTenure(date));
  };

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
        />
        <Footer />
      </div>

      {store.isAdd && (
        <ModalUpdateJobInfo
          itemEdit={itemEdit}
          hireDate={hireDate}
          handleDateChange={handleDateChange}
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
