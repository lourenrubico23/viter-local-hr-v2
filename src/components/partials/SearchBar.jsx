import { setError, setIsSearch, setMessage } from "@/store/StoreAction";
import React from "react";
import { MdOutlineSearch } from "react-icons/md";

const SearchBar = ({
  search,
  dispatch,
  store,
  result,
  isFetching,
  setOnSearch,
  onSearch,
}) => {
  const handleChange = (e) => {
    console.log(e.value);
    if (e.target.value === "") {
      setOnSearch(!onSearch);
      dispatch(setIsSearch(false));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = search.current.value;

    if (val === " " || val === "") {
      setOnSearch(!onSearch);
      dispatch(setIsSearch(false));
      dispatch(setError(true));
      dispatch(setMessage("Search keyword cannot be space only or blank."));
    } else {
      setOnSearch(!onSearch);
      dispatch(setIsSearch(true));
    }
  };

  return (
    <>
      <form
        className="search-box"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="search">
          <input
            type="search"
            placeholder="Search here..."
            ref={search}
            onChange={(e) => handleChange(e)}
          />
          <div className="search-icon">
            <MdOutlineSearch />
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
