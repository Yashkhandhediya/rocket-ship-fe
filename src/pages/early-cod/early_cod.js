import { Link } from "react-router-dom";
import PageWithSidebar from "../../common/components/page-with-sidebar/PageWithSidebar";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../common/utils/env.config";
import React from 'react';
import { CustomTooltip } from "../../common/components";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Pagination from '../courier/pagination/Pagination';
import { format } from 'date-fns';

class Plan {
    constructor(days, rate, codAmount, features, tooltip, planType) {
        this.days = days;
        this.rate = rate;
        this.codAmount = codAmount;
        this.features = features;
        this.tooltip = tooltip;
        this.planType = planType;
    }
}

const plans = [
    new Plan('D + 2 Days', '0.99%', 'of COD Amount', [
        'Guaranteed Remit in 2 days',
        'Steady Cash Flow',
        '50% faster business Cycle'
    ], 'Remittance will be transferred on delivery + 2 days', 2),
    new Plan('D + 3 Days', '0.69%', 'of COD Amount', [
        'Guaranteed Remit in 3 days',
        'Steady Cash Flow'
    ], 'Remittance will be transferred on delivery + 3 days', 3),
    new Plan('D + 4 Days', '0.49%', 'of COD Amount', [
        'Guaranteed Remit in 4 days',
        'Steady Cash Flow'
    ], 'Remittance will be transferred on delivery + 4 days', 4)
];

const EarlyCOD = () => {
    const [activePlan, setActivePlan] = useState(null);
    const [label, setLabel] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const userId = localStorage.getItem('user_id');
    const [totalData, setTotalData] = useState([]);
    const [perPage, setPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [isTableVisible, setTableVisible] = useState(false);

    const toggleTableVisibility = () => {
        setTableVisible(!isTableVisible);
    };

    useEffect(() => {
        handleCODData();
    }, [page, perPage]);

    useEffect(() => {
        const fetchPlanType = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/order/get_cod_plan/${userId}`);
                const result = await response.json();
                setActivePlan(result.plan_type);
                setLabel(result.plan_type);
                setSelectedPlan(result.plan_type);
            } catch (error) {
                console.error('Error fetching plan type:', error);
            }
        };

        fetchPlanType();
    }, [userId]);

    const handlePageChange = (page) => setPage(page);
    const handlePerPageChange = (perPage) => setPerPage(perPage);

    const handleCODData = () => {
        axios.get(`${BACKEND_URL}/order/get_cod_history?user_id=${userId}&page=${page}&page_size=${perPage}`)
            .then(res => setData(res.data))
            .catch(err => console.error('Error fetching COD data:', err));
    };

    const handleSave = async (planType) => {
        if (!selectedPlan) {
            alert('Please select a plan.');
            return;
        }

        try {
            const url = label === planType
                ? `${BACKEND_URL}/order/deactive_cod_plan/${userId}?plan_id=${planType}`
                : `${BACKEND_URL}/order/set_cod_plan?user_id=${userId}&plan_id=${planType}`;
            const response = await fetch(url, { method: 'POST' });
            const result = await response.json();
            if (result.status === 1) {
                toast.success(result.details || 'Operation successful');
                window.location.reload();
            } else {
                toast.error(result.details || 'Operation failed');
            }
        } catch (error) {
            toast.error('Error saving plan: ' + error.message);
        }
    };

    const handleCheckboxChange = (event, planType) => {
        if (event.target.checked) {
            setSelectedPlan(planType);
        } else if (selectedPlan === planType) {
            setSelectedPlan(null);
        }
    };

    const activationData = data.slice((page - 1) * perPage, page * perPage);

    return (
        <PageWithSidebar>
            <div className="header bg-[#FAFBFC] border-b border-[#b3b3b3] p-2 text-xl mx-2">Settings-Early COD</div>
            <div className="bg-[#EDEDED] w-full px-6 pb-16 mx-2">
                <div className="pt-2 pb-5 text-[#656565] font-bold">
                    <Link to={'/settings'} className="text-green-500 font-semibold">Settings</Link> &gt; Seller Remittance &gt; Early COD Remittance
                </div>
                <div className="bg-white flex flex-col gap-3 p-4">
                    <div className="m-7">
                        <div className="relative bg-white mb-5">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">Early COD Remittance</h2>
                                        <p className="text-gray-600">Get guaranteed remittance from the shipment delivered date.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {plans.map((plan) => (
                                    <div key={plan.planType} className="relative bg-white p-4 rounded-lg shadow-lg border">
                                        {label === plan.planType && (
                                            <div className="w-[40%] top-0 left-0 absolute bg-red-500 text-black px-2 py-1 text-center rounded-tl-lg rounded-br-lg z-5" style={{ minWidth: '10px' }}>
                                                <span className="flex items-center justify-center text-white text-sm font-semibold">
                                                    <FontAwesomeIcon icon={faCrown} className="mr-1" style={{ color: 'yellow' }} />
                                                    Active Plan
                                                </span>
                                            </div>
                                        )}
                                        {2 === plan.planType && (
                                            <div className="w-[40%] top-0 left-0 absolute bg-yellow-400 text-black px-2 py-1 text-center rounded-tl-lg rounded-br-lg z-5" style={{ minWidth: '10px' }}>
                                                <span className="flex items-center justify-center text-white text-sm font-semibold">
                                                    {label === plan.planType ? "Active Plan" : "Most Popular Plan"}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex flex-col items-center justify-between h-full">
                                            <div className="flex items-center mb-2">
                                                <h3 className="text-xl font-bold mb-2 mt-9">Get COD amount within</h3>
                                            </div>
                                            <h2 className="text-3xl font-bold mb-2 text-center">{plan.days.replace('D + ', '')}</h2>
                                            <p className="text-center mb-4">from the date of delivery</p>

                                            <div className="bg-red-100 p-4 rounded-lg text-center w-full">
                                                <p className="text-lg font-bold mb-2"><span className="text-3xl">{plan.rate}</span> Transaction Charges</p>
                                                <p>{plan.codAmount} (GST included)</p>
                                            </div>

                                            <ul className="list-none text-left space-y-2 w-full px-2 mt-4">
                                                {plan.features.map((feature, index) => (
                                                    <li key={index} className="flex items-center mb-1">
                                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M20.293 6.293a1 1 0 00-1.414 0L10 14.586 5.121 9.707a1 1 0 00-1.415 1.414l5.657 5.657a1 1 0 001.414 0l9.95-9.95a1 1 0 000-1.414z" />
                                                        </svg>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="mt-4 flex items-center w-full">
                                                <input type="checkbox" id={`terms-${plan.planType}`} className="mr-2" checked={selectedPlan === plan.planType} onChange={(e) => handleCheckboxChange(e, plan.planType)} />
                                                <label htmlFor={`terms-${plan.planType}`} className="text-sm">I have read and agree to <a href="#" className="text-blue-500">Terms and Conditions.</a></label>
                                            </div>

                                            <button
                                                className={`w-full ${label === plan.planType ? 'bg-red-500 hover:bg-red-700' : 'bg-red-500 hover:bg-red-700'} text-white py-2 rounded-md mt-4 disabled:opacity-50 disabled:cursor-not-allowed`}
                                                onClick={() => handleSave(plan.planType)}
                                                disabled={selectedPlan !== plan.planType}
                                            >
                                                {label === plan.planType ? "Deactivate" : "Activate"}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-4">
                            <h2 className="text-lg font-bold mb-4 cursor-pointer flex items-center" onClick={toggleTableVisibility}>
                                Activation History
                                <span className='ml-3 text-red-500'>
                                    {isTableVisible ? '▼' : '▲'}
                                </span>
                            </h2>
                            {isTableVisible && (
                                <div className="m-2">
                                    <div className="flex items-center border-b-2 border-[#000] text-left">
                                        <div className="w-[25%] py-2.5 text-center font-bold">User</div>
                                        <div className="w-[25%] py-2.5 text-center font-bold">Remark</div>
                                        <div className="w-[25%] py-2.5 text-center font-bold">Plan Type</div>
                                        <div className="w-[25%] py-2.5 text-center font-bold">Created At</div>
                                    </div>
                                    <div className="border-b-2 border-[#E5E7EB]"></div> 
                                    <div className="flex flex-col items-center justify-center">
                                        {activationData.map((activation, index) => (
                                            <div
                                                className="flex h-12 w-full flex-row items-center border-b-2 border-[#E5E7EB] text-center"
                                                key={index}
                                            >
                                                <div className="flex h-full w-[25%] items-center justify-center font-normal">{activation.user}</div>
                                                <div className="flex h-full w-[25%] items-center justify-center font-normal">{activation.remarks}</div>
                                                <div className="flex h-full w-[25%] items-center justify-center font-normal">{activation.plan} Days</div>
                                                <div className="flex h-full w-[25%] items-center justify-center font-normal">{format(new Date(activation.created_at), 'MMM d, yyyy h:mm a')}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <Pagination
                                        page={page}
                                        totalData={totalData}
                                        setPage={setPage}
                                        perPage={perPage}
                                        data={data}
                                        handlePageChange={handlePageChange}
                                        handlePerPageChange={handlePerPageChange}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-bold mb-4">Why should you activate Early COD?</h2>
                            <ul className="list-disc">
                                <li>Get guaranteed remittance in just {label} days from the shipment delivered date.</li>
                                <li>Grow your business by removing cash flow restrictions.</li>
                                <li>Get full control over your remittance cycle and take better decisions for your business.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </PageWithSidebar>
    );
};

export default EarlyCOD;
