import React, { useState } from 'react';
import { Field } from '../../../../common/components';
import { purpose } from '../../common/data';
import { CustomMultiSelect } from '../../../../common/components';
import { BACKEND_URL } from '../../../../common/utils/env.config';
import apiClient from '../../../../common/utils/apiClient';
// import { ACCESS_TOKEN } from '../../../../common/utils/config'

const Order = () => {
  const [purposeType, setPurposeType] = useState('Select Shipment Purpose');
  const [isPickPinCode, setIsPickPincode] = useState(null);
  const [country, setCountry] = useState(null);
  const [dimention, setDimention] = useState({
    length: 0,
    width: 0,
    height: 0,
  });
  const [actualWeight, setActualWeight] = useState(null);

  const handleDimention = (event) => {
    const { id, value } = event.target;
    setDimention({
      ...dimention,
      [id]: value,
    });
  };

  const handleCalculate = () => {
    const headers = { 'Content-Type': 'application/json' };
    apiClient
      .post(
        BACKEND_URL + '/order/rate_calculation',
        {
          pickup_pincode: isPickPinCode,
          delivery_pincode: country,
          weight: actualWeight,
          height: dimention.height,
          width: dimention.width,
          length: dimention.length,
          // payment_type_id:,
          // shipment_value:
        },
        { headers },
      )
      .then((res) => {
        console.log('Response ', res);
      })
      .catch((e) => {
        console.log('Error in rate calculate ', e);
      });
  };

  return (
    <div className="ml-4 mt-4 w-[65%] rounded-lg bg-white p-6 shadow-md">
      <div className="grid grid-cols-2 gap-3">
        <div className="mb-2 w-[80%]">
          {/* <label htmlFor="pickup-pincode" className="text-sm font-semibold mb-1">Pickup Pincode</label> */}
          <Field
            type={'number'}
            id={`pickup_pincode`}
            label={'Pickup Pincode'}
            inputClassNames={'text-xs'}
            labelClassNames={'text-xs'}
            placeHolder={'Enter 6 digit pickup area pincode'}
            required={true}
            value={isPickPinCode || ''}
            onChange={(e) => setIsPickPincode(e.target.value)}
          />
        </div>
        <div className="mb-2 w-[80%]">
          {/* <label htmlFor="delivery-pincode" className="text-sm font-semibold mb-1">Delivery Pincode</label> */}
          <Field
            type={'text'}
            id={`country`}
            label={'Destination Country'}
            inputClassNames={'text-xs'}
            labelClassNames={'text-xs'}
            placeHolder={'India'}
            required={true}
            value={country || ''}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="actual-weight" className="mb-1 text-sm font-semibold">
            Actual Weight
          </label>
          <div className="mb-2 flex w-[50%] items-center">
            {/* <input type="number" id="actual-weight" className="form-input w-24 rounded-l-md border-gray-300 focus:ring-purple-500 focus:border-purple-500" value="0.00" />
        <span className="bg-gray-200 px-3 py-2 rounded-r-md text-gray-600">KG</span> */}
            <Field
              type={'number'}
              id={'weight'}
              inputClassNames={'text-xs'}
              placeHolder={'0.00'}
              required={true}
              rightAddOn="KG"
              value={actualWeight}
              onChange={(e) => setActualWeight(e.target.value)}
            />
          </div>
          <p className="mt-1 text-xs font-semibold text-gray-500">Note: Minimum chargeable weight is 0.5Kg</p>
        </div>
        <div>
          <label htmlFor="dimensions" className="mb-1 text-sm font-semibold">
            Dimensions (Optional)
          </label>
          <div className="flex items-center justify-between">
            <div className="mr-2 w-[30%]">
              <Field
                type={'number'}
                id={'length'}
                inputClassNames={'text-xs'}
                placeHolder={'L'}
                required={true}
                rightAddOn="CM"
                value={dimention?.length || ''}
                onChange={handleDimention}
              />
            </div>
            <div className="mr-2 w-[30%]">
              <Field
                type={'number'}
                id={'width'}
                inputClassNames={'text-xs'}
                placeHolder={'B'}
                required={true}
                rightAddOn="CM"
                value={dimention?.width || ''}
                onChange={handleDimention}
              />
            </div>
            <div className="mr-2 w-[30%]">
              <Field
                type={'number'}
                id={'height'}
                inputClassNames={'text-xs'}
                placeHolder={'H'}
                required={true}
                rightAddOn="CM"
                value={dimention?.height || ''}
                onChange={handleDimention}
              />
            </div>
          </div>
          <p className="mt-1 text-xs font-semibold text-gray-500">
            Note: Dimensional value should be greater than 0.5cm
          </p>
        </div>
      </div>

      <div className="mt-8 w-[60%]">
        <CustomMultiSelect
          isMulti={false}
          label={'Shipment Purpose'}
          options={purpose}
          selected={purposeType}
          closeMenuOnSelect={true}
          hideSelectedOptions={false}
          placeholder={purposeType}
          onChange={(value) => {
            setPurposeType(value);
          }}
        />
      </div>

      <div className="mt-10 flex">
        <button
          className="mr-2 rounded-md bg-red-600 px-4 py-2 font-bold text-white"
          onClick={handleCalculate}>
          Calculate
        </button>
        <button className="rounded-md bg-gray-200 px-4 py-2 font-semibold text-gray-600">Reset</button>
      </div>
    </div>
  );
};

export default Order;
