import React, { useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { NavLink } from 'react-router-dom';
import { Datepicker } from 'flowbite-react';
import RangeDatePicker from './components/RangeDatePicker';

function ReportsTab({ children }) {
  const [type, setType] = useState('select');
  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <PageWithSidebar>
      <div className="ml-3">
        <div className="flex items-center justify-between border-b border-gray-400 bg-red-50 p-3">
          <p className="text-lg">Reports</p>
          <button className="rounded bg-red-800 p-2 text-sm text-white">Schedule Report</button>
        </div>
        <div className="flex items-center text-sm">
          <NavLink to={`/reports`} className="border p-2">
            Shiprockets Report
          </NavLink>
          <NavLink to={`/scheduled-reports`} className="border p-2">
            Scheduled Report
          </NavLink>
        </div>
        <div className="mx-4 flex w-1/2 items-center gap-4">
          <select
            id="select"
            value={type}
            className="block w-1/2 rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            onChange={handleChange}>
            <option value="All">All</option>
            <option value="Orders">Orders</option>
            <option value="Shipments">Shipments</option>
            <option value="Returns">Returns</option>
            <option value="Billing">Billing</option>
            <option value="Weight">Weight</option>
            <option value="Channels">Channels</option>
            <option value="Reports">Reports</option>
            <option value="All Refunds">All Refunds</option>
            <option value="B2b Orders">B2b Orders</option>
            <option value="QC Downloads">QC Downloads</option>
          </select>
          <div className="w-1/2">
            <RangeDatePicker />
          </div>
        </div>
        {children}
      </div>
    </PageWithSidebar>
  );
}

export default ReportsTab;
