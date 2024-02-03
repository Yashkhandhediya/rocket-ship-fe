import { useState } from "react";
import { KYC_Document, KYC_adhaar } from "../../../../common/icons";
import { Adhaar_Document } from "../adhaar_document";
import { Document_Upload } from "../document_upload";

const DocumentVerification = ({ currentStep, handleChangeStep, setIsKYCCompleted }) => {
    const [openAccordion, setOpenAccordion] = useState(0);
    const [triggerBuyerValidations, setTriggerBuyerValidations] = useState(false);

    const handleAccordionToggle = (index) => {
        setOpenAccordion((prev) => (prev === index ? 0 : index));
        return index;
    };

    return (
        <div>
            <div className="font-bold text-xl mb-6">
                Please select any of the 2 options below to verify your KYC
            </div>

            <div id="accordion-collapse" data-accordion="collapse" className="w-[90%]">

                {/* First Collapse */}
                <div className="mb-6">
                    <h2 id={'accordion-collapse-heading-1'}>
                        <button
                            type="button"
                            className={`flex items-center justify-between w-full px-5 py-3 font-medium rtl:text-right bg-white border border-gray-200 ${openAccordion === 1
                                ? 'rounded-t-xl border-1 border-[#ACCBFB]'
                                : 'rounded-xl'
                                } gap-3`}
                            data-accordion-target={'#accordion-collapse-body-1'}
                            aria-expanded={openAccordion === 1}
                            aria-controls={'accordion-collapse-body-1'}
                            onClick={() => handleAccordionToggle(1)}
                            style={{ color: '#191919' }} //for styling
                        >
                            <div className="flex flex-row gap-4">
                                <img src={KYC_adhaar} alt="KYC using Adhaar" />
                                <div className="flex flex-col justify-start gap-1">
                                    <div className="flex gap-1.5">
                                        <span className="text-[0.9rem]">Express KYC using Aadhar OTP </span>
                                        <span className="text-[0.65rem] font-normal text-[#6C757D]">((No Document Upload Required))</span>
                                    </div>
                                    <div className="text-left px-5 bg-[#FFF5EB] text-[#D96C00] font-normal text-[0.65rem] max-w-max rounded-full">Get KYC verified within 30 seconds</div>
                                </div>
                            </div>
                            <svg
                                data-accordion-icon
                                className={`w-5 h-5 shrink-0 rotate-${() => handleAccordionToggle(1)} === 1 ? '0' : '180'} transform origin-center transition-transform duration-300 ease-in-out shrink-0`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </h2>
                    <div id={'accordion-collapse-body-1'} className={`${openAccordion === 1 ? 'block' : 'hidden'} bg-white p-4 border border-t-0 rounded-b-xl border-1 border-[#ACCBFB]`} aria-labelledby={'accordion-collapse-heading-1'}>
                        <div className="py-4 font-normal">
                            <Adhaar_Document
                                triggerValidation={triggerBuyerValidations}
                                setTriggerValidations={setTriggerBuyerValidations}
                                setIsKYCCompleted={setIsKYCCompleted}
                            />
                        </div>
                    </div>
                </div>

                <div className="text-lg text-center w-full">OR</div>

                {/* Second Collapse */}
                <div className="mt-6 mb-6">
                    <h2 id={'accordion-collapse-heading-2'}>
                        <button
                            type="button"
                            className={`flex items-center justify-between w-full px-5 py-3 font-medium bg-white rtl:text-right text-sm border border-gray-200 ${openAccordion === 2
                                ? 'rounded-t-xl border-1 border-[#ACCBFB]'
                                : 'rounded-xl'
                                } gap-3`}
                            data-accordion-target={'#accordion-collapse-body-2'}
                            aria-expanded={openAccordion === 2}
                            aria-controls={'accordion-collapse-body-2'}
                            onClick={() => handleAccordionToggle(2)}
                            style={{ color: '#191919' }} //for styling
                        >
                            <div className="flex flex-row gap-4">
                                <img src={KYC_Document} alt="KYC using Adhaar" />
                                <div className="flex flex-col justify-start gap-1">
                                    <div className="flex gap-1.5">
                                        <span className="text-[0.9rem]">KYC by uploading ID & Address Proofs</span>
                                        <span className="text-[0.65rem] font-normal text-[#6C757D]">(Document Upload Required)</span>
                                    </div>
                                    <div className="text-left px-5 bg-[#FFF5EB] text-[#D96C00] font-normal text-[0.65rem] max-w-max rounded-full">KYC verification might take 2-3 business days</div>
                                </div>
                            </div>
                            <svg
                                data-accordion-icon
                                className={`w-5 h-5 shrink-0 rotate-${() => handleAccordionToggle(2)} === 2 ? '0' : '180'} transform origin-center transition-transform duration-300 ease-in-out shrink-0`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </h2>
                    <div id={'accordion-collapse-body-2'} className={`${openAccordion === 2 ? 'block' : 'hidden'} bg-white p-4 border border-t-0 rounded-b-xl border-1 border-[#ACCBFB]`} aria-labelledby={`accordion-collapse-heading-2 `}>
                        <div className="py-4 font-normal">
                            <Document_Upload
                                setIsKYCCompleted={setIsKYCCompleted}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-start gap-4">
                <button
                    type="button"
                    className="dark:focus:ring-red-900 rounded-lg bg-red-600 px-10 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
                // onClick={() => changeNextStep('NEXT')}
                >
                    {'Next'}
                </button>
            </div>
        </div >
    );
}

export default DocumentVerification;