import React from "react";
import { StoreContext } from "../../store/StoreContext";

const Footer = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      <div
        className={`footer-wrapper text-center bg-white lg:pl-[176px] absolute bottom-0 right-0 w-full transition-all ${
          store.isShow ? "lg:pl-[50px] pl-0" : "!pl-0 transition-all"
        }`}
      >
        <p className="text-[10px]">
          © 2024 All Rights Reserved |{" "}
          <span className="text-primary">
            Powered by Frontline Business Solutions, Inc.
          </span>
        </p>
      </div>
    </>
  );
};

export default Footer;
