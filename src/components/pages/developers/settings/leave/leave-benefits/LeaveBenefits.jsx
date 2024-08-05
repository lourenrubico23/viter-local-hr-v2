import useQueryData from "@/components/custom-hooks/useQueryData";
import Header from "@/components/partials/Header";
import { setIsAdd, setIsSettingsOpen } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import Navigation from "../../../Navigation";
import BreadCrumbs from "@/components/partials/BreadCrumbs";
import { FaPlus } from "react-icons/fa6";
import LeaveBenefitsTable from "./LeaveBenefitsTable";
import ModalAddLeaveBenefits from "./ModalAddLeaveBenefits";
import Footer from "@/components/partials/Footer";
import ModalSuccess from "@/components/partials/modals/ModalSuccess";
import ModalError from "@/components/partials/modals/ModalError";

const LeaveBenefits = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  const {
    isLoading: leave_typeIsLoading,
    isFetching: leave_typeIsFetching,
    error: leave_typeError,
    data: leave_type,
  } = useQueryData(
    `/v2/leave_type`, // endpoint
    "get", // method
    "leave_type" // key
  );

  const {
    isLoading: job_levelIsLoading,
    isFetching: job_levelIsFetching,
    error: job_levelError,
    data: job_level,
  } = useQueryData(
    `/v2/job_level`, // endpoint
    "get", // method
    "job_level" // key
  );

  const {
    isLoading: job_titleIsLoading,
    isFetching: job_titleIsFetching,
    error: job_titleError,
    data: job_title,
  } = useQueryData(
    `/v2/job_title`, // endpoint
    "get", // method
    "job_title" // key
  );

  React.useEffect(() => {
    dispatch(setIsSettingsOpen(true));
  }, []);

  return (
    <>
      <Header />
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-2"}`}>
        <Navigation menu="settings" submenu="leave" />
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
          <h2>Leave Benefits</h2>
        </div>
        <div className="pb-4">
          <LeaveBenefitsTable setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && (
        <ModalAddLeaveBenefits
          itemEdit={itemEdit}
          job_level={job_level}
          leave_type={leave_type}
          job_title={job_title}
        />
      )}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default LeaveBenefits;
