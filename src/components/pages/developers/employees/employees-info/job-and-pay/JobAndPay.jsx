import Header from '@/components/partials/Header';
import { StoreContext } from '@/store/StoreContext';
import React from 'react'
import Navigation from '../../../Navigation';
import BreadCrumbs from '@/components/partials/BreadCrumbs';
import JobAndPayTable from './JobAndPayTable';
import Footer from '@/components/partials/Footer';
import ModalUpdateJobInfo from './ModalUpdateJobInfo';
import ModalUpdatePayInfo from './ModalUpdatePayInfo';
import ModalSuccess from '@/components/partials/modals/ModalSuccess';
import ModalError from '@/components/partials/modals/ModalError';

const JobAndPay = () => {
    const { store, dispatch } = React.useContext(StoreContext);
    const [itemEdit, setItemEdit] = React.useState(null);
    const [isEditShow, setEditShow] = React.useState(false);
  return (
    <>
      <Header />
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-2"}`}>
        <Navigation menu="employees" />
        <div className="py-3 ml-2 flex justify-between ">
          <BreadCrumbs param={location.search} />
        </div>
        <JobAndPayTable setItemEdit={setItemEdit} setEditShow={setEditShow} />
        <Footer />
      </div>

      {store.isAdd && <ModalUpdateJobInfo itemEdit={itemEdit} />}
      {isEditShow && (
        <ModalUpdatePayInfo itemEdit={itemEdit} setEditShow={setEditShow} />
      )}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  )
}

export default JobAndPay
