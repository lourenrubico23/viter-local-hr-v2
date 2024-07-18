import FetchingSpinner from "@/components/partials/FetchingSpinner";
import Loadmore from "@/components/partials/LoadMore";
import ModalArchive from "@/components/partials/ModalArchive";
import ModalDelete from "@/components/partials/ModalDelete";
import ModalRestore from "@/components/partials/ModalRestore";
import NoData from "@/components/partials/NoData";
import ServerError from "@/components/partials/ServerError";
import Status from "@/components/partials/Status";
import TableLoading from "@/components/partials/TableLoading";
import TableSpinner from "@/components/partials/TableSpinner";
import { setIsAdd, setIsArchive, setIsDelete, setIsRestore } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaArchive, FaEdit } from "react-icons/fa";
import { MdDelete, MdRestore } from "react-icons/md";
import { useInView } from "react-intersection-observer";

const RoleTable = ({ setIsItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isArchiving, setIsArchiving] = React.useState(false);
  const [isId, setIsId] = React.useState("");
  const [isData, setIsData] = React.useState("");

  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();

  let counter = 1;

  const {
    data: role,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    status,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v2/departments/search`, // search endpoint
        `/v2/departments/page/${pageParam}` // list endpoint
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
  });

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setIsItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setIsData();
    setIsId();
    setIsArchiving(true);
    setIsRestore(false);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setIsData();
    setIsId();
    setIsArchiving(false);
    setIsRestore(true);
  };

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setIsData();
    setIsId();
  };

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
     <div className="shadow-md rounded-md overflow-y-auto mt-3 min-h-[calc(100vh-30px)] lg:max-h-[calc(100vh-250px)] mb-10 lg:mb-0 lg:min-h-0">
      {isFetching && !isFetchingNextPage && status !== "loading" && (
        <FetchingSpinner />
      )}
      <table>
        <thead>
          <tr>
            <th className="pl-2">#</th>
            <th>Status</th>
            <th>Role Name</th>
            <th>Role Description</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="relative">
          {isLoading && !isFetchingNextPage && status !== "pending" && (
            <TableSpinner />
          )}
          {status === "pending" && (
            <tr className="text-center">
              <td colSpan="100%" className="p-10">
                {status === "pending" ? <TableLoading /> : <NoData />}
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
            <React.Fragment key={key}>
              {page.data.map((item, key) => (
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
                  <td>{item.user_role_description}</td>
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
                        data-tooltip="Inactivate"
                        onClick={() => handleRestore(item)}
                      >
                        <MdRestore className="text-gray-600" />
                      </button>
                    <button
                        className="tooltip-action-table"
                        data-tooltip="Inactivate"
                        onClick={() => handleDelete(item)}
                      >
                        <MdDelete className="text-gray-600" />
                      </button>
                      </>
                    )}
                    
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-5">
      <Loadmore 
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          setPage={setPage}
          page={page}
          refView={ref}/>
      </div>
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
