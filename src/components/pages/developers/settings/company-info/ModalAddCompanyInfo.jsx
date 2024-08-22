import useQueryData from "@/components/custom-hooks/useQueryData";
import useUploadPhoto from "@/components/custom-hooks/useUploadPhoto";
import { InputPhotoUpload, InputText } from "@/components/helpers/FormInputs";
import {
  apiVersion,
  devBaseImgUrl,
  hexToRgb,
} from "@/components/helpers/functions-general";
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
import { FaRegImage, FaUpload } from "react-icons/fa6";
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

  const { uploadPhoto, handleChangePhoto, photo } = useUploadPhoto(
    `${apiVersion}/upload-photo`,
    dispatch
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

  const handleClickSubscriber = (item, props) => {
    setSubscriber(item.subscribers_company_name);
    setSubscriberValue(
      `${item.subscribers_company_name} (${item.subscribers_code})`
    );
    setSubscriberId(item.subscribers_aid);
    setSubscriberCode(item.subscribers_code);
    setSubscriberCompany(item.subscribers_company_name);
    setOnFocusSubscriber(false);
    props.values.company_info_email = item.subscribers_contact_email;
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
    company_info_image: itemEdit ? itemEdit.company_info_image : "",
    company_info_primary_color: itemEdit
      ? // ? hexToRgb(itemEdit.company_info_primary_color)
        itemEdit.company_info_primary_color
      : "#000000",
    company_info_secondary_color: itemEdit
      ? // ? hexToRgb(itemEdit.company_info_secondary_color)
        itemEdit.company_info_secondary_color
      : "#000000",
    company_info_accent_color: itemEdit
      ? // ? hexToRgb(itemEdit.company_info_accent_color)
        itemEdit.company_info_accent_color
      : "#000000",

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
              company_info_image: photo?.name || "",
            };
            uploadPhoto(); // to save the photo when submit
            mutation.mutate(data);

            // to change the color when submitted 
            document
              .querySelector(":root")
              .style.setProperty(
                "--primary-color",
                hexToRgb(values.company_info_primary_color)
              );
            document
              .querySelector(":root")
              .style.setProperty(
                "--secondary-color",
                hexToRgb(values.company_info_secondary_color)
              );
            document
              .querySelector(":root")
              .style.setProperty(
                "--accent-color",
                hexToRgb(values.company_info_accent_color)
              );
          }}
        >
          {(props) => {
            return (
              <Form className="modal-form">
                <div className="form-input">
                  <div>
                    {/* <span className="mx-auto flex items-center gap-2 font-semibold border-[1px] rounded-md p-2">
                      <FaRegImage className="size-6" />
                      Upload Photo
                    </span> */}
                    <div className="relative w-fit m-auto pb-2 mt-5 group">
                      {itemEdit === null && photo === null ? (
                        <div className="group-hover:opacity-20 mb-4 flex items-center gap-2 min-h-[44px] min-w-[170px] max-h-[44px] max-w-[170px] border rounded-md p-2">
                          <FaRegImage className="w-12 h-8" />
                          <h1 className="mb-0 leading-tight">Company Logo</h1>
                        </div>
                      ) : (itemEdit?.company_info_image === "" &&
                          photo === null) ||
                        photo === "" ? (
                        <div className="group-hover:opacity-20 mb-4 flex items-center gap-2 min-h-[44px] min-w-[170px] max-h-[44px] max-w-[170px] border rounded-md p-2">
                          <FaRegImage className="w-12 h-8" />
                          <h1 className="mb-0 leading-tight">Company Logo</h1>
                        </div>
                      ) : (
                        <img
                          src={
                            photo
                              ? URL.createObjectURL(photo) // preview
                              : devBaseImgUrl +
                                "/" +
                                itemEdit?.company_info_image // check db
                          }
                          alt="Company Logo"
                          className="group-hover:opacity-30 duration-200 relative min-h-[44px] min-w-[170px] max-h-[44px] max-w-[170px] object-fill object-[50%,50%] m-auto"
                        />
                      )}

                      <FaUpload className="opacity-0 duration-200 group-hover:opacity-100 fill-dark/90 absolute top-0 right-0 bottom-0 left-0 min-w-[1.2rem] min-h-[1.2rem] max-w-[1.2rem] max-h-[1.2rem] m-auto cursor-pointer" />
                      <InputPhotoUpload
                        name="photo"
                        type="file"
                        id="myFile"
                        accept="image/*"
                        title="Upload Logo"
                        onChange={(e) =>
                          handleChangePhoto(
                            e,
                            initVal.company_info_subscriber_code
                          )
                        }
                        className="opacity-0 absolute right-0 bottom-0 left-0 m-auto cursor-pointer"
                      />
                    </div>
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
                              onClick={() => handleClickSubscriber(item, props)}
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
                {console.log(photo)}
                <div className="form-action">
                  <div className="form-btn">
                    <button
                      className="btn-modal-submit"
                      type="submit"
                      disabled={
                        (mutation.isPending || !props.dirty) &&
                        (photo === null || photo === "")
                        // initVal.company_info_image === photo?.name
                      }
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
