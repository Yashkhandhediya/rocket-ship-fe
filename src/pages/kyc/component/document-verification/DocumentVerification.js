import { useState } from "react";
import { KYC_Document, KYC_adhaar } from "../../../../common/icons";

const DocumentVerification = () => {
    const [openAccordion, setOpenAccordion] = useState(0);

    const handleAccordionToggle = (index) => {
        setOpenAccordion((prev) => (prev === index ? null : index));
    };

    return (
        <div>
            <div className="font-bold text-xl mb-6">
                Please select any of the 2 options below to verify your KYC
            </div>

            {/* First Collapse */}
            <div id="accordion-collapse" data-accordion="collapse" className="w-[90%]">
                <div className="mb-6">
                    <h2 id={'accordion-collapse-heading-1'}>
                        <button
                            type="button"
                            className={`flex items-center justify-between w-full px-5 py-3 font-medium rtl:text-right text-[#191919] bg-white border border-gray-200 ${openAccordion === 1
                                ? 'rounded-t-xl border-1 border-[#ACCCFB]'
                                : 'rounded-xl text-[#191919]'
                                } gap-3`}
                            data-accordion-target={'#accordion-collapse-body-1'}
                            aria-expanded={openAccordion === 1}
                            aria-controls={'accordion-collapse-body-1'}
                            onClick={() => handleAccordionToggle(1)}
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
                                className={`w-3 h-3 shrink-0 rotate-${openAccordion === 1 ? '0' : '180'} transform origin-center transition-transform duration-500 ease-in-out shrink-0`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                            </svg>
                        </button>
                    </h2>
                    <div id={'accordion-collapse-body-1'} className={`${openAccordion === 1 ? 'block' : 'hidden'}`} aria-labelledby={'accordion-collapse-heading-1 p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900'}>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            {'Accordion Item 1 Content'}
                        </p>
                    </div>
                </div>

                <div className="text-lg text-center w-full">OR</div>

                {/* Second Collapse */}
                <div className="mt-6 mb-6">
                    <h2 id={'accordion-collapse-heading-2'}>
                        <button
                            type="button"
                            className={`flex items-center justify-between w-full px-5 py-3 text-[#191919] font-medium bg-white rtl:text-right text-sm border border-gray-200 ${openAccordion === 2
                                ? 'rounded-t-xl border-1 border-[#ACCCFB]'
                                : 'rounded-xl text-[#191919]'
                                } gap-3`}
                            data-accordion-target={'#accordion-collapse-body-2'}
                            aria-expanded={openAccordion === 2}
                            aria-controls={'accordion-collapse-body-2'}
                            onClick={() => handleAccordionToggle(2)}
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
                                className={`w-3 h-3 shrink-0 ${openAccordion === 2 ? 'rotate-0' : 'rotate-180'}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                            </svg>
                        </button>
                    </h2>
                    <div id={'accordion-collapse-body-2'} className={`${openAccordion === 2 ? 'block' : 'hidden'}`} aria-labelledby={`accordion-collapse-heading-2 p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900`}>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            {'Accordion Item 2 Content'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-start gap-4">
                <button
                    type="button"
                    className="dark:focus:ring-purple-900 rounded-lg bg-purple-600 px-10 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300"
                // onClick={() => changeNextStep('NEXT')}
                >
                    {'Next'}
                </button>
            </div>
        </div >
    );
}

export default DocumentVerification;