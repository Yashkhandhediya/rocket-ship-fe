import { useEffect, useState } from 'react';
import { CustomTooltip } from '../../../../common/components';
import { noData } from '../../../../common/images';
import axios from 'axios';
import { BACKEND_URL } from '../../../../common/utils/env.config';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const Wallet_Data = () => {
  const [data, setData] = useState([]); //eslint-disable-line
  const [loading, setLoading] = useState(false);
  const [walletHistoryData, setWalletHistoryData] = useState([]);
  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');

  const user_id = is_company == 1 ? id_company : id_user;

  const charges = [
    {
      label: 'Successfull Recharge',
      value: '₹ 0.00',
    },
    {
      label: 'Total Credit',
      value: '₹ 0.00',
      tooltip: 'Total Credit is inclusive of successful recharge sum.',
    },
    {
      label: 'Total Debit',
      value: '₹ 0.00',
    },
  ];

  const fetchWalletHistory = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/paymentwallet_history?user_id=${user_id}`);
      setWalletHistoryData(response.data);
    } catch (err) {
      console.log(err);
      toast(`There is some error while fetching data`, { type: 'error' });
    }
  };

  useEffect(() => {
    fetchWalletHistory();
  }, []);

  return (
    <div>
      <div className="my-4 flex w-full flex-row justify-evenly px-6">
        {charges.map((charge, index) => (
          <div
            key={index}
            className="mx-1 flex w-full flex-col justify-between bg-[#159700] py-1 text-center font-semibold text-white">
            <div className="flex flex-row items-center justify-center gap-3 text-[14px]">
              {charge.label}
              {charge.tooltip && (
                <CustomTooltip text={charge.tooltip} style="dark" placement="right">
                  {/* info svg */}
                  <svg
                    className="dark:text-white h-4 w-4 text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                    viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </CustomTooltip>
              )}
            </div>
            <div className="text-[14px]">{charge.value}</div>
          </div>
        ))}
      </div>
      <div className="ml-4 w-full border text-[12px] font-bold text-[#333333]">
        <table className="w-full">
          <thead className="w-full border bg-[#FAFAFA]">
            <tr>
              <th className=" border-r-2 py-2 pl-2 pr-2">Date</th>
              <th className=" border-r-2 py-2 pl-2 pr-2">SR Transaction ID</th>
              <th className=" border-r-2 py-2 pl-2 pr-2">Amount</th>
              <th className=" border-r-2 py-2 pl-2 pr-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {walletHistoryData.length != 0 &&
              walletHistoryData.map((data, index) => {
                return (
                  <tr key={index} className="font-normal">
                    <td className="border py-2 pl-2 pr-2 text-center">{format(data.Date, 'dd-MMM-yyyy')}</td>

                    <td className="border py-2 pl-2 pr-2 text-center">{data['SR Transaction ID'] | '-'}</td>
                    <td className="border py-2 pl-2 pr-2 text-center">{data.Amount}</td>
                    <td className="border py-2 pl-2 pr-2 text-center">
                      <div>
                        <p>Bank ReferenceNo : {data.Description.Bank_ReferenceNo}</p>
                        {/* <p>Order_ID : {data.Description.Order_ID}</p> */}
                        <p>Payment Gateway : {data.Description.Payment_Gateway}</p>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="flex w-full flex-col items-center justify-center bg-[#FFFFFF]">
          {/* Table Data */}
          {walletHistoryData.length === 0 && (
            <div className="mb-12 flex w-full flex-col items-center justify-center pt-16">
              <img src={noData} alt="" width={'200px'} />
              <div className="mt-10 text-[1.7rem] font-bold text-[#b54040]">
                We could not find any data for the applied filters.
              </div>
              <div className="mt-2 text-[14px] font-normal opacity-80">Please change filters and retry.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet_Data;
