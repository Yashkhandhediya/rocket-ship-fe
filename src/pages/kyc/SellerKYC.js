import { useState } from "react";
import PageWithSidebar from "../../common/components/page-with-sidebar/PageWithSidebar"
import DocumentVerification from "./component/document-verification/DocumentVerification";
import PhotoIndentification from "./component/photo-identification/PhotoIdentification";
import BussinessType from "./component/bussiness-type/BussinessType";
import Stepper from "./component/stepper/Stepper";
import { Completed_KYC } from "./component/completed_KYC";

const SellerKYC = () => {

    const [state, setState] = useState(0);
    const [isKYCCompleted, setIsKYCCompleted] = useState(false);
    const steps = {
        0: <BussinessType currentStep={state} handleChangeStep={setState} />,
        1: <PhotoIndentification currentStep={state} handleChangeStep={setState} />,
        2: <DocumentVerification currentStep={state} handleChangeStep={setState} setIsKYCCompleted={setIsKYCCompleted} />,
    }

    return (
        <PageWithSidebar>
            <div className="h-full bg-[#f8f8f8] pl-4">
                {!isKYCCompleted ?
                    <>
                        <div className="py-4 text-xl font-[600]">
                            KYC
                        </div>
                        <div className="mb-8 pt-8 md:flex">
                            <div className="form-step pl-2 pr-16 md:min-w-[158px]">
                                <Stepper step={state} />
                            </div>
                            <div className="grow px-6 pb-4">
                                {steps[state]}
                            </div>
                        </div>
                    </> :
                    <div className="py-4 text-xl font-[600]">
                        <Completed_KYC />
                    </div>
                }
            </div>
        </PageWithSidebar>
    )
}

export default SellerKYC