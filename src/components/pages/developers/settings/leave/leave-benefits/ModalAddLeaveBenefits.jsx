import useQueryData from "@/components/custom-hooks/useQueryData";
import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import ModalWrapper from "@/components/partials/modals/ModalWrapper";
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
import * as Yup from "yup";
import { getJobLevelName, getSubscriberCode } from "./functions";
import NoData from "@/components/partials/NoData";

const ModalAddLeaveBenefits = ({
  itemEdit,
  job_level,
  leave_type,
  subscribers,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");
  const [loading, setLoading] = React.useState(false);
  const [levelName, setLevelName] = React.useState(
    itemEdit
      ? getJobLevelName(job_level, itemEdit.leave_benefits_job_level_id)
      : ""
  );
  const [jobLevel, setJobLevel] = React.useState(
    itemEdit ? itemEdit.job_level_level : ""
  );
  const [jobLevelId, setJobLevelId] = React.useState(
    itemEdit ? itemEdit.leave_benefits_job_level_id : ""
  ); // para makuha nag lamn ng leave_benefits_job_level_id when update

  // const [subscriberName, setSubscriberName] = React.useState(
  //   itemEdit
  //     ? getSubscriberCode(subscribers, itemEdit.leave_benefits_subscriber)
  //     : ""
  // );
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
    itemEdit ? itemEdit.leave_benefits_subscriber_id : ""
  );
  const [subscriberCode, setSubscriberCode] = React.useState(
    itemEdit ? itemEdit.subscribers_code : ""
  );

  const {
    isLoading: jobTitleIsLoading,
    isFetching: jobTitleIsFetching,
    error: jobTitleError,
    data: jobTitleData,
  } = useQueryData(
    `/v2/leave_benefits/filter-job-title`, // endpoint
    "post", // method
    "leave_benefits/filter-job-title", // key
    {
      job_title_job_level_id: jobLevelId, //payload
    },
    {
      job_title_job_level_id: jobLevelId, //id
    }
  );

  const {
    isFetching: subscriberDataIsFetching,
    error: subscriberDataError,
    data: subscriberData,
  } = useQueryData(
    `/v2/leave_benefits/search-subscribers`, // endpoint
    "post", // method
    "leave_benefits/search-subscribers", // key
    {
      searchValue: subscriber, // payload
    },
    {
      searchValue: subscriber, // id
    },
    true // refetchOnWindowFocus
  );

  const {
    isFetching: jobLevelDataIsFetching,
    error: jobLevelDataError,
    data: jobLevelData,
  } = useQueryData(
    `/v2/leave_benefits/filter-job-level`, // endpoint
    "post", // method
    "leave_benefits/filter-job-level", // key
    {
      job_level_subscriber_id: subscriberId,
      searchValue: jobLevel,
      job_title_subscriber_code: subscriberCode, // payload
    },
    {
      job_level_subscriber_id: subscriberId,
      jobLevel, // id
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

  const handleOnChangeSubscriber = (e) => {
    // setSubscriberId(e.target.value);
    // setSubscriberName(e.target.options[e.target.selectedIndex].text);

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

  // //activeJobLevel will be an array containing only the elements from job_level.data where job_level_is_active is 1.
  // const activeJobLevel = job_level?.data.filter(
  //   (item) => item.job_level_is_active === 1
  // );

  //activeJobTitle will be an array containing only the elements from job_level.data where job_title_is_active is 1.
  // const activeJobTitle = job_title?.data.filter(
  //   (item) => item.job_title_is_active === 1
  // );

  //activeLeaveType will be an array containing only the elements from job_level.data where leave_type_is_active is 1.
  const activeLeaveType = leave_type?.data.filter(
    (item) => item.leave_type_is_active === 1
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v2/leave_benefits/${itemEdit.leave_benefits_aid}` // update
          : `/v2/leave_benefits`, // create
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leave_benefits"] });
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
    leave_benefits_aid: itemEdit ? itemEdit.leave_benefits_aid : "",
    leave_benefits_subscriber_id: itemEdit
      ? itemEdit.leave_benefits_subscriber_id
      : "",
    leave_benefits_subscriber_code: itemEdit
      ? itemEdit.leave_benefits_subscriber_code
      : "",
    leave_benefits_job_level_id: itemEdit
      ? itemEdit.leave_benefits_job_level_id
      : "",
    leave_benefits_job_title_id: itemEdit
      ? itemEdit.leave_benefits_job_title_id
      : "",
    leave_benefits_leave_type_id: itemEdit
      ? itemEdit.leave_benefits_leave_type_id
      : "",
    leave_benefits_days: itemEdit ? itemEdit.leave_benefits_days : "",

    leave_benefits_job_title_id_old: itemEdit
      ? itemEdit.leave_benefits_job_title_id
      : "",
    leave_benefits_job_level_id_old: itemEdit
      ? itemEdit.leave_benefits_job_level_id
      : "",
    leave_benefits_leave_type_id_old: itemEdit
      ? itemEdit.leave_benefits_leave_type_id
      : "",
    leave_benefits_subscriber_id_old: itemEdit
      ? itemEdit.leave_benefits_subscriber_id
      : "",
  };

  const yupSchema = Yup.object({
    leave_benefits_job_level_id: Yup.string().required("Required"),
    leave_benefits_job_title_id: Yup.string().required("Required"),
    leave_benefits_leave_type_id: Yup.string().required("Required"),
    leave_benefits_days: Yup.string().required("Required"),
  });

  return (
    <ModalWrapper
      className={`transition-all ease-linear transform duration-200 ${animate}`}
      handleClose={handleClose}
    >
      <div className="modal-title">
        <h2>{itemEdit ? "Update" : "Add"} Leave Benefits</h2>
        <button onClick={handleClose}>
          <GrFormClose className="text-[25px]" />
        </button>
      </div>
      <div className="modal-content">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values) => {
            // to set error message when the input of Subscriber doesnt have input or laman
            if (subscriberId === "" || !subscriberId) {
              dispatch(setError(true));
              dispatch(setMessage("Subscriber is Required."));
              return;
            }
            const data = {
              ...values,
              jobLevelName: levelName,
              leave_benefits_subscriber_code: subscriberCode,
              leave_benefits_subscriber_id: subscriberId,
            }; // para makuha ang text o nilalaman pag submit.
            console.log(data);
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
                      name="leave_benefits_subscriber"
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
                    <InputSelect
                      label="*Job Level"
                      type="text"
                      name="leave_benefits_job_level_id"
                      disabled={mutation.isPending}
                      onChange={(e) => {
                        setJobLevelId(e.target.value);
                        setLevelName(
                          e.target.options[e.target.selectedIndex].text
                        ); //Retrieves the text content of the currently selected option
                        return e;
                      }}
                    >
                      <option hidden></option>
                      <optgroup label="Select Job Level">
                        {loading || jobLevelDataIsFetching ? (
                          <div>
                            <TableSpinner />
                          </div>
                        ) : jobLevelDataError ? (
                          <div className="my-7">
                            <ServerError />
                          </div>
                        ) : jobLevelData?.count === 0 ? (
                          <option disabled>No Data</option>
                        ) : (
                          jobLevelData?.data.map((item, key) => (
                            <option
                              value={item.job_level_aid}
                              key={key}
                              id={item.job_level_level}
                            >
                              {item.job_level_level}
                            </option>
                          ))
                        )}
                      </optgroup>
                    </InputSelect>
                  </div>
                  <div className="input-wrapper">
                    <InputSelect
                      label="*Job Title"
                      type="text"
                      name="leave_benefits_job_title_id"
                      disabled={mutation.isPending}
                    >
                      <option hidden></option>
                      <optgroup label="Select Job Title">
                        {loading || jobTitleIsFetching ? (
                          <div>
                            <TableSpinner />
                          </div>
                        ) : jobTitleError ? (
                          <div className="my-7">
                            <ServerError />
                          </div>
                        ) : jobTitleData?.count === 0 ? (
                          <option disabled>No Data</option>
                        ) : (
                          jobTitleData?.data.map((item, key) => (
                            <option value={item.job_title_aid} key={key}>
                              {item.job_title_title}
                            </option>
                          ))
                        )}
                      </optgroup>
                    </InputSelect>
                  </div>
                  <div className="input-wrapper">
                    <InputSelect
                      label="*Leave Type"
                      type="text"
                      name="leave_benefits_leave_type_id"
                      disabled={mutation.isPending}
                    >
                      <option hidden></option>
                      <optgroup label="Select Leave Type">
                        {activeLeaveType.length === 0 ? (
                          <option>No Data</option>
                        ) : (
                          activeLeaveType?.map((item, key) => (
                            <option value={item.leave_type_aid} key={key}>
                              {item.leave_type_type}
                            </option>
                          ))
                        )}
                      </optgroup>
                    </InputSelect>
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Day(S)"
                      type="text"
                      name="leave_benefits_days"
                      disabled={mutation.isPending}
                    />
                  </div>
                </div>

                <div className="form-action">
                  <div className="form-btn">
                    <button
                      className="btn-modal-submit"
                      type="submit"
                      disabled={mutation.isPending || !props.dirty}
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
  );
};

export default ModalAddLeaveBenefits;
