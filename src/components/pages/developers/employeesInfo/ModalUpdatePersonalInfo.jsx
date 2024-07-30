import { InputSelect, InputText } from '@/components/helpers/FormInputs';
import { queryData } from '@/components/helpers/queryData';
import ModalWrapper from '@/components/partials/ModalWrapper';
import { setIsAdd } from '@/store/StoreAction';
import { StoreContext } from '@/store/StoreContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import React from 'react'
import { GrFormClose } from 'react-icons/gr';
import * as Yup from "yup";

const ModalUpdatePersonalInfo = ({itemEdit}) => {
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
          ? `/v2/employees/${itemEdit.employees_aid}` // update
          : `/v2/employees`, // create
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
    employees_info_aid: itemEdit ? itemEdit.employees_info_aid : "",
    employees_info_employees_fname_id: itemEdit ? itemEdit.employees_info_employees_fname_id : "",
    employees_info_employees_lname_id: itemEdit ? itemEdit.employees_info_employees_lname_id : "",
    employees_info_employees_mname_id: itemEdit ? itemEdit.employees_info_employees_mname_id : "",
    employees_info_employees_birth_date_id: itemEdit ? itemEdit.employees_info_employees_birth_date_id : "",
    employees_info_employees_marital_status_id: itemEdit ? itemEdit.employees_info_employees_marital_status_id : "",
    employees_info_street: itemEdit ? itemEdit.employees_info_street : "",
    employees_info_city: itemEdit ? itemEdit.employees_info_city : "",
    employees_info_province: itemEdit ? itemEdit.employees_info_province : "",
    employees_info_country: itemEdit ? itemEdit.employees_info_country : "",
    employees_info_postal_code: itemEdit ? itemEdit.employees_info_postal_code : "",
    employees_info_employees_mobile_number_id: itemEdit ? itemEdit.employees_info_employees_mobile_number_id : "",
    employees_info_telephone_number: itemEdit ? itemEdit.employees_info_telephone_number : "",
    employees_info_employees_personal_email_id: itemEdit ? itemEdit.employees_info_employees_personal_email_id : "",

    employees_info_fname_id_old: itemEdit ? itemEdit.employees_info_fname_id : "",
  };

  const yupSchema = Yup.object({
    employees_info_employees_fname_id: Yup.string().required("Required"),
    employees_info_employees_lname_id: Yup.string().required("Required"),
    employees_info_employees_mname_id: Yup.string().required("Required"),
    employees_info_employees_birth_date_id: Yup.string().required("Required"),
    employees_info_employees_marital_status_id: Yup.string().required("Required"),
    employees_info_street: Yup.string().required("Required"),
    employees_info_city: Yup.string().required("Required"),
    employees_info_province: Yup.string().required("Required"),
    employees_info_country: Yup.string().required("Required"),
    employees_info_postal_code: Yup.string().required("Required"),
    employees_info_employees_mobile_number_id: Yup.string().required("Required"),
    employees_info_telephone_number: Yup.string().required("Required"),
    employees_info_employees_personal_email_id: Yup.string().required("Required"),
  })
  return (
    <ModalWrapper className={`transition-all ease-linear transform duration-200 ${animate}`}
    handleClose={handleClose}>
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
                      label="*Subscriber"
                      type="number"
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
                      name="employees_info_street"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*City"
                      type="text"
                      name="employees_info_city"
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
  )
}

export default ModalUpdatePersonalInfo
