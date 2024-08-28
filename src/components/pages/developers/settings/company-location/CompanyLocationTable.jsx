import useQueryData from "@/components/custom-hooks/useQueryData";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite";
import LoadMore from "@/components/partials/LoadMore";
import ModalArchive from "@/components/partials/modals/ModalArchive";
import ModalDelete from "@/components/partials/modals/ModalDelete";
import ModalRestore from "@/components/partials/modals/ModalRestore";
import NoData from "@/components/partials/NoData";
import SearchBar from "@/components/partials/SearchBar";
import ServerError from "@/components/partials/ServerError";
import FetchingSpinner from "@/components/partials/spinner/FetchingSpinner";
import TableSpinner from "@/components/partials/spinner/TableSpinner";
import Status from "@/components/partials/Status";
import TableLoading from "@/components/partials/TableLoading";
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
import { FaArchive, FaEdit } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { MdDelete, MdRestore } from "react-icons/md";
import { useInView } from "react-intersection-observer";

const CompanyLocationTable = ({ setItemEdit, itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isArchiving, setIsArchiving] = React.useState(false);
  const [id, setIsId] = React.useState("");
  const [isData, setIsData] = React.useState("");

  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const search = React.useRef({ value: "" });
  const { ref, inView } = useInView();

  const [isFilter, setIsFilter] = React.useState(false);
  const [statusData, setStatusData] = React.useState("all");
  const [subscriberCode, setSubscriberCode] = React.useState("all");

  const [loading, setLoading] = React.useState(false);
  const [onFocusSubscriber, setOnFocusSubscriber] = React.useState(false);
  const [subscriberValue, setSubscriberValue] = React.useState(
    itemEdit
      ? `${itemEdit.subscribers_company_name} (${itemEdit.subscribers_code})`
      : ""
  ); // to get the data from table when update
  const [subscriber, setSubscriber] = React.useState(
    itemEdit ? itemEdit.subscribers_company_name : ""
  );
  const [subscriberId, setSubscriberId] = React.useState(
    itemEdit ? itemEdit.notification_subscriber_id : ""
  );

  let counter = 1;

  const {
    isLoading: subscribersIsLoading,
    isFetching: subscribersIsFetching,
    error: subscribersError,
    data: subscribersData,
  } = useQueryData(
    `/v2/subscribers`, // endpoint
    "get", // method
    "subscribers" // key
  );

  // //activeSubscribers will be an array containing only the elements from department.data where department_is_active is 1.
  // const activeSubscribers = subscribersData?.data.filter(
  //   (item) => item.subscribers_is_active === 1
  // );

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
    queryKey: [
      "company-location",
      onSearch,
      store.isSearch,
      isFilter,
      statusData,
      subscriberCode,
    ],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v2/company-location/search`, // search endpoint
        `/v2/company-location/page/${pageParam}`, // list endpoint
        store.isSearch || isFilter, // search boolean
        {
          searchValue: search.current.value,
          id: "",
          isFilter,
          company_location_is_active: statusData === "all" ? "" : statusData,
          company_location_subscriber_id:
            subscriberCode === "all" ? "" : subscriberCode,
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

  console.log(subscriberCode)
  const handleClickSubscriber = (item) => {
    setSubscriber(item.subscribers_company_name);
    setSubscriberValue(
      `${item.subscribers_company_name} (${item.subscribers_code})`
    );
    setSubscriberId(item.subscribers_aid);
    setSubscriberCode(item.subscribers_code);
    setOnFocusSubscriber(false);
  };

  const handleChangeStatus = (e) => {
    setStatusData(e.target.value);
    setIsFilter(false);
    setSubscriberCode("all");
    dispatch(setIsSearch(false));
    search.current.value = "";
    if (e.target.value !== "all") {
      setIsFilter(true);
    }
    setPage(1);
    console.log(statusData);
  };

  const handleChangeSubscriberCode = (e) => {
    setSubscriberValue(e.target.value);
    setIsFilter(false);
    setLoading(true);
    dispatch(setIsSearch(false));
    setSubscriberId("");
    search.current.value = "";
    if (e.target.value === "") {
      setLoading(false);
    }
    if (e.target.value !== "all") {
      setIsFilter(true);
    }
    setPage(1);

    let timeOut;

    timeOut = setTimeout(() => {
      clearTimeout(timeOut);
      let val = e.target.value;
      if (val === "") {
        setSubscriber(val);
        return;
      }
      setSubscriber(val);
      setLoading(false);
    }, 500); // debounce seconds to fetch

  };

  // to close the modal when clicking outside for Subscriber
  const refSubscriber = React.useRef();

  const clickOutsideRefSubscriber = (e) => {
    if (
      refSubscriber.current !== undefined &&
      refSubscriber.current !== null &&
      !refSubscriber.current?.contains(e.target)
    ) {
      setOnFocusSubscriber(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", clickOutsideRefSubscriber);
    return () => document.addEventListener("click", clickOutsideRefSubscriber);
  }, []);

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setIsData(item.company_location_company_name);
    setIsId(item.company_location_aid);
    setIsArchiving(true);
    setIsRestore(false);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setIsData(item.company_location_company_name);
    setIsId(item.company_location_aid);
    setIsArchiving(false);
    setIsRestore(true);
  };

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setIsData(item.company_location_company_name);
    setIsId(item.company_location_aid);
  };

  // used for loading of pages without clicking the Load more button
  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="lg:flex items-center gap-3 w-full">
        <div className="flex items-center gap-10 w-full my-3">
          <div className="relative flex flex-col gap-2 w-[17rem]">
            <label className="z-10">Code</label>
            <input
              type="text"
              value={subscriberValue}
              onFocus={() => setOnFocusSubscriber(true)}
              onChange={handleChangeSubscriberCode}
              ref={refSubscriber}
              disabled={isFetching || status === "pending"}
            />
            {onFocusSubscriber && (
              <div className="w-full h-40 max-h-40 overflow-y-auto absolute top-[34px] bg-white shadow-md z-50 rounded-sm border border-gray-200 pt-1">
                {loading || subscribersIsFetching ? (
                  <TableSpinner />
                ) : subscribersError ? (
                  <div className="my-7">
                    <ServerError />
                  </div>
                ) : subscribersData?.count > 0 ? (
                  subscribersData?.data.map((item, key) => (
                    <div
                      className="cursor-pointer hover:bg-gray-100 px-2"
                      value={"all"}
                      key={key}
                      onClick={() => handleClickSubscriber(item)}
                    >
                      {item.subscribers_company_name} ({item.subscribers_code})
                    </div>
                  ))
                ) : (
                  <div className="my-7">
                    <NoData />
                  </div>
                )}
              </div>
            )}
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

          <div className="relative flex gap-3 w-[130px]">
            <label className="z-10">Status</label>
            <select
              name="status"
              value={statusData}
              onChange={(e) => handleChangeStatus(e)}
              disabled={isFetching || status === "pending"}
            >
              <option value="all">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>

            <div className="flex items-center gap-2">
              <span>
                <FaUserGroup className="text-gray-500" />
              </span>
              {store.isSearch || isFilter
                ? result?.pages[0].count
                : result?.pages[0].total}
              {/* result?.pages[0].count - for search , result?.pages[0].total - for total of data when filter*/}
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-md rounded-md overflow-y-auto min-h-full md:min-h-[calc(100vh-30px)] lg:max-h-[calc(100vh-250px)] mb-10 lg:mb-0 lg:min-h-0 relative">
        {isFetching && !isFetchingNextPage && status !== "loading" && (
          <FetchingSpinner />
        )}
        <table>
          <thead>
            <tr>
              <th className="pl-2 w-[1rem]">#</th>
              <th className="w-[1rem]">Status</th>
              <th>Company Name</th>
              <th>Location</th>
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
                {page.data?.map((item, key) => (
                  <tr key={key} className="cursor-pointer">
                    <td className="pl-2">{counter++}</td>
                    <td>
                      {item.company_location_is_active === 1 ? (
                        <Status text="Active" />
                      ) : (
                        <Status text="Inactive" />
                      )}
                    </td>
                    <td>{item.company_location_company_name}</td>
                    <td>{item.company_location_name}</td>
                    <td className="flex items-center gap-3 justify-end mt-2 lg:mt-0">
                      {item.company_location_is_active ? (
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
        <LoadMore
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          result={result?.pages[0]}
          setPage={setPage}
          page={page}
          refView={ref}
        />
      </div>

      {store.isArchive && (
        <ModalArchive
          setIsArchive={setIsArchive}
          queryKey={"company-location"}
          mysqlEndpoint={`/v2/company-location/active/${id}`}
          item={isData}
          archive={isArchiving}
        />
      )}
      {store.isDelete && (
        <ModalDelete
          setIsDelete={setIsDelete}
          queryKey={"company-location"}
          mysqlEndpoint={`/v2/company-location/${id}`}
          item={isData}
        />
      )}
      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          queryKey={"company-location"}
          mysqlEndpoint={`/v2/company-location/active/${id}`}
          item={isData}
        />
      )}
    </>
  );
};

export default CompanyLocationTable;
