import useQueryData from "@/components/custom-hooks/useQueryData";
import {
  formatDate,
  getTimeFormat,
} from "@/components/helpers/functions-general";
import ModalWrapper from "@/components/partials/modals/ModalWrapper";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { GrFormClose } from "react-icons/gr";

const ViewModal = ({ setIsView, itemEdit }) => {
  const [animate, setAnimate] = React.useState("translate-x-full");

  console.log(itemEdit);
  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      setIsView(false);
    }, 200);
  };

  React.useEffect(() => {
    setAnimate("");
  }, []);

  const {
    isLoading,
    isFetching,
    error,
    status,
    data: subscribers,
  } = useQueryData(
    `/v2/subscribers/read-all-subscribers-log-by-id`, // endpoint
    "post", // method
    "subscribers", // key
    {
      subscribers_log_subscriber_id: itemEdit.subscribers_aid,
      subscribers_log_subscriber_code: itemEdit.subscribers_code,
    },
    {}
  );

  return (
    <ModalWrapper
      className={`transition-all ease-linear transform duration-200 ${animate}`}
      handleClose={handleClose}
    >
      <div className="modal-title">
        <h2>View Log</h2>
        <button onClick={handleClose}>
          <GrFormClose className="text-[25px]" />
        </button>
      </div>

      <ol>
        {subscribers?.data.map((item, key, arr) => (
          <li
            key={key}
            className={`grid grid-cols-[150px_1fr] m-0 gap-2 align-top relative h-fit group:`}
          >
            <div className="flex justify-center gap-2 items-start relative h-full overflow-hidden pb-12 ">
              <div className="flex flex-col items-end">
                <span>{formatDate(item.subscribers_log_created)}</span>
                <span>{getTimeFormat(item.subscribers_log_created)}</span>
              </div>
              <span
                className={`relative mt-2 z-20 h-4 w-4 rounded-full bg-gray-400 group:before:hidden before:absolute before:left-[.47rem] before:top-1 before:h-screen
                ${arr?.length - 1 === key ? "" : "before:px-[.1px]"}
                before:bg-slate-300  before:self-start before:-translate-x-1/2 before:translate-y-3 before:z-10

                group:after:hidden after:absolute after:left-[.47rem] after:bottom-1 after:h-screen
                ${
                  key === 0 ? "" : "after:px-[.1px]"
                } after:bg-slate-300  after:self-start after:-translate-x-1/2 after:-translate-y-3 before:z-10
                ${key === 0 && "bg-green-600"}
        `}
              ></span>
            </div>
            <div className="flex justify-between">
              <div>
                {/* <h4 className="font-normal text-xs">
              Item Updated.
            </h4> */}
                <p className="text-gray-500 text-[11px] whitespace-pre-wrap m-0">
                  {item.subscribers_log_subscriber_changes.trim() === ""
                    ? "N/A"
                    : item.subscribers_log_subscriber_changes}{" "}
                </p>
                <span className="text-[11px] font-bold">
                  [{item.subscribers_log_lname}, {item.subscribers_log_fname}]
                </span>
              </div>
              {/* {store.credentials.data.role_is_developer === 1 && (
              <div className="pt-1">
                <button
                  type="button"
                  className="btn-action-table tooltip-action-table"
                  data-tooltip="Delete"
                  onClick={() => handleDelete(item)}
                >
                  <FaTrash  />
                </button>
              </div>
            )} */}
            </div>
          </li>
        ))}
      </ol>
    </ModalWrapper>
  );
};

export default ViewModal;
