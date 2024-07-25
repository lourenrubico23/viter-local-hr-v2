import { queryDataInfinite } from "@/components/helpers/queryDataInfinite";
import FetchingSpinner from "@/components/partials/FetchingSpinner";
import Loadmore from "@/components/partials/LoadMore";
import ModalArchive from "@/components/partials/ModalArchive";
import ModalDelete from "@/components/partials/ModalDelete";
import ModalRestore from "@/components/partials/ModalRestore";
import NoData from "@/components/partials/NoData";
import SearchBar from "@/components/partials/SearchBar";
import ServerError from "@/components/partials/ServerError";
import Status from "@/components/partials/Status";
import TableLoading from "@/components/partials/TableLoading";
import TableSpinner from "@/components/partials/TableSpinner";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
  setIsSearch,
} from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaArchive, FaEdit, FaUserAltSlash } from "react-icons/fa";
import { FaKey, FaUserGroup } from "react-icons/fa6";
import { MdDelete, MdRestore } from "react-icons/md";
import { useInView } from "react-intersection-observer";

const DepartmentTable = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isArchiving, setIsArchiving] = React.useState(false);
  const [id, setIsId] = React.useState("");
  const [isData, setIsData] = React.useState("");

  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const search = React.useRef({ value: "" });
  const { ref, inView } = useInView();

  const [isFilter, setIsFilter] = React.useState(false);
  const [isStatus, setIsStatus] = React.useState("all");

  let counter = 1;

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    status,
  } = useInfiniteQuery({
    queryKey: ["department", onSearch, store.isSearch, isFilter, isStatus],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v2/department/search`, // search endpoint
        `/v2/department/page/${pageParam}`, // list endpoint
        store.isSearch || isFilter, // search boolean
        {
          searchValue: search.current.value,
          id: "",
          isFilter,
          department_is_active: isStatus,
        } // search value
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
  });

  const handleChangeStatus = (e) => {
    setIsStatus(e.target.value);
    setIsFilter(false);
    dispatch(setIsSearch(false));
    search.current.value = "";
    if (e.target.value !== "all") {
      setIsFilter(true);
    }
    setPage(1);
    console.log(isStatus);
  };

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setIsData(item.department_name);
    setIsId(item.department_aid);
    setIsArchiving(true);
    setIsRestore(false);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setIsData(item.department_name);
    setIsId(item.department_aid);
    setIsArchiving(false);
    setIsRestore(true);
  };

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setIsData(item.department_name);
    setIsId(item.department_aid);
  };

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);
  return (
    <>
      <div className="flex items-center gap-3 w-full">
        <div className="flex items-center gap-3 w-full">
          <div className="relative flex flex-col gap-2 w-[120px]">
            <label className="z-10">Status</label>
            <select
              name="status"
              value={isStatus}
              onChange={(e) => handleChangeStatus(e)}
              disabled={isFetching || status === "pending"}
            >
              <option value="all">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span>
              <FaUserGroup className="text-gray-500" />
            </span>
            {result?.pages[0].data.length}
            {/* to count the number of results o laman ng table */}
          </div>
        </div>

        <div>
          <SearchBar
            search={search}
            dispatch={dispatch}
            store={store}
            result={result?.pages}
            isFetching={isFetching}
            setOnSearch={setOnSearch}
            onSearch={onSearch}
          />
        </div>
      </div>

      {isFetching && !isFetchingNextPage && status !== "loading" && (
        <FetchingSpinner />
      )}

      <div className="shadow-md rounded-md overflow-y-auto min-h-[calc(100vh-30px)] lg:max-h-[calc(100vh-250px)] mb-10 lg:mb-0 lg:min-h-0">
        <table>
          <thead>
            <tr>
              <th className="pl-2 w-[1rem]">#</th>
              <th className="w-[1rem]">Status</th>
              <th>Department Name</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="relative">
            {isLoading && !isFetchingNextPage && status !== "pending" && (
              <TableSpinner />
            )}
            {(status === "pending" || result?.pages[0].data.length === 0) && (
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

            {result?.pages.map((page, key) => (
              <React.Fragment key={key}>
                {page.data.map((item, key) => (
                  <tr key={key}>
                    <td className="pl-2">{counter++}</td>
                    <td>
                      {item.department_is_active === 1 ? (
                        <Status text="Active" />
                      ) : (
                        <Status text="Inactive" />
                      )}
                    </td>
                    <td>{item.department_name}</td>
                    <td className="flex items-center gap-3 justify-end mt-2 lg:mt-0">
                      {item.department_is_active ? (
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
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="text-center mt-5">
          <Loadmore
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            result={result?.pages[0]}
            setPage={setPage}
            page={page}
            refView={ref}
          />
        </div>
      </div>

      {store.isArchive && (
        <ModalArchive
          setIsArchive={setIsArchive}
          queryKey={"department"}
          mysqlEndpoint={`/v2/department/active/${id}`}
          item={isData}
          archive={isArchiving}
        />
      )}
      {store.isDelete && (
        <ModalDelete
          setIsDelete={setIsDelete}
          queryKey={"department"}
          mysqlEndpoint={`/v2/department/${id}`}
          item={isData}
        />
      )}
      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          queryKey={"department"}
          mysqlEndpoint={`/v2/department/active/${id}`}
          item={isData}
        />
      )}
    </>
  );
};

export default DepartmentTable;
