import {
  InputSelect,
  InputText,
  InputTextArea,
} from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import ModalWrapper from "@/components/partials/modals/ModalWrapper";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
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

const ModalAddSubscribers = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");
  const userId = 1;
  const userFname = "First name";
  const userLname = "Last Name";

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      dispatch(setIsAdd(false));
    }, 200);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v2/subscribers/${itemEdit.subscribers_aid}` // update
          : `/v2/subscribers`, // create
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
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
    subscribers_log_user_id: userId,
    subscribers_log_fname: userFname,
    subscribers_log_lname: userLname,

    subscribers_aid: itemEdit ? itemEdit.subscribers_aid : "",
    subscribers_code: itemEdit ? itemEdit.subscribers_code : "",
    subscribers_subscription_type: itemEdit
      ? itemEdit.subscribers_subscription_type
      : "",
    subscribers_payment_type: itemEdit ? itemEdit.subscribers_payment_type : "",
    subscribers_date_start: itemEdit ? itemEdit.subscribers_date_start : "",
    subscribers_contact_fname: itemEdit
      ? itemEdit.subscribers_contact_fname
      : "",
    subscribers_contact_lname: itemEdit
      ? itemEdit.subscribers_contact_lname
      : "",
    subscribers_contact_number: itemEdit
      ? itemEdit.subscribers_contact_number
      : "",
    subscribers_contact_email: itemEdit
      ? itemEdit.subscribers_contact_email
      : "",
    subscribers_company_name: itemEdit ? itemEdit.subscribers_company_name : "",
    subscribers_total_employees: itemEdit
      ? itemEdit.subscribers_total_employees
      : "",
    subscribers_amount_per_employee: itemEdit
      ? itemEdit.subscribers_amount_per_employee
      : "",
    subscribers_address: itemEdit ? itemEdit.subscribers_address : "",

    subscribers_company_name_old: itemEdit
      ? itemEdit.subscribers_company_name
      : "",

    subscribers_total_employees_old: itemEdit
      ? itemEdit.subscribers_total_employees
      : "",
  };

  const yupSchema = Yup.object({
    subscribers_subscription_type: Yup.string().required("Required"),
    subscribers_payment_type: Yup.string().required("Required"),
    subscribers_date_start: Yup.string().required("Required"),
    subscribers_contact_fname: Yup.string().required("Required"),
    subscribers_contact_lname: Yup.string().required("Required"),
    subscribers_contact_number: Yup.string().required("Required"),
    subscribers_contact_email: Yup.string()
      .required("Required")
      .email("Invalid Email."),
    subscribers_company_name: Yup.string().required("Required"),
    subscribers_total_employees: Yup.string().required("Required"),
    subscribers_amount_per_employee: Yup.string().required("Required"),
    subscribers_address: Yup.string().required("Required"),
  });

  return (
    <ModalWrapper
      className={`transition-all ease-linear transform duration-200 ${animate}`}
      handleClose={handleClose}
    >
      <div className="modal-title">
        <h2>{itemEdit ? "Update" : "Add"} Subscriber</h2>
        <button onClick={handleClose}>
          <GrFormClose className="text-[25px]" />
        </button>
      </div>
      <div className="modal-content">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values) => {
            console.log(values);
            mutation.mutate(values);
          }}
        >
          {(props) => {
            return (
              <Form className="modal-form">
                <div className="form-input">
                  <div className="input-wrapper">
                    <InputSelect
                      label="*Subscription Type"
                      type="text"
                      name="subscribers_subscription_type"
                    >
                      <option hidden></option>
                      <option value="Hris">Hris</option>
                      <option value="Payroll">Payroll</option>
                      <option value="Hris Plus">Hris Plus</option>
                    </InputSelect>
                  </div>
                  <div className="input-wrapper">
                    <InputSelect
                      label="*Payment Type"
                      type="text"
                      name="subscribers_payment_type"
                    >
                      <option hidden></option>
                      <option value="Monthly">Monthly</option>
                      <option value="Annual">Annual</option>
                    </InputSelect>
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Date Start"
                      type="date"
                      name="subscribers_date_start"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Contact First Name"
                      type="text"
                      name="subscribers_contact_fname"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Contact Last Name"
                      type="text"
                      name="subscribers_contact_lname"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Contact Number"
                      type="text"
                      name="subscribers_contact_number"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Contact Email"
                      type="text"
                      name="subscribers_contact_email"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Company Name"
                      type="text"
                      name="subscribers_company_name"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Total Employees"
                      type="text"
                      name="subscribers_total_employees"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Amount Per Employee"
                      type="text"
                      name="subscribers_amount_per_employee"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputTextArea
                      label="Address"
                      type="text"
                      name="subscribers_address"
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

export default ModalAddSubscribers;
