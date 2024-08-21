import React from "react";
import { Link } from "react-router-dom";
import { BsFillCalendarEventFill, BsFillGrid1X2Fill } from "react-icons/bs";
import { MdTimer, MdWorkHistory } from "react-icons/md";
import { GoChevronDown } from "react-icons/go";
import { FaBuildingUser, FaCalendarDays, FaIndent } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { HiSpeakerphone, HiUserGroup } from "react-icons/hi";
import { GiPayMoney } from "react-icons/gi";
import { StoreContext } from "@/store/StoreContext";
import { setIsSettingsOpen, setIsShow } from "@/store/StoreAction";
import { devNavUrl } from "@/components/helpers/functions-general";

const Navigation = ({ menu, submenu }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const isMobileOrTablet = window.matchMedia("(max-width:1027px)").matches;

  const handleShow = () => {
    dispatch(setIsShow(!store.isShow));
  };

  const handleShowNavigation = () => {
    isMobileOrTablet
      ? setTimeout(() => {
          dispatch(setIsShow(!store.isShow));
        }, 10)
      : setTimeout(() => {
          dispatch(setIsShow(true));
        }, 10);
  };

  const handleSettingsOpen = () => {
    dispatch(setIsSettingsOpen(!store.isSettingsOpen));
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        dispatch(setIsShow(false));
      } else {
        dispatch(setIsShow(true));
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  React.useEffect(() => {
    if (!isMobileOrTablet) {
      dispatch(setIsShow(true));
    }
  }, [isMobileOrTablet]);

  return (
    <>
      <div
        className={`navigation ${
          store.isShow ? "translate-x-0" : "-translate-x-48"
        }`}
      >
        <div className="navigation-wrapper bg-primary pt-3 h-full">
          <div className="navigation-content text-white cursor-pointer text-[14px]">
            <nav className="navigation-list">
              <ul>
                {/* Overview */}
                <li
                  className={`flex items-center justify-between text-white my-1.5 ${
                    menu === "overview"
                      ? "bg-secondary text-white"
                      : "hover:bg-secondary/40"
                  }`}
                >
                  <Link
                    to={`${devNavUrl}/overview`}
                    className="px-4 py-0.5 w-full"
                  >
                    <div className="nav">
                      <BsFillGrid1X2Fill className="text-sm" />
                      <span className="ml-2.5">OVERVIEW</span>
                    </div>
                  </Link>
                </li>

                {/* Time */}
                <li
                  className={`flex items-center justify-between text-white my-1.5 ${
                    menu === "time"
                      ? "bg-secondary text-white"
                      : "hover:bg-secondary/40"
                  }`}
                >
                  <Link to={`${devNavUrl}/time`} className="px-4 py-0.5 w-full">
                    <div className="nav">
                      <MdTimer className="text-base" />
                      <span className="ml-2.5">TIME</span>
                    </div>
                  </Link>
                </li>

                {/* Leave */}
                <li
                  className={`flex items-center justify-between text-white my-1.5 ${
                    menu === "leave"
                      ? "bg-secondary text-white"
                      : "hover:bg-secondary/40"
                  }`}
                >
                  <Link
                    to={`${devNavUrl}/leave`}
                    className="px-4 py-0.5 w-full"
                  >
                    <div className="nav">
                      <BsFillCalendarEventFill className="text-sm" />
                      <span className="ml-2.5">LEAVE</span>
                    </div>
                  </Link>
                </li>

                {/* Overtime */}
                <li
                  className={`flex items-center justify-between text-white my-1.5 ${
                    menu === "overtime"
                      ? "bg-secondary text-white"
                      : "hover:bg-secondary/40"
                  }`}
                >
                  <Link
                    to={`${devNavUrl}/overtime`}
                    className="px-4 py-0.5 w-full"
                  >
                    <div className="nav">
                      <MdWorkHistory className="text-sm" />
                      <span className="ml-2.5">OVERTIME</span>
                    </div>
                  </Link>
                </li>

                {/* Employees */}
                <li
                  className={`flex items-center justify-between text-white my-1.5 ${
                    menu === "employees"
                      ? "bg-secondary text-white"
                      : "hover:bg-secondary/40"
                  }`}
                >
                  <Link
                    to={`${devNavUrl}/employees`}
                    className="px-4 py-0.5 w-full"
                  >
                    <div className="nav">
                      <HiUserGroup className="text-sm" />
                      <span className="ml-2.5">EMPLOYEES</span>
                    </div>
                  </Link>
                </li>

                {/* Client */}
                <li
                  className={`flex items-center justify-between text-white my-1.5 ${
                    menu === "client"
                      ? "bg-secondary text-white"
                      : "hover:bg-secondary/40"
                  }`}
                >
                  <Link
                    to={`${devNavUrl}/client`}
                    className="px-4 py-0.5 w-full"
                  >
                    <div className="nav">
                      <FaBuildingUser className="text-sm" />
                      <span className="ml-2.5">CLIENT</span>
                    </div>
                  </Link>
                </li>

                {/* Announcement */}
                <li
                  className={`flex items-center justify-between text-white my-1.5 ${
                    menu === "announcement"
                      ? "bg-secondary text-white"
                      : "hover:bg-secondary/40"
                  }`}
                >
                  <Link
                    to={`${devNavUrl}/announcement`}
                    className="px-4 py-0.5 w-full"
                  >
                    <div className="nav">
                      <HiSpeakerphone className="text-sm" />
                      <span className="ml-2.5">ANNOUNCEMENT</span>
                    </div>
                  </Link>
                </li>

                {/* Calendar */}
                <li
                  className={`flex items-center justify-between text-white my-1.5 ${
                    menu === "calendar"
                      ? "bg-secondary text-white"
                      : "hover:bg-secondary/40"
                  }`}
                >
                  <Link
                    to={`${devNavUrl}/calendar`}
                    className="px-4 py-0.5 w-full"
                  >
                    <div className="nav">
                      <FaCalendarDays className="text-sm" />
                      <span className="ml-2.5">CALENDAR RD & L</span>
                    </div>
                  </Link>
                </li>

                {/* Work Schedule */}
                <li
                  className={`flex items-center justify-between text-white my-1.5 ${
                    menu === "workSched"
                      ? "bg-secondary text-white"
                      : "hover:bg-secondary/40"
                  }`}
                >
                  <Link
                    to={`${devNavUrl}/workSched`}
                    className="px-4 py-0.5 w-full"
                  >
                    <div className="nav">
                      <FaBuildingUser className="text-sm" />
                      <span className="ml-2.5">WORK SCHEDULE</span>
                    </div>
                  </Link>
                </li>

                {/* Payroll */}
                <li
                  className={`pr-3 pl-4 py-0.5 my-1.5 w-full flex items-center justify-between ${
                    menu === "payroll"
                      ? "bg-secondary text-white"
                      : "hover:bg-secondary/40"
                  }`}
                >
                  <div className="nav">
                    <GiPayMoney className="text-sm" />
                    <span className="ml-2.5">PAYROLL</span>
                  </div>
                  <GoChevronDown
                    className={`duration-200 text-[15px] 
                      `}
                  />
                </li>

                {/* Settings */}
                <li
                  className={`pr-3 pl-4 py-0.5 w-full flex items-center justify-between ${
                    menu === "settings"
                      ? "bg-secondary text-white"
                      : "hover:bg-secondary/40"
                  }`}
                  onClick={handleSettingsOpen}
                >
                  <div className="nav">
                    <IoMdSettings className="text-sm" />
                    <span className="ml-2.5">SETTINGS</span>
                  </div>
                  <GoChevronDown
                    className={`duration-200 text-[15px] ${
                      store.isSettingsOpen && "-rotate-180 duration-200 "
                    }`}
                  />
                </li>

                {store.isSettingsOpen && (
                  <ul className="submenu ml-12 my-1 text-[12px]">
                    <Link className="!p-0" to={`${devNavUrl}/settings/users`}>
                      <li
                        className={`pl-2 mb-1 my-px border-l-2 border-transparent ${
                          submenu === "users"
                            ? "!border-accent text-accent"
                            : "hover:border-white !text-white"
                        }`}
                      >
                        User
                      </li>
                    </Link>

                    <Link className="!p-0" to={`${devNavUrl}/settings/subscriber`}>
                      <li
                        className={`pl-2 mb-1 my-px border-l-2 border-transparent ${
                          submenu === "subscriber"
                            ? "!border-accent text-accent"
                            : "hover:border-white !text-white"
                        }`}
                      >
                        Subscribers
                      </li>
                    </Link>

                    <Link className="!p-0" to={`${devNavUrl}/settings/job`}>
                      <li
                        className={`pl-2 mb-1 my-px border-l-2 border-transparent ${
                          submenu === "job"
                            ? "!border-accent text-accent"
                            : "hover:border-white !text-white"
                        }`}
                      >
                        Job
                      </li>
                    </Link>

                    <Link
                      className="!p-0"
                      to={`${devNavUrl}/settings/department`}
                    >
                      <li
                        className={`pl-2 mb-1 my-px border-l-2 border-transparent ${
                          submenu === "department"
                            ? "!border-accent text-accent"
                            : "hover:border-white !text-white"
                        }`}
                      >
                        Department
                      </li>
                    </Link>

                    <Link
                      className="!p-0"
                      to={`${devNavUrl}/settings/company-info`}
                    >
                      <li
                        className={`pl-2 mb-1 my-px border-l-2 border-transparent ${
                          submenu === "company-info"
                            ? "!border-accent text-accent"
                            : "hover:border-white !text-white"
                        }`}
                      >
                        Company Info
                      </li>
                    </Link>

                    <Link
                      className="!p-0"
                      to={`${devNavUrl}/settings/leave`}
                    >
                      <li
                        className={`pl-2 mb-1 my-px border-l-2 border-transparent ${
                          submenu === "leave"
                            ? "!border-accent text-accent"
                            : "hover:border-white !text-white"
                        }`}
                      >
                        Leave
                      </li>
                    </Link>

                    <Link
                      className="!p-0"
                      to={`${devNavUrl}/settings/notification`}
                    >
                      <li
                        className={`pl-2 mb-1 my-px border-l-2 border-transparent ${
                          submenu === "notification"
                            ? "!border-accent text-accent"
                            : "hover:border-white !text-white"
                        }`}
                      >
                        Notification
                      </li>
                    </Link>
                  </ul>
                )}
              </ul>
            </nav>
          </div>
          <div
            className={`toggle-menu ${
              store.isShow ? "translate-x-44" : "translate-x-48"
            }`}
            onClick={handleShow}
          >
            <FaIndent
              className={` text-sm hover:text-secondary ${
                store.isShow && "rotate-180"
              }`}
            />
          </div>
        </div>
      </div>
      {store.isShow && (
        <span
          className={`fixed z-30 w-full h-full bg-dark/50 ${
            isMobileOrTablet ? "" : "lg:hidden"
          }`}
          onClick={handleShowNavigation}
          onTouchMove={handleShowNavigation}
        />
      )}
    </>
  );
};

export default Navigation;
