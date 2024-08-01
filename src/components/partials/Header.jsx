import React from "react";
import FBSLogo from "@/components/svg/FBSLogo";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  // to close the modal when clicking outside
  const ref = React.useRef();

  const clickOutsideRef = (e) => {
    if (!ref.current?.contains(e.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", clickOutsideRef);
    return () => document.addEventListener("click", clickOutsideRef);
  }, []);

  return (
    <>
      <header className="fixed w-full bg-white z-50 py-3 border-b-[2px] border-primary lg:pr-2 px-5 lg:px-0">
        <div className="w-full">
          <div className="flex items-center w-full gap-4 justify-between pl-1 lg:pl-3.5 lg:px-3.5">
            <div className="flex items-center">
              <div className="max-w-[150px] max-h-[40px]">
                <a href="#">
                  <FBSLogo />
                </a>
              </div>
              <h1 className="hidden lg:block ml-12">HRIS and Payroll</h1>
            </div>
            <div
              className={`p-px rounded-full border-2 hover:border-primary/50 border-transparent cursor-pointer ${
                isOpen && "!border-primary"
              }`}
              onClick={handleOpen}
              ref={ref}
            >
              <div className="bg-primary p-1.5 rounded-full">
                <span className="text-white p-1 rounded-full">LR</span>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="absolute border bg-white h-30 w-60 right-6 p-3.5 rounded-md text-dark shadow-md">
            <h2 className="text-sm">Louren Rubico</h2>
            <span>Viewer</span>
            <a href="">
              <span className="flex items-center gap-2 font-normal py-1 hover:text-primary">
                <FaRegEnvelope className="text-xs" />
                <span>lourenrubico@gmail.com</span>
              </span>
            </a>
            <Link to="/account">
              <span className="flex items-center gap-2 font-normal py-1 hover:text-primary">
                <FaRegUserCircle className="text-xs" /> <span>Account</span>
              </span>
            </Link>
            <a href="">
              <span className="flex items-center gap-2 font-normal py-1 hover:text-primary">
                <MdOutlineLogout className="text-xs" /> <span>Logout</span>
              </span>
            </a>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
