import { StoreContext } from '@/store/StoreContext';
import React from 'react'

const ModalEntryError = () => {
    const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("-translate-y-60");

  
  return (
    <div>
      
    </div>
  )
}

export default ModalEntryError
