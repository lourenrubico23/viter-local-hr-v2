import Header from "@/components/partials/Header";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import Navigation from "../../Navigation";
import BreadCrumbs from "@/components/partials/BreadCrumbs";
import { FaPlus } from "react-icons/fa6";
import DepartmentTable from "./DepartmentTable";
import Footer from "@/components/partials/Footer";
import ModalAddDepartment from "./ModalAddDepartment";
import { setIsAdd, setIsSettingsOpen } from "@/store/StoreAction";
import ModalSuccess from "@/components/partials/modals/ModalSuccess";
import ModalError from "@/components/partials/modals/ModalError";

const Department = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  React.useEffect(() => {
    dispatch(setIsSettingsOpen(true));
  }, []);

  return (
    <>
      <Header />
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-2"}`}>
        <Navigation menu="settings" submenu="department" />
        <div className="py-3 ml-2 flex justify-between">
          <div className="text-base ml-2">
            <h2>Department</h2>
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
          <DepartmentTable setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddDepartment itemEdit={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Department;
