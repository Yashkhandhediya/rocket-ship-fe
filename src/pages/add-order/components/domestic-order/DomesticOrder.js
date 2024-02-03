import { useState } from 'react';
import BuyerDetails from './buyer-details/BuyerDetails';
import OrderDetails from './order-details/OrderDetails';
import PackageDetails from './package-details/PackageDetails';
import PickupDetails from './pickup-details/PickupDetails';
import Stepper from '../stepper/Stepper';

const DomesticOrder = () => {
  const [state, setState] = useState(0);
  const steps = {
    0: <BuyerDetails currentStep={state} handleChangeStep={setState} />,
    1: <PickupDetails currentStep={state} handleChangeStep={setState} />,
    2: <OrderDetails currentStep={state} handleChangeStep={setState} />,
    3: <PackageDetails currentStep={state} handleChangeStep={setState} />,
  };

  return (
    <div className="mb-8 pt-8 md:flex">
      <div className="form-step pl-2 pr-4 md:min-w-[158px]">
        <Stepper step={state} />
      </div>
      <div className="grow px-6 pb-4">
        {steps[state]}
        {/* <div className="flex justify-end gap-4">
          {state !== 0 && (
            <button
              type="button"
              className="dark:focus:ring-red-900 rounded-lg border border-red-600 px-8 py-2 text-sm font-medium text-red-600 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-red-300"
              onClick={() => handleChangeStep('BACK')}>
              Back
            </button>
          )}
          <button
            type="button"
            className="dark:focus:ring-red-900 rounded-lg bg-red-600 px-8 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
            onClick={() => handleChangeStep('NEXT')}>
            {state == 3 ? 'Place Order' : 'Next'}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default DomesticOrder;
