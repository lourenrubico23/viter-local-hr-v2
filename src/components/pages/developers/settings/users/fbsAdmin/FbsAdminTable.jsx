import NoData from '@/components/partials/NoData'
import SearchBar from '@/components/partials/SearchBar'
import ServerError from '@/components/partials/ServerError'
import Status from '@/components/partials/Status'
import TableLoading from '@/components/partials/TableLoading'
import React from 'react'
import { FaEdit, FaUserAltSlash } from 'react-icons/fa'
import { FaKey } from 'react-icons/fa6'

const FbsAdminTable = () => {
  return (
    <>
    <SearchBar/>
    <div className="shadow-md rounded-md overflow-y-auto">
        {/* <FetchingSpinner /> */}
        <table>
          <thead>
            <tr>
              <th className="pl-2">#</th>
              <th>Status</th>
              <th>Name</th>
              <th>Email</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="relative">
            {/* <TableSpinner /> */}

            <tr className="text-center">
              <td colSpan="100%">
                <TableLoading />
              </td>
            </tr>

            <tr className="text-center">
              <td colSpan="100%">
                <NoData />
              </td>
            </tr>

            <tr className="text-center ">
              <td colSpan="100%" className="p-10">
                <ServerError />
              </td>
            </tr>

            <tr>
              <td className="pl-2">1.</td>
              <td>
                <Status text="Active" />
              </td>
              <td>Louren Rubico</td>
              <td>Lourenrubico@gmail.com</td>
              <td className="flex items-center gap-3 justify-end">
                <button className="tooltip-action-table" data-tooltip="Edit">
                  <FaEdit className="text-gray-600" />
                </button>
                <button
                  className="tooltip-action-table"
                  data-tooltip="Inactivate"
                >
                  <FaUserAltSlash className="text-gray-600" />
                </button>
                <button
                  className="tooltip-action-table"
                  data-tooltip="Password"
                >
                  <FaKey className="text-gray-600" />
                </button>
              </td>
            </tr>
            
          </tbody>
        </table>
        <div className="text-center mt-5">
              <span className=" pb-10">End of List.</span>
            </div>
      </div>
    </>
  )
}

export default FbsAdminTable
