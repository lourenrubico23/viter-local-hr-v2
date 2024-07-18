import Header from "@/components/partials/Header";
import React from "react";
import Navigation from "@/components/pages/developers/Navigation";
import { FaPlus } from "react-icons/fa6";
import BreadCrumbs from "@/components/partials/BreadCrumbs";
import Footer from "@/components/partials/Footer";
import { StoreContext } from "@/store/StoreContext";
import {
  setIsAdd,
  setIsItemEdit,
  setIsSettingsOpen,
} from "@/store/StoreAction";
import SystemTable from "@/components/pages/developers/settings/users/system/SystemTable";
import ModalAddSystem from "@/components/pages/developers/settings/users/system/ModalAddSystem";
import ModalSuccess from "@/components/partials/ModalSuccess";
import ModalError from "@/components/partials/ModalError";

const System = () => {
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
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-2"}`}>
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
          <h2>Users System</h2>
        </div>
        <div className="pb-4">
          <SystemTable setIsItemEdit={setIsItemEdit} />
        </div>
        <Footer />
      </div>
      {store.success && <ModalSuccess/>}
      {store.isAdd && (
        <ModalAddSystem setIsItemEdit={setIsItemEdit} />
      )}
      {store.error && <ModalError/>}
    </>
  );
};

export default System;
