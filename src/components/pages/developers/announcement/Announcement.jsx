import Header from "@/components/partials/Header";
import React from "react";
import Navigation from "../Navigation";
import { StoreContext } from "@/store/StoreContext";
import Footer from "@/components/partials/Footer";
import { setIsAdd, setIsSettingsOpen } from "@/store/StoreAction";
import { FaPlus } from "react-icons/fa6";
import AnnouncementTable from "./AnnouncementTable";
import ModalAddAnnouncement from "./ModalAddAnnouncement";
import ModalSuccess from "@/components/partials/modals/ModalSuccess";
import ModalError from "@/components/partials/modals/ModalError";

const Announcement = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <Header />
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-2"}`}>
        <Navigation menu="announcement" />
        <div className="py-3 ml-2 flex justify-between">
          <div className="text-base ml-2">
            <h2>Announcement</h2>
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
          <AnnouncementTable setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddAnnouncement itemEdit={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Announcement;
