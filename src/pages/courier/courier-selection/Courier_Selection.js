import React, { useState, useEffect } from 'react';
import PageWithSidebar from '../../../common/components/page-with-sidebar/PageWithSidebar';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../../common/utils/env.config';
import { ACCESS_TOKEN } from '../../../common/utils/config';
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
  const headers = { 'Content-Type': 'application/json','Authorization': ACCESS_TOKEN };
  const tabs = ['Activated', 'Deactivated', 'All'];
  const navigate = useNavigate();

  const handleData = () => {
    axios
      .get(BACKEND_URL + `/userpartner/get_user_partner?user_id=${sessionStorage.getItem('user_id')}`,{headers:headers})
      .then((res) => {
        console.log('Courier Data', res.data);
        setData(res.data);
        filterData(res.data, activeTab);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          sessionStorage.clear()
          navigate('/login');
      } else {
          console.log('Error in Data', err);
          toast('Error In Fetching Data', { type: 'error' });
      }
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
      .put(BACKEND_URL + `/userpartner/update_status?id=${id}&status=${newStatus}`,{headers:headers})
      .then((res) => {
        console.log('Response Data', res.data);
        toast('Status Updated Successfully', { type: 'success' });
        handleData();
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          sessionStorage.clear()
          navigate('/login');
      } else {
          console.log('Error in Response', err);
          toast('Error In Updating Status', { type: 'error' });
      }
      });
  };

  return (
    <PageWithSidebar>
    <div className="bg-gray-50">
        <h2 className="text-xl mb-4 ml-4 mt-2">Settings - Courier Selection</h2>
    </div>
    <div className="border border-gray-300 ml-2 mr-2"></div>
      <div className="min-h-screen bg-gray-100 p-6 ml-2 mr-2">
      <div className="-mt-4 font-bold text-[#656565]">
          <Link to={'/settings'} className="font-semibold text-green-500">
            Settings
          </Link>{' '}
          &gt; Courier &gt; Courier Selection
        </div>
        
        <div className="bg-gray-100 p-3 rounded-sm">
          <div className="flex">
            <div className="w-64">
              <div className="px-4 py-6">
                <ul className="space-y-2">
                  <li>
                    <Link to="/user-couriers" className="px-4 py-2 block font-medium">
                      Courier Priority
                    </Link>
                  </li>
                  <li className="bg-white">
                    <Link to="/courier-selection" className="text-gray-600 hover:bg-gray-100 rounded-md px-4 py-2 block font-medium">
                      Courier Selection
                    </Link>
                  </li>
                  <li>
                    <Link to="/courier-rule" className="text-gray-600 hover:bg-gray-100 rounded-md px-4 py-2 block font-medium">
                      Courier Rules
                    </Link>
                  </li>
                  <li>
                    <Link to="/courier-log" className="text-gray-600 hover:bg-gray-100 rounded-md px-4 py-2 block font-medium">
                      Courier Activity Logs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-[82%] flex flex-col">
              <div className="flex w-full gap-10 border-b">
                {tabs.map((tab) => (
                  <div
                    key={tab}
                    className={`cursor-pointer px-4 py-2 ${activeTab === tab ? 'border-b-2 border-[#912517]' : 'border-b-2 border-transparent'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </div>
                ))}
              </div>

              <div className="bg-white p-4 mt-4 border-2 rounded-md flex flex-row justify-between items-center">
                <div className="flex flex-col items-center">
                  <h1 className="text-red-500 text-[35px] text-center">{filteredData.length}</h1>
                  <div className="ml-4 text-center text-sm">Activated Couriers of 75 Courier</div>
                </div>
                <div className="h-14 border-l-2 border-gray-100"></div>
                <div className="flex flex-col">
                  <h1 className="text-red-500 text-[35px] text-center">29412</h1>
                  <div className="text-center text-sm">Pincode Serviceable</div>
                </div>
                <div className="h-14 border-l-2 border-gray-100"></div>
                <div className="flex flex-col">
                  <h1 className="text-red-500 text-[35px] text-center">28855</h1>
                  <div className="text-center text-sm">Pincode Active For Pickup</div>
                </div>
                <div className="h-14 border-l-2 border-gray-100"></div>
                <div className="flex flex-col">
                  <h1 className="text-red-500 text-[35px] text-center">6776</h1>
                  <div className="text-center text-sm">RTO Pincodes</div>
                </div>
                <div className="h-14 border-l-2 border-gray-100"></div>
                <div className="flex flex-col">
                  <h1 className="text-red-500 text-[35px] text-center">913</h1>
                  <div className="text-center text-sm mr-2">Out of Delivery Pincode</div>
                </div>
              </div>

              <div className="w-full mt-3 flex flex-row">
                <div className="relative w-[35%]">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name"
                    className="pl-10 pr-3 border rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="w-full flex flex-row">
                  <h3 className="mt-4 font-semibold text-xs">Filter By:</h3>
                  <div className="w-[20%] ml-3 mr-3">
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

                  <div className="w-[20%] ml-3 mr-3">
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

                  <h3 className="ml-20 mt-4 font-semibold text-xs">Sort By:</h3>
                  <div className="w-[25%] ml-3 mr-3">
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

              <div className="bg-white border-2 rounded-md mt-3 p-2">
                {data.length > 0 &&
                  filteredData.map((item) => (
                    <div className="w-full p-4" key={item.id}>
                      <div className="mt-2 flex flex-row justify-between">
                        <div className="p-1 w-[10%]">
                          <h3 className="font-semibold">{item.partner_name}</h3>
                        </div>

                        <div className="p-1">
                          <img src={Bike} alt="img" className="w-6 h-6" />
                        </div>

                        <div className="flex flex-col">
                          <div className="flex items-center space-x-2 mb-2">
                            <FiPhoneCall className="text-sm" />
                            <span className="text-xs">Call Before Delivery: Available</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <FaUserTie className="text-sm" />
                            <span className="text-xs">Delivery Boy Number: Available</span>
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <div className="flex items-center space-x-2 mb-2">
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
                            className="border-2 border-red-500 rounded-full text-red-500 bg-white px-3 py-1 text-sm"
                            onClick={() => handleActive(item.id, item.status)}
                          >
                            {item.status === 0 ? 'Activate' : 'Deactivate'}
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 mt-2"></div>
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
