import React from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { Link, NavLink } from 'react-router-dom';
import ReturnProcessDetail from './components/ReturnProcessDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { returnProcessDetails } from './constants';
import { returnReasonsList } from './constants';

function ReturnSettings() {
  return (
    <PageWithSidebar>
      <div className="px-4 pt-8">
        <p className="text-xl font-bold">Return & Refunds</p>
        <p className="text-sm font-medium">Set up Returns & Refunds policy as per your preference</p>
        <Link className="py-3 text-[12px] font-semibold text-red-800">FAQs</Link>
        <div className="my-8 flex gap-2">
          <div className="flex h-24 w-1/5 flex-col gap-2 rounded-lg bg-white px-2 py-4 text-[12px] shadow">
            <NavLink to={`/return-settings`} className="px-2">
              Return Policy Settings
            </NavLink>
            <NavLink to={`/`} className="px-2">
              Refund Settings
            </NavLink>
          </div>
          <div className="4/5 h-full w-full rounded-lg bg-white px-6 py-4 shadow">
            <p className="text-lg font-bold">Return Policy Settings</p>
            <p className="text-sm text-gray-500">How does the return process work?</p>
            <div className="flex flex-col gap-8 border-b px-4 py-8 ">
              <div className="flex gap-8">
                {returnProcessDetails &&
                  returnProcessDetails.map((details, index) => {
                    return <ReturnProcessDetail key={index} {...details} />;
                  })}
              </div>
              <p className="flex items-center rounded-lg bg-yellow-50 p-2 text-[12px] text-gray-500">
                <FontAwesomeIcon icon={faCircleExclamation} className="pr-2 text-xl text-yellow-300" />
                <strong>Note</strong>: Currently, Auto Refund, Auto Status Update and Auto Restock features
                are available for Shopify & Woocommerce Channel{' '}
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
                  <select className="rounded-lg text-sm">
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
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
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="dark:border-gray-600 peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
                  </label>
                </div>
              </div>
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
                    <input type="checkbox" value="" className="peer sr-only" />
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
                      <input type="radio" id="allProducts" className="mr-3" value="ftl" name="type" />
                      <label
                        htmlFor="allProducts"
                        className="mb-2 inline-flex items-center text-xs font-medium text-gray-900">
                        All Products SKUs are allowed to be return
                      </label>
                    </div>
                    <div>
                      <input type="radio" id="customizeProducts" className="mr-3" value="ftl" name="type" />
                      <label
                        htmlFor="customizeProducts"
                        className="mb-2 inline-flex items-center text-xs font-medium text-gray-900">
                        All Products SKUs are allowed to be return
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div>
                  <p className="text-sm font-semibold">List of reasons for return</p>
                  <p className="text-[12px] text-gray-500">
                    Select the reason that will be shown to your buyer
                  </p>
                </div>
                <div className="my-4 flex w-full flex-wrap rounded-lg bg-red-50 px-4 pt-4">
                  {returnReasonsList &&
                    returnReasonsList.map((list, index) => {
                      return (
                        <div key={index} className="mb-5 flex w-1/4 gap-2">
                          <input type="checkbox" />
                          <div className="text-[12px]">
                            <p className="font-semibold">{list.title}</p>
                            <p className="text-gray-500">
                              Image : {list.isMandatory ? 'Mandatory' : 'Optional'}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default ReturnSettings;
