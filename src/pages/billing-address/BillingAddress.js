import React from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { Link } from 'react-router-dom';

function BillingAddress() {
  return (
    <PageWithSidebar>
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
                value=""
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
                value=""
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
                value=""
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
                value=""
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
                value=""
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
                value=""
              />
            </div>
            <button
              className="rounded-sm bg-red-800 px-3 py-1 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
              onClick={() => {
                console.log('Add');
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
