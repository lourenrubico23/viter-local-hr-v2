import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "@/store/StoreContext";
import { devNavUrl } from "@/components/helpers/functions-general";

const BreadCrumbs = ({ param = "" }) => {
  const { dispatch } = React.useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();
  const link = "";
  let currentLink = "";

  console.log(param);
  const handleClick = () => {
    // dispatch(setIsSearch(false));
  };

  const handleBack = () => {
    // dispatch(setIsSearch(false));
    navigate(-1);
  };

  const crumbs = location.pathname
    .replace(`${devNavUrl}/${link}`, "")
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, key) => {
      currentLink += `/${crumb}`;
      return (
        <li
          className={`text-primary after:mr-2 flex items-center after:content-['>'] last:after:hidden last:text-dark last:pointer-events-none opacity-0 lg:opacity-100 ${
            crumb === "settings" && "pointer-events-none"
          } `}
          key={key}
          onClick={handleClick}
        >
          <Link
            to={
              crumb === "settings"
                ? ""
                : `${devNavUrl}${link}${currentLink}${param}`
            }
            className="mr-2 font-medium capitalize text-[10px]"
          >
            {crumb.replaceAll("-", " ")}
          </Link>
        </li>
      );
    });

  return (
    <>
      <div className="flex items-center gap-5 breadcrumbs pl-2.5">
        {crumbs.length === 1 ? (
          ""
        ) : (
          <button type="button" onClick={() => handleBack()}>
            <FaArrowLeft className="w-4 h-4 lg:h-4 lg:w-4" />
          </button>
        )}
        <ul className="flex items-center cursor-pointer">
          {crumbs.length === 1 ? "" : crumbs}
        </ul>
      </div>
    </>
  );
};

export default BreadCrumbs;
