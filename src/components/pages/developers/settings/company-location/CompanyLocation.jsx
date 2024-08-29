import Header from "@/components/partials/Header";
import { setIsAdd, setIsSettingsOpen } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import Navigation from "../../Navigation";
import { FaPlus } from "react-icons/fa6";
import CompanyLocationTable from "./CompanyLocationTable";
import Footer from "@/components/partials/Footer";
import ModalAddCompanyLocation from "./ModalAddCompanyLocation";
import ModalSuccess from "@/components/partials/modals/ModalSuccess";
import ModalError from "@/components/partials/modals/ModalError";

const CompanyLocation = () => {
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
        <Navigation menu="settings" submenu="company-location" />
        <div className="py-3 ml-2 flex justify-between">
          <div className="text-base ml-2">
            <h2>Location</h2>
          </div>
          <button
            className="flex items-center gap-1 text-primary hover:underline"
            onClick={handleAdd}
          >
            <FaPlus />
            Add
          </button>
        </div>
        <div className="pb-4">
          <CompanyLocationTable setItemEdit={setItemEdit} itemEdit={itemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddCompanyLocation itemEdit={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default CompanyLocation;