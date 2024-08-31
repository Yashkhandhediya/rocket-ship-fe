import axios from 'axios';
import { useState, useEffect } from 'react';
import { CustomTooltip } from '../../../../common/components';
import { remitance } from '../../../../common/images';
import { BACKEND_URL } from '../../../../common/utils/env.config';
import { toast } from 'react-toastify';

const COD_Reconciliation = ({ charges, data }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('is_super');
    setIsAdmin(adminStatus === '3');
  }, []);

  const updateStatus = (id, status_name) => {
    axios
      .put(`${BACKEND_URL}/order/cod_remittance_update_status/${id}?status_name=${status_name}`)
      .then((res) => {
        console.log('Response Of Update Status', res.data);
        toast(`Status updated to ${status_name}`, { type: 'success' });
        window.location.reload();
      })
      .catch((err) => {
        console.log('Error in updating status', err);
        toast(`Error in updating status`, { type: 'error' });
      });
  };

  return (
    <>
      <div className="my-4 flex w-full flex-row justify-evenly px-6">
        {charges.map((charge, index) => (
          <div
            key={index}
            className="flex w-[17rem] flex-col justify-between gap-1 bg-[#159700] py-1 text-center font-semibold text-white">
            <div className="flex flex-row items-center justify-center gap-1 text-[14px]">
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
      <div>
        {data.length > 0 ? (
          isAdmin ? (
            <div className="m-2">
              <div className="flex items-center border border-b-[#E5E7EB] text-left">
                <div className="w-[11.11%] border-r-2 py-2.5 text-center">User Name</div>
                <div className="w-[11.11%] border-r-2 py-2.5 text-center">Order ID</div>
                <div className="w-[11.11%] border-r-2 py-2.5 text-center">Courier Partner</div>
                <div className="w-[11.11%] border-r-2 py-2.5 text-center">AWB No.</div>
                <div className="w-[11.11%] border-r-2 py-2.5 text-center">Date</div>
                <div className="w-[11.11%] border-r-2 py-2.5 text-center">Bank Transaction Id</div>
                <div className="w-[11.11%] border-r-2 py-2.5 text-center">Status</div>
                <div className="w-[11.11%] border-r-2 py-2.5 text-center">COD To Remitted</div>
                <div className="w-[19.2%] border-r-2 py-2.5 text-center">Action</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((item, key) => (
                    <div
                      className="flex h-12 w-full flex-row items-center border border-b-[#E5E7EB] text-center"
                      key={key}>
                      <div className="flex h-full w-[11.11%] items-center justify-center border-r-2 font-normal">
                        {item.user_name}
                      </div>
                      <div className="flex h-full w-[11.11%] items-center justify-center border-r-2 font-normal">
                        {item.order_id}
                      </div>
                      <div className="flex h-full w-[11.11%] flex-col justify-center border-r-2 font-normal">
                        <div>{item.partner_name}</div>
                      </div>
                      <div className="flex h-full w-[11.11%] flex-col justify-center gap-4 border-r-2 text-center">
                        <div>{item.waybill_no}</div>
                      </div>
                      <div className="flex h-full w-[11.11%] flex-col justify-center border-r-2 font-normal">
                        <div>{item.created_date}</div>
                      </div>
                      <div className="flex h-full w-[11.11%] flex-col justify-center border-r-2 font-normal">
                        <div>{item.bank_transaction_id ? item.bank_transaction_id : '-'}</div>
                      </div>
                      <div className="item-center flex h-full w-[11.11%] items-center justify-center border-r-2 px-2 font-normal">
                        <div
                          className={`basis-full rounded bg-red-100 text-center font-semibold text-red-700 ${
                            item.status === 'done' ? 'bg-green-100 text-green-700' : ''
                          }`}>
                          {item.status}
                        </div>
                      </div>
                      <div className="flex h-full w-[11.11%] flex-col justify-center border-r-2 font-normal">
                        <div>{item.cod_to_be_remitted}</div>
                      </div>
                      <div className="item-center flex h-full w-[17.77%] items-center justify-center border-r-2 px-2 font-normal">
                        <button
                          className={`mr-1 w-48 rounded-md bg-[#E02424] py-1.5 text-[14px] text-white ${
                            !item.buttun_flag ? 'cursor-not-allowed' : ''
                          }`}
                          onClick={() => updateStatus(item.id, 'In Progress')}
                          disabled={!item.buttun_flag}>
                          Initiated COD
                        </button>
                        <button
                          className={`w-48 rounded-md bg-[#E02424] py-1.5 text-[14px] text-white ${
                            !item.buttun_flag ? 'cursor-not-allowed' : ''
                          }`}
                          onClick={() => updateStatus(item.id, 'Transferd')}
                          disabled={!item.buttun_flag}>
                          Manual Transfer
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="mb-12 flex w-full flex-col items-center justify-center pt-16">
                    <img src="remitance.png" alt="Remittance" width={'200px'} />
                    <div className="mt-10 text-3xl font-bold text-[#b54040]">
                      Your remittance is on its way.
                    </div>
                    <div className="mt-2 text-[15px] font-semibold text-[#313131] opacity-80">
                      Hey {localStorage.getItem('user_name')}, We release COD remittance 3 times a week and on
                      the 8th day from the date of delivery.
                    </div>
                    <div className="mt-8">
                      <button className="rounded-3xl bg-[#b54040] px-16 py-3 text-[13px] text-white">
                        Learn More
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="m-2">
              <div className="flex items-center border border-b-[#E5E7EB] text-left">
                <div className="w-[14.29%] border-r-2 py-2.5 text-center">Order ID</div>
                <div className="w-[14.29%] border-r-2 py-2.5 text-center">Courier Partner</div>
                <div className="w-[14.29%] border-r-2 py-2.5 text-center">AWB No.</div>
                <div className="w-[14.29%] border-r-2 py-2.5 text-center">Date</div>
                <div className="w-[14.29%] border-r-2 py-2.5 text-center">Bank Transaction Id</div>
                <div className="w-[14.29%] border-r-2 py-2.5 text-center">Status</div>
                <div className="w-[14.29%] border-r-2 py-2.5 text-center">COD To Remitted</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((item, key) => (
                    <div
                      className="flex h-12 w-full flex-row items-center border border-b-[#E5E7EB] text-center"
                      key={key}>
                      <div className="flex h-full w-[14.29%] items-center justify-center border-r-2 font-normal">
                        {item.order_id}
                      </div>
                      <div className="flex h-full w-[14.29%] flex-col justify-center border-r-2 font-normal">
                        <div>{item.partner_name}</div>
                      </div>
                      <div className="flex h-full w-[14.29%] flex-col justify-center gap-4 border-r-2 text-center">
                        <div>{item.waybill_no}</div>
                      </div>
                      <div className="flex h-full w-[14.29%] flex-col justify-center border-r-2 font-normal">
                        <div>{item.created_date}</div>
                      </div>
                      <div className="flex h-full w-[14.29%] flex-col justify-center border-r-2 font-normal">
                        <div>{item.bank_transaction_id ? item.bank_transaction_id : '-'}</div>
                      </div>
                      <div className="item-center flex h-full w-[14.29%] items-center justify-center border-r-2 px-2 font-normal">
                        <div
                          className={`basis-full rounded bg-red-100 text-center font-semibold text-red-700 ${
                            item.status === 'done' ? 'bg-green-100 text-green-700' : ''
                          }`}>
                          {item.status}
                        </div>
                      </div>
                      <div className="flex h-full w-[14.29%] flex-col justify-center border-r-2 font-normal">
                        <div>{item.cod_to_be_remitted}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="mb-12 flex w-full flex-col items-center justify-center pt-16">
                    <img src="remitance.png" alt="Remittance" width={'200px'} />
                    <div className="mt-10 text-3xl font-bold text-[#b54040]">
                      Your remittance is on its way.
                    </div>
                    <div className="mt-2 text-[15px] font-semibold text-[#313131] opacity-80">
                      Hey {localStorage.getItem('user_name')}, We release COD remittance 3 times a week and on
                      the 8th day from the date of delivery.
                    </div>
                    <div className="mt-8">
                      <button className="rounded-3xl bg-[#b54040] px-16 py-3 text-[13px] text-white">
                        Learn More
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          <div className="mb-12 flex w-full flex-col items-center justify-center pt-16">
            <img src={remitance} alt="Remittance" width={'200px'} />
            <div className="mt-10 text-3xl font-bold text-[#b54040]">Your remittance is on its way.</div>
            <div className="mt-2 text-[15px] font-semibold text-[#313131] opacity-80">
              Hey {localStorage.getItem('user_name')}, We release COD remittance 3 times in a week and on the
              8th day from the date of delivery.
            </div>
            <div className="mt-8">
              <button className="rounded-3xl bg-[#b54040] px-16 py-3 text-[13px] text-white">
                Learn More
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default COD_Reconciliation;
