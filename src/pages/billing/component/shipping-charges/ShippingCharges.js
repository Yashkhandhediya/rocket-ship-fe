import { useEffect, useState } from 'react';
import { noData } from '../../../../common/images';
import { ShippingTable } from '../shipping-table';
import PageWithSidebar from '../../../../common/components/page-with-sidebar/PageWithSidebar';
import { BillingTabs } from '../billing-tabs';
import { BACKEND_URL } from '../../../../common/utils/env.config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader } from '../../../../common/components';
import { ACCESS_TOKEN } from '../../../../common/utils/config';
import { useNavigate } from 'react-router-dom';
const ShippingCharges = () => {
  const [data, setData] = useState([]); //eslint-disable-line
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');
  const headers = {             
    'Content-Type': 'application/json',
    'Authorization': ACCESS_TOKEN};

  const user_id = is_company == 1 ? id_company : id_user;

  const fetchShippingChargesData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BACKEND_URL}/ordershipping_charges`,
        {headers:headers}
      );
      if (response.status === 200) {
        setData(response.data);
        setIsLoading(false);
      } else {
        toast('There is some error while fetching orders.', { type: 'error' });
        setIsLoading(false);
      }
      console.log(response);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Redirect to login page on 401 Unauthorized
        localStorage.clear()
        navigate('/login');
      }
      toast(err, { type: 'error' });
      setIsLoading(false);
    }
  };

  const charges = [
    {
      label: 'Total Freight Charges',
      value: '₹ 0.00',
    },
    {
      label: 'Billed Freight Charges',
      value: '₹ 0.00',
    },
    {
      label: 'Unbilled Freight Charges',
      value: '₹ 0.00',
    },
    {
      label: 'Total On-hold Charges',
      value: '₹ 0.00',
    },
    {
      label: 'Invoice Due Amount',
      value: '₹ 0.00',
    },
  ];

  useEffect(() => {
    fetchShippingChargesData();
  }, []);

  return (
    <PageWithSidebar>
      {isLoading && <Loader />}
      <BillingTabs>
        {/* Bills and amount */}
        <div className="my-4 flex w-full flex-row justify-evenly px-6">
          {charges.map((charge, index) => (
            <div
              key={index}
              className="flex w-[17rem] flex-col justify-between gap-1 bg-[#159700] py-2 text-center font-semibold text-white">
              <div className="text-[14px]">{charge.label}</div>
              <div className="text-[14px]">{charge.value}</div>
            </div>
          ))}
        </div>

        {/* Search Input */}
        <div className="my-4 flex w-full flex-row px-7">
          <input
            type="text"
            name="search_order"
            id="search_order"
            className="h-[2rem] w-[20rem] rounded-l-[0.2rem] border border-[#CFD4D6] text-[13px] text-[#959595] focus:border-gray-300 focus:ring-0"
            placeholder="Search by Order Id or AWB No."
            autoComplete={false}
          />
          <button className="border border-l-0 border-[#CFD4D6] bg-[#FAFAFA] px-2" disabled>
            <svg
              className="dark:text-white h-4 w-4 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>

        {/* Table */}
        <div className="ml-4 overflow-x-scroll text-[12px] font-bold text-[#333333]">
          <table className="w-[113%] border-collapse border border-gray-100">
            <thead className=" bg-white">
              <tr>
                <th className="w-20 border border-gray-200 p-1  pl-2 text-left">Order ID</th>
                <th className="w-24 border border-gray-200 p-1 pl-2 text-left">AWB Number</th>
                <th className="border border-gray-200 px-4 py-1 text-left">
                  <div className="flex flex-row justify-between gap-5">
                    <span>Courier</span>
                    <svg
                      className="dark:text-white h-4 w-4 text-transparent"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#159700"
                      viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M18.8 4H5.2a1 1 0 0 0-.7 1.7l5.3 6 .2.7v4.8c0 .2 0 .4.2.4l3 2.3c.3.2.8 0 .8-.4v-7.1c0-.3 0-.5.2-.7l5.3-6a1 1 0 0 0-.7-1.7Z"
                      />
                    </svg>
                  </div>
                </th>
                <th className="border border-gray-200 px-4 py-1 text-left">
                  {' '}
                  <div className="flex flex-row justify-between">
                    <span>Shipment Status</span>
                    <svg
                      className="dark:text-white h-4 w-4 text-transparent"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#159700"
                      viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M18.8 4H5.2a1 1 0 0 0-.7 1.7l5.3 6 .2.7v4.8c0 .2 0 .4.2.4l3 2.3c.3.2.8 0 .8-.4v-7.1c0-.3 0-.5.2-.7l5.3-6a1 1 0 0 0-.7-1.7Z"
                      />
                    </svg>
                  </div>
                </th>
                <th className="border border-gray-200 px-4 py-1 text-left">
                  {' '}
                  <div className="flex flex-col ">
                    <div className="flex flex-row justify-between">
                      <span>AWB Assigned Date</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#159700"
                        className="h-4 w-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <select
                        name="timeline"
                        id="timeline"
                        className="mb-3 h-7 rounded-sm border border-[#CFD4D6] px-[14px] py-[1px] text-[12px] font-bold text-[#000000c0] focus:border-[#66afe9] focus:ring-0">
                        <option value="last_one_year">Last One Year</option>
                        <option value="last_one_year">2023</option>
                        <option value="last_one_year">2022</option>
                        <option value="last_one_year">2021</option>
                        <option value="last_one_year">2020</option>
                        <option value="last_one_year">2019</option>
                        <option value="last_one_year">2018</option>
                        <option value="last_one_year">2017</option>
                        <option value="last_one_year">2016</option>
                      </select>
                    </div>
                  </div>
                </th>
                <th className=" border border-gray-200 px-4 py-2 text-left">Applied Weight Charges (₹)</th>
                <th className=" border border-gray-200 px-4 py-2 text-left">Excess Weight Charges (₹)</th>
                <th className=" border border-gray-200 px-4 py-2 text-left">On Hold Amount (₹)</th>
                <th className=" border border-gray-200 px-4 py-2 text-left">Total Freight Charges (₹)</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Entered Weight & Dimensions</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Charged Weight & Dimensions</th>
                <th className="border border-gray-200 px-4 py-2 text-left">View Transactions Details</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((shippingData) => <ShippingTable key={shippingData.order_id} data={shippingData} />)}
            </tbody>
          </table>

          {/* Table Data */}
          {data.length === 0 && (
            <div className="flex w-full justify-center">
              <div className="mb-12 flex w-full flex-col items-center justify-center pt-16">
                <img src={noData} alt="" width={'200px'} />
                <div className="mt-10 text-[1.7rem] font-bold text-[#b54040]">
                  We could not find any data for the applied filters.
                </div>
                <div className="mt-2 text-[14px] font-normal opacity-80">
                  Please change filters and retry.
                </div>
              </div>
            </div>
          )}
        </div>
      </BillingTabs>
    </PageWithSidebar>
  );
};

export default ShippingCharges;
