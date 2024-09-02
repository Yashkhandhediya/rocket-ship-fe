import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ReturnProcessDetail from './components/ReturnProcessDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { returnProcessDetails } from './constants';
import ReturnPolicySettings from './ReturnPolicySettings';
import SkuUpload from './components/sku';
import { BACKEND_URL } from '../../common/utils/env.config';

function ReturnSettings() {
  const [isApproveRequest, setIsApproveRequest] = useState(false);
  const [allowedValue, setAllowedValue] = useState('allowedCustomizeList');
  const [returnReasonsList, setReturnReasonsList] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [selectedreasonCheckboxes, setSelectedreasonCheckboxes] = useState({});
  const [autoAssign, setAutoAssign] = useState(false);
  const [maxDays, setMaxDays] = useState(0);
  const [id, setid] = useState('');

  const handleCheckboxChange = (id) => {
    setSelectedCheckboxes((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handlereasonCheckboxChange = (id) => {
    setSelectedreasonCheckboxes((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleSelectAllChange = () => {
    const isAllSelected = Object.values(selectedCheckboxes).every(Boolean);
    const newCheckboxesState = {};

    returnReasonsList.forEach((list) => {
      newCheckboxesState[list.id] = !isAllSelected;
    });

    setSelectedCheckboxes(newCheckboxesState);
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/returnpolicy/get_return_reason/`)
      .then((response) => response.json())
      .then((data) => {
        setReturnReasonsList(data);
      })
      .catch((error) => {
        console.error('Error fetching return reasons:', error);
      });
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/returnpolicy/get_return_policy?created_by=${localStorage.getItem('user_id')}`)
      .then((response) => response.json())
      .then((data) => {
        setAutoAssign(data.auto_assign === 1);
        setIsApproveRequest(data.auto_approve === 1);
        setAllowedValue(data.all_skus === 1 ? 'allProducts' : 'allowedCustomizeList');
        setMaxDays(data.max_days);
        setid(data.id);
        const initialSelectedCheckboxes = {};
        data.auto_approve_reason.forEach((reason) => {
          initialSelectedCheckboxes[reason.id] = true;
        });
        setSelectedCheckboxes(initialSelectedCheckboxes);

        const initialSelectedReasonCheckboxes = {};
        data.shown_returns_reasons.forEach((reason) => {
          initialSelectedReasonCheckboxes[reason.id] = true;
        });
        setSelectedreasonCheckboxes(initialSelectedReasonCheckboxes);
      })
      .catch((error) => {
        console.error('Error fetching return policy:', error);
      });
  }, []);

  const handleSave = () => {
    const payload = {
      id: id || null,
      all_skus: allowedValue === 'allProducts' ? 1 : 0,
      max_days: maxDays,
      auto_approve: isApproveRequest ? 1 : 0,
      auto_assign: autoAssign ? 1 : 0,
      created_by: localStorage.getItem('user_id'),
      shown_returns_reason: Object.keys(selectedreasonCheckboxes)
        .filter((key) => selectedreasonCheckboxes[key])
        .map(Number),
      auto_approve_reason: isApproveRequest
        ? Object.keys(selectedCheckboxes)
            .filter((key) => selectedCheckboxes[key])
            .map(Number)
        : [],
    };

    fetch(`${BACKEND_URL}/returnpolicy/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Save successful:', data);
      })
      .catch((error) => {
        console.error('Error saving return policy:', error);
      });
  };

  return (
    <ReturnPolicySettings>
      <div className="4/5 h-full w-full rounded-lg bg-white px-6 py-4 shadow">
        <p className="text-lg font-bold">Return Policy Settings</p>
        <p className="text-sm text-gray-500">How does the return process work?</p>
        <div className="flex flex-col gap-8 border-b px-4 py-8 ">
          <div className="flex gap-8">
            {returnProcessDetails &&
              returnProcessDetails?.map((details, index) => {
                return <ReturnProcessDetail key={index} {...details} />;
              })}
          </div>
          <p className="flex items-center rounded-lg bg-yellow-50 p-2 text-[12px] text-gray-500">
            <FontAwesomeIcon icon={faCircleExclamation} className="pr-2 text-xl text-yellow-300" />
            <strong>Note</strong>: Currently, Auto Refund, Auto Status Update and Auto Restock features are
            available for Shopify & Woocommerce Channel{' '}
            <Link className="px-1 font-semibold text-red-800">Click Here</Link> to explore more.
          </p>
        </div>
        <div className="py-8">
          <div className="mb-4 flex justify-between">
            <div>
              <p className="text-sm font-semibold">Define the return window for the products</p>
              <p className="text-[12px] text-gray-500">
                No. of days upto which the customer can place return request for the products
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                className="rounded-lg text-sm"
                value={maxDays}
                onChange={(e) => setMaxDays(Number(e.target.value))}>
                {[...Array(9)].map((_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <p className="text-sm">Days</p>
            </div>
          </div>
          <div className="mb-4 flex justify-between">
            <div>
              <p className="text-sm font-semibold">
                Auto approve return request{' '}
                <FontAwesomeIcon icon={faCircleExclamation} className="text-gray-400" />
              </p>
              <p className="text-[12px] text-gray-500">
                Enable auto acceptance of return requests from buyers for specific return reasons of your
                choice
              </p>
            </div>
            <div className=" flex items-center gap-2">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  value=""
                  checked={isApproveRequest}
                  onChange={() => setIsApproveRequest((prev) => !prev)}
                  className="peer sr-only"
                />
                <div className="dark:border-gray-600 peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
              </label>
            </div>
          </div>
          {isApproveRequest && (
            <div className="my-4 flex w-full flex-wrap rounded-lg bg-red-50 px-4 pt-4">
              {returnReasonsList &&
                returnReasonsList?.map((list, index) => {
                  return (
                    <div key={list.id} className="mb-5 flex w-1/4 gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCheckboxes[list.id] || false}
                        onChange={() => handleCheckboxChange(list.id)}
                      />
                      <div className="text-[12px]">
                        <p className="font-semibold">
                          {list.name.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                        </p>
                      </div>
                    </div>
                  );
                })}
              <div className="my-5 flex w-1/4 gap-2">
                <input
                  type="checkbox"
                  checked={
                    returnReasonsList?.length > 0 &&
                    Object.values(selectedCheckboxes).length === returnReasonsList.length &&
                    Object.values(selectedCheckboxes).every(Boolean)
                  }
                  onChange={handleSelectAllChange}
                />
                <div className="text-[12px]">
                  <p className="font-semibold">select all</p>
                </div>
              </div>
            </div>
          )}
          <div className="mb-4 flex justify-between">
            <div>
              <p className="text-sm font-semibold">
                Auto assign return request{' '}
                <FontAwesomeIcon icon={faCircleExclamation} className="text-gray-400" />
              </p>
              <p className="text-[12px] text-gray-500">
                Enable auto assignment of accepted return requests and return orders created by you for
                specific return reasons based on courier rules and priority settings
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  value=""
                  className="peer sr-only"
                  checked={autoAssign}
                  onChange={() => setAutoAssign(!autoAssign)}
                />
                <div className="dark:border-gray-600 peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
              </label>
            </div>
          </div>
          <div className="mb-4 flex justify-between">
            <div>
              <p className="text-sm font-semibold">Which Products are allowed to be returned?</p>
              <p className="text-[12px] text-gray-500">
                Select the SKUs of the products that are allowed to be returned
              </p>
              <div className="my-3">
                <div>
                  <input
                    type="radio"
                    id="allProducts"
                    value="allProducts"
                    checked={allowedValue === 'allProducts'}
                    onChange={() => setAllowedValue('allProducts')}
                    className="mr-3"
                    name="type"
                  />
                  <label
                    htmlFor="allProducts"
                    className="mb-2 inline-flex items-center text-xs font-medium text-gray-900">
                    All Products SKUs are allowed to be returned
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="customizeProducts"
                    value="allowedCustomizeList"
                    checked={allowedValue === 'allowedCustomizeList'}
                    onChange={() => setAllowedValue('allowedCustomizeList')}
                    className="mr-3"
                    name="type"
                  />
                  <label
                    htmlFor="customizeProducts"
                    className="mb-2 inline-flex items-center text-xs font-medium text-gray-900">
                    Customize the list for returnable products
                  </label>
                </div>
                {allowedValue === 'allowedCustomizeList' && <SkuUpload id={id} />}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div>
              <p className="text-sm font-semibold">List of reasons for return</p>
              <p className="text-[12px] text-gray-500">Select the reason that will be shown to your buyer</p>
            </div>
            <div className="my-4 flex w-full flex-wrap rounded-lg bg-red-50 px-4 pt-4">
              {returnReasonsList &&
                returnReasonsList?.map((list, index) => {
                  return (
                    <div key={list.id} className="mb-5 flex w-1/4 gap-2">
                      <input
                        type="checkbox"
                        checked={selectedreasonCheckboxes[list.id] || false}
                        onChange={() => handlereasonCheckboxChange(list.id)}
                      />
                      <div className="text-[12px]">
                        <p className="font-semibold">
                          {list.name.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                        </p>
                        <p className="text-gray-500">Image : {list.is_image ? 'Mandatory' : 'Optional'}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="my-8 flex w-full justify-center">
          <button
            onClick={handleSave}
            className="rounded-lg bg-orange-600 px-6 py-2 text-sm font-semibold text-white hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300">
            Save
          </button>
        </div>
      </div>
    </ReturnPolicySettings>
  );
}

export default ReturnSettings;
