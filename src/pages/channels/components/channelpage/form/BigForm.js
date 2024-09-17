import React, { useState } from 'react';
import { BACKEND_URL } from '../../../../../common/utils/env.config';
import { toast } from 'react-toastify';
import { bigcommerce } from '../../../../../common/icons';
import apiClient from '../../../../../common/utils/apiClient';

const BigForm = () => {
  let response = '';
  const [checked, setChecked] = useState(false);
  const [storeName, setStoreName] = useState('');

  const handleToggle = () => {
    setChecked(!checked);
  };

  const [hashCode, setHashCode] = useState('');
  const [authToken, setAuthToken] = useState('');

  const handleChange = (event) => {
    setHashCode(event.target.value);
  };

  const redirectToBigAuth = async () => {
    apiClient
      .post(
        BACKEND_URL +
          `/bigcommerce/create-webhook?HASH_CODE=${hashCode}&AUTH_TOKEN=${authToken}&user_id=${localStorage.getItem(
            'user_id',
          )}&shop_name=${storeName}`,
      )

      .then(async (resp) => {
        if (resp.status === 200) {
          console.log('REsponseeeeeeee', resp);
          toast('Store Connect Successfully', { type: 'success' });
        } else {
          toast('Enter valid url', { type: 'error' });
        }
      })
      .catch(() => {
        toast('There is some error', { type: 'error' });
      });
  };

  return (
    <div className="bg-white-100 relative  flex w-[68%] flex-col justify-start rounded-lg  bg-white">
      <div className="ml-5 mt-5 flex w-[10rem] items-center justify-center rounded-full border-0">
        <img src={bigcommerce} alt="My Image" />
      </div>
      <div className="mt-5 flex items-center text-left">
        <span className="ml-9 mr-3 text-[17px] font-semibold text-black">Custom App Integration</span>
      </div>
      <div className="mb-3 flex items-center text-left">
        <span className="ml-9 mr-3 text-[12px] text-black">
          Connect your Big Commerce store with Cargo Cloud in one click custom app
        </span>
      </div>
      <div className="bg-white-100 relative ml-9 mr-9 mt-4 flex flex-col justify-start rounded-lg border-2">
        <div className="mt-5 flex items-center text-left">
          <span className="ml-9 mr-3 text-[17px] font-semibold text-black">Seller Panel</span>
        </div>
        <div className="mb-3 flex items-center text-left">
          <span className="ml-9 mr-3 text-[12px] text-black">
            Please provide below given credentials for your store :
          </span>
        </div>
        <div className="mb-5 mt-3 flex flex-col justify-between">
          <div className="mt-4 flex flex-row">
            <label htmlFor="storenameInput" className="ml-8 mr-3 mt-2 text-[14px] font-semibold text-black">
              Store Name
            </label>
            <input
              type="text"
              id="storenameInput"
              placeholder="Enter Your Store Name"
              className="mr-2 h-9 w-[70%] rounded-lg md:w-[70%] lg:w-[70%] xl:w-[70%]"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>
          <div className="mt-4 flex flex-row">
            <label className="ml-8 mr-4 mt-2 text-[14px] font-semibold text-black">Hash Code</label>
            <input
              type="text"
              placeholder="Enter Hash Code"
              className="mr-2 h-9 w-[70%] rounded-lg md:w-[70%] lg:w-[70%] xl:w-[70%]"
              value={hashCode}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4 flex flex-row">
            <label className="ml-8 mr-4 mt-2 text-[14px] font-semibold text-black">Auth Token</label>
            <input
              type="text"
              placeholder="Enter Auth Token"
              className="mr-2 h-9 w-[70%] rounded-lg md:w-[70%] lg:w-[70%] xl:w-[70%]"
              value={authToken}
              onChange={(e) => setAuthToken(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="bg-white-100 relative ml-9 mr-9 mt-4 flex flex-col justify-start rounded-lg">
        <div className="mb-5 ml-3 mt-3 flex items-center">
          <button
            onClick={redirectToBigAuth}
            className="rounded-md bg-red-500 px-4 py-2 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Connect to BigCommerce
          </button>
        </div>
      </div>
    </div>
  );
};

export default BigForm;
