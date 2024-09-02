import React, { useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { Field } from '../../common/components';

function AddCustomer() {
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });

  const handleCustomerInfo = (event) => {
    const { id, value } = event.target;
    setCustomerInfo({
      ...customerInfo,
      [id]: value,
    });
  };

  const addDetails = () => {
    console.log('Add');
  };

  return (
    <PageWithSidebar>
      <div className="ml-3 bg-zinc-200 px-3 py-2">
        <div className="my-3 rounded-lg bg-white p-6 shadow">
          <p className="border-b pb-2 text-xl font-bold text-gray-500">Add Customer</p>
          <div className="flex gap-6 py-4">
            <Field
              id={'firstName'}
              label={'Customer First Name'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'First Name'}
              required={true}
              value={customerInfo?.firstName}
              onChange={handleCustomerInfo}
            />
            <Field
              id={'lastName'}
              label={'Customer Last Name'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Last Name'}
              required={true}
              value={customerInfo?.lastName}
              onChange={handleCustomerInfo}
            />
            <Field
              id={'email'}
              label={'Email'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Email ID'}
              required={true}
              value={customerInfo?.email}
              onChange={handleCustomerInfo}
            />
            <Field
              id={'phone'}
              label={'Customer Phone'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Phone No.'}
              required={true}
              value={customerInfo?.phone}
              onChange={handleCustomerInfo}
            />
          </div>
        </div>
        <div className="my-3 rounded-lg bg-white p-6 shadow">
          <div className="flex w-2/3 flex-col gap-6 py-4">
            <div className="flex gap-5">
              <Field
                id={'addressLine1'}
                label={'Address Line 1'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={'Address 1'}
                required={true}
                value={customerInfo.addressLine1}
                onChange={handleCustomerInfo}
              />
              <Field
                id={'city'}
                label={'City'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={'City'}
                required={true}
                value={customerInfo.city}
                onChange={handleCustomerInfo}
              />
              <Field
                id={'state'}
                label={'State'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={'State'}
                required={true}
                value={customerInfo.state}
                onChange={handleCustomerInfo}
              />
            </div>
            <div className="flex gap-5">
              <Field
                id={'addressLine2'}
                label={'Address Line 2'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={'Address 2'}
                required={true}
                value={customerInfo.addressLine2}
                onChange={handleCustomerInfo}
              />
              <Field
                id={'country'}
                label={'Country'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={'Country'}
                required={true}
                value={customerInfo.country}
                onChange={handleCustomerInfo}
              />
              <Field
                id={'pincode'}
                label={'Pincode'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={'Pincode'}
                required={true}
                value={customerInfo.pincode}
                onChange={handleCustomerInfo}
              />
            </div>
          </div>
        </div>
        <button className="m-4 rounded bg-red-800 px-4 py-2 text-sm text-white" onClick={addDetails}>
          Add Details
        </button>
      </div>
    </PageWithSidebar>
  );
}

export default AddCustomer;
