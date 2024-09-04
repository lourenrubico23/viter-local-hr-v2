import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import ModalWrapper from "@/components/partials/modals/ModalWrapper";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
import { setError, setMessage, setSuccess } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";

const ModalUpdatePayInfo = ({ itemEdit, setEditShow }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");
  const [isCheck, setIsCheck] = React.useState(true);
  const [isWorkingDays, setIsWorkingDays] = React.useState(false);
  const [restDay, setRestDay] = React.useState({
    first: "",
    second: "",
  });
  const [employeesWorkingHours, setEmployeesWorkingHours] = React.useState({
    start: itemEdit ? itemEdit.employees_working_hours_start : "",
    end: itemEdit ? itemEdit.employees_working_hours_end : "",
  });
  const [eligibility, setEligibility] = React.useState(
    itemEdit ? itemEdit.employees_eligibility === "Yes" : false
  );

  const combinedRestDays = restDay.second
    ? `${restDay.first}, ${restDay.second}`
    : restDay.first; // conbine first and second rest days

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      setEditShow(false);
    }, 200);
  };

  const handleWorkingDaysAndRestDayChange = (key, value) => {
    // Handle visibility of the second rest day input
    if (key === "workingDays") {
      if (value === "2 rest Day (261)") {
        setIsWorkingDays(true);
      } else {
        setIsWorkingDays(false);
        setRestDay((prev) => ({
          ...prev,
          second: "", // Clear second rest day if only one rest day is selected
        }));
      }
    }

    // Handle changes to rest days
    if (key === "first" || key === "second") {
      setRestDay((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleClickCheck = () => {
    setIsCheck(!isCheck); // Toggle the isCheck state
    if (!isCheck) {
      setEmployeesWorkingHours({
        start: itemEdit?.employees_working_hours_start || "",
        end: itemEdit?.employees_working_hours_end || "",
      });
    } else {
      setEmployeesWorkingHours({
        start: "flexitime",
        end: "flexitime",
      });
    }
  };

  const handleEligibilityChange = (e) => {
    setEligibility(e.target.checked);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v2/job-pay/update-pay-info/${itemEdit.employees_aid}` // update
          : null, // create
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["job-pay"] });
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
        dispatch(setSuccess(false));
      } else {
        console.log("Success");
        setEditShow(false);
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
    employees_eligibility: itemEdit ? itemEdit.employees_eligibility : "",
    employees_bank_account: itemEdit ? itemEdit.employees_bank_account : "",
    employees_pay_type: itemEdit ? itemEdit.employees_pay_type : "",
    employees_per_hour: itemEdit ? itemEdit.employees_per_hour : "",
    employees_hour_per_pay: itemEdit ? itemEdit.employees_hour_per_pay : "",
    employees_pay_frequency: itemEdit ? itemEdit.employees_pay_frequency : "",
    employees_working_days: itemEdit ? itemEdit.employees_working_days : "",
    employees_rest_day: itemEdit ? itemEdit.employees_rest_day : "",
    employees_working_hours_start: itemEdit
      ? itemEdit.employees_working_hours_start
      : "",
    employees_working_hours_end: itemEdit
      ? itemEdit.employees_working_hours_end
      : "",

    employees_bank_account_old: itemEdit ? itemEdit.employees_bank_account : "",
    // second_restday: itemEdit ? itemEdit.employees_rest_day : "",
  };

  const yupSchema = Yup.object({
    employees_bank_account: Yup.string().required("Required"),
    employees_pay_type: Yup.string().required("Required"),
    employees_per_hour: Yup.string().required("Required"),
    employees_hour_per_pay: Yup.string().required("Required"),
    employees_pay_frequency: Yup.string().required("Required"),
    employees_working_days: Yup.string().required("Required"),
    employees_rest_day: Yup.string().required("Required"),
  });

  return (
    <ModalWrapper
      className={`transition-all ease-linear transform duration-200 ${animate}`}
      handleClose={handleClose}
    >
      <div className="modal-title">
        <h2>Edit Employee Job Profile</h2>
        <button onClick={handleClose}>
          <GrFormClose className="text-[25px]" />
        </button>
      </div>
      <div className="modal-content">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values) => {
            const data = {
              ...values,
              employees_eligibility: eligibility,
              employees_rest_day: combinedRestDays,
              employees_working_hours_start: !isCheck
                ? "flexitime"
                : employeesWorkingHours.start,
              employees_working_hours_end: !isCheck
                ? "flexitime"
                : employeesWorkingHours.end,
            };
            mutation.mutate(data);
          }}
        >
          {(props) => {
            return (
              <Form className="modal-form">
                <div className="form-input">
                  <div className="input-wrapper mt-2 ">
                    <label htmlFor="" className="pt-[17px] pl-4 text-[14px]">
                      Payroll Eligibility
                    </label>
                    <div className="w-[12px]">
                      <InputText
                        type="checkbox"
                        name="employees_eligibility"
                        disabled={mutation.isPending}
                        onChange={handleEligibilityChange}
                        checked={eligibility}
                      />
                      {console.log(eligibility)}
                    </div>
                  </div>
                  <div className="input-wrapper mt-0">
                    <InputText
                      label="*Bank Account"
                      type="text"
                      name="employees_bank_account"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputSelect
                      label="*Pay Type"
                      type="text"
                      name="employees_pay_type"
                      disabled={mutation.isPending}
                    >
                      <option hidden></option>
                      <option value="Salary">Salary</option>
                      <option value="Daily">Daily</option>
                    </InputSelect>
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Per Hour"
                      type="text"
                      name="employees_per_hour"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Hours Per Day"
                      type="text"
                      name="employees_hour_per_pay"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputSelect
                      label="*Pay Frequency"
                      type="text"
                      name="employees_pay_frequency"
                      disabled={mutation.isPending}
                    >
                      <option hidden></option>
                      <option value="Semi-monthly">Semi-monthly</option>
                    </InputSelect>
                  </div>
                  <div className="input-wrapper">
                    <InputSelect
                      label="*Working Days"
                      type="text"
                      name="employees_working_days"
                      disabled={mutation.isPending}
                      onChange={(e) =>
                        handleWorkingDaysAndRestDayChange(
                          "workingDays",
                          e.target.value
                        )
                      }
                    >
                      <option hidden></option>
                      <option value="1 rest Day (313)">1 rest Day (313)</option>
                      <option value="2 rest Day (261)">2 rest Day (261)</option>
                      {console.log(isWorkingDays)}
                    </InputSelect>
                  </div>
                  <div className="input-wrapper">
                    <InputSelect
                      label="*Rest Day"
                      type="text"
                      name="employees_rest_day"
                      disabled={mutation.isPending}
                      onChange={(e) =>
                        handleWorkingDaysAndRestDayChange(
                          "first",
                          e.target.value
                        )
                      }
                    >
                      <option hidden></option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                    </InputSelect>
                  </div>
                  {isWorkingDays && (
                    <div className="input-wrapper">
                      <InputSelect
                        label="*Second Rest Day"
                        type="text"
                        name="second_restday"
                        disabled={mutation.isPending}
                        onChange={(e) =>
                          handleWorkingDaysAndRestDayChange(
                            "second",
                            e.target.value
                          )
                        }
                      >
                        <option hidden></option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                      </InputSelect>
                    </div>
                  )}
                  <div className="input-wrapper mt-2 h-[35px]">
                    <label htmlFor="" className="pt-[17px] pl-4 text-[14px]">
                      Flexitime
                    </label>
                    <div className="w-[12px]">
                      <InputText
                        type="checkbox"
                        name="flexitime"
                        disabled={mutation.isPending}
                        onClick={handleClickCheck}
                      />
                      {console.log(handleClickCheck)}
                    </div>
                  </div>
                  {isCheck && (
                    <div>
                      <div className="input-wrapper mt-0 pt-0">
                        <span
                          htmlFor=""
                          className="mt-0 text-primary font-bold"
                        >
                          Working Hours
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="input-wrapper w-[160px] mt-2">
                          <InputText
                            label="*Start"
                            type="time"
                            // value={isCheck ? "flexitime" : employeesWorkingHours.start}
                            name="employees_working_hours_start"
                            disabled={!isCheck || mutation.isPending}
                            onChange={(e) =>
                              isCheck &&
                              setEmployeesWorkingHours({
                                ...employeesWorkingHours,
                                start: e.target.value,
                              })
                            }
                          />
                        </div>
                        <span>to</span>
                        <div className="input-wrapper w-[160px] mt-2">
                          <InputText
                            label="*End"
                            type="time"
                            // value={isCheck ? "flexitime" : employeesWorkingHours.end}
                            name="employees_working_hours_end"
                            disabled={!isCheck || mutation.isPending}
                            onChange={(e) =>
                              isCheck &&
                              setEmployeesWorkingHours({
                                ...employeesWorkingHours,
                                end: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
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

export default ModalUpdatePayInfo;
