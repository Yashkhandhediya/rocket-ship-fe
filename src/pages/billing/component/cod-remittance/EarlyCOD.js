import React, { useState, useEffect } from 'react';
import { logo_main, clock_man } from '../../../../common/images';
import { CustomTooltip } from "../../../../common/components";
import { BACKEND_URL } from '../../../../common/utils/env.config';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

function EarlyCOD({ onClose }) {
    const [activePlan, setActivePlan] = useState(null);
    const [Label, setLabel] = useState(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        const fetchPlanType = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/order/get_code_plan/${userId}`);
                const data = await response.json();
                setActivePlan(data.plan_type);
                setLabel(data.plan_type)
            } catch (error) {
                console.error('Error fetching plan type:', error);
            }
        };

        fetchPlanType();
    }, [userId]);

    const plans = [
        {
            days: 'D + 2 Days',
            rate: '0.99%',
            codAmount: 'of COD Amount',
            features: [
                'Guaranteed Remit in 2 days',
                'Steady Cash Flow',
                '50% faster business Cycle'
            ],
            tooltip: 'Remittance will be transferred on delivery + 2 days',
            planType: 2
        },
        {
            days: 'D + 3 Days',
            rate: '0.69%',
            codAmount: 'of COD Amount',
            features: [
                'Guaranteed Remit in 3 days',
                'Steady Cash Flow'
            ],
            tooltip: 'Remittance will be transferred on delivery + 3 days',
            planType: 3
        },
        {
            days: 'D + 4 Days',
            rate: '0.49%',
            codAmount: 'of COD Amount',
            features: [
                'Guaranteed Remit in 4 days',
                'Steady Cash Flow'
            ],
            tooltip: 'Remittance will be transferred on delivery + 4 days',
            planType: 4
        }
    ];

    const handlePlanClick = (planType) => {
        setActivePlan(planType);
    };

    const handleCheckboxChange = (event) => {
        setTermsAccepted(event.target.checked);
    };

    const handleSave = async () => {
        if (!termsAccepted) {
            alert('Please accept the Terms and Conditions.');
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/order/set_code_plan?user_id=${userId}&plan_id=${activePlan}`, {
                method: 'POST',
            });
            const result = await response.json();
            toast.success(result);
            window.location.reload();
        } catch (error) {
            toast.error(error);
        }
    };

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
                {plans.map((plan) => (
                    <div key={plan.planType} className="relative">
                        {Label === plan.planType && (
                            <div className="w-[60%] absolute top-[-16px] left-12 right-0 bg-red-500 text-black px-2 py-1 rounded-lg text-center z-5" style={{ minWidth: '10px' }}>
                                <span className="flex items-center justify-center text-white text-sm font-semibold">
                                    <FontAwesomeIcon icon={faCrown} className="mr-1" style={{ color: 'yellow' }} />
                                    Active Plan
                                </span>
                            </div>
                        )}
                        <button
                            className={`p-6 rounded-lg focus:outline-none flex flex-col items-center justify-center h-64 ${activePlan === plan.planType ? 'bg-red-300' : 'bg-red-100'}`}
                            onClick={() => handlePlanClick(plan.planType)}
                        >
                            <div className="flex items-center mb-2">
                                <h3 className="text-2xl font-bold">{plan.days}</h3>
                                <CustomTooltip text={plan.tooltip} style="dark" placement="right">
                                    <svg className="w-4 h-4 text-gray-800 ml-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clipRule="evenodd" />
                                    </svg>
                                </CustomTooltip>
                            </div>
                            <div className="text-gray-600 my-4 border-t border-b border-gray-300 py-2 flex flex-col items-center">
                                <span className="text-2xl font-bold">{plan.rate}</span>
                                <span>{plan.codAmount}</span>
                            </div>
                            <ul className="list-none text-left space-y-2">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center mb-1">
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.293 6.293a1 1 0 00-1.414 0L10 14.586 5.121 9.707a1 1 0 00-1.415 1.414l5.657 5.657a1 1 0 001.414 0l9.95-9.95a1 1 0 000-1.414z" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <input type="checkbox" id="terms" className="mr-2" onChange={handleCheckboxChange} />
                <label htmlFor="terms">I have read the <span className="text-blue-500">Terms and Conditions</span></label>
            </div>

            <div className="mt-4 flex justify-center">
                <button
                    className={`bg-green-500 text-white px-6 py-2 rounded-md ${!termsAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleSave}
                    disabled={!termsAccepted}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default EarlyCOD;
