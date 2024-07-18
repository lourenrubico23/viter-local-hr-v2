import FetchingSpinner from "@/components/partials/FetchingSpinner";
import Loadmore from "@/components/partials/LoadMore";
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
} from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaUserAltSlash } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { useInView } from "react-intersection-observer";

const SystemTable = ({ setIsItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isArchiving, setIsArchiving] = React.useState(false);
  const [isId, setIsId] = React.useState("");
  const [isData, setIsData] = React.useState("");

  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const search = React.useRef({ value: "" });
  const { ref, inView } = useInView();

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
    queryKey: ["departments", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v2/departments/search`, // search endpoint
        `/v2/departments/page/${pageParam}`, // list endpoint
        store.isSearch, // search boolean
        { searchValue: search.current.value, id: "" } // search value
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
      <SearchBar
        search={search}
        dispatch={dispatch}
        store={store}
        result={result?.pages}
        isFetching={isFetching}
        setOnSearch={setOnSearch}
        onSearch={onSearch}
      />
      <div className="shadow-md rounded-md overflow-y-auto min-h-[calc(100vh-30px)] lg:max-h-[calc(100vh-250px)] mb-10 lg:mb-0 lg:min-h-0">
        {isFetching && !isFetchingNextPage && status !== "loading" && (
          <FetchingSpinner />
        )}
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

            {result?.pages.map((page, key) => {
              <React.Fragment key={key}>
                {page.data.map((item, key) => (
                  <tr key={key}>
                    <td className="pl-2">{counter++}</td>
                    <td>
                      {item.user_system_is_active === 1 ? (
                        <Status text="Active" />
                      ) : (
                        <Status text="Inactive" />
                      )}
                    </td>
                    <td>{item.user_system_name}</td>
                    <td>{item.user_system_email}</td>
                    <td className="flex items-center gap-3 justify-end mt-2 lg:mt-0">
                      <button
                        className="tooltip-action-table"
                        data-tooltip="Edit"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit className="text-gray-600" />
                      </button>
                      <button
                        className="tooltip-action-table"
                        data-tooltip="Inactivate"
                        onClick={() => handleDelete(item)}
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
                ))}
              </React.Fragment>;
            })}
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
          refView={ref}/>
        </div>
      </div>

      
    </>
  );
};

export default SystemTable;
