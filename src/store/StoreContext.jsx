import React from "react";
import { StoreReducer } from "./StoreReducer";

const isMobileOrTablet = window.matchMedia("(max-width:1027px)").matches;

const initVal = {
  error: false,
  success: false,
  isShow: isMobileOrTablet ? false : true,
  isSettingsOpen: false,
  isFetching: false,
  isLoading: false,
  isAdd: false,
  isArchive: false,
  isRestore: false,
  isDelete: false,
  isSearch: false,
};

const StoreContext = React.createContext();

const StoreProvider = (props) => {
  const [store, dispatch] = React.useReducer(StoreReducer, initVal);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
