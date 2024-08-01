import Header from '@/components/partials/Header';
import { setIsSettingsOpen } from '@/store/StoreAction';
import { StoreContext } from '@/store/StoreContext';
import React from 'react'
import Navigation from '../../Navigation';
import JobList from './JobList';
import Footer from '@/components/partials/Footer';

const Job = () => {
    const { store, dispatch } = React.useContext(StoreContext);

    React.useEffect(() => {
        dispatch(setIsSettingsOpen(true));
      }, []);

  return (
    <>
      <Header />
      <div className={`wrapper ${store.isShow ? "lg:ml-48" : "ml-1"} `}>
        <Navigation menu="settings" submenu="job" />
        <div className="title text-base py-2.5 ml-7">
          <h2>Job</h2>
        </div>
        <JobList/>
        <Footer/>
      </div>
    </>
  )
}

export default Job
