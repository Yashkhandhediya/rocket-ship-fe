import React, { useState } from 'react';
import PageWithSidebar from '../../../../common/components/page-with-sidebar/PageWithSidebar';
import { BillingTabs } from '../billing-tabs';
import ActivateModal from './ActivateModal';

function CurrentPlanDetails() {
  const [isOpen, setisOpen] = useState(false);

  const handleOpen = () => {
    setisOpen(true);
  };

  const handleClose = () => {
    setisOpen(false);
  };

  return (
    <PageWithSidebar>
      {isOpen && <ActivateModal handleClose={handleClose} />}

      <BillingTabs>
        <div className="py-2 text-center">
          <h1 className="pb-2 text-3xl">Cargo Cloud Pricing</h1>
          <p className="text-[12px]">Grow faster with the shipping plan that fits your business</p>
        </div>
        <div className="m-4">
          <div className="flex justify-end rounded-t-xl bg-white px-3 py-4">
            <ul className="flex cursor-pointer gap-8 text-[12px]">
              <li>Monthly</li>
              <li>Quarterly</li>
              <li>Half Yearly</li>
              <li>Yearly</li>
            </ul>
          </div>
          <table className="mt-2 w-full bg-white text-center">
            <thead>
              <tr>
                <th className="w-[28%]">
                  <div>
                    <h2>Select a plan</h2>
                    <p className="text-[12px] font-normal">{`Whether you're a new business or a well-known brand, we've got you covered!`}</p>
                  </div>
                </th>
                <th className=" w-[18%] border bg-zinc-100 ">
                  <div className="ml-8 flex w-3/4 flex-col items-center gap-4 py-4">
                    <p className="text-red-800">Lite</p>
                    <h2 className="text-xl">Free</h2>
                    <p className="text-[12px] font-normal ">For sellers who ship up to 60 shipments/month</p>
                    <button
                      className="w-full rounded-xl bg-green-500 py-3 text-sm font-normal text-white"
                      disabled>
                      Activated
                    </button>
                  </div>
                </th>
                <th className=" w-[18%] justify-center border bg-zinc-100">
                  <div className="ml-8 flex w-3/4 flex-col items-center gap-4 py-4">
                    <p className="text-red-800">Basic</p>
                    <h2 className="text-xl">
                      ₹ 1000.00/<span className="text-[16px] font-normal">Month</span>
                    </h2>
                    <p className="text-[12px] font-normal ">For sellers who ship up to 100 shipments/month</p>
                    <button
                      className="w-full rounded-xl bg-red-800 py-3 text-sm font-normal text-white"
                      onClick={handleOpen}>
                      Activate
                    </button>
                  </div>
                </th>
                <th className=" w-[18%] justify-center border bg-zinc-100">
                  <div className="ml-8 flex w-3/4 flex-col items-center gap-4 py-4">
                    <p className="text-red-800">Advanced</p>
                    <h2 className="text-xl">
                      ₹ 2000.00/<span className="text-[16px] font-normal">Month</span>
                    </h2>{' '}
                    <p className="text-[12px] font-normal ">For sellers who ship up to 300 shipments/month</p>
                    <button
                      className="w-full rounded-xl bg-red-800 py-3 text-sm font-normal text-white"
                      onClick={handleOpen}>
                      Activate
                    </button>
                  </div>
                </th>
                <th className="w-[18%] justify-center border bg-zinc-100">
                  <div className="ml-8 flex w-3/4 flex-col items-center gap-4 py-4">
                    <p className="text-red-800">Pro</p>
                    <h2 className="text-xl">
                      ₹ 3000.00/<span className="text-[16px] font-normal">Month</span>
                    </h2>
                    <p className="text-[12px] font-normal ">
                      For sellers who ship up to 1000 shipments/month
                    </p>
                    <button
                      className="w-full rounded-xl bg-red-800 py-3 text-sm font-normal text-white"
                      onClick={handleOpen}>
                      Activate
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border text-sm">
                <td className="bg-red-50 px-4 py-2 text-left font-bold text-gray-400">Shipping Rates </td>
                <td>₹26.27/0.5 kg </td>
                <td>₹24.58/0.5 kg </td>
                <td>₹22.88/0.5 kg </td>
                <td>₹20.34/0.5 kg</td>
              </tr>
              <tr className="border text-sm">
                <td className="bg-red-50 px-4 py-2 text-left font-bold text-gray-400">
                  Minimum Signup Periods
                </td>
                <td>0 month </td>
                <td>3 month </td>
                <td>1 month </td>
                <td>1 month </td>
              </tr>
              <tr className="border text-sm">
                <td className="bg-red-50 px-4 py-2 text-left font-bold text-gray-400">Courier Partners </td>
                <td>20+ </td>
                <td>30+ </td>
                <td>30+ </td>
                <td>30+ </td>
              </tr>
              <tr className="border text-sm ">
                <td className="bg-red-50 px-4 py-2 text-left font-bold text-gray-400"> </td>
                <td className="bg-zinc-100"></td>
                <td className="bg-zinc-100 text-[10px]">
                  *Cargo cloud fees and shipping prices mentioned are exclusive of GST
                </td>
                <td className="bg-zinc-100 text-[10px]">*Shipping price does not include COD or RTO fees </td>
                <td className="bg-zinc-100"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </BillingTabs>
    </PageWithSidebar>
  );
}

export default CurrentPlanDetails;
