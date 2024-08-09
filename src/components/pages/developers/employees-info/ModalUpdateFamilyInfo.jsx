import { InputText, InputTextArea } from "@/components/helpers/FormInputs";
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

const ModalUpdateFamilyInfo = ({ itemEdit, setEditShow }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      setEditShow(false);
    }, 200);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v2/employeesInfo/family-info/${itemEdit.employees_aid}` // update
          : null, // create
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employeesInfo"] });
      if (!data.success) {
        // message modals
        dispatch(setError(true));
        dispatch(setMessage(data.error));
        dispatch(setSuccess(false));
      } else {
        setEditShow(false); // close the update modal when save
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
    employees_mother_maiden: itemEdit ? itemEdit.employees_mother_maiden : "",
    employees_mother_fname: itemEdit ? itemEdit.employees_mother_fname : "",
    employees_mother_mname: itemEdit ? itemEdit.employees_mother_mname : "",
    employees_father_lname: itemEdit ? itemEdit.employees_father_lname : "",
    employees_father_fname: itemEdit ? itemEdit.employees_father_fname : "",
    employees_father_mname: itemEdit ? itemEdit.employees_father_mname : "",
    employees_family_contact: itemEdit ? itemEdit.employees_family_contact : "",
    employees_family_address: itemEdit ? itemEdit.employees_family_address : "",
    employees_emergency_contact_name: itemEdit
      ? itemEdit.employees_emergency_contact_name
      : "",
    employees_emergency_contact_relationship: itemEdit
      ? itemEdit.employees_emergency_contact_relationship
      : "",
    employees_emergency_contact_number: itemEdit
      ? itemEdit.employees_emergency_contact_number
      : "",
    employees_emergency_contact_address: itemEdit
      ? itemEdit.employees_emergency_contact_address
      : "",
  };

  const yupSchema = Yup.object({
    employees_mother_maiden: Yup.string().required("Required"),
    employees_mother_fname: Yup.string().required("Required"),
    employees_mother_mname: Yup.string().required("Required"),
    employees_father_lname: Yup.string().required("Required"),
    employees_father_fname: Yup.string().required("Required"),
    employees_father_mname: Yup.string().required("Required"),
    employees_family_contact: Yup.string().required("Required"),
    employees_family_address: Yup.string().required("Required"),
    employees_emergency_contact_name: Yup.string().required("Required"),
    employees_emergency_contact_relationship: Yup.string().required("Required"),
    employees_emergency_contact_number: Yup.string().required("Required"),
    employees_emergency_contact_address: Yup.string().required("Required"),
  });

  return (
    <ModalWrapper
      className={`transition-all ease-linear transform duration-200 ${animate}`}
      handleClose={handleClose}
    >
      <div className="modal-title">
        <h2>Edit Employee Family Information</h2>
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
                      label="*Mother's Maiden Name"
                      type="text"
                      name="employees_mother_maiden"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Mother's First Name"
                      type="text"
                      name="employees_mother_fname"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Mother's Middle Name"
                      type="text"
                      name="employees_mother_mname"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Father's Last Name"
                      type="text"
                      name="employees_father_lname"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Father's First Name"
                      type="text"
                      name="employees_father_fname"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Father's Middle Name"
                      type="text"
                      name="employees_father_mname"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Family Home Contact"
                      type="text"
                      name="employees_family_contact"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputTextArea
                      label="*Family Home Address"
                      type="text"
                      name="employees_family_address"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Emergency Contact Name"
                      type="text"
                      name="employees_emergency_contact_name"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Emergency Contact Relationship"
                      type="text"
                      name="employees_emergency_contact_relationship"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Emergency Contact Number"
                      type="text"
                      name="employees_emergency_contact_number"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputTextArea
                      label="*Emergency Contact Address"
                      type="text"
                      name="employees_emergency_contact_address"
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

export default ModalUpdateFamilyInfo;
