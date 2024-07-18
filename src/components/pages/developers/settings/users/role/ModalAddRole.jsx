import { InputText, InputTextArea } from "@/components/helpers/FormInputs";
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
import * as Yup from "yup";

const ModalAddRole = ({ setIsItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      dispatch(setIsAdd(false));
      setIsItemEdit(false);
    }, 200);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        setIsItemEdit ? `/v2/role/${setIsItemEdit.user_role_aid}` : `/v2/role`,
        setIsItemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["role"] });
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
        dispatch(setSuccess(false));
      } else {
        console.log("Success");
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(
          setMessage(`Successfully ${setIsItemEdit ? "Updated" : "Added"}.`)
        );
      }
    },
  });

  React.useEffect(() => {
    setAnimate("");
  }, []);

  const initVal = {
    user_role_aid: setIsItemEdit ? setIsItemEdit.user_role_aid : "",
    user_role_name: setIsItemEdit ? setIsItemEdit.user_role_name : "",
    user_role_description: setIsItemEdit
      ? setIsItemEdit.user_role_description
      : "",

    user_role_name_old: setIsItemEdit ? setIsItemEdit.user_role_name : "",
  };
  const yupSchema = Yup.object({
    user_role_name: Yup.string().required("Required"),
  });

  return (
    <ModalWrapper
      className={`transition-all ease-linear transform duration-200 ${animate}`}
      handleClose={handleClose}
    >
      <div className="modal-title">
        <h2>Add Role</h2>
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
                      label="*Name"
                      type="text"
                      name="user_role_name"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputTextArea
                      label="*Description"
                      type="text"
                      name="user_name_description"
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
                    <button className="btn-modal-cancel" onClick={handleClose}>
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

export default ModalAddRole;
