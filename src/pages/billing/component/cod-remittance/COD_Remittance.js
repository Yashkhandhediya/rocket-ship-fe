import { toast } from 'react-toastify';
import { useState } from 'react'
import { COD_Reconciliation } from '../cod-reconciliation'
import { useSearchParams,useNavigate } from 'react-router-dom';
import { FutureCod } from '../future-cod';
import PageWithSidebar from '../../../../common/components/page-with-sidebar/PageWithSidebar';
import { BillingTabs } from '../billing-tabs';

const COD_Remittance = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [data, setData] = useState([]); //eslint-disable-line
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
    const charges = [
        {
            label: 'COD To Be Remitted',
            value: '₹ 0.00',
            tooltip: 'Amount to be remitted in next cycle.'
        },
        {
            label: 'Last COD Remitted',
            value: '₹ 0.00'
        },
        {
            label: 'Total COD Remitted',
            value: '₹ 0.00'
        },
        {
            label: 'Total deduction from COD',
            value: '₹ 0.00',
            tooltip: "Frieght Charge from COD : Rs 0.00 .\nEarly COD Charges : Rs 0.00 .\nRTO Reversal Amount : Rs 0.00"
        },
        {
            label: 'Remittance Initiated',
            value: '₹ 0.00'
        },
    ]
    return (
        <PageWithSidebar>
            <BillingTabs>
                <div className="flex flex-row w-full justify-start my-4 px-6">
                    <button className={`text-[13px] border border-r-0 px-4 py-1 rounded-l-[3px] focus:outline-none ${0 === activeTab ? 'font-semibold border-[#1D99D9] bg-[#159700] text-white' : 'font-normal border-[#CFD4D6] text-[#333333] bg-[#FAFAFA]'}`}
                        onClick={() => {
                            navigate('/remittance-logs')
                            setActiveTab(0);
                        }}
                    >
                        {'COD Reconciliation'}
                    </button>
                    <button className={`text-[13px] border border-l-0 px-4 py-1 rounded-r-[3px] focus:outline-none ${1 === activeTab ? 'font-semibold border-[#1D99D9] bg-[#159700] text-white' : 'font-normal border-[#CFD4D6] text-[#333333] bg-[#FAFAFA]'}`}
                        onClick={() => {
                            navigate('/future-cod')
                            setActiveTab(1);
                        }}
                    >
                        {'Future COD'}
                    </button>
                    {activeTab === 0 &&
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
                            {/* Select Year */}
                            <div>
                                <select name="timeline" id="timeline" className='text-[13px] font-normal text-[#000000c0] border border-[#CFD4D6] py-1 w-48 focus:border-[#66afe9] focus:ring-0 rounded-sm'>
                                    <option value="last_one_year">Last One Year</option>
                                    <option value="last_one_year">2023</option>
                                    <option value="last_one_year">2022</option>
                                    <option value="last_one_year">2021</option>
                                    <option value="last_one_year">2020</option>
                                    <option value="last_one_year">2019</option>
                                    <option value="last_one_year">2018</option>
                                    <option value="last_one_year">2017</option>
                                    <option value="last_one_year">2016</option>
                                </select>
                            </div>
                            {/* Search */}
                            <div className="flex flex-row">
                                <input type="text" name="search_order" id="search_order" className='block w-[150px] text-[12px] py-1 text-[#959595] border border-[#CFD4D6] focus:border-gray-300 focus:ring-0 rounded-l-[0.2rem]'
                                    placeholder='Search by AWB No.' autoComplete={false} />
                                <button className='bg-[#FAFAFA] border-l-0 border border-[#CFD4D6] px-2' disabled>
                                    <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    }
                </div>
                {activeTab === 0 && <COD_Reconciliation charges={charges} data={data} />}
                {activeTab === 1 && <FutureCod />}
            </BillingTabs>
        </PageWithSidebar>
    )
}

export default COD_Remittance
