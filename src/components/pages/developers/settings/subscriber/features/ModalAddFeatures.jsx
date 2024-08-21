import { InputText } from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import ModalWrapper from "@/components/partials/modals/ModalWrapper";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
import { setError, setIsAdd, setMessage, setSuccess } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";
import React from "react";

const ModalAddFeatures = ({itemEdit}) => {
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
          ? `/v2/features/${itemEdit.features_aid}` // update
          : `/v2/features`, // create
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
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
    features_aid: itemEdit ? itemEdit.features_aid : "",
    features_name: itemEdit ? itemEdit.features_name : "",
    features_code: itemEdit ? itemEdit.features_code : "",

    features_name_old: itemEdit ? itemEdit.features_name : "",
    features_code_old: itemEdit ? itemEdit.features_code : "",
  };

  const yupSchema = Yup.object({
    features_name: Yup.string().required("Required"),
    features_code: Yup.string().required("Required"),
  });

  return (
    <ModalWrapper
      className={`transition-all ease-linear transform duration-200 ${animate}`}
      handleClose={handleClose}
    >
      <div className="modal-title">
        <h2>{itemEdit ? "Edit" : "Add"} Features</h2>
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
                      label="*Features Name"
                      type="text"
                      name="features_name"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Features Code"
                      type="text"
                      name="features_code"
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
                      {mutation.isPending ? <ButtonSpinner /> : itemEdit ? "Save" : "Add"}
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

export default ModalAddFeatures
