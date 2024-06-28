import React, { useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { Loader } from '../../common/components';

function BillingAddress() {
  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');

  const user_id = is_company == 1 ? id_company : id_user;
  const [addressLine2, setAddressLine2] = useState('');
  const [addressInfo, setAddressInfo] = useState({
    type_id: 3,
    contact_no: '',
    complete_address: '',
    pincode: '',
    city: '',
    state: '',
  });
  const [loading, setLoading] = useState(false);

  console.log(addressInfo);

  const handleSaveAddress = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/address/?created_by=${user_id}`, {
        ...addressInfo,
        complete_address: `${addressInfo.complete_address},${addressLine2}`,
      });
      setAddressInfo({
        type_id: 3,
        contact_no: '',
        complete_address: '',
        pincode: '',
        city: '',
        state: '',
      });
      setAddressLine2('');
      toast('Address Saved Successfully', { type: 'success' });
    } catch (err) {
      console.log(err);
      toast('There is Error while saving address ', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWithSidebar>
      {loading && <Loader />}
      <div className="ml-4">
        <p className="bg-red-100 px-3 py-1 text-xl">Settings - Billing Address</p>
        <div className="h-screen bg-zinc-200 px-3">
          <p className="py-2 font-semibold">
            <Link to={`/settings`} className="text-red-800">
              Settings
            </Link>
            {` > Billing > Billing Address`}
          </p>
          <div className="my-2 bg-white p-6 text-gray-600">
            <p className="pb-2 text-xl font-bold">Billing Address</p>
            <div className="mb-4 w-[50%] ">
              <label htmlFor="addressLine1" className="block text-[12px] font-semibold">
                Address Line 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="addressLine1"
                placeholder="Enter the Location"
                className="mt-1 block w-full rounded-sm border border-gray-200 px-2.5 py-1 text-[12px] shadow-sm focus:border-blue-50 focus:outline-none"
                value={addressInfo.complete_address}
                onChange={(e) => setAddressInfo({ ...addressInfo, complete_address: e.target.value })}
              />
            </div>

            <div className="mb-4 w-[50%] ">
              <label htmlFor="addressLine2" className="block text-[12px] font-medium">
                Address Line 2 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="addressLine2"
                className="mt-1 block w-full rounded-sm border border-gray-200 px-2.5 py-1 text-[12px] shadow-sm focus:border-blue-50 focus:outline-none"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>
            <div className="mb-4 w-[50%] ">
              <label htmlFor="pincode" className="block text-[12px] font-medium ">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="pincode"
                className="mt-1 block w-full rounded-sm border border-gray-200 px-2.5 py-1 text-[12px] shadow-sm focus:border-blue-50 focus:outline-none"
                value={addressInfo.pincode}
                onChange={(e) => setAddressInfo({ ...addressInfo, pincode: e.target.value })}
              />
            </div>
            <div className="mb-4 w-[50%] ">
              <label htmlFor="city" className="block text-[12px] font-medium ">
                city <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                className="mt-1 block w-full rounded-sm border border-gray-200 px-2.5 py-1 text-[12px] shadow-sm focus:border-blue-50 focus:outline-none"
                value={addressInfo.city}
                onChange={(e) => setAddressInfo({ ...addressInfo, city: e.target.value })}
              />
            </div>
            <div className="mb-4 w-[50%] ">
              <label htmlFor="state" className="block text-[12px] font-medium ">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="state"
                className="mt-1 block w-full rounded-sm border border-gray-200 px-2.5 py-1 text-[12px] shadow-sm focus:border-blue-50 focus:outline-none"
                value={addressInfo.state}
                onChange={(e) => setAddressInfo({ ...addressInfo, state: e.target.value })}
              />
            </div>

            <div className="mb-4 w-[50%]">
              <label htmlFor="phone" className="block text-[12px] font-medium">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="phone"
                className="mt-1 block w-full  rounded-sm border border-gray-300 px-2.5 py-1 text-[12px] shadow-sm focus:border-blue-50 focus:outline-none"
                value={addressInfo.contact_no}
                onChange={(e) => setAddressInfo({ ...addressInfo, contact_no: e.target.value })}
              />
            </div>
            <button
              className="rounded-sm bg-red-800 px-3 py-1 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
              onClick={() => {
                handleSaveAddress();
              }}>
              Save
            </button>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default BillingAddress;
