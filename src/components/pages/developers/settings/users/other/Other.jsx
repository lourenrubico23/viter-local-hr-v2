import Navigation from "@/components/pages/developers/Navigation";
import BreadCrumbs from "@/components/partials/BreadCrumbs";
import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import { setIsAdd, setIsSettingsOpen } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import ModalAddOther from "./ModalAddOther";
import OtherTable from "./OtherTable";
import ModalSuccess from "@/components/partials/modals/ModalSuccess";
import ModalError from "@/components/partials/modals/ModalError";
import useQueryData from "@/components/custom-hooks/useQueryData";

const Other = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  const {
    isLoading: roleIsLoading,
    isFetching: roleIsFetching,
    error: roleError,
    data: role,
  } = useQueryData(
    `/v2/role`, // endpoint
    "get", // method
    "role" // key
  );

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
          <h2>Users Other</h2>
        </div>
        <div className="pb-30">
          <OtherTable setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddOther itemEdit={itemEdit} role={role} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Other;
