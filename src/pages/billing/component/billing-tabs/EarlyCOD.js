import React from 'react';
import { logo_main, clock_man } from '../../../../common/images';
import { CustomTooltip } from "../../../../common/components";

function EarlyCOD({ onClose }) {
    return (
        <div className="relative bg-white p-8 rounded-lg shadow-md">
            <button className="absolute top-4 right-4 text-red-600" onClick={onClose}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <img
                        src={logo_main}
                        alt="Early COD"
                        className="w-24 h-24 mr-4"
                    />
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Get Early COD</h2>
                        <p className="text-gray-600">Why Wait? Scale your business with <span className='font-bold'>Daily COD remittance</span></p>
                    </div>
                </div>
                <img
                    src={clock_man}
                    alt="Early COD"
                    className="w-25 h-25"
                />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <button className="bg-red-100 p-6 rounded-lg focus:outline-none flex flex-col items-center justify-center h-64">
                    <div className="flex items-center mb-2">
                        <h3 className="text-2xl font-bold">D + 2 Days</h3>
                        <CustomTooltip text="Remittance will be transferred on delivery + 2 days" style="dark" placement="right">
                            {/* info svg */}
                            <svg className="w-4 h-4 text-gray-800 ml-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clipRule="evenodd" />
                            </svg>
                        </CustomTooltip>
                    </div>
                    <div className="text-gray-600 my-4 border-t border-b border-gray-300 py-2 flex flex-col items-center">
                        <span className="text-2xl font-bold">0.99%</span>
                        <span>of COD Amount</span>
                    </div>
                    <ul className="list-none text-left space-y-2">
                        <li className="flex items-center mb-1">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.293 6.293a1 1 0 00-1.414 0L10 14.586 5.121 9.707a1 1 0 00-1.415 1.414l5.657 5.657a1 1 0 001.414 0l9.95-9.95a1 1 0 000-1.414z" />
                            </svg>
                            Guaranteed Remit in 2 days
                        </li>
                        <li className="flex items-center mb-1">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.293 6.293a1 1 0 00-1.414 0L10 14.586 5.121 9.707a1 1 0 00-1.415 1.414l5.657 5.657a1 1 0 001.414 0l9.95-9.95a1 1 0 000-1.414z" />
                            </svg>
                            Steady Cash Flow
                        </li>
                        <li className="flex items-center mb-1">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.293 6.293a1 1 0 00-1.414 0L10 14.586 5.121 9.707a1 1 0 00-1.415 1.414l5.657 5.657a1 1 0 001.414 0l9.95-9.95a1 1 0 000-1.414z" />
                            </svg>
                            50% faster business Cycle
                        </li>
                    </ul>
                </button>

                <button className="bg-red-100 p-6 rounded-lg focus:outline-none flex flex-col items-center justify-center h-64">
                    <div className="flex items-center mb-2">
                        <h3 className="text-2xl font-bold">D + 3 Days</h3>
                        <CustomTooltip text="Remittance will be transferred on delivery + 3 days" style="dark" placement="right">
                            {/* info svg */}
                            <svg className="w-4 h-4 text-gray-800 ml-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clipRule="evenodd" />
                            </svg>
                        </CustomTooltip>
                    </div>
                    <div className="text-gray-600 my-4 border-t border-b border-gray-300 py-2 flex flex-col items-center">
                        <span className="text-2xl font-bold">0.69%</span>
                        <span>of COD Amount</span>
                    </div>
                    <ul className="list-none text-left space-y-2">
                        <li className="flex items-center mb-1">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.293 6.293a1 1 0 00-1.414 0L10 14.586 5.121 9.707a1 1 0 00-1.415 1.414l5.657 5.657a1 1 0 001.414 0l9.95-9.95a1 1 0 000-1.414z" />
                            </svg>
                            Guaranteed Remit in 3 days
                        </li>
                        <li className="flex items-center mb-1">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.293 6.293a1 1 0 00-1.414 0L10 14.586 5.121 9.707a1 1 0 00-1.415 1.414l5.657 5.657a1 1 0 001.414 0l9.95-9.95a1 1 0 000-1.414z" />
                            </svg>
                            Steady Cash Flow
                        </li>
                    </ul>
                </button>

                <button className="bg-red-100 p-6 rounded-lg focus:outline-none flex flex-col items-center justify-center h-64">
                    <div className="flex items-center mb-2">
                        <h3 className="text-2xl font-bold">D + 4 Days</h3>
                        <CustomTooltip text="Remittance will be transferred on delivery + 4 days" style="dark" placement="right">
                            {/* info svg */}
                            <svg className="w-4 h-4 text-gray-800 ml-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clipRule="evenodd" />
                            </svg>
                        </CustomTooltip>
                    </div>
                    <div className="text-gray-600 my-4 border-t border-b border-gray-300 py-2 flex flex-col items-center">
                        <span className="text-2xl font-bold">0.49%</span>
                        <span>of COD Amount</span>
                    </div>
                    <ul className="list-none text-left space-y-2">
                        <li className="flex items-center mb-1">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.293 6.293a1 1 0 00-1.414 0L10 14.586 5.121 9.707a1 1 0 00-1.415 1.414l5.657 5.657a1 1 0 001.414 0l9.95-9.95a1 1 0 000-1.414z" />
                            </svg>
                            Guaranteed Remit in 4 days
                        </li>
                        <li className="flex items-center mb-1">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.293 6.293a1 1 0 00-1.414 0L10 14.586 5.121 9.707a1 1 0 00-1.415 1.414l5.657 5.657a1 1 0 001.414 0l9.95-9.95a1 1 0 000-1.414z" />
                            </svg>
                            Steady Cash Flow
                        </li>
                    </ul>
                </button>
            </div>

            <div className="mt-4">
                <input type="checkbox" id="terms" className="mr-2" />
                <label htmlFor="terms">I have read the <span className="text-blue-500">Terms and Conditions</span></label>
            </div>
        </div>
    );
}

export default EarlyCOD;
