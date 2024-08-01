import React from "react";
import { BsFillBarChartLineFill } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa6";
import { GoChevronRight } from "react-icons/go";
import { Link } from "react-router-dom";

const JobList = () => {
  return (
    <>
      <div className="list-content mx-0">
        <div className="list-button border-b border-dark/40">
          <Link
            to="/settings/job/level"
            className="flex items-center gap-2 py-3 hover:bg-dark/5"
          >
            <span className="flex items-center gap-2 ml-2.5 text-xs font-bold">
              <BsFillBarChartLineFill className="text-lg" />
              Job Level
            </span>
            <GoChevronRight className="text-sm" />
          </Link>
        </div>
        <div className="list-button border-b border-dark/40">
          <Link
            to="/settings/job/title"
            className="flex items-center gap-2 py-3 hover:bg-dark/5"
          >
            <span className="flex items-center gap-2 ml-2.5 text-xs font-bold">
              <FaUserTie className="text-lg" />
              Job Title
            </span>
            <GoChevronRight className="text-sm" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default JobList;
