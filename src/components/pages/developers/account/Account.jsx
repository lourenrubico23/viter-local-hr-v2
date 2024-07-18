import Header from "@/components/partials/Header";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import Navigation from "../Navigation";
import AccountInfo from "./AccountInfo";
import Footer from "@/components/partials/Footer";

const Account = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  return (
    <>
      <Header />
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-2"}`}>
        <Navigation />
        <div className="title text-base py-2.5 ml-7">
          <h2>Account</h2>
        </div>
        <div className="pb-4">
          <AccountInfo />
        </div>
        <div className="bottom-0">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Account;
