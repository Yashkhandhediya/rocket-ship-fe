import React, { useState } from 'react';
import { BACKEND_URL } from '../../../../../common/utils/env.config';
import { toast } from 'react-toastify';
import { woocommerce } from '../../../../../common/icons';
import apiClient from '../../../../../common/utils/apiClient';

const WooForm = () => {
  let response = '';
  const [checked, setChecked] = useState(false);
  const [storeName, setStoreName] = useState('');

  const handleToggle = () => {
    setChecked(!checked);
  };

  const [url, setUrl] = useState('');

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const redirectToWooAuth = async () => {
    apiClient
      .get(
        BACKEND_URL +
          `/woocommerce/generate_auth_url?store_url=${url}&user_id=${localStorage.getItem(
            'user_id',
          )}&shop_name=${storeName}`,
      )
      .then(async (resp) => {
        if (resp.status === 200) {
          response = resp.data.auth_url;
          console.log('REsponseeeeeeee', response);
          window.location.href = response;
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
        <img src={woocommerce} alt="My Image" />
      </div>
      <div className="mt-5 flex items-center text-left">
        <span className="ml-9 mr-3 text-[17px] font-semibold text-black">Custom App Integration</span>
      </div>
      <div className="mb-3 flex items-center text-left">
        <span className="ml-9 mr-3 text-[12px] text-black">
          Connect your Woo Commerce store with Cargo Cloud in one click custom app
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
        <div className="mb-5 mt-3 flex items-center justify-between">
          <label htmlFor="storenameInput" className="ml-8 mr-3 text-[14px] font-semibold text-black">
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
        <div className="mb-5 mt-3 flex items-center justify-between">
          <label htmlFor="nameInput" className="ml-8 mr-3 text-[14px] font-semibold text-black">
            WooCommerce Store Url
          </label>
          <input
            type="text"
            id="nameInput"
            placeholder="Enter Your Store URL: https://example.woocommerce.com"
            className="mr-2 h-9 w-[70%] rounded-lg md:w-[70%] lg:w-[70%] xl:w-[70%]"
            value={url}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="bg-white-100 relative ml-9 mr-9 mt-4 flex flex-col justify-start rounded-lg">
        <div className="mb-5 ml-3 mt-3 flex items-center">
          <button
            onClick={redirectToWooAuth}
            className="rounded-md bg-red-500 px-4 py-2 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Connect to WooCommerce
          </button>
        </div>
      </div>
    </div>
  );
};

export default WooForm;
