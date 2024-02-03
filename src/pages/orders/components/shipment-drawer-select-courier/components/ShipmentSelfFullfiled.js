import { Field } from '../../../../../common/components'
import { useState } from 'react';

const ShipmentSelfFullfiled = () => {
  const [selfFullfilledValues, setSelfFullfilledValues] = useState({
    delivery_executive: '',
    delivery_executive_contact_no: '',
    tracking_url: '',
  });

  const handleSetFieldValue = (e) => {
    const {id, value} = e.target;
    setSelfFullfilledValues({
      ...selfFullfilledValues,
      [id]: value,
    })
  }

  const onSubmit = () => {
    // call self shipment API
  }

  return (
    <div className='w-full h-full mt-4'>
      <div className='bg-white rounded-md w-full p-[1.125rem]'>
        <div className='w-full md:w-5/12 mb-2'>
          <Field 
            id={'delivery_executive'}
            label={"Delivery Executive"}
            placeHolder='Delivery Executive'
            value={selfFullfilledValues?.delivery_executive}
            onChange={handleSetFieldValue}
          />
        </div>
        <div className='w-full md:w-5/12 mb-2'>
          <Field 
            id={'delivery_executive_contact_no'}
            label={"Delivery Executive Phone Number"}
            placeHolder='Delivery Executive Phone Number'
            value={selfFullfilledValues?.delivery_executive_contact_no}
            onChange={handleSetFieldValue}
          />
        </div>
        <div className='w-full md:w-5/12 mb-2'>
          <Field 
            id={'tracking_url'}
            label={"Tracking URL"}
            placeHolder='Tracking URL'
            value={selfFullfilledValues?.tracking_url}
            onChange={handleSetFieldValue}
          />
        </div>
        <div className='mt-4 text-left'>
          <button className="min-w-fit rounded bg-red-700 hover:bg-green-700 px-5 py-2 text-white text-xs" onClick={onSubmit}>{"Mark as Self Fulfilled"}</button>
        </div>
      </div>
    </div>
  )
}

export default ShipmentSelfFullfiled