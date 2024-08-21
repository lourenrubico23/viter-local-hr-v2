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
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";

const ModalAddAddons = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");
  const [loading, setLoading] = React.useState(false);
  const [onFocusFeatures, setOnFocusFeatures] = React.useState(false);
  const [onFocusSubscriber, setOnFocusSubscriber] = React.useState(false);
  const [featuresValue, setFeaturesValue] = React.useState(
    itemEdit ? `${itemEdit.features_name} (${itemEdit.features_code})` : ""
  ); // to get the data from table when update
  const [subscriberValue, setSubscriberValue] = React.useState(
    itemEdit
      ? `${itemEdit.subscribers_company_name} (${itemEdit.subscribers_code})`
      : ""
  ); // to get the data from table when update
  const [features, setFeatures] = React.useState(
    itemEdit ? itemEdit.features_name : ""
  );
  const [subscriber, setSubscriber] = React.useState(
    itemEdit ? itemEdit.subscribers_company_name : ""
  );
  const [featuresId, setFeaturesId] = React.useState(
    itemEdit ? itemEdit.addons_feature_code_id : ""
  );
  const [subscriberId, setSubscriberId] = React.useState(
    itemEdit ? itemEdit.addons_subscriber_id : ""
  );
  const [subscriberCode, setSubscriberCode] = React.useState(
    itemEdit ? itemEdit.subscribers_code : ""
  );

  const {
    isFetching: featuresDataIsFetching,
    error: featuresDataError,
    data: featuresData,
  } = useQueryData(
    `/v2/addons/search-features`, // endpoint
    "post", // method
    "addons/search-features", // key
    {
      searchValue: features, // payload
    },
    {
      searchValue: features, // id
    },
    true // refetchOnWindowFocus
  );

  const {
    isFetching: subscriberDataIsFetching,
    error: subscriberDataError,
    data: subscriberData,
  } = useQueryData(
    `/v2/addons/search-subscribers`, // endpoint
    "post", // method
    "addons/search-subscribers", // key
    {
      searchValue: subscriber, // payload
    },
    {
      searchValue: subscriber, // id
    },
    true // refetchOnWindowFocus
  );

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      dispatch(setIsAdd(false));
    }, 200);
  };

  const handleClickFeatures = (item) => {
    setFeatures(item.features_name);
    setFeaturesValue(`${item.features_name} (${item.features_code})`);
    setFeaturesId(item.features_aid);
    setOnFocusFeatures(false);
  };

  const handleClickSubscriber = (item) => {
    setSubscriber(item.subscribers_company_name);
    setSubscriberValue(
      `${item.subscribers_company_name} (${item.subscribers_code})`
    );
    setSubscriberId(item.subscribers_aid);
    setSubscriberCode(item.subscribers_code);
    setOnFocusSubscriber(false);
  };

  const handleOnChangeFeatures = (e) => {
    setFeaturesValue(e.target.value);
    setLoading(true);
    setFeaturesId("");

    if (e.target.value === "") {
      setLoading(false);
    }

    let timeOut;

    timeOut = setTimeout(() => {
      clearTimeout(timeOut);
      let val = e.target.value;
      if (val === "") {
        setFeatures(val);
        return;
      }
      setFeatures(val);
      setLoading(false);
    }, 500); // debounce seconds to fetch
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

  // to close the modal when clicking outside for features
  const refFeatures = React.useRef();

  const clickOutsideRefFeatures = (e) => {
    if (
      refFeatures.current !== undefined &&
      refFeatures.current !== null &&
      !refFeatures.current?.contains(e.target)
    ) {
      setOnFocusFeatures(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", clickOutsideRefFeatures);
    return () => document.addEventListener("click", clickOutsideRefFeatures);
  }, []);

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

  React.useEffect(() => {
    document.addEventListener("click", clickOutsideRefSubscriber);
    return () => document.addEventListener("click", clickOutsideRefSubscriber);
  }, []);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v2/addons/${itemEdit.addons_aid}` // update
          : `/v2/addons`, // create
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["addons"] });
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
    addons_aid: itemEdit ? itemEdit.addons_aid : "",
    addons_subscriber_id: itemEdit ? itemEdit.addons_subscriber_id : "",
    addons_subscriber_code: itemEdit ? itemEdit.addons_subscriber_code : "",
    addons_feature_code_id: itemEdit ? itemEdit.addons_feature_code_id : "",

    addons_feature_code_id_old: itemEdit ? itemEdit.addons_feature_code_id : "",
  };

  const yupSchema = Yup.object({});

  return (
    <ModalWrapper
      className={`transition-all ease-linear transform duration-200 ${animate}`}
      handleClose={handleClose}
    >
      <div className="modal-title">
        <h2>{itemEdit ? "Edit" : "Add"} Addons</h2>
        <button onClick={handleClose}>
          <GrFormClose className="text-[25px]" />
        </button>
      </div>
      <div className="modal-content">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values) => {
            // to set error message when the input of features doesnt have input or laman
            if (featuresId === "" || !featuresId) {
              dispatch(setError(true));
              dispatch(setMessage("Features is Required."));
              return;
            }
            // to set error message when the input of subscribers doesnt have input or laman
            if (subscriberId === "" || !subscriberId) {
              dispatch(setError(true));
              dispatch(setMessage("Subscriber is Required."));
              return;
            }
            // to get all of the data including addons_feature_code_id and addons_subscriber_id
            const data = {
              ...values,
              addons_feature_code_id: featuresId,
              addons_subscriber_id: subscriberId,
              addons_subscriber_code: subscriberCode,
              featuresName: features,
            };
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
                      value={subscriberValue}
                      name="addons_subscriber_id"
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
                      label="*Features"
                      type="text"
                      value={featuresValue}
                      name="addons_feature_code_id"
                      disabled={mutation.isPending}
                      onFocus={() => setOnFocusFeatures(true)}
                      onChange={handleOnChangeFeatures}
                      refVal={refFeatures}
                    />
                    {onFocusFeatures && (
                      <div className="w-full h-40 max-h-40 overflow-y-auto absolute top-[34px] bg-white shadow-md z-50 rounded-sm border border-gray-200 pt-1">
                        {loading || featuresDataIsFetching ? (
                          <TableSpinner />
                        ) : featuresDataError ? (
                          <div className="my-7">
                            <ServerError />
                          </div>
                        ) : featuresData?.count > 0 ? (
                          featuresData?.data.map((item, key) => (
                            <div
                              className="cursor-pointer hover:bg-gray-100 px-2"
                              value={item.features_aid}
                              key={key}
                              onClick={() => handleClickFeatures(item)}
                            >
                              {item.features_name} ({item.features_code})
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
                </div>

                <div className="form-action">
                  <div className="form-btn">
                    <button
                      className="btn-modal-submit"
                      type="submit"
                      disabled={
                        mutation.isPending ||
                        (!props.dirty &&
                          Number(props.values.addons_subscriber_id) ===
                            Number(subscriberId) &&
                          Number(props.values.addons_feature_code_id) ===
                            Number(featuresId))
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

export default ModalAddAddons;
