export const StoreReducer = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SUCCESS":
      return {
        ...state,
        success: action.payload,
      };
    case "IS_SHOW":
      return {
        ...state,
        isShow: action.payload,
      };
    case "IS_SETTINGS_OPEN":
      return {
        ...state,
        isSettingsOpen: action.payload,
      };
    case "IS_FETCHING":
      return {
        ...state,
        isFetching: action.payload,
      };
    case "IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "IS_ADD":
      return {
        ...state,
        isAdd: action.payload,
      };
    case "IS_ITEM_EDIT":
      return {
        ...state,
        isItemEdit: action.payload,
      };
    default:
      return state;
  }
};
