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

const ModalAddEmployees = ({ itemEdit, departmentData }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");

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
    employees_fname: itemEdit ? itemEdit.employees_fname : "",
    employees_lname: itemEdit ? itemEdit.employees_lname : "",
    employees_mname: itemEdit ? itemEdit.employees_mname : "",
    employees_gender: itemEdit ? itemEdit.employees_gender : "",
    employees_department_id: itemEdit ? itemEdit.employees_department_id : "",
    employees_personal_email: itemEdit ? itemEdit.employees_personal_email : "",
    employees_birth_date: itemEdit ? itemEdit.employees_birth_date : "",
    employees_marital_status: itemEdit ? itemEdit.employees_marital_status : "",
    employees_date_employed: itemEdit ? itemEdit.employees_date_employed : "",
    employees_mobile_number: itemEdit ? itemEdit.employees_mobile_number : "",
    employees_work_email: itemEdit ? itemEdit.employees_work_email : "",
    employees_number: itemEdit ? itemEdit.employees_number : "",

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
    employees_number: Yup.string().required("Required"),
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
            console.log(values);
            mutation.mutate(values);
          }}
        >
          {(props) => {
            return (
              <Form className="modal-form">
                <div className="form-input">
                  <div className="input-wrapper">
                    <InputText
                      label="*Employees Number"
                      type="number"
                      name="employees_number"
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
                          <option value={item.department_aid} key={key}>
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

export default ModalAddEmployees;
