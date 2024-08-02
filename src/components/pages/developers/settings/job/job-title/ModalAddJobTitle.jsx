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

const ModalAddJobTitle = ({ itemEdit, job_level }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      dispatch(setIsAdd(false));
    }, 200);
  };

  //activeJobTitle will be an array containing only the elements from job_level.data where user_role_is_active is 1.
  const activeJobLevel = job_level?.data.filter(
    (job_level) => job_level.job_level_is_active === 1
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v2/job_title/${itemEdit.job_title_aid}` // update
          : `/v2/job_title`, // create
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["job_title"] });
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
    job_title_aid: itemEdit ? itemEdit.job_title_aid : "",
    job_title_subscriber: itemEdit ? itemEdit.job_title_subscriber : "",
    job_title_title: itemEdit ? itemEdit.job_title_title : "",
    job_title_job_level_id: itemEdit ? itemEdit.job_title_job_level_id : "",

    job_title_title_old: itemEdit ? itemEdit.job_title_title : "",
  };

  const yupSchema = Yup.object({
    job_title_subscriber: Yup.string().required("Required"),
    job_title_title: Yup.string().required("Required"),
    job_title_job_level_id: Yup.string().required("Required"),
  });

  return (
    <ModalWrapper
      className={`transition-all ease-linear transform duration-200 ${animate}`}
      handleClose={handleClose}
    >
      <div className="modal-title">
        <h2>{itemEdit ? "Update" : "Add"} Job Title</h2>
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
                      name="job_title_subscriber"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputSelect
                      label="*Job Entry Level"
                      type="text"
                      name="job_title_job_level_id"
                      disabled={mutation.isPending}
                    >
                      <option hidden></option>
                      <optgroup label="Select Job Entry Level">
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
                    <InputText
                      label="*Entry Level Name"
                      type="text"
                      name="job_title_title"
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

export default ModalAddJobTitle;
