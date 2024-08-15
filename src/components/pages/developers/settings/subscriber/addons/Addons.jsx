import Header from "@/components/partials/Header";
import { setIsAdd, setIsSettingsOpen } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import Navigation from "../../../Navigation";
import BreadCrumbs from "@/components/partials/BreadCrumbs";
import { FaPlus } from "react-icons/fa6";
import AddonsTable from "./AddonsTable";
import Footer from "@/components/partials/Footer";
import ModalAddAddons from "./ModalAddAddons";
import ModalSuccess from "@/components/partials/modals/ModalSuccess";
import ModalError from "@/components/partials/modals/ModalError";
import useQueryData from "@/components/custom-hooks/useQueryData";

const Addons = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  const {
    isLoading: featuresIsLoading,
    isFetching: featuresIsFetching,
    error: featuresError,
    data: dataFeatures,
  } = useQueryData(
    `/v2/features`, // endpoint
    "get", // method
    "features" // key
  );

  React.useEffect(() => {
    //effect to remain the settings open even after refresh
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
            className="flex items-center gap-1 text-primary hover:underline"
            onClick={handleAdd}
          >
            <FaPlus />
            Add
          </button>
        </div>
        <div className="text-base">
          <h2>Addons</h2>
        </div>
        <div className="pb-4">
          <AddonsTable setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddAddons itemEdit={itemEdit} dataFeatures={dataFeatures}/>}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Addons;
