import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import PageWithSidebar from '../../../../common/components/page-with-sidebar/PageWithSidebar';
import { BillingTabs } from '../billing-tabs';
import { noData } from '../../../../common/images';
import { CustomTooltip, Loader } from '../../../../common/components';
import axios from 'axios';
import { BACKEND_URL } from '../../../../common/utils/env.config';

const Passbook = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState([]); //eslint-disable-line
    const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().slice(0, 10);
    const todayDate = new Date().toISOString().slice(0, 10);
    const [fromDate, setFromDate] = useState(oneMonthAgo);
    const [toDate, setToDate] = useState(todayDate);
    const [isLoading, setIsLoading] = useState(false);
    const [usableAmount, setUsableAmount] = useState(0);
    const [currentPage, setCurrentPage] = useState(2);
    const [itemsPerPage,setItemsPerPage] = useState(10);
    const [currentItems, setCurrentItems] = useState([]);
    const id_user = localStorage.getItem('user_id')
    const id_company = localStorage.getItem('company_id')
    const is_company = localStorage.getItem('is_company')

    console.log("Infooooooooooooooo",currentItems,itemsPerPage-10,itemsPerPage)
    const paginate = (page_item) => {
        if(page_item > 0){
            console.log("kdkl",page_item)
            setItemsPerPage(page_item)
        }else{
            setItemsPerPage(10)
        }
      };
    

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
            getPassbookData();
        } else {
            toast.error('From date should be less than To date');
        }
    };
    const charges = [
        {
            label: 'Current Usable Balance',
            value: '₹ ' + usableAmount,
        },
        {
            label: 'Balance On Hold',
            value: '₹ 0.00'
        },
        {
            label: 'Total Balance',
            value: '₹ 0.00'
        }
    ]

    const getPassbookData = async () => {
        console.log("PAGEEEEEEE NUM",currentPage)
        setIsLoading(true);
        const temp_id = is_company == 1 ? id_company : id_user
        try {
            const response = await axios.post(`${BACKEND_URL}/account_transaction/account_report?page_number=1&page_size=${itemsPerPage}`, { date_from: fromDate, date_to: toDate, user_id: temp_id });
            setData(response.data.report);
            setCurrentItems(response.data.report.slice(itemsPerPage-10, itemsPerPage));
            getUsableAmount();
            setIsLoading(false);
        } catch (error) {
            toast.error('Something went wrong while fetching passbook data');
            console.error('Error while fetching passbook data', error); //eslint-disable-line
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getPassbookData();
    }, [itemsPerPage]);

    useEffect(() => {
      setCurrentItems(data.slice(itemsPerPage-10, itemsPerPage))
    }, [data,itemsPerPage])
    

    const getDate = (date) => {
        console.log("Dateeeeeee",date)
        const [da, mon, y] = date.split('-');
        const d = new Date(y,mon-1,da);
        console.log("fggggggggggg",d)
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        return `${day}-${month}-${year}`;
    }

    const getUsableAmount = () => {
        setIsLoading(true);
        let amount = 0;
        data.length !== 0 && data.map((item) => {
            if (item.credit) {
                amount = amount + item.credit;
            } else if (item.debit) {
                amount = amount - item.debit;
            }
        }, 0);
        data.length !== 0 && setUsableAmount(amount !== 0 && amount.toFixed(2));
        setIsLoading(false);
        return amount.toFixed(2);
    }

    useEffect(() => {
        if (usableAmount === 0) {
            getUsableAmount();
        }
    });

    return (
        <PageWithSidebar>
            {isLoading && <Loader />}
            <BillingTabs>
                <div className="flex flex-row w-full justify-start my-4 px-6">
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
                </div>
                <div className="flex flex-row w-full justify-evenly my-4 px-6">
                    {charges.map((charge, index) => (
                        <div key={index} className="flex flex-col mx-1 font-semibold bg-[#159700] text-white justify-between text-center w-full py-1">
                            <div className="text-[14px] flex flex-row justify-center items-center gap-3">
                                {charge.label}
                            </div>
                            <div className="text-[14px]">{charge.value}</div>
                        </div>
                    ))}
                </div>
                <div className='ml-4 text-[14px] font-bold text-[#333333] border'>
                    <div className='flex flex-row w-full border border-collapse bg-[#FAFAFA]'>
                        <div className='pl-2 border-r-2 pr-2 w-full py-2'>Date</div>
                        <div className='pl-2 border-r-2 pr-2 w-full py-2'>Order ID</div>
                        <div className='pl-2 border-r-2 pr-2 w-full py-2'>AWB Code</div>
                        <div className='pl-2 border-r-2 pr-2 w-full py-2'>Category</div>
                        <div className='pl-2 border-r-2 pr-2 w-full py-2'>{"Credit (₹)"}</div>
                        <div className='pl-2 border-r-2 pr-2 w-full py-2'>{"Debit (₹)"}</div>
                        <div className='pl-2 border-r-2 pr-2 w-full py-2'>Description</div>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center bg-[#FFFFFF]'>
                        {/* Table Data */}
                        {data.length === 0 ? (
                            <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col'>
                                <img src={noData} alt="" width={'200px'} />
                                <div className='text-[1.7rem] mt-10 text-[#b54040] font-bold'>We could not find any data for the applied filters.</div>
                                <div className='text-[14px] mt-2 font-normal opacity-80'>Please change filters and retry.</div>
                            </div>
                        ) : (
                            currentItems.map((item, index) => (
                                <div className='flex flex-row w-full border border-collapse bg-[#FAFAFA]' key={index}>
                                    <div className='pl-2 border-r-2 pr-2 w-full py-2'>{getDate(item.date)}</div>
                                    <div className='pl-2 border-r-2 pr-2 w-full py-2'>{item.voucher_id ? item.voucher_id : '-'}</div>
                                    <div className='pl-2 border-r-2 pr-2 w-full py-2'>{Number.isInteger(Number(item.voucher_type)) ? item.voucher_type : 'N.A'}</div>
                                    <div className='pl-2 border-r-2 pr-2 w-full py-2'>N.A.</div>
                                    <div className='pl-2 border-r-2 pr-2 w-full py-2'>{item.credit ? '₹' + item.credit : '-'}</div>
                                    <div className='pl-2 border-r-2 pr-2 w-full py-2'>{item.debit ? '₹' + item.debit : '-'}</div>
                                    <div className='pl-2 border-r-2 pr-2 w-full py-2'>{item.remarks ?  item.remarks : '-'}</div>
                                </div>
                            ))
                        )}
                    </div>
                    <div>
                        <button className={`text-xl font-semibold mt-4 ml-4 p-2 border rounded text-white bg-[#159700] ${itemsPerPage === 10 ? 'cursor-not-allowed' : ''}`} onClick={() => {paginate(itemsPerPage - 10)}} disabled={itemsPerPage === 10}>
                        Previous
                        </button>

                    <button className={`text-xl font-semibold mt-4 ml-4 p-2 border rounded text-white bg-[#159700] ${currentItems.length < 10 ? 'cursor-not-allowed' : ''}`} onClick={() => {paginate(itemsPerPage + 10)}} disabled={currentItems.length < 10}>
                        Next
                        </button>
                    </div>
                </div>
            </BillingTabs>
        </PageWithSidebar>
    )
}

export default Passbook
