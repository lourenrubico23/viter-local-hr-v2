import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import ModalWrapper from "@/components/partials/ModalWrapper";
import { setIsAdd } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import { Form, Formik } from "formik";
import React from "react";
import { GrFormClose } from "react-icons/gr";

const ModalAddSystem = ({setIsItemEdit}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      dispatch(setIsAdd(false));
      setIsItemEdit(false);
    }, 200);
  };

  React.useEffect(() => {
    setAnimate("");
  }, []);

  return (
    <ModalWrapper
      className={`transition-all ease-linear transform duration-200 ${animate}`}
      handleClose={handleClose}
    >
      <div className="modal-title">
        <h2>Add System User</h2>
        <button onClick={handleClose}>
          <GrFormClose className="text-[25px]" />
        </button>
      </div>
      <div className="modal-content">
        <Formik>
          <Form className="modal-form">
            <div className="form-input">
              <div className="input-wrapper">
                <InputText label="*First Name" type="text" name="none" />
              </div>
              <div className="input-wrapper">
                <InputText label="*Last Name" type="text" name="none" />
              </div>
              <div className="input-wrapper">
                <InputText label="*Email Address" type="text" name="none" />
              </div>
              <div className="input-wrapper">
                <InputSelect label="*Role" type="text" name="none">
                  <option value="">Developer</option>
                  <option value="">Admin</option>
                </InputSelect>
              </div>
            </div>

            <div className="form-action">
              <div className="form-btn">
                <button className="btn-modal-submit" type="submit">
                  Save
                </button>
                <button className="btn-modal-cancel" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </ModalWrapper>
  );
};

export default ModalAddSystem;
