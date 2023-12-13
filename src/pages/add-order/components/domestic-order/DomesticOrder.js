import { useState } from 'react';
import BuyerDetails from './buyer-details/BuyerDetails';
import OrderDetails from './order-details/OrderDetails';
import PackageDetails from './package-details/PackacgeDetails';
import PickupDetails from './pickup-details/PickupDetails';

const DomesticOrder = () => {
  const [state, setState] = useState(0);
  const [formData, setFormData] = useState(null);
  const steps = {
    0: <BuyerDetails handleFormData={handleFormData} formData={formData} />,
    1: <PickupDetails handleFormData={handleFormData} formData={formData} />,
    2: <OrderDetails handleFormData={handleFormData} formData={formData} />,
    3: <PackageDetails handleFormData={handleFormData} formData={formData} />,
  };
  const stepsCount = Object.keys(steps).length;

  function handleFormData(formValues) {
    setFormData({
      ...formData,
      ...formValues,
      order_type: 'domestic',
    });
  }
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
        <div className="text-end">
          <button
            type="button"
            className="dark:focus:ring-purple-900 rounded-lg bg-purple-600 px-8 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300"
            onClick={() => {
              setState((prev) => (prev + 1) % stepsCount);
            }}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DomesticOrder;
