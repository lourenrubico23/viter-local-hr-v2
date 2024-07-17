import Header from "@/components/partials/Header";
import React from "react";
import Navigation from "../../../Navigation";
import BreadCrumbs from "@/components/partials/BreadCrumbs";
import { FaPlus } from "react-icons/fa6";
import FbsAdminTable from "./FbsAdminTable";
import Footer from "@/components/partials/Footer";
import { StoreContext } from "@/store/StoreContext";
import {
  setIsAdd,
  setIsItemEdit,
  setIsSettingsOpen,
} from "@/store/StoreAction";
import ModalAddFbsAdmin from "./ModalAddFbsAdmin";

const FbsAdmin = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
  };

  React.useEffect(() => {
    dispatch(setIsSettingsOpen(true));
  }, []);
  return (
    <>
      <Header />
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-1"}`}>
        <Navigation menu="settings" submenu="users" />
        <div className="py-3 ml-2 flex justify-between">
          <BreadCrumbs />
          <button
            className="flex items-center gap-1 text-primary"
            onClick={handleAdd}
          >
            <FaPlus />
            Add
          </button>
        </div>
        <div className="text-base">
          <h2>Users FBS Admin</h2>
        </div>
        <div className="pb-30">
          <FbsAdminTable />
        </div>
      <Footer />
      </div>
      {store.isAdd && <ModalAddFbsAdmin setIsItemEdit={setIsItemEdit} />}
    </>
  );
};

export default FbsAdmin;
