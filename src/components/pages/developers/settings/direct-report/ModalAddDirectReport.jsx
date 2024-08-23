import useQueryData from "@/components/custom-hooks/useQueryData";
import { InputText } from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import ModalWrapper from "@/components/partials/modals/ModalWrapper";
import NoData from "@/components/partials/NoData";
import ServerError from "@/components/partials/ServerError";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
import TableSpinner from "@/components/partials/spinner/TableSpinner";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { GrFormClose } from "react-icons/gr";

const ModalAddDirectReport = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");
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
    itemEdit ? itemEdit.direct_report_subscriber_id : ""
  );
  const [subscriberCode, setSubscriberCode] = React.useState(
    itemEdit ? itemEdit.subscribers_code : ""
  );

  const [onFocusSupervisor, setOnFocusSupervisor] = React.useState(false);
  const [supervisorValue, setSupervisorValue] = React.useState(
    itemEdit ? itemEdit.direct_report_supervisor_name : ""
  ); // to get the data from table when update
  const [supervisor, setSupervisor] = React.useState(
    itemEdit ? itemEdit.direct_report_supervisor_name : ""
  );
  const [supervisorId, setSupervisorId] = React.useState(
    itemEdit ? itemEdit.direct_report_supervisor_id : ""
  );
  const [supervisorName, setSupervisorName] = React.useState(
    itemEdit ? `${itemEdit.employees_lname}, ${itemEdit.employees_fname}` : ""
  );

  const [onFocusSubordinate, setOnFocusSubordinate] = React.useState(false);
  const [subordinateValue, setSubordinateValue] = React.useState(
    itemEdit ? itemEdit.direct_report_subordinate_name : ""
  ); // to get the data from table when update
  const [subordinate, setSubordinate] = React.useState(
    itemEdit ? itemEdit.direct_report_subordinate_name : ""
  );
  const [subordinateId, setSubordinateId] = React.useState(
    itemEdit ? itemEdit.direct_report_subordinate_id : ""
  );
  const [subordinateName, setSubordinateName] = React.useState(
    itemEdit ? `${itemEdit.employees_lname}, ${itemEdit.employees_fname}` : ""
  );

  const {
    isFetching: subscriberDataIsFetching,
    error: subscriberDataError,
    data: subscriberData,
  } = useQueryData(
    `/v2/direct-report/search-subscribers`, // endpoint
    "post", // method
    "direct-report/search-subscribers", // key
    {
      searchValue: subscriber, // payload
    },
    {
      searchValue: subscriber, // id
    },
    true // refetchOnWindowFocus
  );

  const {
    isFetching: supervisorFilterDataIsFetching,
    error: supervisorFilterDataError,
    data: supervisorFilterData,
  } = useQueryData(
    `/v2/direct-report/filter-employee-name`, // endpoint
    "post", // method
    "direct-report/filter-employee-name", // key
    {
      employees_subscribers_id: subscriberId,
      searchValue: supervisor,
      direct_report_subscriber_code: subscriberCode, // payload
    },
    {
      employees_subscribers_id: subscriberId, // id
      supervisor,
    },
    true // refetchOnWindowFocus
  );
  console.log(supervisor);
  const {
    isFetching: subordinateFilterDataIsFetching,
    error: subordinateFilterDataError,
    data: subordinateFilterData,
  } = useQueryData(
    `/v2/direct-report/filter-employee-name`, // endpoint
    "post", // method
    "direct-report/filter-employee-name", // key
    {
      employees_subscribers_id: subscriberId,
      searchValue: subordinate,
      direct_report_subscriber_code: subscriberCode, // payload
    },
    {
      employees_subscribers_id: subscriberId, // id
      subordinate,
    },
    true // refetchOnWindowFocus
  );

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      dispatch(setIsAdd(false));
    }, 200);
  };

  const handleClickSubscriber = (item) => {
    setSubscriber(item.subscribers_company_name);
    setSubscriberValue(
      `${item.subscribers_company_name} (${item.subscribers_code})`
    );
    setSubscriberId(item.subscribers_aid);
    setSubscriberCode(item.subscribers_code);
    setOnFocusSubscriber(false);
  };

  const handleClickSupervisor = (item) => {
    setSupervisor(item.employees_lname);
    setSupervisorValue(`${item.employees_lname}, ${item.employees_fname}`);
    setSupervisorId(item.employees_aid);
    setSupervisorName(`${item.employees_lname}, ${item.employees_fname}`);
    setOnFocusSupervisor(false);
  };

  const handleClickSubordinate = (item) => {
    setSubordinate(item.employees_lname);
    setSubordinateValue(`${item.employees_lname}, ${item.employees_fname}`);
    setSubordinateId(item.employees_aid);
    setSubordinateName(`${item.employees_lname}, ${item.employees_fname}`);
    setOnFocusSubordinate(false);
  };

  const handleOnChangeSubscriber = (e) => {
    setSubscriberValue(e.target.value);
    setLoading(true);
    setSubscriberId("");
    if (e.target.value === "") {
      setLoading(false);
    }

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

  const handleOnChangeSupervisor = (e) => {
    setSupervisorValue(e.target.value);
    setLoading(true);
    setSupervisorId("");
    if (e.target.value === "") {
      setLoading(false);
    }

    let timeOut;

    timeOut = setTimeout(() => {
      clearTimeout(timeOut);
      let val = e.target.value;
      if (val === "") {
        setSupervisor(val);
        return;
      }
      setSupervisor(val);
      setLoading(false);
    }, 500); // debounce seconds to fetch
  };

  const handleOnChangeSubordinate = (e) => {
    setSubordinateValue(e.target.value);
    setLoading(true);
    setSubordinateId("");
    if (e.target.value === "") {
      setLoading(false);
    }

    let timeOut;

    timeOut = setTimeout(() => {
      clearTimeout(timeOut);
      let val = e.target.value;
      if (val === "") {
        setSubordinate(val);
        return;
      }
      setSubordinate(val);
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

  // to close the modal when clicking outside for Subscriber
  const refSupervisor = React.useRef();

  const clickOutsideRefSupervisor = (e) => {
    if (
      refSupervisor.current !== undefined &&
      refSupervisor.current !== null &&
      !refSupervisor.current?.contains(e.target)
    ) {
      setOnFocusSupervisor(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", clickOutsideRefSupervisor);
    return () => document.addEventListener("click", clickOutsideRefSupervisor);
  }, []);

  // to close the modal when clicking outside for Subscriber
  const refSubordinate = React.useRef();

  const clickOutsideRefSubordinate = (e) => {
    if (
      refSubordinate.current !== undefined &&
      refSubordinate.current !== null &&
      !refSubordinate.current?.contains(e.target)
    ) {
      setOnFocusSubordinate(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", clickOutsideRefSubordinate);
    return () => document.addEventListener("click", clickOutsideRefSubordinate);
  }, []);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v2/direct-report/${itemEdit.direct_report_aid}` // update
          : `/v2/direct-report`, // create
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["direct-report"] });
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
        dispatch(setSuccess(false));
      } else {
        console.log("Success");
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfully ${itemEdit ? "Updated" : "Added"}.`));
      }
    },
  });

  React.useEffect(() => {
    setAnimate("");
  }, []);

  const initVal = {
    direct_report_aid: itemEdit ? itemEdit.direct_report_aid : "",
    direct_report_subscriber_id: itemEdit
      ? itemEdit.direct_report_subscriber_id
      : "",
    direct_report_subscriber_code: itemEdit
      ? itemEdit.direct_report_subscriber_code
      : "",
    direct_report_supervisor_id: itemEdit
      ? itemEdit.direct_report_supervisor_id
      : "",
    direct_report_subordinate_id: itemEdit
      ? itemEdit.direct_report_subordinate_id
      : "",
    direct_report_supervisor_name: itemEdit
      ? itemEdit.direct_report_supervisor_name
      : "",
    direct_report_subordinate_name: itemEdit
      ? itemEdit.direct_report_subordinate_name
      : "",

    direct_report_supervisor_id_old: itemEdit
      ? itemEdit.direct_report_supervisor_id
      : "",
    direct_report_subordinate_id_old: itemEdit
      ? itemEdit.direct_report_subordinate_id
      : "",
  };

  return (
    <>
      <ModalWrapper
        className={`transition-all ease-linear transform duration-200 ${animate}`}
        handleClose={handleClose}
      >
        <div className="modal-title">
          <h2>{itemEdit ? "Update" : "Add"} Direct Report</h2>
          <button onClick={handleClose}>
            <GrFormClose className="text-[25px]" />
          </button>
        </div>

        <div className="modal-content">
          <Formik
            initialValues={initVal}
            onSubmit={async (values) => {
              // to set error message when the input of job level doesnt have input or laman
              if (supervisorId === "" || !supervisorId) {
                dispatch(setError(true));
                dispatch(setMessage("Supervisor is Required."));
                return;
              }
              // to set error message when the input of job level doesnt have input or laman
              if (subordinateId === "" || !subordinateId) {
                dispatch(setError(true));
                dispatch(setMessage("Subordinate is Required."));
                return;
              }
              // to set error message when the input of job level doesnt have input or laman
              if (subordinateId === supervisorId) {
                dispatch(setError(true));
                dispatch(
                  setMessage("Supervisor and Subordinate can't be the same.")
                );
                return;
              }
              // to set error message when the input of Subscriber doesnt have input or laman
              if (subscriberId === "" || !subscriberId) {
                dispatch(setError(true));
                dispatch(setMessage("Subscriber is Required."));
                return;
              }
              // to get all of the data including job_title_job_level_id
              const data = {
                ...values,
                direct_report_supervisor_id: supervisorId,
                direct_report_supervisor_name: supervisorName,
                direct_report_subordinate_id: subordinateId,
                direct_report_subordinate_name: subordinateName,
                direct_report_subscriber_id: subscriberId,
                direct_report_subscriber_code: subscriberCode,
                employeeName: supervisor,
              };
              mutation.mutate(data);
            }}
          >
            {(props) => {
              return (
                <Form className="modal-form">
                  <div className="form-input">
                    <div className="input-wrapper">
                      <InputText
                        label="*Subscriber"
                        type="text"
                        value={subscriberValue}
                        name="direct_report_subscriber_id"
                        disabled={mutation.isPending}
                        onFocus={() => setOnFocusSubscriber(true)}
                        onChange={handleOnChangeSubscriber}
                        refVal={refSubscriber}
                      />
                      {onFocusSubscriber && (
                        <div className="w-full h-40 max-h-40 overflow-y-auto absolute top-[34px] bg-white shadow-md z-50 rounded-sm border border-gray-200 pt-1">
                          {loading || subscriberDataIsFetching ? (
                            <TableSpinner />
                          ) : subscriberDataError ? (
                            <div className="my-7">
                              <ServerError />
                            </div>
                          ) : subscriberData?.count > 0 ? (
                            subscriberData?.data.map((item, key) => (
                              <div
                                className="cursor-pointer hover:bg-gray-100 px-2"
                                value={item.subscribers_aid}
                                key={key}
                                onClick={() => handleClickSubscriber(item)}
                              >
                                {item.subscribers_company_name} (
                                {item.subscribers_code})
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
                    <div className="input-wrapper">
                      <InputText
                        label="*Supervisor"
                        type="text"
                        value={supervisorValue}
                        name="direct_report_supervisor_id"
                        disabled={mutation.isPending}
                        onFocus={() => setOnFocusSupervisor(true)}
                        onChange={handleOnChangeSupervisor}
                        refVal={refSupervisor}
                      />
                      {onFocusSupervisor && (
                        <div className="w-full h-40 max-h-40 overflow-y-auto absolute top-[34px] bg-white shadow-md z-50 rounded-sm border border-gray-200 p-2 ">
                          {loading || supervisorFilterDataIsFetching ? (
                            <TableSpinner />
                          ) : supervisorFilterDataError ? (
                            <div className="my-7">
                              <ServerError />
                            </div>
                          ) : supervisorFilterData?.count > 0 ? (
                            supervisorFilterData?.data.map((item, key) => (
                              <div
                                className="cursor-pointer"
                                value={item.employees_aid}
                                key={key}
                                onClick={() => handleClickSupervisor(item)}
                              >
                                {item.employees_lname}, {item.employees_fname}
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
                    <div className="input-wrapper">
                      <InputText
                        label="*Subordinate"
                        type="text"
                        value={subordinateValue}
                        name="direct_report_subordinate_id"
                        disabled={mutation.isPending}
                        onFocus={() => setOnFocusSubordinate(true)}
                        onChange={handleOnChangeSubordinate}
                        refVal={refSubordinate}
                      />
                      {onFocusSubordinate && (
                        <div className="w-full h-40 max-h-40 overflow-y-auto absolute top-[34px] bg-white shadow-md z-50 rounded-sm border border-gray-200 p-2 ">
                          {loading || subordinateFilterDataIsFetching ? (
                            <TableSpinner />
                          ) : subordinateFilterDataError ? (
                            <div className="my-7">
                              <ServerError />
                            </div>
                          ) : subordinateFilterData?.count > 0 ? (
                            subordinateFilterData?.data.map((item, key) => (
                              <div
                                className="cursor-pointer"
                                value={item.employees_aid}
                                key={key}
                                onClick={() => handleClickSubordinate(item)}
                              >
                                {item.employees_lname} {item.employees_fname}
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
                  </div>

                  <div className="form-action">
                    <div className="form-btn">
                      <button
                        className="btn-modal-submit"
                        type="submit"
                        disabled={
                          mutation.isPending ||
                          (!props.dirty &&
                            Number(props.values.direct_report_subscriber_id) ===
                              Number(subscriberId) &&
                            Number(props.values.direct_report_supervisor_id) ===
                              Number(supervisorId) &&
                            Number(
                              props.values.direct_report_subordinate_id
                            ) === Number(subordinateId))
                        }
                      >
                        {mutation.isPending ? (
                          <ButtonSpinner />
                        ) : itemEdit ? (
                          "Save"
                        ) : (
                          "Add"
                        )}
                      </button>
                      <button
                        className="btn-modal-cancel"
                        type="button"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ModalAddDirectReport;
