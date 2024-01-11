import { useState } from "react";
import BuyerDetails from "./buyer-details/BuyerDetails";
import WarehouseDetails from "./warehouse-details/WarehouseDetails";
import OrderDetails from "./order-details/OrderDetails";
import PackageDetails from "./package-details/PackageDetails";
import Stepper from '../stepper/Stepper';
const SingleReturn = () => {
    const [state, setState] = useState(0);
    const steps = {
        0: <BuyerDetails currentStep={state} handleChangeStep={setState} />,
        1: <WarehouseDetails currentStep={state} handleChangeStep={setState} />,
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
            </div>
        </div>
    );
}

export default SingleReturn