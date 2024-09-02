import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
import ModalWrapper from "@/components/partials/modals/ModalWrapper";
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
import useQueryData from "@/components/custom-hooks/useQueryData";
import TableSpinner from "@/components/partials/spinner/TableSpinner";
import ServerError from "@/components/partials/ServerError";
import NoData from "@/components/partials/NoData";

const ModalAddEmployees = ({ itemEdit, departmentData }) => {
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
    itemEdit ? itemEdit.employees_subscribers_id : ""
  );
  const [subscriberCode, setSubscriberCode] = React.useState(
    itemEdit ? itemEdit.subscribers_code : ""
  );

  const [departmentName, setDepartmentName] = React.useState(
    itemEdit ? itemEdit.department_name : ""
  );

  const {
    isFetching: subscriberDataIsFetching,
    error: subscriberDataError,
    data: subscriberData,
  } = useQueryData(
    `/v2/employees/search-subscribers`, // endpoint
    "post", // method
    "employees/search-subscribers", // key
    {
      searchValue: subscriber, // payload
    },
    {
      searchValue: subscriber, // id
    },
    true // refetchOnWindowFocus
  );

  const handleClickSubscriber = (item) => {
    setSubscriber(item.subscribers_company_name);
    setSubscriberValue(
      `${item.subscribers_company_name} (${item.subscribers_code})`
    );
    setSubscriberId(item.subscribers_aid);
    setSubscriberCode(item.subscribers_code);
    setOnFocusSubscriber(false);
  };

  const handleClickDepartment = (item) => {
    setDepartmentName(item.department_name);
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

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      dispatch(setIsAdd(false));
    }, 200);
  };

  //activeDepartment will be an array containing only the elements from department.data where department_is_active is 1.
  const activeDepartment = departmentData?.data.filter(
    (department) => department.department_is_active === 1
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v2/employees/${itemEdit.employees_aid}` // update
          : `/v2/employees`, // create
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
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
    employees_subscribers_id: itemEdit ? itemEdit.employees_subscribers_id : "",
    employees_fname: itemEdit ? itemEdit.employees_fname : "",
    employees_lname: itemEdit ? itemEdit.employees_lname : "",
    employees_mname: itemEdit ? itemEdit.employees_mname : "",
    employees_gender: itemEdit ? itemEdit.employees_gender : "",
    employees_department_id: itemEdit ? itemEdit.employees_department_id : "",
    employees_department_name: itemEdit
      ? itemEdit.employees_department_name
      : "",
    employees_personal_email: itemEdit ? itemEdit.employees_personal_email : "",
    employees_birth_date: itemEdit ? itemEdit.employees_birth_date : "",
    employees_marital_status: itemEdit ? itemEdit.employees_marital_status : "",
    employees_date_employed: itemEdit ? itemEdit.employees_date_employed : "",
    employees_mobile_number: itemEdit ? itemEdit.employees_mobile_number : "",
    employees_work_email: itemEdit ? itemEdit.employees_work_email : "",

    employees_fname_old: itemEdit ? itemEdit.employees_fname : "",
  };

  const yupSchema = Yup.object({
    employees_fname: Yup.string().required("Required"),
    employees_lname: Yup.string().required("Required"),
    employees_gender: Yup.string().required("Required"),
    employees_department_id: Yup.string().required("Required"),
    employees_personal_email: Yup.string()
      .required("Required")
      .email("Invalid Email."),
    employees_birth_date: Yup.string().required("Required"),
    employees_marital_status: Yup.string().required("Required"),
    employees_date_employed: Yup.string().required("Required"),
    employees_mobile_number: Yup.string().required("Required"),
    employees_work_email: Yup.string()
      .required("Required")
      .email("Invalid Email."),
  });

  return (
    <ModalWrapper
      className={`transition-all ease-linear transform duration-200 ${animate}`}
      handleClose={handleClose}
    >
      <div className="modal-title">
        <h2>Add Employee</h2>
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
            // to get all of the data including announcement_subscriber
            const data = {
              ...values,
              employees_subscribers_id: subscriberId,
              employees_subscriber_code: subscriberCode,
              employees_department_name: departmentName,
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
                      name="employees_subscribers_id"
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
                      label="*Last Name"
                      type="text"
                      name="employees_lname"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*First Name"
                      type="text"
                      name="employees_fname"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Middle Name"
                      type="text"
                      name="employees_mname"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputSelect
                      label="Gender"
                      type="text"
                      name="employees_gender"
                    >
                      <option value="" hidden></option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </InputSelect>
                  </div>
                  <div className="input-wrapper">
                    <InputSelect
                      label="*Department"
                      type="text"
                      name="employees_department_id"
                      disabled={mutation.isPending}
                    >
                      <option hidden></option>
                      {activeDepartment?.length === 0 ? (
                        <option>No Data</option>
                      ) : (
                        activeDepartment?.map((item, key) => (
                          <option
                            value={item.department_aid}
                            key={key}
                            onClick={handleClickDepartment(item)}
                          >
                            {item.department_name}
                          </option>
                        ))
                      )}
                    </InputSelect>
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Personal Email"
                      type="email"
                      name="employees_personal_email"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Birth Date"
                      type="date"
                      name="employees_birth_date"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputSelect
                      label="Marital Status"
                      type="text"
                      name="employees_marital_status"
                    >
                      <option value="" hidden></option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="widow">Widow</option>
                    </InputSelect>
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Date Employed"
                      type="date"
                      name="employees_date_employed"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Mobile Number"
                      type="number"
                      name="employees_mobile_number"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Work Email"
                      type="email"
                      name="employees_work_email"
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

export default ModalAddEmployees;
