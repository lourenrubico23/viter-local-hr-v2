import React from "react";
import { MdOutlineSearch } from "react-icons/md";

const SearchBar = () => {
  return (
    <>
      <form className="search-box">
        <div className="search">
          <input type="search" placeholder="Search here..." />
          <div className="search-icon">
            <MdOutlineSearch />
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
