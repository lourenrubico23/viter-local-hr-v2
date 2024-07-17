import Header from "@/components/partials/Header";
import React from "react";
import Navigation from "@/components/pages/developers/Navigation";
import { FaPlus } from "react-icons/fa6";
import BreadCrumbs from "@/components/partials/BreadCrumbs";
import OtherTable from "./OtherTable";
import ModalAddOther from "./ModalAddOther";
import { StoreContext } from "@/store/StoreContext";
import {
  setIsAdd,
  setIsItemEdit,
  setIsSettingsOpen,
} from "@/store/StoreAction";
import Footer from "@/components/partials/Footer";

const Other = () => {
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
          <h2>Users Other</h2>
        </div>
        <div className="pb-30">
          <OtherTable />
        </div>
      <Footer />
      </div>
      {store.isAdd && <ModalAddOther setIsItemEdit={setIsItemEdit} />}
    </>
  );
};

export default Other;
