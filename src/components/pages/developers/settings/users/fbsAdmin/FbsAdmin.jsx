import BreadCrumbs from "@/components/partials/BreadCrumbs";
import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import {
  setIsAdd,
  setIsSettingsOpen
} from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import Navigation from "../../../Navigation";
import FbsAdminTable from "./FbsAdminTable";
import ModalAddFbsAdmin from "./ModalAddFbsAdmin";
import ModalSuccess from "@/components/partials/ModalSuccess";
import ModalError from "@/components/partials/ModalError";

const FbsAdmin = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

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
          <h2>Users FBS Admin</h2>
        </div>
        <div className="pb-4">
          <FbsAdminTable setItemEdit={setItemEdit}/>
        </div>
        <Footer />
      </div>
      {store.isAdd && <ModalAddFbsAdmin  itemEdit={itemEdit} setItemEdit={setItemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default FbsAdmin;
