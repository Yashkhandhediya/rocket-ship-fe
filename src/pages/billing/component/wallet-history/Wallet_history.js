import { useSearchParams, useNavigate } from 'react-router-dom';
import PageWithSidebar from '../../../../common/components/page-with-sidebar/PageWithSidebar'
import { BillingTabs } from '../billing-tabs'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Wallet_Data } from '../wallet-data';
import { Recharge_History } from '../recharge-history';

const Wallet_history = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().slice(0, 10);
    const todayDate = new Date().toISOString().slice(0, 10);
    const [fromDate, setFromDate] = useState(oneMonthAgo);
    const [toDate, setToDate] = useState(todayDate);

    const checkDate = (fromDate, toDate) => {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        return from <= to;
    };

    const handleDateChange = () => {
        if (checkDate(fromDate, toDate)) {
            const currentSearchParams = new URLSearchParams(searchParams);
            // Update the desired parameter
            currentSearchParams.set('from', fromDate);
            currentSearchParams.set('to', toDate);
            // Update the search params
            setSearchParams(currentSearchParams);
        } else {
            toast.error('From date should be less than To date');
        }
    };

    return (
        <PageWithSidebar>
            <BillingTabs>
                <div className="flex flex-row w-full justify-start my-4 px-6">
                    <button className={`text-[13px] border border-r-0 px-4 py-1 rounded-l-[3px] focus:outline-none ${0 === activeTab ? 'font-semibold border-[#1D99D9] bg-[#159700] text-white' : 'font-normal border-[#CFD4D6] text-[#333333] bg-[#FAFAFA]'}`}
                        onClick={() => {
                            setActiveTab(0);
                            navigate('/billing-credit-details');
                        }}
                    >
                        {'Wallet History'}
                    </button>
                    <button className={`text-[13px] border border-l-0 px-4 py-1 rounded-r-[3px] focus:outline-none ${1 === activeTab ? 'font-semibold border-[#1D99D9] bg-[#159700] text-white' : 'font-normal border-[#CFD4D6] text-[#333333] bg-[#FAFAFA]'}`}
                        onClick={() => {
                            setActiveTab(1);
                            navigate('/recharge-status');
                        }}
                    >
                        {'Recharge History'}
                    </button>
                    <div className="ml-2 flex flex-row gap-2">
                        {/*From date  */}
                        <div>
                            <div className="group relative">
                                <input
                                    type={'date'}
                                    id="default-search"
                                    className={`block w-[150px] rounded-[4px] border-opacity-90 border border-gray-300 bg-gray-50 px-5 py-1 text-[12px] text-[#757575] focus:border-red-500 focus:ring-red-500`}
                                    required
                                    onChange={(ev) => {
                                        setFromDate(ev.target.value);
                                    }}
                                    value={fromDate}
                                />
                            </div>
                        </div>
                        {/* To date */}
                        <div>
                            <div className="group relative">
                                <input
                                    type={'date'}
                                    id="default-search"
                                    className={`block w-[150px] rounded-[4px] border-opacity-90 border border-gray-300 bg-gray-50 px-5 py-1 text-[12px] text-[#757575] focus:border-red-500 focus:ring-red-500`}
                                    required
                                    onChange={(ev) => {
                                        setToDate(ev.target.value);
                                    }}
                                    value={toDate}
                                />
                            </div>
                        </div>
                        {/* Apply Button */}
                        <div>
                            {/* Apply button for dates */}
                            <button
                                className={`border-1 h-[33px] w-[100px] rounded-[4px] border-[#B07828] bg-[#B07828] text-[12px] leading-[30px] text-white hover:text-white}'}}`}
                                onClick={() => {
                                    handleDateChange();
                                }}>
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
                {activeTab === 0 && <Wallet_Data />}
                {activeTab === 1 && <Recharge_History />}
            </BillingTabs>
        </PageWithSidebar>
    )
}

export default Wallet_history
