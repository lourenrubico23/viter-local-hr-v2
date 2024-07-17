import React from "react";
import Navigation from "../../Navigation";
import Header from "@/components/partials/Header";
import { StoreContext } from "@/store/StoreContext";
import { setIsSettingsOpen } from "@/store/StoreAction";
import UserList from "./UserList";

const User = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  React.useEffect(() => {
    dispatch(setIsSettingsOpen(true));
  }, []);

  return (
    <>
      <Header />
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-1"} `}>
        <Navigation menu="settings" submenu="users" />
        <div className="title text-base py-2.5 ml-7">
          <h2>Users</h2>
        </div>
        <UserList/>
      </div>
    </>
  );
};

export default User;
