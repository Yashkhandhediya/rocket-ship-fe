import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const FreezeTabs = ({ tabs, setData , setLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 10);
  const todayDate = new Date().toISOString().slice(0, 10);
  const [fromDate, setFromDate] = useState(oneMonthAgo);
  const [toDate, setToDate] = useState(todayDate);
  const [enableDate, setEnableDate] = useState(true);
  const [showToggleButton, setShowToggleButton] = useState(false);
  const [SRSuggested, setSRSuggested] = useState(true);

  const dataGet = (param_name, param_value) => { //eslint-disable-line
    //API to get data
    setLoading(true);
    axios.get('http://43.252.197.60:8050/weight_freeze/get_weight_freeze', {})
      .then((response) => {
        const filteredData = response.data.filter((item) => {
          if (item[param_name] == null) {
            item[param_name] = 0;
          }
          if (item[param_name] == param_value) {
            return item;
          }
        });
        setData(filteredData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  };

  //get freeze_status from url
  const freezeStatus = searchParams.get('freeze_status');
  const handleTabChange = (freezeStatus) => {
    setData([]);
    const currentSearchParams = new URLSearchParams(searchParams);
    // Update the desired parameter
    currentSearchParams.set('freeze_status', freezeStatus);
    // Update the search params
    setSearchParams(currentSearchParams);
    //filter the data on the basis of freeze_status
    dataGet('status_id', freezeStatus);
  };

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

  const handleSRSuggested = (ev) => {
    setSRSuggested(ev.target.checked);
    const currentSearchParams = new URLSearchParams(searchParams);
    if (!ev.target.checked) {
        const set = freezeStatus==1?'6':'7'
        currentSearchParams.set('freeze_status', set);
        setSearchParams(currentSearchParams);
    }
    if (ev.target.checked) {
        const set = freezeStatus==6?'1':'3'
        currentSearchParams.set('freeze_status', set);
        setSearchParams(currentSearchParams);
    }
  };

  useEffect(() => {
    if (freezeStatus == 5 || freezeStatus == 0) {
      setEnableDate(false);
    } else {
      setEnableDate(true);
    }
    if (freezeStatus == 1 || freezeStatus == 3 || freezeStatus == 6 || freezeStatus == 7) {
      setShowToggleButton(true);
    } else {
      setShowToggleButton(false);
    }
    handleTabChange(freezeStatus);
  }, [freezeStatus]);


  return (
    <>
      <div className="flex w-full flex-col items-center justify-between text-[#656565] lg:flex-row">
        {tabs.map((item) => {
          return (
            <div
              key={item.freezeStatus}
              className={`mb-2 flex w-full flex-row items-center justify-center gap-3 rounded-lg border px-4 py-4 text-[16px] font-[400] hover:cursor-pointer hover:bg-[#e1e1e122] lg:mb-0 lg:w-auto lg:rounded-none lg:border-0 lg:border-b-8 lg:px-6 lg:py-2 ${
                freezeStatus == item.freezeStatus
                  ? 'w-full border-b-8 border-[#7664e8] font-bold text-[#7664e8] lg:border-b-8'
                  : 'font-[400] lg:border-white'
              }`}
              onClick={() => handleTabChange(item.freezeStatus)}>
              <div className={``}>{item.title}</div>
              <div className="flex items-center justify-center rounded-[40px] border border-[#57B960] bg-[#EBF7E8] px-[10px] text-sm text-[#57B960]">
                0
              </div>
            </div>
          );
        })}
      </div>

      {/* hr */}
      <div className="flex w-full justify-center">
        <hr className="w-[98%] border-[#c2c2c2]" />
      </div>

      {/* filter section */}
      <div className="mt-4 flex flex-row gap-4">
        {/* Search */}
        <div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <svg
                className="dark:text-gray-400 h-3 w-3 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full rounded-lg border border-gray-300 bg-gray-50 px-10 py-1 ps-10 text-[12px] text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Name or SKU"
              required
            />
          </div>
        </div>
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
              className={`block w-[200px] rounded-lg border border-gray-300 bg-gray-50 px-10 py-1 ps-10 text-[12px] text-gray-900 focus:border-blue-500 focus:ring-blue-500 
              ${enableDate ? '' : 'cursor-not-allowed opacity-50'}`}
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
            className={`border-1 h-[33px] w-[100px] rounded-[4px] border-[#7664e8] bg-[#7664e8] text-[12px] leading-[30px] text-white hover:bg-[#7664e8] hover:text-white ${
              enableDate
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
        {/* SR suggested */}
        {showToggleButton && (
          <div>
            <div className="relative flex items-center gap-3">
              <span className="dark:text-gray-300 ms-3 text-[16px] text-gray-900">SR Suggested</span>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  value=""
                  className="peer sr-only"
                  checked={SRSuggested}
                  onChange={(ev) => {
                    handleSRSuggested(ev);
                  }}
                />
                <div className="peer h-6 w-11 rounded-full bg-blue-600 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gray-200 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FreezeTabs;
