import React, { useEffect, useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { Loader } from '../../common/components';
import apiClient from '../../common/utils/apiClient';

function BillingAddress() {
  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');
  const user_id = is_company == 1 ? id_company : id_user;
  const [addressLine2, setAddressLine2] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addressInfo, setAddressInfo] = useState({
    type_id: 3,
    contact_no: '',
    complete_address: '',
    pincode: '',
    city: '',
    state: '',
  });

  let complete_address = 'd-303 SIDDHARTH FLAT NEAR META SWEET ,VASNA';
  function getAddress1and2(address) {
    const [address1, address2] = address.split(',');
    return { address1, address2 };
  }

  getAddress1and2(complete_address);
  console.log(addressInfo);

  const requiredFieldErrors = () => {
    const newErrors = {};

    if (!addressInfo.complete_address) newErrors.complete_address = 'Address Line 1 is Required';
    if (!addressInfo.city) newErrors.city = 'city is Required';
    if (!addressInfo.state) newErrors.state = 'state is Required';
    if (!addressInfo.contact_no) newErrors.contact_no = 'contact no. is Required';
    if (!addressInfo.pincode) newErrors.pincode = 'pincode is Required';
    if (!addressLine2) newErrors.addressLine2 = 'Address Line 2 is Required';
    return newErrors;
  };

  const getAddress = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`${BACKEND_URL}/address/?user_id=${user_id}`);
      const data = response.data.filter((data) => data.type_id === 3)[response.data.length - 1];
      setAddressInfo({
        type_id: 3,
        contact_no: data.contact_no,
        complete_address: getAddress1and2(data.complete_address).address1,
        pincode: data.pincode,
        city: data.city,
        state: data.state,
      });

      setAddressLine2(getAddress1and2(data.complete_address).address2);
    } catch (err) {
      console.log(err);
      toast('There is Error while saving address ', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAddress = async () => {
    const requiredError = requiredFieldErrors();
    if (Object.keys(requiredError).length > 0) {
      setError(requiredError);
      return;
    }
    setLoading(true);
    try {
      const response = await apiClient.post(`${BACKEND_URL}/address/?created_by=${user_id}`, {
        ...addressInfo,
        complete_address: `${addressInfo.complete_address},${addressLine2}`,
      });
      toast('Address Saved Successfully', { type: 'success' });
    } catch (err) {
      console.log(err);
      toast('There is Error while saving address ', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

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
              {error && <p className="w-1/2 text-xs text-red-500">{error?.complete_address}</p>}
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
              {error && <p className="w-1/2 text-xs text-red-500">{error?.addressLine2}</p>}
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
              {error && <p className="w-1/2 text-xs text-red-500">{error?.pincode}</p>}
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
              {error && <p className="w-1/2 text-xs text-red-500">{error?.city}</p>}
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
              {error && <p className="w-1/2 text-xs text-red-500">{error?.state}</p>}
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
              {error && <p className="w-1/2 text-xs text-red-500">{error?.contact_no}</p>}
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
