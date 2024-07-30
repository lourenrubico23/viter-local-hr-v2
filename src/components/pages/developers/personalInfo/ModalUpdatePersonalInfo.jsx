import { queryData } from '@/components/helpers/queryData';
import ModalWrapper from '@/components/partials/ModalWrapper';
import { setIsAdd } from '@/store/StoreAction';
import { StoreContext } from '@/store/StoreContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import * as Yup from "yup";

const ModalUpdatePersonalInfo = ({itemEdit}) => {
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
          ? `/v2/employees/${itemEdit.employees_aid}` // update
          : `/v2/employees`, // create
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
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
    employees_info_aid: itemEdit ? itemEdit.employees_info_aid : "",
    employees_info_employees_fname_id: itemEdit ? itemEdit.employees_info_employees_fname_id : "",
    employees_info_employees_lname_id: itemEdit ? itemEdit.employees_info_employees_lname_id : "",
    employees_info_employees_mname_id: itemEdit ? itemEdit.employees_info_employees_mname_id : "",
    employees_info_employees_birth_date_id: itemEdit ? itemEdit.employees_info_employees_birth_date_id : "",
    employees_info_employees_marital_status_id: itemEdit ? itemEdit.employees_info_employees_marital_status_id : "",
    employees_info_street: itemEdit ? itemEdit.employees_info_street : "",
    employees_info_city: itemEdit ? itemEdit.employees_info_city : "",
    employees_info_province: itemEdit ? itemEdit.employees_info_province : "",
    employees_info_country: itemEdit ? itemEdit.employees_info_country : "",
    employees_info_postal_code: itemEdit ? itemEdit.employees_info_postal_code : "",
    employees_info_employees_mobile_number_id: itemEdit ? itemEdit.employees_info_employees_mobile_number_id : "",
    employees_info_telephone_number: itemEdit ? itemEdit.employees_info_telephone_number : "",
    employees_info_employees_personal_email_id: itemEdit ? itemEdit.employees_info_employees_personal_email_id : "",

    employees_info_fname_id_old: itemEdit ? itemEdit.employees_info_fname_id : "",
  };

  const yupSchema = Yup.object({
    employees_info_employees_fname_id: Yup.string().required("Required"),
    employees_info_employees_lname_id: Yup.string().required("Required"),
    employees_info_employees_mname_id: Yup.string().required("Required"),
    employees_info_employees_birth_date_id: Yup.string().required("Required"),
    employees_info_employees_marital_status_id: Yup.string().required("Required"),
    employees_info_street: Yup.string().required("Required"),
    employees_info_city: Yup.string().required("Required"),
    employees_info_province: Yup.string().required("Required"),
    employees_info_country: Yup.string().required("Required"),
    employees_info_postal_code: Yup.string().required("Required"),
    employees_info_employees_mobile_number_id: Yup.string().required("Required"),
    employees_info_telephone_number: Yup.string().required("Required"),
    employees_info_employees_personal_email_id: Yup.string().required("Required"),
  })
  return (
    <ModalWrapper>
        
    </ModalWrapper>
  )
}

export default ModalUpdatePersonalInfo
