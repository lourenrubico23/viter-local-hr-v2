import Header from "@/components/partials/Header";
import { setIsAdd, setIsSettingsOpen } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import CompanyInfoTable from "./CompanyInfoTable";
import ModalAddCompanyInfo from "./ModalAddCompanyInfo";
import ModalSuccess from "@/components/partials/modals/ModalSuccess";
import ModalError from "@/components/partials/modals/ModalError";
import Footer from "@/components/partials/Footer";
import Navigation from "../../Navigation";

const CompanyInfo = () => {
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
        <Navigation menu="settings" submenu="company-info" />
        <div className="py-3 ml-2 flex justify-between">
          <div className="text-base ml-2">
            <h2>Company Info</h2>
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
          <CompanyInfoTable setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddCompanyInfo itemEdit={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default CompanyInfo;
