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

const ModalUpdatePersonalInfo = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");

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
          ? `/v2/employeesInfo/${itemEdit.employees_aid}` // update
          : null, // create
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employeesInfo"] });
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
    employees_fname: itemEdit ? itemEdit.employees_fname : "",
    employees_lname: itemEdit ? itemEdit.employees_lname : "",
    employees_mname: itemEdit ? itemEdit.employees_mname : "",
    employees_birth_date: itemEdit ? itemEdit.employees_birth_date : "",
    employees_marital_status: itemEdit ? itemEdit.employees_marital_status : "",
    employees_street: itemEdit ? itemEdit.employees_street : "",
    employees_city: itemEdit ? itemEdit.employees_city : "",
    employees_province: itemEdit ? itemEdit.employees_province : "",
    employees_country: itemEdit ? itemEdit.employees_country : "",
    employees_postal_code: itemEdit ? itemEdit.employees_postal_code : "",
    employees_mobile_number: itemEdit ? itemEdit.employees_mobile_number : "",
    employees_telephone_number: itemEdit
      ? itemEdit.employees_telephone_number
      : "",
    employees_personal_email: itemEdit ? itemEdit.employees_personal_email : "",

    employees_fname_old: itemEdit ? itemEdit.employees_fname : "",
  };

  const yupSchema = Yup.object({
    employees_number: Yup.string().required("Required"),
    employees_fname: Yup.string().required("Required"),
    employees_lname: Yup.string().required("Required"),
    employees_birth_date: Yup.string().required("Required"),
    employees_marital_status: Yup.string().required("Required"),
    employees_street: Yup.string().required("Required"),
    employees_city: Yup.string().required("Required"),
    employees_province: Yup.string().required("Required"),
    employees_country: Yup.string().required("Required"),
    employees_postal_code: Yup.string().required("Required"),
    employees_mobile_number: Yup.string().required("Required"),
    employees_telephone_number: Yup.string().required("Required"),
    employees_personal_email: Yup.string()
      .required("Required")
      .email("Invalid Email."),
  });
  return (
    <ModalWrapper
      className={`transition-all ease-linear transform duration-200 ${animate}`}
      handleClose={handleClose}
    >
      <div className="modal-title">
        <h2>Edit Employee Information</h2>
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
                    <img
                      src="https:/via.placeholder.com/50x50"
                      alt=""
                      className="rounded-full w-10 mx-auto"
                    />
                    <span className="mx-auto">Upload Photo</span>
                  </div>

                  <div className="input-wrapper">
                    <InputText
                      label="*Subscriber"
                      type="text"
                      name="employees_number"
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
                    <InputText
                      label="*Last Name"
                      type="text"
                      name="employees_lname"
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
                      label="*Street"
                      type="text"
                      name="employees_street"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*City"
                      type="text"
                      name="employees_city"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Province"
                      type="text"
                      name="employees_province"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Country"
                      type="text"
                      name="employees_country"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Postal Code"
                      type="text"
                      name="employees_postal_code"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Mobile Number"
                      type="text"
                      name="employees_mobile_number"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Telephone Number"
                      type="text"
                      name="employees_telephone_number"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Personal Email"
                      type="text"
                      name="employees_personal_email"
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
                      {mutation.isPending ? <ButtonSpinner /> : "Add"}
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

export default ModalUpdatePersonalInfo;
