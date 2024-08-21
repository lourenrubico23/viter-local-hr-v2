import useQueryData from "@/components/custom-hooks/useQueryData";
import { InputText } from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import ModalWrapper from "@/components/partials/modals/ModalWrapper";
import NoData from "@/components/partials/NoData";
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
import { FaRegImage } from "react-icons/fa6";
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";

const ModalAddCompanyInfo = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");
  const [loading, setLoading] = React.useState(false);
  const [onFocusSubscriber, setOnFocusSubscriber] = React.useState(false);
  const [subscriberValue, setSubscriberValue] = React.useState(
    itemEdit
      ? `${itemEdit.subscribers_company_name} (${itemEdit.subscribers_code})`
      : ""
  ); // to get the data from table when update
  const [subscriber, setSubscriber] = React.useState(
    itemEdit ? itemEdit.subscribers_company_name : ""
  );
  const [subscriberId, setSubscriberId] = React.useState(
    itemEdit ? itemEdit.company_info_subscriber_id : ""
  );
  const [subscriberCode, setSubscriberCode] = React.useState(
    itemEdit ? itemEdit.subscribers_code : ""
  );
  const [subscriberCompany, setSubscriberCompany] = React.useState(
    itemEdit ? itemEdit.subscribers_company_name : ""
  );

  const {
    isFetching: subscriberDataIsFetching,
    error: subscriberDataError,
    data: subscriberData,
  } = useQueryData(
    `/v2/company-info/search-subscribers`, // endpoint
    "post", // method
    "company-info/search-subscribers", // key
    {
      searchValue: subscriber, // payload
    },
    {
      searchValue: subscriber, // id
    },
    true // refetchOnWindowFocus
  );

  const handleClickSubscriber = (item) => {
    setSubscriber(item.subscribers_company_name);
    setSubscriberValue(
      `${item.subscribers_company_name} (${item.subscribers_code})`
    );
    setSubscriberId(item.subscribers_aid);
    setSubscriberCode(item.subscribers_code);
    setSubscriberCompany(item.subscribers_company_name);
    setOnFocusSubscriber(false);
  };

  const handleOnChangeSubscriber = (e) => {
    setSubscriberValue(e.target.value);
    setLoading(true);
    setSubscriberId("");
    if (e.target.value === "") {
      setLoading(false);
    }

    let timeOut;

    timeOut = setTimeout(() => {
      clearTimeout(timeOut);
      let val = e.target.value;
      if (val === "") {
        setSubscriber(val);
        return;
      }
      setSubscriber(val);
      setLoading(false);
    }, 500); // debounce seconds to fetch
  };

  // to close the modal when clicking outside for Subscriber
  const refSubscriber = React.useRef();

  const clickOutsideRefSubscriber = (e) => {
    if (
      refSubscriber.current !== undefined &&
      refSubscriber.current !== null &&
      !refSubscriber.current?.contains(e.target)
    ) {
      setOnFocusSubscriber(false);
    }
  };

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      dispatch(setIsAdd(false));
    }, 200);
  };

  React.useEffect(() => {
    document.addEventListener("click", clickOutsideRefSubscriber);
    return () => document.addEventListener("click", clickOutsideRefSubscriber);
  }, []);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v2/company-info/${itemEdit.company_info_aid}` // update
          : `/v2/company-info`, // create
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["company-info"] });
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
    company_info_aid: itemEdit ? itemEdit.company_info_aid : "",
    company_info_subscriber_id: itemEdit
      ? itemEdit.company_info_subscriber_id
      : "",
    company_info_subscriber_code: itemEdit
      ? itemEdit.company_info_subscriber_code
      : "",
    company_info_subscriber_company_name: itemEdit
      ? itemEdit.company_info_subscriber_company_name
      : "",
    company_info_phone: itemEdit ? itemEdit.company_info_phone : "",
    company_info_email: itemEdit ? itemEdit.company_info_email : "",
    company_info_street: itemEdit ? itemEdit.company_info_street : "",
    company_info_city: itemEdit ? itemEdit.company_info_city : "",
    company_info_province: itemEdit ? itemEdit.company_info_province : "",
    company_info_postal: itemEdit ? itemEdit.company_info_postal : "",
    company_info_country: itemEdit ? itemEdit.company_info_country : "",
    company_info_primary_color: itemEdit
      ? itemEdit.company_info_primary_color
      : "",
    company_info_secondary_color: itemEdit
      ? itemEdit.company_info_secondary_color
      : "",
    company_info_accent_color: itemEdit
      ? itemEdit.company_info_accent_color
      : "",

    company_info_subscriber_id_old: itemEdit
      ? itemEdit.company_info_subscriber_id
      : "",
  };

  const yupSchema = Yup.object({
    company_info_phone: Yup.string().required("Required"),
  });

  return (
    <ModalWrapper
      className={`transition-all ease-linear transform duration-200 ${animate}`}
      handleClose={handleClose}
    >
      <div className="modal-title">
        <h2>{itemEdit ? "Edit" : "Add"} Company Info</h2>
        <button onClick={handleClose}>
          <GrFormClose className="text-[25px]" />
        </button>
      </div>

      <div className="modal-content">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values) => {
            // to set error message when the input of Subscriber doesnt have input or laman
            if (subscriberId === "" || !subscriberId) {
              dispatch(setError(true));
              dispatch(setMessage("Subscriber is Required."));
              return;
            }
            // to get all of the data including department_subscribers_id
            const data = {
              ...values,
              company_info_subscriber_id: subscriberId,
              company_info_subscriber_code: subscriberCode,
              company_info_subscriber_company_name: subscriberCompany,
              subscriberName: subscriber,
            };
            mutation.mutate(data);
          }}
        >
          {(props) => {
            return (
              <Form className="modal-form">
                <div className="form-input">
                  <div className="input-wrapper">
                    <span className="mx-auto flex items-center gap-2 font-semibold border-[1px] rounded-md p-2">
                      <FaRegImage className="size-6" />
                      Upload Photo
                    </span>
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="*Subscriber"
                      type="text"
                      value={subscriberValue}
                      name="company_info_subscriber_id"
                      disabled={mutation.isPending}
                      onFocus={() => setOnFocusSubscriber(true)}
                      onChange={handleOnChangeSubscriber}
                      refVal={refSubscriber}
                    />
                    {onFocusSubscriber && (
                      <div className="w-full h-40 max-h-40 overflow-y-auto absolute top-[34px] bg-white shadow-md z-50 rounded-sm border border-gray-200 pt-1">
                        {loading || subscriberDataIsFetching ? (
                          <TableSpinner />
                        ) : subscriberDataError ? (
                          <div className="my-7">
                            <ServerError />
                          </div>
                        ) : subscriberData?.count > 0 ? (
                          subscriberData?.data.map((item, key) => (
                            <div
                              className="cursor-pointer hover:bg-gray-100 px-2"
                              value={item.subscribers_aid}
                              key={key}
                              onClick={() => handleClickSubscriber(item)}
                            >
                              {item.subscribers_company_name} (
                              {item.subscribers_code})
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
                      label="*Company Phone"
                      type="text"
                      name="company_info_phone"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="Company Email"
                      type="text"
                      name="company_info_email"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="Street"
                      type="text"
                      name="company_info_street"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="City"
                      type="text"
                      name="company_info_city"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="Province"
                      type="text"
                      name="company_info_province"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="Postal"
                      type="text"
                      name="company_info_postal"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="Country"
                      type="text"
                      name="company_info_country"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="Navigation Background Color"
                      type="color"
                      name="company_info_primary_color"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="Sub Menu Color"
                      type="color"
                      name="company_info_secondary_color"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="input-wrapper">
                    <InputText
                      label="Accent Color"
                      type="color"
                      name="company_info_accent_color"
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
                        "Save"
                      ) : (
                        "Add"
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

export default ModalAddCompanyInfo;
