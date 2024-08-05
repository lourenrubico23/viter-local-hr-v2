import Header from "@/components/partials/Header";
import { setIsAdd, setIsSettingsOpen } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import Navigation from "../../../Navigation";
import BreadCrumbs from "@/components/partials/BreadCrumbs";
import { FaPlus } from "react-icons/fa6";
import JobTitleTable from "./JobTitleTable";
import Footer from "@/components/partials/Footer";
import ModalAddJobTitle from "./ModalAddJobTitle";
import ModalSuccess from "@/components/partials/modals/ModalSuccess";
import ModalError from "@/components/partials/modals/ModalError";
import useQueryData from "@/components/custom-hooks/useQueryData";

const JobTitle = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

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

  React.useEffect(() => {
    dispatch(setIsSettingsOpen(true));
  }, []);

  return (
    <>
      <Header />
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-2"}`}>
        <Navigation menu="settings" submenu="job" />
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
          <h2>Job Title</h2>
        </div>
        <div className="pb-4">
          <JobTitleTable setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && (
        <ModalAddJobTitle itemEdit={itemEdit} job_level={job_level} />
      )}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default JobTitle;
