import useQueryData from "@/components/custom-hooks/useQueryData";
import { InputText } from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import NoData from "@/components/partials/NoData";
import ServerError from "@/components/partials/ServerError";
import ModalWrapper from "@/components/partials/modals/ModalWrapper";
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
import { getSubscriberCode } from "./functions";

const ModalAddJobTitle = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");
  // const [subscriberName, setSubscriberName] = React.useState(
  //   itemEdit
  //     ? getSubscriberCode(subscribers, itemEdit.leave_benefits_subscriber)
  //     : ""
  // );
  const [loading, setLoading] = React.useState(false);
  const [onFocusJobLevel, setOnFocusJobLevel] = React.useState(false);
  const [jobLevelValue, setJobLevelValue] = React.useState(
    itemEdit ? itemEdit.job_level_level : ""
  ); // to get the data from table when update
  const [jobLevel, setJobLevel] = React.useState(
    itemEdit ? itemEdit.job_level_level : ""
  );
  const [jobLevelid, setJobLevelid] = React.useState(
    itemEdit ? itemEdit.job_title_job_level_id : ""
  );

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
    itemEdit ? itemEdit.job_title_subscriber : ""
  );
  const [subscriberCode, setSubscriberCode] = React.useState(
    itemEdit ? itemEdit.subscribers_code : ""
  );

  const {
    isLoading: subscribersIsLoading,
    isFetching: subscribersIsFetching,
    error: subscribersError,
    data: subscribers,
  } = useQueryData(
    `/v2/subscribers`, // endpoint
    "get", // method
    "subscribers" // key
  );

  const {
    isFetching: jobLevelFilterDataIsFetching,
    error: jobLevelFilterDataError,
    data: jobLevelFilterData,
  } = useQueryData(
    `/v2/job_title/filter-job-level`, // endpoint
    "post", // method
    "job_title/filter-job-level", // key
    {
      job_level_subscriber_id: subscriberId,
      searchValue: jobLevel,
      job_level_subscribers_code: subscriberCode, // payload
    },
    {
      job_level_subscriber: subscriberId, // id
      jobLevel,
    },
    true // refetchOnWindowFocus
  );

  // const {
  //   isFetching: jobLevelDataIsFetching,
  //   error: jobLevelDataError,
  //   data: jobLevelData,
  // } = useQueryData(
  //   `/v2/job_title/search-job-level`, // endpoint
  //   "post", // method
  //   "job_title/search-job-level", // key
  //   {
  //     searchValue: jobLevel, // payload
  //   },
  //   {
  //     searchValue: jobLevel, // id
  //   },
  //   true // refetchOnWindowFocus
  // );

  const {
    isFetching: subscriberDataIsFetching,
    error: subscriberDataError,
    data: subscriberData,
  } = useQueryData(
    `/v2/job_title/search-subscribers`, // endpoint
    "post", // method
    "job_title/search-subscribers", // key
    {
      searchValue: subscriber, // payload
    },
    {
      searchValue: subscriber, // id
    },
    true // refetchOnWindowFocus
  );

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      dispatch(setIsAdd(false));
    }, 200);
  };

  const handleClickJobLevel = (item) => {
    setJobLevel(item.job_level_level);
    setJobLevelValue(item.job_level_level);
    setJobLevelid(item.job_level_aid);
    setOnFocusJobLevel(false);
  };

  const handleOnChangeJobLevel = (e) => {
    setJobLevelValue(e.target.value);
    setLoading(true);
    // setJobLevelid("");
    if (e.target.value === "") {
      setLoading(false);
    }

    let timeOut;

    timeOut = setTimeout(() => {
      clearTimeout(timeOut);
      let val = e.target.value;
      if (val === "") {
        setJobLevel(val);
        return;
      }
      setJobLevel(val);
      setLoading(false);
    }, 500); // debounce seconds to fetch
  };

  // to close the modal when clicking outside
  const ref = React.useRef();

  const clickOutsideRef = (e) => {
    if (
      ref.current !== undefined &&
      ref.current !== null &&
      !ref.current?.contains(e.target)
    ) {
      setOnFocusJobLevel(false);
    }
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

  React.useEffect(() => {
    document.addEventListener("click", clickOutsideRef);
    return () => document.addEventListener("click", clickOutsideRef);
  }, []);

  //activeJobTitle will be an array containing only the elements from job_level.data where user_role_is_active is 1.
  // const activeJobLevel = job_level?.data.filter(
  //   (item) => item.job_level_is_active === 1
  // );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v2/job_title/${itemEdit.job_title_aid}` // update
          : `/v2/job_title`, // create
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["job_title"] });
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
    job_title_aid: itemEdit ? itemEdit.job_title_aid : "",
    job_title_subscriber: itemEdit ? itemEdit.job_title_subscriber : "",
    job_title_title: itemEdit ? itemEdit.job_title_title : "",
    job_title_job_level_id: itemEdit ? itemEdit.job_title_job_level_id : "",

    job_title_title_old: itemEdit ? itemEdit.job_title_title : "",
  };

  const yupSchema = Yup.object({
    job_title_title: Yup.string().required("Required"),
  });

  return (
    <>
      <ModalWrapper
        className={`transition-all ease-linear transform duration-200 ${animate}`}
        handleClose={handleClose}
      >
        <div className="modal-title">
          <h2>{itemEdit ? "Update" : "Add"} Job Title</h2>
          <button onClick={handleClose}>
            <GrFormClose className="text-[25px]" />
          </button>
        </div>

        <div className="modal-content">
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values) => {
              // to set error message when the input of job level doesnt have input or laman
              if (jobLevelid === "" || !jobLevelid) {
                dispatch(setError(true));
                dispatch(setMessage("Job Entry Level is Required."));
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
                job_title_job_level_id: jobLevelid,
                job_title_subscriber: subscriberId,
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
                        name="job_title_subscriber"
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
                        label="*Job Entry Level"
                        type="text"
                        value={jobLevelValue}
                        name="job_title_job_level_id"
                        disabled={mutation.isPending}
                        onFocus={() => setOnFocusJobLevel(true)}
                        onChange={handleOnChangeJobLevel}
                        refVal={ref}
                      />
                      {onFocusJobLevel && (
                        <div className="w-full h-40 max-h-40 overflow-y-auto absolute top-[34px] bg-white shadow-md z-50 rounded-sm border border-gray-200 p-2 ">
                          {loading || jobLevelFilterDataIsFetching ? (
                            <TableSpinner />
                          ) : jobLevelFilterDataError ? (
                            <div className="my-7">
                              <ServerError />
                            </div>
                          ) : jobLevelFilterData?.count > 0 ? (
                            jobLevelFilterData?.data.map((item, key) => (
                              <div
                                className="cursor-pointer"
                                value={item.job_level_aid}
                                key={key}
                                onClick={() => handleClickJobLevel(item)}
                              >
                                {item.job_level_level}
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
                        label="*Entry Level Name"
                        type="text"
                        name="job_title_title"
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
                          "Update"
                        ) : (
                          "Save"
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

export default ModalAddJobTitle;
