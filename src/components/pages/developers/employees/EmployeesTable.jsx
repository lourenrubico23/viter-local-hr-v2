import { devNavUrl } from "@/components/helpers/functions-general";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite";
import FetchingSpinner from "@/components/partials/spinner/FetchingSpinner";
import LoadMore from "@/components/partials/LoadMore";
import ModalArchive from "@/components/partials/modals/ModalArchive";
import ModalDelete from "@/components/partials/modals/ModalDelete";
import ModalRestore from "@/components/partials/modals/ModalRestore";
import NoData from "@/components/partials/NoData";
import SearchBar from "@/components/partials/SearchBar";
import ServerError from "@/components/partials/ServerError";
import Status from "@/components/partials/Status";
import TableLoading from "@/components/partials/TableLoading";
import TableSpinner from "@/components/partials/spinner/TableSpinner";
import {
  setIsArchive,
  setIsDelete,
  setIsRestore,
  setIsSearch,
} from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaArchive } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { MdDelete, MdRestore } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const EmployeesTable = ({ setItemEdit, departmentData }) => {
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
  const [department, setDepartment] = React.useState("all");

  // to navigate to personal info page
  const navigate = useNavigate();

  let counter = 1;

  //activeDepartment will be an array containing only the elements from department.data where department_is_active is 1.
  const activeDepartment = departmentData?.data.filter(
    (item) => item.department_is_active === 1
  );

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
      "employees",
      onSearch,
      store.isSearch,
      isFilter,
      statusData,
      department,
    ],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v2/employees/search`, // search endpoint
        `/v2/employees/page/${pageParam}`, // list endpoint
        store.isSearch || isFilter, // search boolean
        {
          searchValue: search.current.value,
          id: "",
          isFilter,
          employees_is_active: statusData === "all" ? "" : statusData,
          employees_department_id: department === "all" ? "" : department,
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
    setStatusData(e.target.value);
    setIsFilter(false);
    setDepartment("all");
    dispatch(setIsSearch(false));
    search.current.value = "";
    if (e.target.value !== "all") {
      setIsFilter(true);
    }
    setPage(1);
    console.log(statusData);
  };

  const handleChangeDepartment = (e) => {
    setDepartment(e.target.value);
    setIsFilter(false);
    dispatch(setIsSearch(false));
    search.current.value = "";
    if (e.target.value !== "all") {
      setIsFilter(true);
    }
    setPage(1);
    console.log(department);
  };

  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setIsData(`${item.employees_lname}, ${item.employees_fname}`);
    setIsId(item.employees_aid);
    setIsArchiving(true);
    setIsRestore(false);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setIsData(`${item.employees_lname}, ${item.employees_fname}`);
    setIsId(item.employees_aid);
    setIsArchiving(false);
    setIsRestore(true);
  };

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setIsData(`${item.employees_lname}, ${item.employees_fname}`);
    setIsId(item.employees_aid);
  };

  const handleGoToPage = (item) => {
    navigate(`${devNavUrl}/employees/view?id=${item.employees_aid}`);
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
        <div className="flex items-center gap-3 w-full my-3">
          <div className="relative flex flex-col gap-2 w-[120px]">
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
          </div>

          <div className="relative flex flex-col gap-2 w-[17rem]">
            <label className="z-10">Department</label>
            <select
              name="department"
              value={department}
              onChange={(e) => handleChangeDepartment(e)}
              disabled={isFetching || status === "pending"}
            >
              <option value="all">All</option>
              {activeDepartment?.length === 0 ? (
                <option>No Data</option>
              ) : (
                activeDepartment?.map((item, key) => (
                  <option value={item.department_aid} key={key}>
                    {item.department_name}
                  </option>
                ))
              )}
            </select>
          </div>
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

      <div className="shadow-md rounded-md overflow-y-auto min-h-full md:min-h-[calc(100vh-30px)] lg:max-h-[calc(100vh-250px)] mb-10 lg:mb-0 lg:min-h-0 relative">
        {isFetching && !isFetchingNextPage && status !== "loading" && (
          <FetchingSpinner />
        )}
        <table>
          <thead>
            <tr>
              <th className="pl-2 w-[1rem]">#</th>
              <th className="w-[1rem]">Status</th>
              <th>Employee #</th>
              <th>Code</th>
              <th>Employee Name</th>
              <th>Work Email</th>
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
                    <td className="pl-2" onClick={() => handleGoToPage(item)}>
                      {counter++}
                    </td>
                    <td onClick={() => handleGoToPage(item)}>
                      {item.employees_is_active === 1 ? (
                        <Status text="Active" />
                      ) : (
                        <Status text="Inactive" />
                      )}
                    </td>
                    <td onClick={() => handleGoToPage(item)}>
                      {item.subscribers_code}
                    </td>
                    <td onClick={() => handleGoToPage(item)}></td>
                    <td onClick={() => handleGoToPage(item)}>
                      {item.employees_fname} {item.employees_lname}
                    </td>
                    <td onClick={() => handleGoToPage(item)}>
                      {item.employees_work_email}
                    </td>
                    <td className="flex items-center gap-3 justify-end mt-2 lg:mt-0">
                      {item.employees_is_active ? (
                        <>
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
          queryKey={"employees"}
          mysqlEndpoint={`/v2/employees/active/${id}`}
          item={isData}
          archive={isArchiving}
        />
      )}
      {store.isDelete && (
        <ModalDelete
          setIsDelete={setIsDelete}
          queryKey={"employees"}
          mysqlEndpoint={`/v2/employees/${id}`}
          item={isData}
        />
      )}
      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          queryKey={"employees"}
          mysqlEndpoint={`/v2/employees/active/${id}`}
          item={isData}
        />
      )}
    </>
  );
};

export default EmployeesTable;
