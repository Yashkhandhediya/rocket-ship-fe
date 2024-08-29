import React, { useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { NavLink } from 'react-router-dom';
import RangeDatePicker from './components/RangeDatePicker';
import { format } from 'date-fns';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';

function ReportsTab({ children }) {
  const [type, setType] = useState('1');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleDateChange = (ranges) => {
    setDateRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  };

  const handleDownload = async () => {
    const usersId = localStorage.getItem('user_id');
    const fromDate = format(dateRange.startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
    const toDate = format(dateRange.endDate, "yyyy-MM-dd'T'HH:mm:ss.SSSX");

    const payload = {
      users_id: usersId,
      from_date: fromDate,
      to_date: toDate,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/report/get_reports?type=${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        // Assuming the response is a file (e.g., CSV, PDF)
        const blob = await response.blob(); // Convert response to a blob
        const url = window.URL.createObjectURL(blob); // Create a URL for the blob
        const link = document.createElement('a'); // Create a link element
        link.href = url; // Set link href to the blob URL
        link.setAttribute('download', 'report_file.xlsx'); // Set the default file name
        document.body.appendChild(link); // Append link to the body
        link.click(); // Trigger a click on the link to start the download
        link.parentNode.removeChild(link); // Remove the link element from the body
        window.URL.revokeObjectURL(url); // Clean up the blob URL
        console.log('Report downloaded successfully');
      } else {
        console.error('Failed to download report');
      }
    } catch (error) {
      toast('Error fetching report', { type: 'error' });
      console.error('Error fetching report:', error);
    }
  };

  return (
    <PageWithSidebar>
      <div className="ml-3">
        <div className="flex items-center justify-between border-b border-gray-400 bg-red-50 p-3">
          <p className="text-lg">Reports</p>
          {/* <button className="rounded bg-red-800 p-2 text-sm text-white">Schedule Report</button> */}
        </div>
        <div className="flex items-center text-sm">
          <NavLink to={`/reports`} className="border p-2">
            Cargo Cloud Report
          </NavLink>
          {/* <NavLink to={`/scheduled-reports`} className="border p-2">
            Scheduled Report
          </NavLink> */}
        </div>
        <div className="mx-4 flex w-1/2 items-center gap-4">
          <select
            id="select"
            value={type}
            className="block w-1/2 rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            onChange={handleChange}>
            <option value="1">Orders</option>
            <option value="2">Shipments</option>
            <option value="3">Weight</option>
          </select>
          <div className="w-1/2">
            <RangeDatePicker onDateChange={handleDateChange} />
          </div>
          <div className="w-1/2">
            <button className="rounded bg-green-500 px-2 py-1 text-white" onClick={handleDownload}>
              Download
            </button>
          </div>
        </div>
        {children}
      </div>
    </PageWithSidebar>
  );
}

export default ReportsTab;
