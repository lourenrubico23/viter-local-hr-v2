export const setError = (val) => {
  return {
    type: "ERROR",
    payload: val,
  };
};
export const setSuccess = (val) => {
  return {
    type: "SUCCESS",
    payload: val,
  };
};
export const setMessage = (val) => {
  return {
    type: "MESSAGE",
    payload: val,
  };
};
export const setIsShow = (val) => {
  return {
    type: "IS_SHOW",
    payload: val,
  };
};
export const setIsSettingsOpen = (val) => {
  return {
    type: "IS_SETTINGS_OPEN",
    payload: val,
  };
};
export const setIsFetching = (val) => {
  return {
    type: "IS_FETCHING",
    payload: val,
  };
};
export const setIsLoading = (val) => {
  return {
    type: "IS_LOADING",
    payload: val,
  };
};
export const setIsAdd = (val) => {
  return {
    type: "IS_ADD",
    payload: val,
  };
};
export const setIsArchive = (val) => {
  return {
    type: "IS_ARCHIVE",
    payload: val,
  };
};
export const setIsRestore = (val) => {
  return {
    type: "IS_RESTORE",
    payload: val,
  };
};
export const setIsDelete = (val) => {
  return {
    type: "IS_DELETE",
    payload: val,
  };
};
export const setIsSearch = (val) => {
  return {
    type: "IS_SEARCH",
    payload: val,
  };
};
