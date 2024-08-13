import React, { useState } from 'react';
import { CustomMultiSelect, Field } from '../../../../common/components';
import { planTimeDuration, planTypes } from './constants';

function ActivateModal({ handleClose }) {
  const [selectedPlan, setSelectedPlan] = useState({
    type: 'Select',
    timeDuration: 'Select',
    coupon: '',
  });

  const handleChange = (e) => {
    setSelectedPlan({ ...selectedPlan, coupon: e.target.value });
  };

  const types = ['Advanced'];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center text-white backdrop-blur-sm">
      <div className=" w-1/4 rounded-lg border bg-white py-3 text-gray-600">
        <div className="flex w-full  justify-end border-b">
          <p className="flex w-[65%] items-center justify-between px-3 pb-5 text-lg font-bold">
            Selected Plan{' '}
            <span className="cursor-pointer text-sm" onClick={handleClose}>
              X
            </span>
          </p>
        </div>
        <div className="mx-auto w-[70%] text-center">
          <CustomMultiSelect
            isMulti={false}
            options={planTypes}
            selected={selectedPlan.type}
            closeMenuOnSelect={true}
            placeholder={selectedPlan.type}
            hideSelectedOptions={false}
            onChange={(value) => {
              setSelectedPlan({ ...selectedPlan, type: value });
            }}
          />
          <CustomMultiSelect
            isMulti={false}
            options={planTimeDuration}
            selected={selectedPlan.timeDuration}
            closeMenuOnSelect={true}
            placeholder={selectedPlan.timeDuration}
            hideSelectedOptions={false}
            onChange={(value) => {
              setSelectedPlan({ ...selectedPlan, timeDuration: value });
            }}
          />
          <div className="my-2 flex gap-2">
            <Field
              type={'text'}
              id={'coupon'}
              inputClassNames={'text-xs'}
              placeHolder={'Have a coupon code? Enter it here'}
              required={false}
              value={selectedPlan.coupon}
              onChange={(e) => handleChange(e)}
            />
            <button className="text-sm text-red-800 underline">Apply</button>
          </div>
          <button className="my-4 rounded bg-red-800 px-3 py-2 text-sm font-normal text-white">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActivateModal;
