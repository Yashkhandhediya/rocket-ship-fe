import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs } from '../../common/components/tabs';
import { returnsTabs } from './duck';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllReturns, setAllWeightDiscrepancies } from '../../redux';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Loader from '../../common/loader/Loader';
import { BACKEND_URL } from '../../common/utils/env.config';
import { DiscrepancyTable } from './components'


const WeightDiscrepancy = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [enableDate, setEnableDate] = useState(true);
  const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 10);
  const todayDate = new Date().toISOString().slice(0, 10);
  const [fromDate, setFromDate] = useState(oneMonthAgo);
  const [toDate, setToDate] = useState(todayDate);

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allWeightDiscrepanciesList = useSelector((state) => state?.weightDiscrepanciesList);

  const fetchWeightDiscrepancies = () => {
    axios
      .get(BACKEND_URL + '/weight_discrepancy/get_weight_discrepancy')
      .then(async (resp) => {
        if (resp.status === 200) {
          dispatch(setAllWeightDiscrepancies(resp?.data || []));
          setIsLoading(false);
        } else {
          toast('There is some error while fetching weight discrepancies.', { type: 'error' });
          setIsLoading(false);
        }
      })
      .catch(() => {
        toast('There is some error while fetching weight discrepancies.', { type: 'error' });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!allWeightDiscrepanciesList) {
      fetchWeightDiscrepancies();
    } else {
      setIsLoading(false);
    }
  }, [allWeightDiscrepanciesList]);

  const checkDate = (fromDate, toDate) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    return from < to;
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
      {isLoading && <Loader />}
      <div>
        <div className="header-wrapper">
          <div className='flex justify-between p-5 pr-3 ml-2 border-b border-slate-400'>
            <div className="type-header mt-sm">
              <h1 className='text-xl font-bold'>
                Weight Discrepancies
              </h1>
              <p className="type-header-2" style={{ marginBottom: '0' }}>Take action on your pending weight discrepancies, track weight disputes, and view history.</p>
            </div>
            <div className='flex items-center'>
              <div className="flex items-center gap-2 rounded bg-blue-300 px-8 border border-blue-400">
                <span>Learn More in 2 Minutes</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                  viewBox="0 0 64 64"
                  width="10"
                  height="10"
                >
                  <path
                    fill="none"
                    stroke="#010101"
                    strokeMiterlimit="10"
                    strokeWidth="10"
                    d="M62.56 32l-28-28 28 28-28 28"
                  ></path>
                  <path
                    fill="none"
                    stroke="#010101"
                    strokeMiterlimit="10"
                    strokeWidth="10"
                    d="M1.44 32L62.56 32"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className='stats flex flex-wrap justify-between gap-5 py-2 px-4'>
          <div className='flex flex-col gap-2 border border-rose-700 bg-pink-50 flex-1 basis-full md:basis-2/5 xl:basis-1/5 rounded-xl p-4'>
            <div className='text-sm'>Total Weight Discrepancies</div>
            <div className='flex justify-between items-end'>
              <strong className='text-2xl'>{allWeightDiscrepanciesList?.length}</strong>
              <div className='text-gray-500 text-sm align-baseline'>Last 30 Days</div>
            </div>
          </div>
          <div className='flex flex-col gap-2 border border-rose-700 bg-pink-50 flex-1 basis-full md:basis-2/5 xl:basis-1/5 rounded-xl p-4'>
            <div className='text-sm'>Discrepancies Accepted</div>
            <div className='flex justify-between items-end'>
              <strong className='text-2xl'>0</strong>
              <div className='text-gray-500 text-sm align-baseline'>Last 30 Days</div>
            </div>
          </div>
          <div className='flex flex-col gap-2 border border-rose-700 bg-pink-50 flex-1 basis-full md:basis-2/5 xl:basis-1/5 rounded-xl p-4'>
            <div className='text-sm'>Disputes Accepted by Courier</div>
            <div className='flex justify-between items-end'>
              <strong className='text-2xl'>0</strong>
              <div className='text-gray-500 text-sm align-baseline'>Last 30 Days</div>
            </div>
          </div>
          <div className='flex flex-col gap-2 border border-rose-700 bg-pink-50 flex-1 basis-full md:basis-2/5 xl:basis-1/5 rounded-xl p-4'>
            <div className='text-sm'>Disputes Rejected by Courier</div>
            <div className='flex justify-between items-end'>
              <strong className='text-2xl'>0</strong>
              <div className='text-gray-500 text-sm align-baseline'>Last 30 Days</div>
            </div>
          </div>
        </div>

        <div className='flex justify-between px-5 py-2 ml-2 border-b'>
          <div className='flex flex-wrap items-center gap-3'>
            <div className='order-input px-3 py-1 flex items-center gap-1 rounded-md border overflow-hidden'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                x="0"
                y="0"
                viewBox="0 0 256 256"
              >
                <path
                  fillOpacity="0.4"
                  strokeMiterlimit="10"
                  d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.947 9.947 0 006.322-2.264l5.971 5.971a1 1 0 101.414-1.414l-5.97-5.97A9.947 9.947 0 0023 13c0-5.511-4.489-10-10-10zm0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8z"
                  fontFamily="none"
                  fontSize="none"
                  fontWeight="none"
                  textAnchor="none"
                  transform="scale(8.53333)"
                ></path>
              </svg>
              <input name='order-id' placeholder='Order Id or AWB No.' title='Enter to search' style={{ border: 'none', outline: 'none', width: '130px',fontSize:'13px' }} />
            </div>
            <div className='flex-wrap flexorder-input flex gap-1 border'>
              {/* From Date */}
              <div>
                <div className="group relative">
                  {!enableDate && (
                    <div
                      className="absolute bottom-full left-1/2 mb-2 hidden w-full -translate-x-1/2 transform rounded-md bg-black p-2 text-center text-sm text-white group-hover:block"
                      style={{ fontSize: '12px' }}>
                      Select any status other than “Action Required” or “Not requested” to filter by date
                      <div className="absolute left-[40%] z-[10000000] mt-2 h-2 w-2 border-8 border-b-0 border-black border-l-transparent border-r-transparent"></div>
                    </div>
                  )}
                  <input
                    type={`${enableDate ? 'date' : 'text'}`}
                    id="default-search"
                    className={`block w-[200px] rounded-lg border border-gray-300 bg-gray-50 px-10 py-1 ps-10 text-[12px] text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${enableDate ? '' : 'cursor-not-allowed opacity-50'}`}
                    required
                    onChange={(ev) => {
                      setFromDate(ev.target.value);
                    }}
                    value={enableDate ? fromDate : 'N/A'}
                    disabled={!enableDate}
                  />
                </div>
              </div>
              {/* To date */}
              <div>
                <div className="group relative">
                  {!enableDate && (
                    <div
                      className="absolute bottom-full left-1/2 mb-2 hidden w-full -translate-x-1/2 transform rounded-md bg-black p-2 text-center text-sm text-white group-hover:block"
                      style={{ fontSize: '12px' }}>
                      Select any status other than “Action Required” or “Not requested” to filter by date
                      <div className="absolute left-[40%] z-[10000000] mt-2 h-2 w-2 border-8 border-b-0 border-black border-l-transparent border-r-transparent"></div>
                    </div>
                  )}
                  <input
                    type={`${enableDate ? 'date' : 'text'}`}
                    id="default-search"
                    className={`dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-[200px] rounded-lg border border-gray-300 bg-gray-50 px-10 py-1 ps-10 text-[12px] text-gray-900 focus:border-blue-500 focus:ring-blue-500 
              ${enableDate ? '' : 'opacity-50'}`}
                    placeholder="Channel"
                    required
                    onChange={(ev) => {
                      setToDate(ev.target.value);
                    }}
                    value={enableDate ? toDate : 'N/A'}
                    disabled={!enableDate}
                  />
                </div>
              </div>
              {/* Apply Button */}
              <div>
                {/* Apply button for dates */}
                <button
                  className={`border-1 h-[33px] w-[100px] rounded-[4px] border-[#7664e8] bg-[#7664e8] text-[12px] leading-[30px] text-white hover:bg-[#7664e8] hover:text-white ${enableDate
                    ? ''
                    : 'cursor-not-allowed border-[#e1e1e1] bg-[#e1e1e1] hover:bg-[#e1e1e1] hover:text-black'
                    }'}}`}
                  onClick={() => {
                    handleDateChange();
                  }}
                  disabled={!enableDate}>
                  Apply
                </button>
              </div>
              {/* <span>value</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" x="0" y="0" viewBox="0 0 256 256">
                <path
                  fillOpacity="1"
                  strokeMiterlimit="10"
                  d="M192 1664h288v-288H192v288zm352 0h320v-288H544v288zm-352-352h288V992H192v320zm352 0h320V992H544v320zM192 928h288V640H192v288zm736 736h320v-288H928v288zM544 928h320V640H544v288zm768 736h288v-288h-288v288zm-384-352h320V992H928v320zM576 448V160q0-13-9.5-22.5T544 128h-64q-13 0-22.5 9.5T448 160v288q0 13 9.5 22.5T480 480h64q13 0 22.5-9.5T576 448zm736 864h288V992h-288v320zM928 928h320V640H928v288zm384 0h288V640h-288v288zm32-480V160q0-13-9.5-22.5T1312 128h-64q-13 0-22.5 9.5T1216 160v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm384-64v1280q0 52-38 90t-90 38H192q-52 0-90-38t-38-90V384q0-52 38-90t90-38h128v-96q0-66 47-113T480 0h64q66 0 113 47t47 113v96h384v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h128q52 0 90 38t38 90z"
                ></path>
              </svg> */}
            </div>
            {/* <div className='order-input flex gap-1 py-1 px-2 rounded-md border overflow-hidden'> */}
            <select name='date-range' className='outline-none border-0 rounded-md h-8 text-sm'>
              <option value='all-statuses' className=''>All Statuses</option>
              <option value='new' className=''>New Discrepancy</option>
              <option value='auto-accepted-discrepancy' className=''>Auto Accepted Discrepancy</option>
              <option value='discrepancy-accepted' className=''>Discrepancy Accepted</option>
              <option value='dispute-raise' className=''>Dispute Raise</option>
              <option value='dispute-accepted-by-courier' className=''>Dispute Accepted by Courier</option>
              <option value='dispute-rejected-by-courier' className=''>Dispute Rejected by Courier</option>
              <option value='sr-credit' className=''>SR Credit</option>
              <option value='escalation-raise' className=''>Escalation Raise</option>
              <option value='escalation in-progress' className=''>Escalation In Progress</option>
              <option value='escalation-resolved' className=''>Escalation Resolved</option>
              <option value='escalation-closed' className=''>Escalation Closed</option>
            </select>
            {/* </div> */}
          </div>
          <div className='flex gap-2 items-center'>
            <button className='py-1 px-2 bg-gray-700' title='export'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" x="0" y="0" viewBox="0 0 50 50" id="download">
                <path d="m24 32.5 8-8h-6v-18h-4v18h-6l8 8zm18-26H30v3.97h12v28.06H6V10.47h12V6.5H6c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h36c2.21 0 4-1.79 4-4v-28c0-2.21-1.79-4-4-4z" fill='white'></path>
              </svg>
            </button>
            <div className='cursor-not-allowed py-0.1 px-8 text-gray-400 border border-grey-400 rounded-md bg-gray-200 text-center'>Accept All</div>
          </div>
        </div>

        
      </div>
      <div>
        <DiscrepancyTable data={allWeightDiscrepanciesList} setLoading={setIsLoading} />
      </div>
    </PageWithSidebar>
  );
};

export default WeightDiscrepancy;
