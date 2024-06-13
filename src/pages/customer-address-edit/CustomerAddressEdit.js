import React, { useState } from 'react';
import { Field } from '../../common/components';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';

function CustomerAddressEdit() {
  const [addressInfo, setAddressInfo] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });

  const handleAddressInfo = () => {
    const { id, value } = event.target;
    setAddressInfo({
      ...addressInfo,
      [id]: value,
    });
  };

  return (
    <PageWithSidebar>
      <div className="ml-3 bg-zinc-200 px-3 py-2">
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
                value={addressInfo.addressLine1}
                onChange={handleAddressInfo}
              />
              <Field
                id={'city'}
                label={'City'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={'City'}
                required={true}
                value={addressInfo.addressLine2}
                onChange={handleAddressInfo}
              />
              <Field
                id={'state'}
                label={'State'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={'State'}
                required={true}
                value={addressInfo.state}
                onChange={handleAddressInfo}
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
                value={addressInfo.addressLine2}
                onChange={handleAddressInfo}
              />
              <Field
                id={'country'}
                label={'Country'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={'Country'}
                required={true}
                value={addressInfo.country}
                onChange={handleAddressInfo}
              />
              <Field
                id={'pincode'}
                label={'Pincode'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={'Pincode'}
                required={true}
                value={addressInfo.pincode}
                onChange={handleAddressInfo}
              />
            </div>
          </div>
        </div>
        <button className="m-4 rounded bg-red-800 px-4 py-2 text-sm text-white">Update Details</button>
      </div>
    </PageWithSidebar>
  );
}

export default CustomerAddressEdit;
