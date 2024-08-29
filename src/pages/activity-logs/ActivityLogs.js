import React, { useEffect, useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { CustomMultiSelect } from '../../common/components';
import { catalogue, ordersActivityLogs, tableHeadData, timeData } from './constants';

function ActivityLogs() {
  const [selectedTime, setSelectedTime] = useState('Last 30 Days');

  return (
    <PageWithSidebar>
      <div className="p-6">
        <div>
          <p className="text-xl font-bold">Bulk Activity Log</p>
          <div className="mt-2 w-56">
            <CustomMultiSelect
              options={timeData}
              isMulti={false}
              placeholder={`Last 30 Days`}
              selected={selectedTime}
              onChange={(value) => setSelectedTime(value.value)}
            />
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-[16%] rounded-lg bg-white px-4 py-2">
            <ul>
              <li className="font-bold text-gray-500">Orders</li>
              {ordersActivityLogs.map((data, index) => {
                return (
                  <li
                    className="mt-1 cursor-pointer px-1 pt-1 text-[13px] font-semibold text-gray-500 hover:bg-red-50"
                    key={index}>
                    {data}
                  </li>
                );
              })}
            </ul>
            <ul>
              <li className="mt-3 font-bold text-gray-500">Catalog</li>
              {catalogue.map((data, index) => {
                return (
                  <li
                    className="mt-1 cursor-pointer px-1 pt-1 text-[13px] font-semibold text-gray-500 hover:bg-red-50"
                    key={index}>
                    {data}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-[82%]">
            <p className="text-[16px] font-bold">Bulk Order Import</p>
            <table className="mt-3 w-full rounded-lg bg-white text-[13px]">
              <thead>
                <tr>
                  {tableHeadData.map((data, index) => {
                    return (
                      <th className="p-3 text-left" key={index}>
                        {data}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 text-left">lorem&7</td>
                  <td className="p-3 text-left">lorem&7</td>
                  <td className="p-3 text-left">lorem&7</td>
                  <td className="p-3 text-left">lorem&7</td>
                  <td className="p-3 text-left">lorem&7</td>
                  <td className="p-3 text-left">lorem&7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default ActivityLogs;
