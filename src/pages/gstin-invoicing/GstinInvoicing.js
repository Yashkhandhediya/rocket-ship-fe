import React, { useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { Loader } from '../../common/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

function GstinInvoicing() {
  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');
  const user_id = is_company == 1 ? id_company : id_user;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const [gstInfo, setGstInfo] = useState({
    gstin: '',
    invoice_prefix: '',
    invoice_suffix: '',
    tan_number: '',
  });

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const requiredFieldErrors = () => {
    const newErrors = {};

    if (!gstInfo.invoice_prefix) newErrors.complete_address = 'Invoice Prefix is Required';
    if (!gstInfo.invoice_suffix) newErrors.city = 'Invoice Suffix is Required';
    return newErrors;
  };

  const handleSaveGstinfo = async () => {
    const requiredError = requiredFieldErrors();
    if (Object.keys(requiredError).length > 0) {
      setError(requiredError);
      return;
    }
    setLoading(true);
    try {
      setGstInfo({
        gstin: '',
        invoice_prefix: '',
        invoice_suffix: '',
      });
      console.log('Saved Invoice Details Successfully');
    } catch (err) {
      console.log('There is Error while saving address');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWithSidebar>
      {loading && <Loader />}
      <div className="ml-4">
        <p className="bg-red-100 px-3 py-1 text-xl">Settings - GSTIN Invoicing</p>
        <div className="bg-zinc-200 px-3 py-3">
          <p className="font-semibold">
            <Link to={`/settings`} className="text-red-800">
              Settings
            </Link>
            {` > Billing > GSTIN Invoicing`}
          </p>
          <div className="my-4 bg-white p-6 text-gray-600">
            <p className="pb-2 text-xl font-bold">GSTIN Invoicing</p>
            <p className="text-[12px]">
              Enter your registered GST Identification Number below to add it to your freight and customer
              invoice:
            </p>
            <div>
              <div className="my-4 flex flex-wrap gap-5 border p-4">
                <div className="mb-4 w-[45%]">
                  <label htmlFor="gstin" className="block text-[12px] font-semibold">
                    GSTIN
                  </label>
                  <input
                    type="text"
                    id="gstin"
                    placeholder="Enter the Location"
                    className="mt-1 block w-full rounded-sm border border-gray-200 px-2.5 py-1 text-[12px] shadow-sm focus:border-blue-50 focus:outline-none"
                    value={gstInfo.gstin}
                    onChange={(e) => setGstInfo({ ...gstInfo, gstin: e.target.value })}
                  />
                </div>
                <div className="mb-4 w-[45%]">
                  <label htmlFor="invoicePrefix" className="block text-[12px] font-medium">
                    Invoice Prefix <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="invoicePrefix"
                    className="mt-1 block w-full rounded-sm border border-gray-200 px-2.5 py-1 text-[12px] shadow-sm focus:border-blue-50 focus:outline-none"
                    value={gstInfo.invoice_prefix}
                    onChange={(e) => setGstInfo({ ...gstInfo, invoice_prefix: e.target.value })}
                  />
                  {error && <p className="w-1/2 text-xs text-red-500">{error?.invoice_prefix}</p>}
                </div>
                <div className="mb-4 w-[45%]">
                  <label htmlFor="invoiceSuffix" className="block text-[12px] font-medium">
                    Invoice Suffix <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="invoiceSuffix"
                    className="mt-1 block w-full rounded-sm border border-gray-200 px-2.5 py-1 text-[12px] shadow-sm focus:border-blue-50 focus:outline-none"
                    value={gstInfo.invoice_prefix}
                    onChange={(e) => setGstInfo({ ...gstInfo, invoice_suffix: e.target.value })}
                  />
                  {error && <p className="w-1/2 text-xs text-red-500">{error?.invoice_suffix}</p>}
                </div>
              </div>
              <div className="mb-4 flex gap-5 font-medium">
                <p className="text-[12px]">
                  I want to deduct TDS payment <span className="text-red-500">*</span>{' '}
                </p>
                <div className="text-[12px]">
                  <label className=" pr-2">
                    <input
                      type="radio"
                      value="yes"
                      checked={selectedValue === 'yes'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="no"
                      checked={selectedValue === 'no'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="mb-4 w-[50%] ">
                <label htmlFor="tanNumber" className="block text-[12px] font-medium">
                  TAN Number
                </label>
                <input
                  type="text"
                  id="tanNumber"
                  className="mt-1 block w-full rounded-sm border border-gray-200 px-2.5 py-1 text-[12px] shadow-sm focus:border-blue-50 focus:outline-none"
                  value={gstInfo.tan_number}
                  onChange={(e) => setGstInfo({ ...gstInfo, tan_number: e.target.value })}
                  disabled={selectedValue !== 'yes'}
                />
                {error && <p className="w-1/2 text-xs text-red-500">{error?.invoice_suffix}</p>}
              </div>
            </div>
            <button
              className="rounded-sm bg-red-800 px-3 py-1 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
              onClick={() => {
                handleSaveGstinfo();
              }}>
              Save Details
            </button>
          </div>
          <div className="my-4 bg-white p-6 text-gray-600">
            <div className="m-y border p-4">
              <div className="flex justify-between">
                <div className="flex items-center gap-10">
                  <p className="flex items-center gap-1 text-[13px] font-medium">
                    Enable State GST involving <FontAwesomeIcon icon={faCircleExclamation} className="pr-2" />
                  </p>
                  <div className=" flex items-center gap-2">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="peer sr-only" />
                      <div className="dark:border-gray-600 peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
                    </label>
                  </div>
                </div>
                <button className="rounded-2xl bg-red-800 px-4 py-2 text-[13px] text-white">Add State</button>
              </div>
              <div className="my-4 text-[12px]">
                <p className="font-medium">When to enable State GST?</p>
                <p>
                  <FontAwesomeIcon icon={faArrowRightLong} /> When you have multiple GSTINs from different
                  state.
                </p>
                <p>
                  <FontAwesomeIcon icon={faArrowRightLong} /> When you want to generate seperate freight
                  invoices for each pickup address.
                </p>
                <p>
                  <FontAwesomeIcon icon={faArrowRightLong} /> When you want to claim input credit on tax paid
                  by you on your purchase.
                </p>
                <p className="my-3 inline-block rounded-lg bg-yellow-50 p-1 text-[12px] text-gray-500">
                  <strong>Note</strong>: Customers invoices will be generated with pickup address (shown under
                  Sold by) and respective state GSTIN
                </p>
              </div>
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b">
                    <th className=" p-2">State</th>
                    <th>GSTIN</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td>Gujarat</td>
                    <td></td>
                    <td>
                      <button className="my-2 rounded-lg bg-red-800 px-4 py-2 text-sm text-white">
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default GstinInvoicing;
