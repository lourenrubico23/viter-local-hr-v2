import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import ButtonSpinner from "@/components/partials/ButtonSpinner";
import ModalWrapper from "@/components/partials/ModalWrapper";
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
import * as Yup from 'yup'

const ModalAddLeaveBenefits = ({
  itemEdit,
  job_level,
  leave_type,
  job_title,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      dispatch(setIsAdd(false));
    }, 200);
  };

  //activeJobLevel will be an array containing only the elements from job_level.data where user_role_is_active is 1.
  const activeJobLevel = job_level?.data.filter(
    (job_level) => job_level.job_level_is_active === 1
  );

  //activeJobTitle will be an array containing only the elements from job_level.data where user_role_is_active is 1.
  const activeJobTitle = job_title?.data.filter(
    (job_title) => job_title.job_title_is_active === 1
  );

  //activeLeaveType will be an array containing only the elements from job_level.data where user_role_is_active is 1.
  const activeLeaveType = leave_type?.data.filter(
    (leave_type) => leave_type.leave_type_is_active === 1
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
    leave_benefits_subscriber: itemEdit
      ? itemEdit.leave_benefits_subscriber
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
  };

  const yupSchema = Yup.object({
    leave_benefits_subscriber: Yup.string().required("Required"),
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
                      type="text"
                      name="leave_benefits_subscriber"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputSelect
                      label="*Job Level"
                      type="text"
                      name="leave_benefits_job_level_id"
                      disabled={mutation.isPending}
                    >
                      <option hidden></option>
                      <optgroup label="Select Job Level">
                      {activeJobLevel.length === 0 ? (
                        <option>No Data</option>
                      ) : (
                        activeJobLevel?.map((item, key) => (
                          <option value={item.job_level_aid} key={key}>
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
                      {activeJobTitle.length === 0 ? (
                        <option>No Data</option>
                      ) : (
                        activeJobTitle?.map((item, key) => (
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

export default ModalAddLeaveBenefits;
