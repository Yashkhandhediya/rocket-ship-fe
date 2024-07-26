import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageWithSidebar from '../../../../common/components/page-with-sidebar/PageWithSidebar';
import { BillingTabs } from '../billing-tabs';
import { noData } from '../../../../common/images';
import { CustomTooltip, Loader } from '../../../../common/components';
import axios from 'axios';
import { BACKEND_URL } from '../../../../common/utils/env.config';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../../../common/utils/config';

const Passbook = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]); //eslint-disable-line
  const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().slice(0, 10);
  const todayDate = new Date().toISOString().slice(0, 10);
  const [fromDate, setFromDate] = useState(oneMonthAgo);
  const [toDate, setToDate] = useState(todayDate);
  const [isLoading, setIsLoading] = useState(false);
  const [usableAmount, setUsableAmount] = useState(0);
  const [holdAmount, setHoldAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(2);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();
  const [currentItems, setCurrentItems] = useState([]);
  const headers = {             
    'Content-Type': 'application/json',
    'Authorization': ACCESS_TOKEN};
  const id_user = sessionStorage.getItem('user_id');
  const id_company = sessionStorage.getItem('company_id');
  const is_company = sessionStorage.getItem('is_company');
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  console.log('Infooooooooooooooo', currentItems, itemsPerPage - 10, itemsPerPage);
  const paginate = (page_item) => {
    if (page_item > 0) {
      console.log('kdkl', page_item);
      setItemsPerPage(page_item);
    } else {
      setItemsPerPage(10);
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
  const totalBalance = parseInt(usableAmount) + parseInt(holdAmount);
  const charges = [
    {
      label: 'Current Usable Balance',
      value: '₹ ' + usableAmount,
    },
    {
      label: 'Balance On Hold',
      value: '₹ ' + holdAmount,
    },
    {
      label: 'Total Balance',
      value: '₹ ' + totalBalance,
    },
  ];

  const getPassbookData = async () => {
    console.log('PAGEEEEEEE NUM', currentPage);
    setIsLoading(true);
    const temp_id = is_company == 1 ? id_company : id_user;
    try {
      const response = await axios.post(
        `${BACKEND_URL}/account_transaction/account_report?page_number=1&page_size=${itemsPerPage}`,
        { date_from: fromDate, date_to: toDate, user_id: temp_id },{headers:headers}
      );
      setData(response.data.report);
      setHoldAmount(response.data.report[0].balance);
      let total = Math.ceil(response.data.report.length / 10);
      setTotalPage(total);
      setCurrentItems(response.data.report.slice(itemsPerPage - 10, itemsPerPage));
      getUsableAmount();
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        sessionStorage.clear()
        navigate('/login');
    } else {
      toast.error('Something went wrong while fetching passbook data');
      console.error('Error while fetching passbook data', error); //eslint-disable-line
      setIsLoading(false);
    }
    }
  };

  useEffect(() => {
    getPassbookData();
  }, []);

  useEffect(() => {
    setCurrentItems(data.slice(itemsPerPage - 10, itemsPerPage));
  }, [data, itemsPerPage]);

  const getDate = (date) => {
    console.log('Dateeeeeee', date);
    const [da, mon, y] = date.split('-');
    const d = new Date(y, mon - 1, da);
    console.log('fggggggggggg', d);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const getUsableAmount = () => {
    setIsLoading(true);
    let amount = 0;
    data.length !== 0 &&
      data.map((item) => {
        if (item.credit) {
          amount = amount + item.credit;
        } else if (item.debit) {
          amount = amount - item.debit;
        }
      }, 0);
    data.length !== 0 && setUsableAmount(amount > 0 ? amount.toFixed(2) : 0);

    setIsLoading(false);
    return amount.toFixed(2);
  };

  useEffect(() => {
    if (usableAmount === 0) {
      getUsableAmount();
    }
  });

  return (
    <PageWithSidebar>
      {isLoading && <Loader />}
      <BillingTabs>
        <div className="my-4 flex w-full flex-row justify-start px-6">
          <div className="ml-2 flex flex-row gap-2">
            {/*From date  */}
            <div>
              <div className="group relative">
                <input
                  type={'date'}
                  id="default-search"
                  className={`block w-[150px] rounded-[4px] border border-gray-300 border-opacity-90 bg-gray-50 px-5 py-1 text-[12px] text-[#757575] focus:border-red-500 focus:ring-red-500`}
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
                  className={`block w-[150px] rounded-[4px] border border-gray-300 border-opacity-90 bg-gray-50 px-5 py-1 text-[12px] text-[#757575] focus:border-red-500 focus:ring-red-500`}
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
                className={`border-1 hover:text-white}'}} h-[33px] w-[100px] rounded-[4px] border-[#B07828] bg-[#B07828] text-[12px] leading-[30px] text-white`}
                onClick={() => {
                  handleDateChange();
                }}>
                Apply
              </button>
            </div>
            {/* Select Year */}
            <div>
              <select
                name="timeline"
                id="timeline"
                className="w-48 rounded-sm border border-[#CFD4D6] py-1 text-[13px] font-normal text-[#000000c0] focus:border-[#66afe9] focus:ring-0">
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
              <input
                type="text"
                name="search_order"
                id="search_order"
                className="block w-[150px] rounded-l-[0.2rem] border border-[#CFD4D6] py-1 text-[12px] text-[#959595] focus:border-gray-300 focus:ring-0"
                placeholder="Search by AWB No."
                autoComplete={false}
              />
              <button className="border border-l-0 border-[#CFD4D6] bg-[#FAFAFA] px-2" disabled>
                <svg
                  className="dark:text-white h-4 w-4 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="my-4 flex w-full flex-row justify-evenly px-6">
          {charges.map((charge, index) => (
            <div
              key={index}
              className="mx-1 flex w-full flex-col justify-between bg-[#159700] py-1 text-center font-semibold text-white">
              <div className="flex flex-row items-center justify-center gap-3 text-[14px]">
                {charge.label}
              </div>
              <div className="text-[14px]">{charge.value}</div>
            </div>
          ))}
        </div>
        <div className="ml-4 border text-[14px] font-bold text-[#333333]" style={{ height: '600px' }}>
          <div className="flex w-full border-collapse flex-row border bg-[#FAFAFA]">
            <div className="w-full border-r-2 py-2 pl-2 pr-2">Date</div>
            <div className="w-full border-r-2 py-2 pl-2 pr-2">Order ID</div>
            <div className="w-full border-r-2 py-2 pl-2 pr-2">AWB Code</div>
            <div className="w-full border-r-2 py-2 pl-2 pr-2">Category</div>
            <div className="w-full border-r-2 py-2 pl-2 pr-2">{'Credit (₹)'}</div>
            <div className="w-full border-r-2 py-2 pl-2 pr-2">{'Debit (₹)'}</div>
            <div className="w-full border-r-2 py-2 pl-2 pr-2">Description</div>
          </div>
          <div className="flex w-full flex-col items-center justify-center bg-[#FFFFFF]">
            {/* Table Data */}
            {data.length === 0 ? (
              <div className="mb-12 flex w-full flex-col items-center justify-center pt-16">
                <img src={noData} alt="" width={'200px'} />
                <div className="mt-10 text-[1.7rem] font-bold text-[#b54040]">
                  We could not find any data for the applied filters.
                </div>
                <div className="mt-2 text-[14px] font-normal opacity-80">
                  Please change filters and retry.
                </div>
              </div>
            ) : (
              currentItems.map((item, index) => (
                <div className="flex w-full border-collapse flex-row border bg-[#FAFAFA]" key={index}>
                  <div className="w-full border-r-2 py-2 pl-2 pr-2">{getDate(item.date)}</div>
                  <div className="w-full border-r-2 py-2 pl-2 pr-2">
                    {item.voucher_id ? item.voucher_id : '-'}
                  </div>
                  <div className="w-full border-r-2 py-2 pl-2 pr-2">
                    {item.way_bill_no ? item.way_bill_no : 'N.A'}
                  </div>
                  <div className="w-full border-r-2 py-2 pl-2 pr-2">N.A.</div>
                  <div className="w-full border-r-2 py-2 pl-2 pr-2">
                    {item.credit ? '₹' + item.credit : '-'}
                  </div>
                  <div className="w-full border-r-2 py-2 pl-2 pr-2">
                    {item.debit ? '₹' + item.debit : '-'}
                  </div>
                  <div className="w-full border-r-2 py-2 pl-2 pr-2">{item.remarks ? item.remarks : '-'}</div>
                </div>
              ))
            )}
          </div>
          <div>
            <button
              className={`ml-4 mt-4 rounded border bg-[#159700] p-2 text-xl font-semibold text-white ${
                itemsPerPage === 10 ? 'cursor-not-allowed' : ''
              }`}
              onClick={() => {
                paginate(itemsPerPage - 10);
                if (pageNo > 1) {
                  setPageNo(pageNo - 1);
                }
              }}
              disabled={itemsPerPage === 10}>
              Previous
            </button>
            <span className="ml-2 rounded-md border-2 border-gray-300 p-2 text-base font-semibold">
              {pageNo}
            </span>
            <span className="ml-2 text-base font-semibold">Of</span>
            <span className="ml-2 rounded-md border-2 border-gray-300 p-2 text-base font-semibold">
              {totalPage}
            </span>
            <button
              className={`ml-4 mt-4 rounded border bg-[#159700] p-2 text-xl font-semibold text-white ${
                currentItems.length < 10 ? 'cursor-not-allowed' : ''
              }`}
              onClick={() => {
                paginate(itemsPerPage + 10);
                setPageNo(pageNo + 1);
              }}
              disabled={currentItems.length < 10}>
              Next
            </button>
          </div>
        </div>
      </BillingTabs>
    </PageWithSidebar>
  );
};

export default Passbook;
