import { InputSelect, InputText } from "@/components/helpers/FormInputs";
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

const ModalAddNotification = ({ itemEdit }) => {
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

  React.useEffect(() => {
    setAnimate("");
  }, []);

  const initVal = {
    notification_aid: itemEdit ? itemEdit.notification_aid : "",
    notification_subscriber: itemEdit ? itemEdit.notification_subscriber : "",
    notification_employee_name: itemEdit
      ? itemEdit.notification_employee_name
      : "",
    notification_purpose: itemEdit ? itemEdit.notification_purpose : "",
    notification_email: itemEdit ? itemEdit.notification_email : "",

    notification_employee_name_old: itemEdit
      ? itemEdit.notification_employee_name
      : "",
  };

  const yupSchema = Yup.object({
    notification_subscriber: Yup.string().required("Required"),
    notification_employee_name: Yup.string().required("Required"),
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
                      name="notification_subscriber"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Employee Name"
                      type="text"
                      name="notification_employee_name"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputSelect
                    label="*Purpose"
                    type="text"
                    name="notification_purpose">
                        <option hidden></option>
                        <optgroup
                        label="Select Purpose">
                            <option value="leave">Leave</option>
                            <option value="overtime">Overtime</option>
                        </optgroup>
                    </InputSelect>
                  </div>
                  <div className="input-wrapper">
                    <InputText
                    label="*Email"
                    type="text"
                    name="notification_email"
                    disabled={mutation.isPending}/>
                  </div>
                </div>

                <div className="form-action">
                  <div className="form-btn">
                    <button
                      className="btn-modal-submit"
                      type="submit"
                      disabled={mutation.isPending || !props.dirty}
                    >
                      {mutation.isPending ? <ButtonSpinner /> : itemEdit ? "Update" : "Save"}
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
