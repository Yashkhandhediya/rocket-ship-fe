import React, {useState} from 'react'
import { Field } from '../../../../common/components'
import { purpose } from '../../common/data'
import { CustomMultiSelect } from '../../../../common/components'
import axios from 'axios'
import { BACKEND_URL } from '../../../../common/utils/env.config'


const Order = () => {
    const [purposeType, setPurposeType] = useState('Select Shipment Purpose');
    const [isPickPinCode, setIsPickPincode] = useState(null);
    const [country,setCountry] = useState(null)
    const [dimention,setDimention] = useState({
        length:0,
        width:0,
        height:0
    })
    const [actualWeight,setActualWeight] = useState(null)

    const handleDimention = (event) => {
      const { id, value } = event.target;
      setDimention({
        ...dimention,
        [id]: value,
      });
    };

    const handleCalculate = () => {
        const headers = {'Content-Type': 'application/json'}
        axios.post(BACKEND_URL + '/order/rate_calculation',{
            pickup_pincode:isPickPinCode,
            delivery_pincode:country,
            weight:actualWeight,
            height:dimention.height,
            width:dimention.width,
            length:dimention.length,
            // payment_type_id:,
            // shipment_value:
        },{headers}).then((res) => {
            console.log("Response ",res)
        }).catch((e) => {
            console.log("Error in rate calculate ",e)
        })
    }


  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4 ml-4 w-[65%]">
  <div className="grid grid-cols-2 gap-3">
    <div className='w-[80%] mb-2'>
      {/* <label htmlFor="pickup-pincode" className="text-sm font-semibold mb-1">Pickup Pincode</label> */}
      <Field
              type={'number'}
              id={`pickup_pincode`}
              label={'Pickup Pincode'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={"Enter 6 digit pickup area pincode"}
              required={true}
              value={isPickPinCode || ''}
              onChange={(e) => setIsPickPincode(e.target.value)}
            />
    </div>
    <div className='w-[80%] mb-2'>
      {/* <label htmlFor="delivery-pincode" className="text-sm font-semibold mb-1">Delivery Pincode</label> */}
      <Field
              type={'text'}
              id={`country`}
              label={'Destination Country'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={"India"}
              required={true}
              value={country || ''}
              onChange={(e) => setCountry(e.target.value)}
            />
    </div>
  </div>

  <div className="grid grid-cols-2 gap-4 mt-4">
    <div>
      <label htmlFor="actual-weight" className="text-sm font-semibold mb-1">Actual Weight</label>
      <div className="flex items-center w-[50%] mb-2">
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
      <p className="text-xs font-semibold text-gray-500 mt-1">Note: Minimum chargeable weight is 0.5Kg</p>
    </div>
    <div>
      <label htmlFor="dimensions" className="text-sm font-semibold mb-1">Dimensions (Optional)</label>
      <div className="flex justify-between items-center">
      <div className='w-[30%] mr-2'>
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
                  <div className="w-[30%] mr-2">
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
                  <div className="w-[30%] mr-2">
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
      <p className="text-xs font-semibold text-gray-500 mt-1">Note: Dimensional value should be greater than 0.5cm</p>
    </div>
  </div>

    <div className='mt-8 w-[60%]'>
    <CustomMultiSelect
        isMulti={false}
        label={'Shipment Purpose'}
        options={purpose}
        selected={purposeType}
        closeMenuOnSelect={true}
        hideSelectedOptions={false}
        placeholder={purposeType}
        onChange={(value) => {
        setPurposeType(value)
        }}
         />
    </div>

  <div className="flex mt-10">
    <button className="bg-red-600 font-bold text-white px-4 py-2 rounded-md mr-2" onClick={handleCalculate}>Calculate</button>
    <button className="bg-gray-200 font-semibold text-gray-600 px-4 py-2 rounded-md">Reset</button>
  </div>
</div>
  )
}

export default Order