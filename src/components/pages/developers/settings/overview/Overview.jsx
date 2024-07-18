import Header from "@/components/partials/Header";
import React from "react";
import Navigation from "../../Navigation";
import { StoreContext } from "@/store/StoreContext";
import Footer from "@/components/partials/Footer";
import { setIsSettingsOpen } from "@/store/StoreAction";

const Overview = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  React.useEffect(() => {
    dispatch(setIsSettingsOpen(true));
  }, []);

  return (
    <>
      <Header />
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-2"}`}>
        <Navigation menu="settings" submenu="overview" />
        <div className="title text-base py-2.5 ml-7">
          <h2>Overview</h2>
        </div>
        <span className="mt-5 block">We will be right back. </span>
        <Footer />
      </div>
      
    </>
  );
};

export default Overview;
