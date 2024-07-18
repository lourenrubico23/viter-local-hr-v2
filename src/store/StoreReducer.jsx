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
    case "MESSAGE":
      return {
        ...state,
        message: action.payload,
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
    case "IS_ARCHIVE":
      return {
        ...state,
        isArchive: action.payload,
      };
    case "IS_RESTORE":
      return {
        ...state,
        isRestore: action.payload,
      };
    case "IS_DELETE":
      return {
        ...state,
        isDelete: action.payload,
      };
    case "IS_SEARCH":
      return {
        ...state,
        isSearch: action.payload,
      };

    default:
      return state;
  }
};
