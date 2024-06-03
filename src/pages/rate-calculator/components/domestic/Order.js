import React, {useState,useEffect,useMemo} from 'react'
import { CustomTooltip, Field } from '../../../../common/components'
import axios from 'axios'
import { BACKEND_URL } from '../../../../common/utils/env.config'
import Loader from '../../../../common/loader/Loader'
import { toast } from 'react-toastify'
import { infoIcon } from '../../../../common/icons'
// import { ACCESS_TOKEN } from '../../../../common/utils/config'


const Order = ({onDetailChange,onCityChange,onDestinationChange}) => {
  const [isValidPincode,setIsValidPincode] = useState(true)
  const [isValidDestPinCode,setIsValidDestPincode] = useState(true)
  const [isPickPinCode, setIsPickPincode] = useState(null);
  const [loading,setLoading] = useState(false)
  const [isDeliveryPinCode, setIsDeliveryPincode] = useState(null);
  const [shipmentDetails,setShipmentDetails] = useState({
    type:'ftl'
  })
  const [paymentDetails,setPaymentDetails] = useState({
    payment_type:'cod'
  })
  const [qcDetails,setQCDetails] = useState({
    qc_type:'yes1'
  })
  const [shipDetails,setShipDetails] = useState({
    ship_type:'yes'
  })
  const [shipmentPrice,setShipmentPrice] = useState(null)
  const [actualWeight,setActualWeight] = useState(null)

  const [dimention,setDimention] = useState({
    length:0,
    width:0,
    height:0,
    volumetric_weight:0
})

const volumetricWeight =
useMemo(
    () =>
        (Number(dimention?.length || 0) *
            Number(dimention?.width || 0) *
            Number(dimention?.height || 0)) /
        5000,
    [dimention],
) || 0;


useEffect(() => {
  setDimention({
    ...dimention,
    volumetric_weight:volumetricWeight
  })
},[volumetricWeight])

const handleDimention = (event) => {
  const { id, value } = event.target;
  setDimention({
    ...dimention,
    [id]: value,
  });
};

const handleShipment = (event) => {

  const { name, value } = event.target;
 
  console.log("Namamam",name)
  setShipmentDetails({
    ...shipmentDetails,
    [name]: value,
  });
};

const handlePayment = (event) => {

  const { name, value } = event.target;

  console.log("Namamam",name)
  console.log("Namamammmm",value)
  setPaymentDetails({
    ...paymentDetails,
    [name]: value,
  });
};

const handleQC = (event) => {

  const { name, value } = event.target;

  console.log("Namamam",name)
  setQCDetails({
    ...qcDetails,
    [name]: value,
  });
};

const handleShip = (event) => {

  const { name, value } = event.target;

  console.log("Namamam",name)
  setShipDetails({
    ...shipDetails,
    [name]: value,
  });
};

  const fetchPincodeDetails = () => {
    try {
      axios
        .get(`${BACKEND_URL}/pincode/${isPickPinCode}`)
        .then((resp) => {
          if (resp.status == 200) {
            const cityInfo = {
              city: resp.data?.Area,
              state: resp.data?.State,
              country: resp.data?.Country,
            }
            onCityChange(cityInfo)
          } else {
            toast(`City/State not found for this pincode : ${isPickPinCode || ''}`, { type: 'error' });
          }
        })
        .catch(() => {
          toast(`Unable to get location from this pincode: ${isPickPinCode }`, { type: 'error' });
        });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const fetchDestinationPincodeDetails = () => {
    try {
      axios
        .get(`${BACKEND_URL}/pincode/${isDeliveryPinCode}`)
        .then((resp) => {
          if (resp.status == 200) {
            const cityInfo = {
              city: resp.data?.Area,
              state: resp.data?.State,
              country: resp.data?.Country,
            }
            onDestinationChange(cityInfo)
          } else {
            toast(`City/State not found for this pincode : ${isDeliveryPinCode || ''}`, { type: 'error' });
          }
        })
        .catch(() => {
          toast(`Unable to get location from this pincode: ${isDeliveryPinCode }`, { type: 'error' });
        });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  useEffect(() => {
    if (isPickPinCode?.length >= 6 && isValidPincode) {
      fetchPincodeDetails();
    }
  }, [isPickPinCode]);

  useEffect(() => {
    if (isDeliveryPinCode?.length >= 6 && isValidDestPinCode) {
      fetchDestinationPincodeDetails(isDeliveryPinCode);
    }
  }, [isDeliveryPinCode]);

const handleCalculate = () => {
  setLoading(true)
  const headers = {'Content-Type': 'application/json'}
  axios.post(BACKEND_URL + '/order/rate_calculation',{
      pickup_pincode:isPickPinCode,
      delivery_pincode:isDeliveryPinCode,
      weight:parseFloat(actualWeight),
      height:parseInt(dimention.height),
      width:parseInt(dimention.width),
      length:parseInt(dimention.length),
      payment_type_id:paymentDetails.payment_type=='cod' ? 1 : 2,
      shipment_value:parseInt(shipmentPrice)
  },{headers}).then((res) => {
      console.log("Rate Response ",res)
      const info = {
        pickup_pincode: isPickPinCode,
        delivery_pincode: isDeliveryPinCode,
        weight: parseFloat(actualWeight),
        height: parseInt(dimention.height),
        width: parseInt(dimention.width),
        length: parseInt(dimention.length),
        payment_type_id: paymentDetails.payment_type,
        shipment_value: parseInt(shipmentPrice)
      };
      const details = res.data;
      onDetailChange(details,info);
      setLoading(false)
  }).catch((e) => {
      console.log("Error in rate calculate ",e)
      toast("Error in Rate Calculation",{type:"error"})
      setLoading(false)
  })
}

  return (
    <>
    {loading && <Loader />}
    <div className="bg-white p-6 rounded-lg shadow-md mt-4 ml-4 w-[65%]">
  <div className="mb-4">
    <h3 className="text-lg font-semibold mb-2">Shipment Type</h3>
    <div className="flex items-center">
      <div className="flex items-center mr-4">
      <input
          type="radio"
          id="ftl"
          className="mr-3"
          value="ftl"
          name="type"
          checked={shipmentDetails?.type === 'ftl'}
          onChange={handleShipment}
          />
          <label
          htmlFor="ftl"
          className="mb-2 inline-flex items-center text-xs font-medium text-gray-900">
          Forward
          </label>
      </div>
      <div className="flex items-center">
      <input
          type="radio"
          id="ptl"
          className="mr-3"
          value="ptl"
          name="type"
          checked={shipmentDetails?.type === 'ptl'}
          onChange={handleShipment}
          />
          <label
          htmlFor="ptl"
          className="mb-2 inline-flex items-center text-xs font-medium text-gray-900">
          Return
          </label>
      </div>
    </div>
  </div>

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
              onBlur={() => {
                setIsValidPincode(/^\d{6}$/.test(isPickPinCode));
              }}
            />
            {!isValidPincode && <p className="mt-1 text-xs text-red-500">Please enter a valid Pincode.</p>}
    </div>
    <div className='w-[80%] mb-2'>
      {/* <label htmlFor="delivery-pincode" className="text-sm font-semibold mb-1">Delivery Pincode</label> */}
      <Field
              type={'number'}
              id={` delivery_pincode`}
              label={'Delivery Pincode'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={"Enter 6 digit delivery area pincode"}
              required={true}
              value={isDeliveryPinCode || ''}
              onChange={(e) => setIsDeliveryPincode(e.target.value)}
              onBlur={() => {
                setIsValidDestPincode(/^\d{6}$/.test(isDeliveryPinCode));
              }}
            />
            {!isValidDestPinCode && <p className="mt-1 text-xs text-red-500">Please enter a valid Pincode.</p>}
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
    {actualWeight != null && <div className='flex flex-row'>
      <div className='font-semibold text-sm border rounded-lg mr-2 h-12 p-2 bg-slate-100'>{`Volumetric Weight : ${volumetricWeight} KG`}</div>
      <div className='font-semibold text-sm border rounded-lg mr-2 h-12 p-2 bg-slate-50'>{`Applicable Weight : ${actualWeight} KG`}</div>
    </div>}
  </div>

  <div className="grid grid-cols-2 gap-4 mt-8">
    {shipmentDetails.type == "ftl" && <div>
      <h3 className="text-lg font-semibold mb-2">Payment Type</h3>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <input type="radio" name="payment_type" id="cod" value="cod" className="form-radio h-4 w-4 text-purple-600"
          checked={paymentDetails?.payment_type === "cod"} onChange={handlePayment} />
          <label htmlFor="cod" className="ml-2">Cash on Delivery</label>
        </div>
        <div className="flex items-center">
          <input type="radio" name="payment_type" id="prepaid" value="prepaid" className="form-radio h-4 w-4 text-purple-600" 
          checked={paymentDetails?.payment_type === "prepaid"} onChange={handlePayment} />
          <label htmlFor="prepaid" className="ml-2">Prepaid</label>
        </div>
      </div>
    </div>}
    <div className='w-[85%]'>
      {/* <label htmlFor="shipment-value" className="text-sm font-semibold mb-1">Shipment Value (₹)</label>
      <input type="text" id="shipment-value" className="form-input w-full rounded-md border-gray-300 focus:ring-purple-500 focus:border-purple-500" placeholder="Enter the shipment value" /> */}
        <Field
              type={'number'}
              id={`shipment_value`}
              label={'Shipment Value (₹)'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={"Enter the shipment value"}
              required={true}
              leftAddOn='₹'
              value={shipmentPrice}
              onChange={(e) => setShipmentPrice(e.target.value)}
            />
    </div>
    
  {shipmentDetails.type == "ptl" && <div className="mt-2">
  <h3 className="text-lg font-semibold mb-2">QC Applicable?</h3>
    <div className="flex items-center">
      <div className="flex items-center mr-4 mb-2">
        <input type="radio" name="qc_type" id="yes1" value="yes1" className="form-radio h-4 w-4 text-purple-600" 
          checked={qcDetails?.qc_type === "yes1"} onChange={handleQC}
        />
        <label htmlFor="yes1" className="ml-2">Yes</label>
      </div>
      <div className="flex items-center mb-2">
        <input type="radio" name="qc_type" id="no1" value="no1" className="form-radio h-4 w-4 text-purple-600" 
        checked={qcDetails?.qc_type === "no1"} onChange={handleQC} />
        <label htmlFor="no1" className="ml-2">No</label>
      </div>
    </div>
  </div>}
  </div>

 <div className="mt-8">
 <div className="flex flex-row">
 <h3 className="text-lg font-semibold mb-2">Shipping Dangerous Goods?</h3>
    <CustomTooltip text={"Shipment containing flammable gas,flammable liquids,oil-based paints,batterries,and other hazardous materials ar not permitted in Air mode."}>
      <img className=" mt-2 ms-2 w-4 h-4" src={infoIcon} />
    </CustomTooltip>
 </div>
    <div className="flex items-center">
      <div className="flex items-center mr-4 mb-2">
        <input type="radio" name="ship_type" id="yes" value="yes" className="form-radio h-4 w-4 text-purple-600" 
          checked={shipDetails?.ship_type === "yes"} onChange={handleShip}
        />
        <label htmlFor="yes" className="ml-2">Yes</label>
      </div>
      <div className="flex items-center mb-2">
        <input type="radio" name="ship_type" id="no" value="no" className="form-radio h-4 w-4 text-purple-600"
        checked={shipDetails?.ship_type === "no"} onChange={handleShip}  />
        <label htmlFor="no" className="ml-2">No</label>
      </div>
    </div>
  </div>


  <div className="flex mt-10">
    <button className="bg-red-600 font-bold text-white px-4 py-2 rounded-md mr-2" onClick={handleCalculate}>Calculate</button>
    <button className="bg-gray-200 font-semibold text-gray-600 px-4 py-2 rounded-md">Reset</button>
  </div>
</div>
</>
  )
}

export default Order