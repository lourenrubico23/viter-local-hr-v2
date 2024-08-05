import useQueryData from "@/components/custom-hooks/useQueryData";
import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
import FetchingSpinner from "@/components/partials/spinner/FetchingSpinner";
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
import TableSpinner from "@/components/partials/spinner/TableSpinner";
import ServerError from "@/components/partials/ServerError";
import NoData from "@/components/partials/NoData";
import ModalError from "@/components/partials/modals/ModalError";

const ModalAddJobTitle = ({ itemEdit, job_level }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");
  const [loading, setLoading] = React.useState(false);
  const [onFocusJobLevel, setOnFocusJobLevel] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [jobLevelValue, setJobLevelValue] = React.useState("");
  const [jobLevel, setJobLevel] = React.useState("");
  const [jobLevelid, setJobLevelid] = React.useState("");

  const {
    isFetching: jobLevelDataIsFetching,
    error: jobLevelDataError,
    data: jobLevelData,
  } = useQueryData(
    `/v2/job_title/search-job-level`, // endpoint
    "post", // method
    "job_title/search-job-level", // key
    {
      searchValue: jobLevel, // payload
    },
    {
      searchValue: jobLevel, // id
    },
    true // refetchOnWindowFocus
  );

  console.log(jobLevelData);

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      dispatch(setIsAdd(false));
    }, 200);
  };

  const handleJobLevel = (item) => {
    setJobLevel(item.job_level_level);
    setJobLevelValue(item.job_level_level);
    setJobLevelid(item.job_level_aid);
    setOnFocusJobLevel(false);
  };

  const handleOnChangeJobLevel = (e) => {
    setJobLevelValue(e.target.value);
    setLoading(true);
    setJobLevelid("");
    if (e.target.value === "") {
      setLoading(false);
    }

    let timeOut;

    timeOut = setTimeout(() => {
      clearTimeout(timeOut);
      let val = e.target.value;
      if (val === "") {
        setJobLevel(val);
        return;
      }
      setJobLevel(val);
      setLoading(false);
    }, 500);
  };

  // to close the modal when clicking outside
  const ref = React.useRef();

  const clickOutsideRef = (e) => {
    if (
      ref.current !== undefined &&
      ref.current !== null &&
      !ref.current?.contains(e.target)
    ) {
      setOnFocusJobLevel(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", clickOutsideRef);
    return () => document.addEventListener("click", clickOutsideRef);
  }, []);

  //activeJobTitle will be an array containing only the elements from job_level.data where user_role_is_active is 1.
  // const activeJobLevel = job_level?.data.filter(
  //   (item) => item.job_level_is_active === 1
  // );

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
  });

  return (
    <>
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
                      <InputText
                        label="*Job Entry Level"
                        type="text"
                        value={jobLevelValue}
                        name="job_title_job_level_id"
                        disabled={mutation.isPending}
                        onFocus={() => setOnFocusJobLevel(true)}
                        onChange={handleOnChangeJobLevel}
                        refVal={ref}
                      />
                      {onFocusJobLevel && (
                        <div className="w-full h-40 max-h-40 overflow-y-auto absolute top-[34px] bg-white shadow-md z-50 rounded-sm border border-gray-200 p-2 ">
                          {loading || jobLevelDataIsFetching ? (
                            <TableSpinner />
                          ) : jobLevelDataError ? (
                            <div className="my-7">
                              <ServerError />
                            </div>
                          ) : jobLevelData?.count > 0 ? (
                            jobLevelData?.data.map((item, key) => (
                              <div
                                className="cursor-pointer"
                                value={item.job_level_aid}
                                key={key}
                                onClick={() => handleJobLevel(item)}
                              >
                                {item.job_level_level}
                              </div>
                            ))
                          ) : (
                            <div className="my-7">
                              <NoData />
                            </div>
                          )}
                        </div>
                      )}
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
      {store.error && <ModalError />}
    </>
  );
};

export default ModalAddJobTitle;
