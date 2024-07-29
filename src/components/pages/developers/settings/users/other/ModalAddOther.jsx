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
import * as Yup from "yup";

const ModalAddOther = ({ itemEdit, role }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      dispatch(setIsAdd(false));
    }, 200);
  };

  //activeRole will be an array containing only the elements from role.data where user_role_is_active is 1.
  const activeRole = role?.data.filter(
    (role) =>
      role.user_role_is_active === 1 &&
      role.user_role_name.toLowerCase() !== "developer"
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v2/other/${itemEdit.user_other_aid}` // update
          : `/v2/other`, // create
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["other"] });
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
    user_other_aid: itemEdit ? itemEdit.user_other_aid : "",
    user_other_fname: itemEdit ? itemEdit.user_other_fname : "",
    user_other_lname: itemEdit ? itemEdit.user_other_lname : "",
    user_other_email: itemEdit ? itemEdit.user_other_email : "",
    user_other_role_id: itemEdit ? itemEdit.user_other_role_id : "",

    user_other_fname_old: itemEdit ? itemEdit.user_other_fname : "",
  };
  const yupSchema = Yup.object({
    user_other_fname: Yup.string().required("Required"),
    user_other_lname: Yup.string().required("Required"),
    user_other_email: Yup.string().required("Required"),
    user_other_role_id: Yup.string().required("Required"),
  });
  return (
    <ModalWrapper
      className={`transition-all ease-linear transform duration-200 ${animate}`}
      handleClose={handleClose}
    >
      <div className="modal-title">
        <h2>{itemEdit ? "Edit" : "Add"} Other User</h2>
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
                      label="*Role"
                      type="text"
                      name="user_other_role_id"
                      disabled={mutation.isPending}
                    >
                      <option hidden></option>
                      {activeRole.length === 0 ? (
                        <option>No Data</option>
                      ) : (
                        activeRole?.map((item, key) => (
                          <option value={item.user_role_aid} key={key}>
                            {item.user_role_name}
                          </option>
                        ))
                      )}
                    </InputSelect>
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*First Name"
                      type="text"
                      name="user_other_fname"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Last Name"
                      type="text"
                      name="user_other_lname"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Email"
                      type="email"
                      name="user_other_email"
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

export default ModalAddOther;
