import React from 'react'
import { FaListCheck } from 'react-icons/fa6';
import { GoChevronRight } from 'react-icons/go';
import { HiMiniUserGroup } from "react-icons/hi2";
import { RiListCheck } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const SubscribersList = () => {
  return (
    <div className="list-content mx-0">
        <div className="list-button border-b border-dark/40">
          <Link to="/settings/subscriber/list" className="flex items-center gap-2 py-3 hover:bg-dark/5">
            <span className='flex items-center gap-2 ml-2.5 text-xs font-bold'>
              <HiMiniUserGroup className="text-lg" />
              List
            </span>
            <GoChevronRight className="text-sm" />
          </Link>
        </div>
        <div className="list-button border-b border-dark/40">
          <Link to="/settings/subscriber/addons" className="flex items-center gap-2 py-3 hover:bg-dark/5">
            <span className='flex items-center gap-2 ml-2.5 text-xs font-bold'>
              <FaListCheck className="text-lg" />
              Addons
            </span>
            <GoChevronRight className="text-sm" />
          </Link>
        </div>
        <div className="list-button border-b border-dark/40">
          <Link to="/settings/subscriber/features" className="flex items-center gap-2 py-3 hover:bg-dark/5">
            <span className='flex items-center gap-2 ml-2.5 text-xs font-bold'>
              <RiListCheck className="text-lg" />
              Features
            </span>
            <GoChevronRight className="text-sm" />
          </Link>
        </div>
        
      </div>
  )
}

export default SubscribersList
