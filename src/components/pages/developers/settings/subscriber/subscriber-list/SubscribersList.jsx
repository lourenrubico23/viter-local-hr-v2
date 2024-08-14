import Header from "@/components/partials/Header";
import { setIsAdd, setIsSettingsOpen } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import Navigation from "../../../Navigation";
import BreadCrumbs from "@/components/partials/BreadCrumbs";
import { FaPlus } from "react-icons/fa6";
import SubscribersTable from "./SubscribersTable";
import ModalAddSubscribers from "./ModalAddSubscribers";
import ModalSuccess from "@/components/partials/modals/ModalSuccess";
import ModalError from "@/components/partials/modals/ModalError";
import Footer from "@/components/partials/Footer";
import ViewModal from "./ViewModal";

const SubscribersList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isView, setIsView] = React.useState(false)

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
        <Navigation menu="settings" submenu="subscriber" />
        <div className="py-3 ml-2 flex justify-between">
          <BreadCrumbs param={location.search} />
          <button
            className="flex items-center gap-1 text-primary"
            onClick={handleAdd}
          >
            <FaPlus />
            Add
          </button>
        </div>
        <div className="text-base">
          <h2>Subscriber</h2>
        </div>
        <div className="pb-4">
          <SubscribersTable setItemEdit={setItemEdit} setIsView={setIsView}/>
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddSubscribers itemEdit={itemEdit} />}
      {isView && <ViewModal itemEdit={itemEdit} setIsView={setIsView}/>}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default SubscribersList;
