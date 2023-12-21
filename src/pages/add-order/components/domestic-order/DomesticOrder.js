import { useState } from 'react';
import BuyerDetails from './buyer-details/BuyerDetails';
import OrderDetails from './order-details/OrderDetails';
import PackageDetails from './package-details/PackageDetails';
import PickupDetails from './pickup-details/PickupDetails';
import axios from 'axios';
import Stepper from '../stepper/Stepper';
import { toast } from 'react-toastify';

const DomesticOrder = () => {
  const defaultValidations = {
    0: false,
    1: false,
    2: false,
    3: false,
  };
  const [state, setState] = useState(0);
  const [formData, setFormData] = useState(null);
  const [triggerValidations, setTriggerValidations] = useState(defaultValidations);
  const steps = {
    0: (
      <BuyerDetails
        handleFormData={handleFormData}
        formData={formData}
        triggerValidations={{
          trigger: triggerValidations[0],
          reset: () => setTriggerValidations(defaultValidations),
        }}
      />
    ),
    1: (
      <PickupDetails
        handleFormData={handleFormData}
        formData={formData}
        triggerValidations={{
          trigger: triggerValidations[1],
          reset: () => setTriggerValidations(defaultValidations),
        }}
      />
    ),
    2: (
      <OrderDetails
        handleFormData={handleFormData}
        formData={formData}
        triggerValidations={{
          trigger: triggerValidations[2],
          reset: () => setTriggerValidations(defaultValidations),
        }}
      />
    ),
    3: (
      <PackageDetails
        handleFormData={handleFormData}
        formData={formData}
        triggerValidations={{
          trigger: triggerValidations[3],
          reset: () => setTriggerValidations(defaultValidations),
        }}
      />
    ),
  };

  function handleFormData(formValues) {
    setFormData({
      ...formData,
      ...formValues,
      order_type: 'domestic',
    });
  }

  const handleChangeStep = async (changeType) => {
    const isNext = changeType === 'NEXT';
    if (isNext) {
      if (state == 0) {
        if (
          !formData?.buyer_info?.contact_no ||
          !formData?.buyer_info?.first_name ||
          !formData?.address_info?.complete_address ||
          !formData?.address_info?.pincode ||
          !formData?.address_info?.city ||
          !formData?.address_info?.state ||
          !formData?.address_info?.country
        ) {
          setTriggerValidations({ ...defaultValidations, 0: true });
          toast('Please enter all required fields', { type: 'error' });
        } else {
          setState((prev) => (isNext ? prev + 1 : prev - 1));
        }
      }

      if (state == 1) {
        setTriggerValidations({ ...defaultValidations, 1: true });
        setState((prev) => (isNext ? prev + 1 : prev - 1));
      }
      if (state == 2) {
        const isValidProducts = formData?.product_info?.every((product) => {
          return product.name && product.unit_price > 0 && product.quantity > 0;
        });
        if (!formData?.product_info?.length || !isValidProducts || !formData?.channel || !formData?.date) {
          setTriggerValidations({ ...defaultValidations, 2: true });
          toast('Please enter all required fields', { type: 'error' });
        } else {
          setState((prev) => (isNext ? prev + 1 : prev - 1));
        }
      }

      if (state == 3) {
        if (
          !formData?.dead_weight ||
          formData?.dead_weight < 0.5 ||
          !formData.length ||
          formData?.length < 0.5 ||
          !formData.width ||
          formData?.width < 0.5 ||
          !formData.height ||
          formData?.height < 0.5
        ) {
          setTriggerValidations({ ...defaultValidations, 3: true });
          toast('Please enter all required fields', { type: 'error' });
        } else {
          setState((prev) => (isNext ? prev : prev - 1));
          let date = formData?.date?.split('-');
          let newDate = new Date(date[2], date[1], date[0]);
          let resp = await axios.post('http://43.252.197.60:8030/order', {
            ...formData,
            date: newDate,
          });
          if (resp.status == 200) {
            toast('Order Placed Successfully', { type: 'success' });
            setState(0);
            setFormData({});
            setTriggerValidations(defaultValidations);
          } else {
            toast('There is some error please check your network or contact support', { type: 'error' });
          }
        }
      }
    } else {
      setState((prev) => (isNext ? prev + 1 : prev - 1));
    }
  };

  return (
    <div className="mb-8 pt-8 md:flex">
      <div className="form-step pl-2 pr-4 md:min-w-[158px]">
        <Stepper step={state} />
      </div>
      <div className="grow px-6">
        {steps[state]}
        <div className="flex justify-end gap-4">
          {state !== 0 && (
            <button
              type="button"
              className="dark:focus:ring-purple-900 rounded-lg border border-purple-600 px-8 py-2 text-sm font-medium text-purple-600 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
              onClick={() => handleChangeStep('BACK')}
            >
              Back
            </button>
          )}
          <button
            type="button"
            className="dark:focus:ring-purple-900 rounded-lg bg-purple-600 px-8 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300"
            onClick={() => handleChangeStep('NEXT')}
          >
            {state == 3 ? 'Place Order' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DomesticOrder;
