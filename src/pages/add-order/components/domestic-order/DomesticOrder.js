import { useState } from 'react';
import BuyerDetails from './buyer-details/BuyerDetails';
import OrderDetails from './order-details/OrderDetails';
import PackageDetails from './package-details/PackacgeDetails';
import PickupDetails from './pickup-details/PickupDetails';
import axios from 'axios';

const DomesticOrder = () => {
  const [state, setState] = useState(0);
  const [formData, setFormData] = useState(null);
  const [triggerValidations, setTriggerValidations] = useState(false);
  const steps = {
    0: (
      <BuyerDetails
        handleFormData={handleFormData}
        formData={formData}
        triggerValidations={{
          trigger: triggerValidations,
          reset: () => setTriggerValidations(false),
        }}
      />
    ),
    1: (
      <PickupDetails
        handleFormData={handleFormData}
        formData={formData}
        triggerValidations={{
          trigger: triggerValidations,
          reset: () => setTriggerValidations(false),
        }}
      />
    ),
    2: (
      <OrderDetails
        handleFormData={handleFormData}
        formData={formData}
        triggerValidations={{
          trigger: triggerValidations,
          reset: () => setTriggerValidations(false),
        }}
      />
    ),
    3: (
      <PackageDetails
        handleFormData={handleFormData}
        formData={formData}
        triggerValidations={{
          trigger: triggerValidations,
          reset: () => setTriggerValidations(false),
        }}
      />
    ),
  };
  const stepsCount = Object.keys(steps).length;

  function handleFormData(formValues) {
    setFormData({
      ...formData,
      ...formValues,
      order_type: 'domestic',
    });
  }

  const handleChangeStep = (changeType) => {
    const isNext = changeType === 'NEXT';
    if (isNext) {
      setTriggerValidations(true);
    }
    if (state == 0){
      if (formData?.contact_no == '' || formData.first_name == ''){
        window.alert('Please enter all required fields');
      }
      else{
        setState(prev => isNext? prev + 1 : prev-1);        
      }
    }

    if (state == 2) {
      const isValidProducts = formData?.product_info?.every((product) => {
        return product.name && product.unit_price > 0 && product.quantity > 0;
      });
      if (
        !formData?.product_info?.length ||
        !isValidProducts ||
        !formData?.orderId ||
        !formData.channel
      ) {
        alert('Please enter all required fields')
      }
      else {
        setState(prev => isNext? prev + 1 : prev-1);
      }
    }

    if (state == 3){
      if (formData?.dead_weight == '' || formData.length == '' || formData.width == '' || formData.height == ''){
        window.alert('Please enter all required fields');
      }
      else{
        setState(prev => isNext? prev: prev-1);
        console.log('hitting api', formData);
        let resp = axios.post('http://43.252.197.60:8030/order',formData);
        console.log('api response',resp); 
      }
    }
  };

  console.log('--=-=-=-=-=-=formData-=-=-=-=-=-', formData);

  return (
    <div className="mb-8 pt-8 md:flex">
      <div className="form-step px-6">
        <ol>
          <li>Buyers Details</li>
          <li>Pickup Details</li>
          <li>Order Details</li>
          <li>Package Details</li>
        </ol>
      </div>
      <div className="grow px-6">
        {steps[state]}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="dark:focus:ring-purple-900 rounded-lg border border-purple-600 px-8 py-2 text-sm font-medium text-purple-600 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
            onClick={() => handleChangeStep('BACK')}>
            Back
          </button>
          <button
            type="button"
            className="dark:focus:ring-purple-900 rounded-lg bg-purple-600 px-8 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300"
            onClick={() => handleChangeStep('NEXT')}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DomesticOrder;
