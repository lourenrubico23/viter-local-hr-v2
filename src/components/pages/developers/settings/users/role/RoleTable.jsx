import useQueryData from "@/components/custom-hooks/useQueryData";
import FetchingSpinner from "@/components/partials/FetchingSpinner";
import ModalArchive from "@/components/partials/ModalArchive";
import ModalDelete from "@/components/partials/ModalDelete";
import ModalRestore from "@/components/partials/ModalRestore";
import NoData from "@/components/partials/NoData";
import ServerError from "@/components/partials/ServerError";
import Status from "@/components/partials/Status";
import TableLoading from "@/components/partials/TableLoading";
import TableSpinner from "@/components/partials/TableSpinner";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import { FaArchive, FaEdit } from "react-icons/fa";
import { MdDelete, MdRestore } from "react-icons/md";
import { useInView } from "react-intersection-observer";

const RoleTable = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isArchiving, setIsArchiving] = React.useState(false);
  const [id, setIsId] = React.useState("");
  const [isData, setIsData] = React.useState("");

  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();

  let counter = 1;

  // used if the page doesnt have a search
  const {
    isLoading,
    isFetching,
    isFetchingNextPage,
    error,
    data: role,
  } = useQueryData(
    `/v2/role`, // endpoint
    "get", // method
    "role" // key
  );

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setIsData(item.user_role_name);
    setIsId(item.user_role_aid);
    setIsArchiving(true);
    setIsRestore(false);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setIsData(item.user_role_name);
    setIsId(item.user_role_aid);
    setIsArchiving(false);
    setIsRestore(true);
  };

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setIsData(item.user_role_name);
    setIsId(item.user_role_aid);
  };

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      {isFetching && !isLoading && <FetchingSpinner />}
      <div className="shadow-md rounded-md overflow-y-auto min-h-full md:min-h-[calc(100vh-30px)] lg:max-h-[calc(100vh-250px)] mb-10 lg:mb-0 lg:min-h-0">
        <table className="relative">
          {isLoading && <TableSpinner />}
          <thead>
            <tr>
              <th className="pl-2 w-[1rem]">#</th>
              <th className="w-[1rem]">Status</th>
              <th>Role Name</th>
              <th>Role Description</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="relative">
            {isLoading && (
              <tr className="text-center">
                <td colSpan="100%" className="p-10">
                  <TableLoading />
                </td>
              </tr>
            )}

            {role?.data.length === 0 && (
              <tr className="text-center">
                <td colSpan="100%" className="p-10">
                  <NoData />
                </td>
              </tr>
            )}

            {error && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}

            {role?.data.map((item, key) => (
              <tr key={key}>
                <td className="pl-2">{counter++}</td>
                <td>
                  {item.user_role_is_active === 1 ? (
                    <Status text="Active" />
                  ) : (
                    <Status text="Inactive" />
                  )}
                </td>
                <td>{item.user_role_name}</td>
                <td className="truncate max-w-[3rem]">
                  {item.user_role_description}
                </td>
                <td className="flex items-center gap-3 justify-end mt-2 lg:mt-0">
                  {item.user_role_is_active ? (
                    <>
                      <button
                        className="tooltip-action-table"
                        data-tooltip="Edit"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit className="text-gray-600" />
                      </button>
                      <button
                        className="tooltip-action-table"
                        data-tooltip="Archive"
                        onClick={() => handleArchive(item)}
                      >
                        <FaArchive className=" text-gray-600 text-[10px]" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="tooltip-action-table"
                        data-tooltip="Restore"
                        onClick={() => handleRestore(item)}
                      >
                        <MdRestore className="text-gray-600" />
                      </button>
                      <button
                        className="tooltip-action-table"
                        data-tooltip="Delete"
                        onClick={() => handleDelete(item)}
                      >
                        <MdDelete className="text-gray-600" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {store.isArchive && (
        <ModalArchive
          setIsArchive={setIsArchive}
          queryKey={"role"}
          mysqlEndpoint={`/v2/role/active/${id}`}
          item={isData}
          archive={isArchiving}
        />
      )}
      {store.isDelete && (
        <ModalDelete
          setIsDelete={setIsDelete}
          queryKey={"role"}
          mysqlEndpoint={`/v2/role/${id}`}
          item={isData}
        />
      )}
      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          queryKey={"role"}
          mysqlEndpoint={`/v2/role/active/${id}`}
          item={isData}
        />
      )}
    </>
  );
};

export default RoleTable;
