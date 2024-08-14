import useQueryData from "@/components/custom-hooks/useQueryData";
import { formatDate, getTimeFormat } from "@/components/helpers/functions-general";
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
        <h2>View Total Employees Log</h2>
        <button onClick={handleClose}>
          <GrFormClose className="text-[25px]" />
        </button>
      </div>

      {subscribers?.data.map((item, key) => (
        <div
          className="mt-3 grid grid-cols-[100px,20px,220px] gap-3 text-gray-500"
          key={key}
        >
          <ul className="text-right">
            <li>{formatDate(item.subscribers_log_datetime)}</li>
            <li>{getTimeFormat(item.subscribers_log_datetime)}</li>
          </ul>
          <span>
            <GoDotFill className="size-6 text-gray-400" />
          </span>
          <ul>
            <li>
              {item.subscribers_log_subscriber_changes}
              <div className="text-gray-500 font-bold">
                [{item.subscribers_log_lname}, {item.subscribers_log_fname}]
              </div>
            </li>
          </ul>
        </div>
      ))}
    </ModalWrapper>
  );
};

export default ViewModal;
