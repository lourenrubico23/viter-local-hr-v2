import Header from '@/components/partials/Header';
import { setIsSettingsOpen } from '@/store/StoreAction';
import { StoreContext } from '@/store/StoreContext';
import React from 'react'
import Navigation from '../../Navigation';
import LeaveList from './LeaveList';
import Footer from '@/components/partials/Footer';

const Leave = () => {
    const { store, dispatch } = React.useContext(StoreContext);

    React.useEffect(() => {
        dispatch(setIsSettingsOpen(true));
      }, []);

  return (
    <>
      <Header />
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-1"} `}>
        <Navigation menu="settings" submenu="leave" />
        <div className="title text-base py-2.5 ml-7">
          <h2>Leave</h2>
        </div>
        <LeaveList/>
        <Footer/>
      </div>
    </>
  )
}

export default Leave
