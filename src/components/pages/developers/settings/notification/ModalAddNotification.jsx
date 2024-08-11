import useQueryData from "@/components/custom-hooks/useQueryData";
import { InputSelect, InputText } from "@/components/helpers/FormInputs";
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

const ModalAddNotification = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");
  const [loading, setLoading] = React.useState(false);
  const [onFocusEmployees, setOnFocusEmployees] = React.useState(false);
  const [employeesValue, setEmployeesValue] = React.useState(
    (`${itemEdit ? itemEdit.employees_lname : ""} ${itemEdit ? itemEdit.employees_fname : ""}`)
  );
  const [employees, setEmployees] = React.useState(
    itemEdit ? itemEdit.employees_fname : ""
  );
  const [employeesId, setEmployeesId] = React.useState(
    itemEdit ? itemEdit.notification_employee_name_id : ""
  );

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      dispatch(setIsAdd(false));
    }, 200);
  };

  const {
    isFetching: notificationDataIsFetching,
    error: notificationDataError,
    data: notificationData,
  } = useQueryData(
    `/v2/notification/search-employees`, // endpoint
    "post", // method
    "notification/search-employees", // key
    {
      searchValue: employees, // payload
    },
    {
      searchValue: employees, // id
    },
    true // refetchOnWindowFocus
  );

  console.log(notificationData);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v2/notification/${itemEdit.notification_aid}` // update
          : `/v2/notification`, // create
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notification"] });
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

  const handleClickEmployees = (item, props) => {
    setEmployees(item.employees_fname);
    setEmployeesValue(`${item.employees_lname}, ${item.employees_fname}`);
    setEmployeesId(item.employees_aid);
    setOnFocusEmployees(false);
    props.values.notification_email = item.employees_personal_email; // getting the email using props
  };

  const handleOnChangeEmployees = (e) => {
    setEmployeesValue(e.target.value);
    setLoading(true);
    setEmployeesId("");
    if (e.target.value === "") {
      setLoading(false);
    }

    let timeOut;

    timeOut = setTimeout(() => {
      clearTimeout(timeOut);
      let val = e.target.value;
      if (val === "") {
        setEmployees(val);
        return;
      }
      setEmployees(val);
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
      setOnFocusEmployees(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", clickOutsideRef);
    return () => document.addEventListener("click", clickOutsideRef);
  }, []);

  React.useEffect(() => {
    setAnimate("");
  }, []);

  const initVal = {
    notification_aid: itemEdit ? itemEdit.notification_aid : "",
    notification_subscriber: itemEdit ? itemEdit.notification_subscriber : "",
    notification_employee_name_id: itemEdit
      ? itemEdit.notification_employee_name_id
      : "",
    notification_purpose: itemEdit ? itemEdit.notification_purpose : "",
    notification_email: itemEdit ? itemEdit.notification_email : "",

    notification_employee_name_id_old: itemEdit
      ? itemEdit.notification_employee_name_id
      : "",
  };

  const yupSchema = Yup.object({
    notification_subscriber: Yup.string().required("Required"),
    notification_purpose: Yup.string().required("Required"),
    notification_email: Yup.string()
      .required("Required")
      .email("Invalid Email."),
  });
  return (
    <ModalWrapper
      className={`transition-all ease-linear transform duration-200 ${animate}`}
      handleClose={handleClose}
    >
      <div className="modal-title">
        <h2 className={itemEdit ? "Update" : "Add"}> Notification</h2>
        <button onClick={handleClose}>
          <GrFormClose className="text-[25px]" />
        </button>
      </div>
      <div className="modal-content">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values) => {
            // to set error message when the input of employees doesnt have input or laman
            if (employeesId === "" || !employeesId) {
              dispatch(setError(true));
              dispatch(setMessage("Employee is Required."));
              return;
            }
            // to get all of the data including notification_employee_name_id
            const data = {
              ...values,
              notification_employee_name_id: employeesId,
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
                      name="notification_subscriber"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Employee"
                      type="text"
                      value={employeesValue}
                      name="notification_employee_name_id"
                      disabled={mutation.isPending}
                      onFocus={() => setOnFocusEmployees(true)}
                      onChange={handleOnChangeEmployees}
                      refVal={ref}
                    />
                    {onFocusEmployees && (
                      <div className="w-full h-40 max-h-40 overflow-y-auto absolute top-[34px] bg-white shadow-md z-50 rounded-sm border border-gray-200 p-2 ">
                        {loading || notificationDataIsFetching ? (
                          <TableSpinner />
                        ) : notificationDataError ? (
                          <div className="my-7">
                            <ServerError />
                          </div>
                        ) : notificationData?.count > 0 ? (
                          notificationData?.data.map((item, key) => (
                            <div
                              className="cursor-pointer"
                              value={item.employees_aid}
                              key={key}
                              onClick={() => handleClickEmployees(item, props)}
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
                    <InputSelect
                      label="*Purpose"
                      type="text"
                      name="notification_purpose"
                    >
                      <option hidden></option>
                      <optgroup label="Select Purpose">
                        <option value="Leave">Leave</option>
                        <option value="Overtime">Overtime</option>
                      </optgroup>
                    </InputSelect>
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Email"
                      type="text"
                      name="notification_email"
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
  );
};

export default ModalAddNotification;