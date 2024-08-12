import BreadCrumbs from "@/components/partials/BreadCrumbs";
import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import ModalError from "@/components/partials/modals/ModalError";
import ModalSuccess from "@/components/partials/modals/ModalSuccess";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import ModalUpdatePersonalInfo from "./ModalUpdatePersonalInfo";
import ModalUpdateFamilyInfo from "./ModalUpdateFamilyInfo";
import Navigation from "../../../Navigation";
import PersonalInfoTable from "./PersonalInfoTable";

const PersonalInfo = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isEditShow, setEditShow] = React.useState(false);

  return (
    <>
      <Header />
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-2"}`}>
        <Navigation menu="employees" />
        <div className="py-3 ml-2 flex justify-between ">
          <BreadCrumbs param={location.search} />
        </div>
        <PersonalInfoTable
          setItemEdit={setItemEdit}
          setEditShow={setEditShow}
        />
        <Footer />
      </div>

      {store.isAdd && <ModalUpdatePersonalInfo itemEdit={itemEdit} />}
      {isEditShow && (
        <ModalUpdateFamilyInfo itemEdit={itemEdit} setEditShow={setEditShow} />
      )}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default PersonalInfo;
