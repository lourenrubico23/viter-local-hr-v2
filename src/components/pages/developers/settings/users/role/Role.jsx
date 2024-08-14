import Navigation from "@/components/pages/developers/Navigation";
import BreadCrumbs from "@/components/partials/BreadCrumbs";
import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import ModalError from "@/components/partials/modals/ModalError";
import ModalSuccess from "@/components/partials/modals/ModalSuccess";
import { setIsAdd, setIsSettingsOpen } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import ModalAddRole from "./ModalAddRole";
import RoleTable from "./RoleTable";

const Role = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  React.useEffect(() => { //effect to remain the settings open even after refresh
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
          <h2>Users Role</h2>
        </div>
        <div className="pb-4 mt-4">
          <RoleTable setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddRole itemEdit={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Role;
