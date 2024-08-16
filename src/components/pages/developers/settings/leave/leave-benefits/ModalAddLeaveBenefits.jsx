import useQueryData from "@/components/custom-hooks/useQueryData";
import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import ModalWrapper from "@/components/partials/modals/ModalWrapper";
import ServerError from "@/components/partials/ServerError";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
import TableSpinner from "@/components/partials/spinner/TableSpinner";
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
import { getJobLevelName } from "./functions";

const ModalAddLeaveBenefits = ({ itemEdit, job_level, leave_type }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");
  const [loading, setLoading] = React.useState(false);
  const [levelName, setLevelName] = React.useState(
    itemEdit
      ? getJobLevelName(job_level, itemEdit.leave_benefits_job_level_id)
      : ""
  );
  const [jobLevelId, setJobLevelId] = React.useState(
    itemEdit ? itemEdit.leave_benefits_job_level_id : ""
  ); // para makuha nag lamn ng leave_benefits_job_level_id when update

  const {
    isLoading: jobTitleIsLoading,
    isFetching: jobTitleIsFetching,
    error: jobTitleError,
    data: jobTitleData,
  } = useQueryData(
    `/v2/leave_benefits/filter-job-title`, // endpoint
    "post", // method
    "leave_benefits/filter-job-title", // key
    {
      job_title_job_level_id: jobLevelId, //payload
    },
    {
      job_title_job_level_id: jobLevelId, //id
    }
  );

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      dispatch(setIsAdd(false));
    }, 200);
  };

  console.log(levelName);

  //activeJobLevel will be an array containing only the elements from job_level.data where job_level_is_active is 1.
  const activeJobLevel = job_level?.data.filter(
    (item) => item.job_level_is_active === 1
  );

  //activeJobTitle will be an array containing only the elements from job_level.data where job_title_is_active is 1.
  // const activeJobTitle = job_title?.data.filter(
  //   (item) => item.job_title_is_active === 1
  // );

  //activeLeaveType will be an array containing only the elements from job_level.data where leave_type_is_active is 1.
  const activeLeaveType = leave_type?.data.filter(
    (item) => item.leave_type_is_active === 1
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

    leave_benefits_job_level_id_old: itemEdit
      ? itemEdit.leave_benefits_job_level_id
      : "",
    leave_benefits_job_title_id_old: itemEdit
      ? itemEdit.leave_benefits_job_title_id
      : "",
    leave_benefits_leave_type_id_old: itemEdit
      ? itemEdit.leave_benefits_leave_type_id
      : "",
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
            const data = { ...values, jobLevelName: levelName }; // para makuha ang text o nilalaman pag submit.
            console.log(data);
            mutation.mutate(data);
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
                      onChange={(e) => {
                        setJobLevelId(e.target.value);
                        setLevelName(
                          e.target.options[e.target.selectedIndex].text
                        ); //Retrieves the text content of the currently selected option
                        return e;
                      }}
                    >
                      <option hidden></option>
                      <optgroup label="Select Job Level">
                        {activeJobLevel.length === 0 ? (
                          <option disabled>No Data</option>
                        ) : (
                          activeJobLevel?.map((item, key) => (
                            <option
                              value={item.job_level_aid}
                              key={key}
                              id={item.job_level_level}
                            >
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
                        {loading || jobTitleIsFetching ? (
                          <div>
                            <TableSpinner />
                          </div>
                        ) : jobTitleError ? (
                          <div className="my-7">
                            <ServerError />
                          </div>
                        ) : jobTitleData?.count === 0 ? (
                          <option disabled>No Data</option>
                        ) : (
                          jobTitleData?.data.map((item, key) => (
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
                      {mutation.isPending ? (
                        <ButtonSpinner />
                      ) : itemEdit ? (
                        "Update"
                      ) : (
                        "Save"
                      )}
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
