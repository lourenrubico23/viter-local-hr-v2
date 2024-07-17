import React from 'react'
import { FaUserCog } from 'react-icons/fa'
import { FaDev, FaUserTie } from 'react-icons/fa6'
import { GoChevronRight } from 'react-icons/go'
import { RiUserSharedFill } from "react-icons/ri";
import { Link } from 'react-router-dom'

const UserList = () => {
  return (
    <>
    <div className="list-content mx-0">
        <div className="list-button border-b border-dark/40">
          <Link to="/settings/users/system" className="flex items-center gap-2 py-3 hover:bg-dark/5">
            <span className='flex items-center gap-2 ml-2.5 text-xs font-bold'>
              <FaDev className="text-lg" />
              System
            </span>
            <GoChevronRight className="text-sm" />
          </Link>
        </div>
        <div className="list-button border-b border-dark/40">
          <Link to="/settings/users/admin" className="flex items-center gap-2 py-3 hover:bg-dark/5">
            <span className='flex items-center gap-2 ml-2.5 text-xs font-bold'>
              <FaUserTie className="text-lg" />
              FBS Admin
            </span>
            <GoChevronRight className="text-sm" />
          </Link>
        </div>
        <div className="list-button border-b border-dark/40">
          <Link to="/settings/users/other" className="flex items-center gap-2 py-3 hover:bg-dark/5">
            <span className='flex items-center gap-2 ml-2.5 text-xs font-bold'>
              <FaUserCog className="text-lg" />
              Other
            </span>
            <GoChevronRight className="text-sm" />
          </Link>
        </div>
        <div className="list-button border-b border-dark/40">
          <Link to="/settings/users/role" className="flex items-center gap-2 py-3 hover:bg-dark/5">
            <span className='flex items-center gap-2 ml-2.5 text-xs font-bold'>
              <RiUserSharedFill className="text-lg" />
              Role
            </span>
            <GoChevronRight className="text-sm" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default UserList
