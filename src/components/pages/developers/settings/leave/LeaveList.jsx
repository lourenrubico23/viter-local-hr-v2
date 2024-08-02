import React from 'react'
import { FaUserClock } from 'react-icons/fa6'
import { GoChevronRight } from 'react-icons/go'
import { RiUserSharedFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const LeaveList = () => {
  return (
    <>
      <div className="list-content mx-0">
        <div className="list-button border-b border-dark/40">
          <Link
            to="/settings/leave/type"
            className="flex items-center gap-2 py-3 hover:bg-dark/5"
          >
            <span className="flex items-center gap-2 ml-2.5 text-xs font-bold">
              <RiUserSharedFill className="text-lg" />
              Leave Type
            </span>
            <GoChevronRight className="text-sm" />
          </Link>
        </div>
        <div className="list-button border-b border-dark/40">
          <Link
            to="/settings/leave/benefits"
            className="flex items-center gap-2 py-3 hover:bg-dark/5"
          >
            <span className="flex items-center gap-2 ml-2.5 text-xs font-bold">
              <FaUserClock className="text-lg" />
              Leave Benefits
            </span>
            <GoChevronRight className="text-sm" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default LeaveList
