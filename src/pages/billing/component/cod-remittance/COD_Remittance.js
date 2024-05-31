import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { COD_Reconciliation } from '../cod-reconciliation'
import { useSearchParams,useNavigate } from 'react-router-dom';
import { FutureCod } from '../future-cod';
import PageWithSidebar from '../../../../common/components/page-with-sidebar/PageWithSidebar';
import { BillingTabs } from '../billing-tabs';
import { Field } from '../../../../common/components';
import axios from 'axios';
import { BACKEND_URL } from '../../../../common/utils/env.config';

const COD_Remittance = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [data, setData] = useState([]); //eslint-disable-line
    const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().slice(0, 10);
    const todayDate = new Date().toISOString().slice(0, 10);
    const [fromDate, setFromDate] = useState(oneMonthAgo);
    const [toDate, setToDate] = useState(todayDate);
    const [show,setShow] = useState(false)

    const [remittanceInfo,setRemittanceInfo] = useState({
        order_id:0,
        cod_to_be_remitted: 0,
        last_cod_remitted: 0,
        total_cod_remitted: 0,
        total_deduction_from_cod: 0,
        remittance_initiated: 0,
        status_id: 0
    })

    const handleRemittanceInfo = (e) => {
        const {id, value} = e.target
        setRemittanceInfo((prev) => ({...prev, [id]: value}))
    }

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

    const handleCreate = () => {
        setShow(true)
    }

    const handleCOD = () => {
        axios.post(BACKEND_URL + '/order/create_cod_remittance', {
            "order_id": parseInt(remittanceInfo?.order_id),
            "cod_to_be_remitted": parseInt(remittanceInfo?.cod_to_be_remitted),
            "last_cod_remitted": parseInt(remittanceInfo?.last_cod_remitted),
            "total_cod_remitted": parseInt(remittanceInfo?.total_cod_remitted),
            "total_deduction_from_cod": parseInt(remittanceInfo?.total_deduction_from_cod),
            "remittance_initiated": parseInt(remittanceInfo?.remittance_initiated),
            "status_id": parseInt(remittanceInfo?.status_id)
        })
        .then((res) => {
            console.log("Response Cod",res.data);
            toast.success('COD remittance created successfully');
            setShow(false)
        }).catch((err) => {
            console.log("Error Cod",err);
            toast("Error In Creation Of COD remittance",{type:'error'})
        })

        setRemittanceInfo({
            order_id:0,
            cod_to_be_remitted: 0,
            last_cod_remitted: 0,
            total_cod_remitted: 0,
            total_deduction_from_cod: 0,
            remittance_initiated: 0,
            status_id: 0
        })
    }

    const handleCODData = () => {
        axios.post(BACKEND_URL + `/order/get_cod_remittance?user_id=${localStorage.getItem('user_id')}`)
        .then((res) => {
            console.log("COD DATA",res.data)
            setData(res.data)
        }).catch((err) => {
            console.log("Error COD DATA",err)
        })
    }

    useEffect(() => {
        handleCODData()
    },[])

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
                            <div className="ml-2">
                                <button className="border-1 h-[33px] w-[100px] rounded-[4px] border-[#B07828] bg-[#B07828] text-[12px] leading-[30px] text-white hover:text-white" onClick={handleCreate}>Create</button>
                            </div>
                            <div className="ml-2">
                                <button className="border-1 h-[33px] w-[100px] rounded-[4px] border-[#5a28b0] bg-[#5a28b0] text-[12px] leading-[30px] text-white hover:text-white">Upload</button>
                            </div>
                        </div>
                    }
                </div>
                {activeTab === 0 && <COD_Reconciliation charges={charges} data={data} />}
                {activeTab === 1 && <FutureCod />}
            </BillingTabs>


    {show && 
        <div className="mt-8 fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none bg-opacity-25">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-9/12 lg:w-4/5 xl:w-3/4 max-w-7xl">
            <div className="flex flex-row justify-between border-blueGray-200  w-full items-center rounded-t border-b border-solid p-5">
                <h2 className="text-xl font-bold mb-2">Add COD Remittance Details</h2>
                <button
                    className="border-0 bg-transparent p-1 mb-2 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                    onClick={() => setShow(false)}>
                    <span className="block h-6 w-6 bg-transparent text-black opacity-50 outline-none focus:outline-none">
                        ×
                    </span>
                </button>
            </div>
                <form>
                <div className="mt-4 mb-4 flex flex-row">
                <Field
                    type={'number'}
                    id={'order_id'}
                    label={'Order ID'}
                    inputClassNames={'text-xs mr-2'}
                    placeHolder={'Enter Order Id'}
                    required={true}
                    value={remittanceInfo?.order_id || ''}
                    onChange={handleRemittanceInfo}
                    />

                <Field
                    type={'number'}
                    id={'cod_to_be_remitted'}
                    label={'COD To Be Remitted'}
                    inputClassNames={'text-xs ml-2'}
                    placeHolder={'Enter Cod to be remitted'}
                    required={true}
                    value={remittanceInfo?.cod_to_be_remitted || ''}
                    onChange={handleRemittanceInfo}
                    />

                </div>
                <div className="mt-4 mb-4 flex flex-row">
                <Field
                    type={'number'}
                    id={'last_cod_remitted'}
                    label={'Last COD'}
                    inputClassNames={'text-xs mr-2'}
                    placeHolder={'Enter Last Cod'}
                    required={true}
                    value={remittanceInfo?.last_cod_remitted || ''}
                    onChange={handleRemittanceInfo}
                    />

                <Field
                    type={'number'}
                    id={'total_cod_remitted'}
                    label={'Total COD'}
                    inputClassNames={'text-xs ml-2'}
                    placeHolder={'Enter Total Cod'}
                    required={true}
                    value={remittanceInfo?.total_cod_remitted || ''}
                    onChange={handleRemittanceInfo}
                    />

                </div>
                <div className="mb-4 flex flex-row">
                <div className="flex flex-row justify-between w-full">
                <Field
                    type={'number'}
                    id={'total_deduction_from_cod'}
                    label={'Deduction From COD'}
                    inputClassNames={'text-xs mb-2 mr-2'}
                    placeHolder={'Enter Deduction From COD'}
                    required={true}
                    value={remittanceInfo?.total_deduction_from_cod || ''}
                    onChange={handleRemittanceInfo}
                />

                <Field
                        type={'number'}
                        id={'remittance_initiated'}
                        label={'Remittance Initiated'}
                        inputClassNames={'text-xs mb-2 mr-2'}
                        placeHolder={'Enter Remittence Initiated'}
                        required={true}
                        value={remittanceInfo?.remittance_initiated || ''}
                        onChange={handleRemittanceInfo}
                    />

                    <Field
                    type={'number'}
                    id={'status_id'}
                    label={'Status Id'}
                    inputClassNames={'text-xs mr-2'}
                    placeHolder={'Enter Status Id'}
                    required={true}
                    value={remittanceInfo?.status_id || ''}
                    onChange={handleRemittanceInfo}
                />
                </div>
                </div>
                <div className="flex items-center justify-center px-6">
                        <button
                            className="mb-1 mr-1 px-12 rounded-lg py-2 text-sm border border-[#B07828] text-[#B07828] outline-none transition-all duration-150 ease-linear focus:outline-none hover:shadow-lg font-semibold"
                            type="button"
                            onClick={() => setShow(false)}>
                            Cancel
                        </button>
                        <button
                            className="mb-1 mr-1 rounded-lg bg-[#B07828] px-6 py-2 text-sm text-white shadow outline-none transition-all duration-150 border ease-linear hover:shadow-lg focus:outline-none font-semibold"
                            type="button"
                            onClick={() => handleCOD()}
                        >
                            {'Request COD Remittance' }
                        </button>
                    </div>
                </form>
            </div>
        </div>
        }
        </PageWithSidebar>
    )
}

export default COD_Remittance
