import Header from '@/components/partials/Header';
import { setIsAdd, setIsSettingsOpen } from '@/store/StoreAction';
import { StoreContext } from '@/store/StoreContext';
import React from 'react'
import Navigation from '../../../Navigation';
import BreadCrumbs from '@/components/partials/BreadCrumbs';
import { FaPlus } from 'react-icons/fa6';
import FeatureTable from './FeatureTable';
import Footer from '@/components/partials/Footer';
import ModalAddFeatures from './ModalAddFeatures';
import ModalSuccess from '@/components/partials/modals/ModalSuccess';
import ModalError from '@/components/partials/modals/ModalError';

const Features = () => {
    const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  React.useEffect(() => { //effect to remain the settings open even after refresh
    dispatch(setIsSettingsOpen(true));
  }, []);


  return (
    <>
      <Header />
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-2"}`}>
        <Navigation menu="settings" submenu="subscriber" />
        <div className="py-3 ml-2 flex justify-between">
          <BreadCrumbs param={location.search}/>
          <button
            className="flex items-center gap-1 text-primary hover:underline"
            onClick={handleAdd}
          >
            <FaPlus />
            Add
          </button>
        </div>
        <div className="text-base">
          <h2>Features</h2>
        </div>
        <div className="pb-4">
          <FeatureTable setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddFeatures itemEdit={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  )
}

export default Features
