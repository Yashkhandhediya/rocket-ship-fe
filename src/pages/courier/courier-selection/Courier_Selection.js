import React, { useState, useEffect } from 'react';
import PageWithSidebar from '../../../common/components/page-with-sidebar/PageWithSidebar';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../../common/utils/env.config';
import { FaSearch } from 'react-icons/fa';
import { CustomMultiSelect } from '../../../common/components';
import { modes, regions, sorts } from '../constants';
import { FiPhoneCall, FiUser, FiMapPin } from 'react-icons/fi';
import { FaUserTie } from 'react-icons/fa';
import { Bike } from '../../../common/icons';

function Courier_Selection() {
  const [activeTab, setActiveTab] = useState('All');
  const [mode, setMode] = useState('');
  const [region, setRegion] = useState('');
  const [sort, setSort] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const tabs = ['Activated', 'Deactivated', 'All'];

  const handleData = () => {
    axios
      .get(BACKEND_URL + `/userpartner/get_user_partner?user_id=${localStorage.getItem('user_id')}`)
      .then((res) => {
        console.log('Courier Data', res.data);
        setData(res.data);
        filterData(res.data, activeTab);
      })
      .catch((err) => {
        console.log('Error in Data', err);
        toast('Error In Fetching Data', { type: 'error' });
      });
  };

  const filterData = (data, tab) => {
    let filtered = data;
    if (tab === 'Activated') {
      filtered = data.filter((item) => item.status === 1);
    } else if (tab === 'Deactivated') {
      filtered = data.filter((item) => item.status === 0);
    }
    setFilteredData(filtered);
  };

  const handleFilter = () => {
    filterData(data, activeTab);
  };

  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [activeTab]);

  const handleActive = (id, status) => {
    const newStatus = status === 1 ? 0 : 1;
    axios
      .put(BACKEND_URL + `/userpartner/update_status?id=${id}&status=${newStatus}`)
      .then((res) => {
        console.log('Response Data', res.data);
        toast('Status Updated Successfully', { type: 'success' });
        handleData();
      })
      .catch((err) => {
        console.log('Error in Response', err);
        toast('Error In Updating Status', { type: 'error' });
      });
  };

  return (
    <PageWithSidebar>
      <div className="bg-gray-50">
        <h2 className="mb-4 ml-4 mt-2 text-xl">Settings - Courier Selection</h2>
      </div>
      <div className="ml-2 mr-2 border border-gray-300"></div>
      <div className="ml-2 mr-2 min-h-screen bg-gray-100 p-6">
        <div className="-mt-4 font-bold text-[#656565]">
          <Link to={'/settings'} className="font-semibold text-green-500">
            Settings
          </Link>{' '}
          &gt; Courier &gt; Courier Selection
        </div>

        <div className="rounded-sm bg-gray-100 p-3">
          <div className="flex">
            <div className="w-64">
              <div className="px-4 py-6">
                <ul className="space-y-2">
                  <li>
                    <Link to="/user-couriers" className="block px-4 py-2 font-medium">
                      Courier Priority
                    </Link>
                  </li>
                  <li className="bg-white">
                    <Link
                      to="/courier-selection"
                      className="block rounded-md px-4 py-2 font-medium text-gray-600 hover:bg-gray-100">
                      Courier Selection
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to="/courier-rule"
                      className="block rounded-md px-4 py-2 font-medium text-gray-600 hover:bg-gray-100">
                      Courier Rules
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      to="/courier-log"
                      className="block rounded-md px-4 py-2 font-medium text-gray-600 hover:bg-gray-100">
                      Courier Activity Logs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex w-[82%] flex-col">
              <div className="flex w-full gap-10 border-b">
                {tabs.map((tab) => (
                  <div
                    key={tab}
                    className={`cursor-pointer px-4 py-2 ${
                      activeTab === tab ? 'border-b-2 border-[#912517]' : 'border-b-2 border-transparent'
                    }`}
                    onClick={() => setActiveTab(tab)}>
                    {tab}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-row items-center justify-between rounded-md border-2 bg-white p-4">
                <div className="flex flex-col items-center">
                  <h1 className="text-center text-[35px] text-red-500">{filteredData.length}</h1>
                  <div className="ml-4 text-center text-sm">Activated Couriers of 5 Courier</div>
                </div>
                <div className="h-14 border-l-2 border-gray-100"></div>
                <div className="flex flex-col">
                  <h1 className="text-center text-[35px] text-red-500">29412</h1>
                  <div className="text-center text-sm">Pincode Serviceable</div>
                </div>
                <div className="h-14 border-l-2 border-gray-100"></div>
                <div className="flex flex-col">
                  <h1 className="text-center text-[35px] text-red-500">28855</h1>
                  <div className="text-center text-sm">Pincode Active For Pickup</div>
                </div>
                <div className="h-14 border-l-2 border-gray-100"></div>
                <div className="flex flex-col">
                  <h1 className="text-center text-[35px] text-red-500">6776</h1>
                  <div className="text-center text-sm">RTO Pincodes</div>
                </div>
                <div className="h-14 border-l-2 border-gray-100"></div>
                <div className="flex flex-col">
                  <h1 className="text-center text-[35px] text-red-500">913</h1>
                  <div className="mr-2 text-center text-sm">Out of Delivery Pincode</div>
                </div>
              </div>

              <div className="mt-3 flex w-full flex-row">
                <div className="relative w-[35%]">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name"
                    className="rounded-full border pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex w-full flex-row">
                  <h3 className="mt-4 text-xs font-semibold">Filter By:</h3>
                  <div className="ml-3 mr-3 w-[20%]">
                    <CustomMultiSelect
                      isMulti={false}
                      options={modes}
                      selected={mode}
                      closeMenuOnSelect={true}
                      placeholder={mode || 'Mode'}
                      hideSelectedOptions={false}
                      onChange={(value) => {
                        setMode(value);
                      }}
                    />
                  </div>

                  <div className="ml-3 mr-3 w-[20%]">
                    <CustomMultiSelect
                      isMulti={false}
                      options={regions}
                      selected={region}
                      closeMenuOnSelect={true}
                      placeholder={region || 'Region'}
                      hideSelectedOptions={false}
                      onChange={(value) => {
                        setRegion(value);
                      }}
                    />
                  </div>

                  <h3 className="ml-20 mt-4 text-xs font-semibold">Sort By:</h3>
                  <div className="ml-3 mr-3 w-[25%]">
                    <CustomMultiSelect
                      isMulti={false}
                      options={sorts}
                      selected={sort}
                      closeMenuOnSelect={true}
                      placeholder={sort || 'Activation Date'}
                      hideSelectedOptions={false}
                      onChange={(value) => {
                        setSort(value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-md border-2 bg-white p-2">
                {data.length > 0 &&
                  filteredData.map((item) => (
                    <div className="w-full p-4" key={item.id}>
                      <div className="mt-2 flex flex-row justify-between">
                        <div className="w-[10%] p-1">
                          <h3 className="font-semibold">{item.partner_name}</h3>
                        </div>

                        <div className="p-1">
                          <img src={Bike} alt="img" className="h-6 w-6" />
                        </div>

                        <div className="flex flex-col">
                          <div className="mb-2 flex items-center space-x-2">
                            <FiPhoneCall className="text-sm" />
                            <span className="text-xs">Call Before Delivery: Available</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <FaUserTie className="text-sm" />
                            <span className="text-xs">Delivery Boy Number: Available</span>
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <div className="mb-2 flex items-center space-x-2">
                            <FiUser className="text-sm" />
                            <span className="text-xs">POD: On Request</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FiMapPin className="text-sm" />
                            <span className="text-xs">Tracking Service: Real Time</span>
                          </div>
                        </div>

                        <div className="mt-1">
                          <button
                            className="rounded-full border-2 border-red-500 bg-white px-3 py-1 text-sm text-red-500"
                            onClick={() => handleActive(item.id, item.status)}>
                            {item.status === 0 ? 'Activate' : 'Deactivate'}
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 border border-gray-100"></div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default Courier_Selection;
