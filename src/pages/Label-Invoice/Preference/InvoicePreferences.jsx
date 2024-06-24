import React, { useState } from 'react';
import PageWithSidebar from '../../../common/components/page-with-sidebar/PageWithSidebar';
import { Link } from 'react-router-dom';

const InvoicePreferences = () => {
  const [show, setShow] = useState(false);

  return (
    <PageWithSidebar>
      {!show && (
        <div className="header mx-2 border-b border-[#b3b3b3] bg-[#FAFBFC] p-2 text-xl">
          Settings- Invoice Preferences
        </div>
      )}
      {!show && (
        <div className="mx-2 w-full bg-[#EDEDED] px-6 pb-16">
          <div className="pb-5 pt-2 font-bold text-[#656565]">
            <Link to={'/settings'} className="font-semibold text-green-500">
              Settings
            </Link>{' '}
            &gt; Label, Invoice & POD &gt; Invoice Preferences
          </div>
          <div className="flex flex-col gap-3 bg-white p-4">
            <div className="pt-6 text-lg font-bold text-[#656565]">Accounting Details</div>
            <div className="flex min-h-72 w-full flex-col flex-wrap gap-5 gap-x-7 border px-3 py-5 text-[12px] font-bold text-[#666666]">
              <div className="flex w-full flex-wrap gap-5">
                <label htmlFor="" className="flex w-[45%] flex-col gap-1">
                  <h1>CIN No.</h1>
                  <input className="h-8 w-[100%] border-gray-500 font-light text-black" type="text" />
                </label>
                <label htmlFor="" className="flex w-[45%] flex-col gap-1">
                  <h1>
                    Invoice Type{' '}
                    <span>(*The fixed standard size for international shipments will be A4 size only.)</span>
                  </h1>
                  <select className="h-8 w-[100%] border-gray-500 p-2 text-xs" name="" id="">
                    <option value="">Classic A4 Size</option>
                    <option value="">Thermal 6 x 4 Size</option>
                  </select>
                </label>
                <label htmlFor="" className="flex w-[45%] flex-col gap-1">
                  <h1>
                    Invoice Prefix <span className="text-red-600">*</span>
                  </h1>
                  <input
                    required
                    className="h-8 w-[100%] border-gray-500 font-normal text-black"
                    value="Retail"
                    type="text"
                  />
                </label>
                <label htmlFor="" className="flex w-[45%] flex-col gap-1">
                  <h1>
                    Invoice Suffix <span className="text-red-600">*</span>
                  </h1>
                  <input
                    required
                    className="h-8 w-[100%] border-gray-500  font-normal text-black"
                    value="30"
                    type="text"
                  />
                </label>
                <div className="m-2 items-center gap-2 text-[15px] text-[#656565]">
                  {' '}
                  <input type="checkbox" /> Hide Consignee’s Contact Number in Invoice
                  <div className="mt-1 text-[12px] italic">
                    {' '}
                    <p className="font-normal"> We recommend enabling it to avoid data breach.</p>
                  </div>
                </div>
              </div>
              <label htmlFor="" className="flex w-[45%] flex-col gap-1">
                <h1>Upload Your Signature</h1>
                <input type="file" name="" id="" />
              </label>
            </div>
            <button className="flex h-10 w-40 items-center  gap-2 bg-blue-600 text-white hover:bg-blue-400">
              <div className="flex h-full w-1/4 items-center justify-center  hover:bg-blue-400">
                <svg viewBox="0 0 24 24" fill="currentColor" height="1.5em" width="1.5em">
                  <path d="M5 21h14a2 2 0 002-2V8l-5-5H5a2 2 0 00-2 2v14a2 2 0 002 2zM7 5h4v2h2V5h2v4H7V5zm0 8h10v6H7v-6z" />
                </svg>
              </div>
              Save Settings
            </button>
          </div>
        </div>
      )}
    </PageWithSidebar>
  );
};

export default InvoicePreferences;
