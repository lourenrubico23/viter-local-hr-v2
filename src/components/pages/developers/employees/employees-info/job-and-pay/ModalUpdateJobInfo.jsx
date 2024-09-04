import useQueryData from "@/components/custom-hooks/useQueryData";
import { InputText, InputTextArea } from "@/components/helpers/FormInputs";
import { calculateTenure } from "@/components/helpers/functions-general";
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
import * as Yup from "yup";

const ModalUpdateJobInfo = ({ itemEdit, hireDate, setHireDate, setTenure}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");
  const [loading, setLoading] = React.useState(false);
  const [onFocusJobLevel, setOnFocusJobLevel] = React.useState(false);
  const [jobLevelValue, setJobLevelValue] = React.useState(
    itemEdit ? itemEdit.employees_job_level_name : ""
  ); // to get the data from table when update
  const [jobLevel, setJobLevel] = React.useState(
    itemEdit ? itemEdit.employees_job_level_name : ""
  );
  const [jobLevelid, setJobLevelid] = React.useState(
    itemEdit ? itemEdit.employees_job_level_id : ""
  );
  const [jobLevelName, setJobLevelName] = React.useState(
    itemEdit ? itemEdit.employees_job_level_name : ""
  );

  const [onFocusJobTitle, setOnFocusJobTitle] = React.useState(false);
  const [jobTitleValue, setJobTitleValue] = React.useState(
    itemEdit ? itemEdit.employees_job_title_name : ""
  ); // to get the data from table when update
  const [jobTitle, setJobTitle] = React.useState(
    itemEdit ? itemEdit.employees_job_title_name : ""
  );
  const [jobTitleid, setJobTitleid] = React.useState(
    itemEdit ? itemEdit.employees_job_title_id : ""
  );
  const [jobTitleName, setJobTitleName] = React.useState(
    itemEdit ? itemEdit.job_title_title : ""
  );

  const [onFocusDepartment, setOnFocusDepartment] = React.useState(false);
  const [departmentValue, setDepartmentValue] = React.useState(
    itemEdit ? itemEdit.employees_department_name : ""
  ); // to get the data from table when update
  const [department, setDepartment] = React.useState(
    itemEdit ? itemEdit.employees_department_name : ""
  );
  const [departmentid, setDepartmentid] = React.useState(
    itemEdit ? itemEdit.employees_department_id : ""
  );
  const [departmentName, setDepartmentName] = React.useState(
    itemEdit ? itemEdit.department_name : ""
  );

  const [subscriberId, setSubscriberId] = React.useState(
    itemEdit ? itemEdit.employees_subscribers_id : ""
  );
  const [subscriberCode, setSubscriberCode] = React.useState(
    itemEdit ? itemEdit.subscribers_code : ""
  );

  const {
    isFetching: departmentFilterDataIsFetching,
    error: departmentFilterDataError,
    data: departmentFilterData,
  } = useQueryData(
    `/v2/job-pay/filter-department`, // endpoint
    "post", // method
    "job-pay/filter-department", // key
    {
      department_subscribers_id: subscriberId,
      searchValue: department,
      employees_subscriber_code: subscriberCode, // payload
    },
    {
      department_subscribers_id: subscriberId, // id
      department,
    },
    true // refetchOnWindowFocus
  );

  const {
    isFetching: jobLevelFilterDataIsFetching,
    error: jobLevelFilterDataError,
    data: jobLevelFilterData,
  } = useQueryData(
    `/v2/job-pay/filter-job-level`, // endpoint
    "post", // method
    "job-pay/filter-job-level", // key
    {
      job_level_subscriber_id: subscriberId,
      searchValue: jobLevel,
      employees_subscriber_code: subscriberCode, // payload
    },
    {
      job_level_subscriber_id: subscriberId, // id
      jobLevel,
    },
    true // refetchOnWindowFocus
  );

  const {
    isFetching: jobTitleFilterDataIsFetching,
    error: jobTitleFilterDataError,
    data: jobTitleFilterData,
  } = useQueryData(
    `/v2/job-pay/filter-job-title`, // endpoint
    "post", // method
    "job-pay/filter-job-title", // key
    {
      job_title_subscriber_id: subscriberId,
      searchValue: jobTitle,
      employees_subscriber_code: subscriberCode, // payload
    },
    {
      job_title_subscriber_id: subscriberId, // id
      jobTitle,
    },
    true // refetchOnWindowFocus
  );

  // Handle date change
  const handleDateChange = (e) => {
    const date = e.target.value;
    setHireDate(date);
    setTenure(calculateTenure(date));
  };

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      dispatch(setIsAdd(false));
    }, 200);
  };

  const handleClickDepartment = (item) => {
    setDepartment(item.department_name);
    setDepartmentValue(item.department_name);
    setDepartmentid(item.department_aid);
    setDepartmentName(item.department_name);
    setOnFocusDepartment(false);
  };

  const handleClickJobLevel = (item) => {
    setJobLevel(item.job_level_level);
    setJobLevelValue(item.job_level_level);
    setJobLevelid(item.job_level_aid);
    setJobLevelName(item.job_level_level);
    setOnFocusJobLevel(false);
  };

  const handleClickJobTitle = (item) => {
    setJobTitle(item.job_title_title);
    setJobTitleValue(item.job_title_title);
    setJobTitleid(item.job_title_aid);
    setJobTitleName(item.job_title_title);
    setOnFocusJobTitle(false);
  };

  const handleOnChangeDepartment = (e) => {
    setDepartmentValue(e.target.value);
    setLoading(true);
    // setDepartmentid("");
    if (e.target.value === "") {
      setLoading(false);
    }

    let timeOut;

    timeOut = setTimeout(() => {
      clearTimeout(timeOut);
      let val = e.target.value;
      if (val === "") {
        setDepartment(val);
        return;
      }
      setDepartment(val);
      setLoading(false);
    }, 500); // debounce seconds to fetch
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

  const handleOnChangeJobTitle = (e) => {
    setJobTitleValue(e.target.value);
    setLoading(true);
    // setJobTitleid("");
    if (e.target.value === "") {
      setLoading(false);
    }

    let timeOut;

    timeOut = setTimeout(() => {
      clearTimeout(timeOut);
      let val = e.target.value;
      if (val === "") {
        setJobTitle(val);
        return;
      }
      setJobTitle(val);
      setLoading(false);
    }, 500); // debounce seconds to fetch
  };

  // to close the modal when clicking outside for Job Level
  const refDepartment = React.useRef();

  const clickOutsideRefDepartment = (e) => {
    if (
      refDepartment.current !== undefined &&
      refDepartment.current !== null &&
      !refDepartment.current?.contains(e.target)
    ) {
      setOnFocusDepartment(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", clickOutsideRefDepartment);
    return () => document.addEventListener("click", clickOutsideRefDepartment);
  }, []);

  // to close the modal when clicking outside for Job Level
  const refJobLevel = React.useRef();

  const clickOutsideRefJobLevel = (e) => {
    if (
      refJobLevel.current !== undefined &&
      refJobLevel.current !== null &&
      !refJobLevel.current?.contains(e.target)
    ) {
      setOnFocusJobLevel(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", clickOutsideRefJobLevel);
    return () => document.addEventListener("click", clickOutsideRefJobLevel);
  }, []);

  // to close the modal when clicking outside for Job Title
  const refJobTitle = React.useRef();

  const clickOutsideRefJobTitle = (e) => {
    if (
      refJobTitle.current !== undefined &&
      refJobTitle.current !== null &&
      !refJobTitle.current?.contains(e.target)
    ) {
      setOnFocusJobTitle(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", clickOutsideRefJobTitle);
    return () => document.addEventListener("click", clickOutsideRefJobTitle);
  }, []);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v2/job-pay/${itemEdit.employees_aid}` // update
          : null, // create
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["job-pay"] });
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
    employees_aid: itemEdit ? itemEdit.employees_aid : "",
    employees_number: itemEdit ? itemEdit.employees_number : "",
    employees_department_id: itemEdit ? itemEdit.employees_department_id : "",
    employees_department_name: itemEdit
      ? itemEdit.employees_department_name
      : "",
    employees_job_level_id: itemEdit ? itemEdit.employees_job_level_id : "",
    employees_job_level_name: itemEdit ? itemEdit.employees_job_level_name : "",
    employees_job_title_id: itemEdit ? itemEdit.employees_job_title_id : "",
    employees_job_title_name: itemEdit ? itemEdit.employees_job_title_name : "",
    employees_work_email: itemEdit ? itemEdit.employees_work_email : "",
    employees_date_hire: itemEdit ? itemEdit.employees_date_hire : "",
    employees_regularized_date: itemEdit
      ? itemEdit.employees_regularized_date
      : "",
    employees_separated_date: itemEdit ? itemEdit.employees_separated_date : "",
    employees_tin_number: itemEdit ? itemEdit.employees_tin_number : "",
    employees_philhealth_number: itemEdit
      ? itemEdit.employees_philhealth_number
      : "",
    employees_sss_number: itemEdit ? itemEdit.employees_sss_number : "",
    employees_pagibig_number: itemEdit ? itemEdit.employees_pagibig_number : "",
    employees_drive_link: itemEdit ? itemEdit.employees_drive_link : "",
    employees_comment: itemEdit ? itemEdit.employees_comment : "",

    employees_number_old: itemEdit ? itemEdit.employees_number : "",
  };

  const yupSchema = Yup.object({
    employees_number: Yup.string().required("Required"),
  });

  return (
    <ModalWrapper
      className={`transition-all ease-linear transform duration-200 ${animate}`}
      handleClose={handleClose}
    >
      <div className="modal-title">
        <h2>Edit Employee Job Profile</h2>
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
            // to set error message when the input of job title doesnt have input or laman
            if (jobTitleid === "" || !jobTitleid) {
              dispatch(setError(true));
              dispatch(setMessage("Job Entry Title is Required."));
              return;
            }
            // to set error message when the input of department doesnt have input or laman
            if (departmentid === "" || !departmentid) {
              dispatch(setError(true));
              dispatch(setMessage("Department is Required."));
              return;
            }
            // to get all of the data including job_title_job_level_id
            const data = {
              ...values,
              employees_job_level_id: jobLevelid,
              employees_subscribers_id: subscriberId,
              employees_subscriber_code: subscriberCode,
              employees_job_title_id: jobTitleid,
              employees_department_id: departmentid,
              employees_department_name: departmentName,
              employees_job_title_name: jobLevelName,
              employees_job_level_name: jobTitleName,
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
                      label="*Employee Number"
                      type="text"
                      name="employees_number"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Department"
                      type="text"
                      value={departmentValue}
                      name="employees_department_id"
                      disabled={mutation.isPending}
                      onFocus={() => setOnFocusDepartment(true)}
                      onChange={handleOnChangeDepartment}
                      refVal={refDepartment}
                    />
                    {onFocusDepartment && (
                      <div className="w-full h-40 max-h-40 overflow-y-auto absolute top-[34px] bg-white shadow-md z-50 rounded-sm border border-gray-200 p-2 ">
                        {loading || departmentFilterDataIsFetching ? (
                          <TableSpinner />
                        ) : departmentFilterDataError ? (
                          <div className="my-7">
                            <ServerError />
                          </div>
                        ) : departmentFilterData?.count > 0 ? (
                          departmentFilterData?.data.map((item, key) => (
                            <div
                              className="cursor-pointer"
                              value={item.department_aid}
                              key={key}
                              onClick={() => handleClickDepartment(item)}
                            >
                              {item.department_name}
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
                      name="employees_job_level_id"
                      disabled={mutation.isPending}
                      onFocus={() => setOnFocusJobLevel(true)}
                      onChange={handleOnChangeJobLevel}
                      refVal={refJobLevel}
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
                      label="*Job Title"
                      type="text"
                      value={jobTitleValue}
                      name="employees_job_title_id"
                      disabled={mutation.isPending}
                      onFocus={() => setOnFocusJobTitle(true)}
                      onChange={handleOnChangeJobTitle}
                      refVal={refJobTitle}
                    />
                    {onFocusJobTitle && (
                      <div className="w-full h-40 max-h-40 overflow-y-auto absolute top-[34px] bg-white shadow-md z-50 rounded-sm border border-gray-200 p-2 ">
                        {loading || jobTitleFilterDataIsFetching ? (
                          <TableSpinner />
                        ) : jobTitleFilterDataError ? (
                          <div className="my-7">
                            <ServerError />
                          </div>
                        ) : jobTitleFilterData?.count > 0 ? (
                          jobTitleFilterData?.data.map((item, key) => (
                            <div
                              className="cursor-pointer"
                              value={item.job_title_aid}
                              key={key}
                              onClick={() => handleClickJobTitle(item)}
                            >
                              {item.job_title_title}
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
                      label="Work Email"
                      type="email"
                      name="employees_work_email"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="Date Employed"
                      type="date"
                      name="employees_date_hire"
                      value={hireDate}
                      onChange={handleDateChange}
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="Date Regularized"
                      type="date"
                      name="employees_regularized_date"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="Date Separated"
                      type="date"
                      name="employees_separated_date"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="TIN"
                      type="text"
                      name="employees_tin_number"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="Philhealth Number"
                      type="text"
                      name="employees_philhealth_number"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="SSS Number"
                      type="text"
                      name="employees_sss_number"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="Pag-ibig Number"
                      type="text"
                      name="employees_pagibig_number"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputTextArea
                      label="Drive Link"
                      type="text"
                      name="employees_drive_link"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputTextArea
                      label="Comment"
                      type="text"
                      name="employees_comment"
                      disabled={mutation.isPending}
                    />
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
                          Number(props.values.employees_subscribers_id) ===
                            Number(subscriberId) &&
                          Number(props.values.employees_job_title_id) ===
                            Number(jobLevelid) &&
                          Number(props.values.employees_job_level_id) ===
                            Number(jobTitleid))
                      }
                    >
                      {mutation.isPending ? <ButtonSpinner /> : "Update"}
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

export default ModalUpdateJobInfo;
