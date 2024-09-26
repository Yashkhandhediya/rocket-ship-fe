import React, { useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { NavLink } from 'react-router-dom';
import RangeDatePicker from './components/RangeDatePicker';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { format, startOfDay, endOfDay } from 'date-fns';
import apiClient from '../../common/utils/apiClient';

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
    const fromDate = format(startOfDay(dateRange.startDate), "yyyy-MM-dd'T'HH:mm:ss.SSSX");
    const toDate = format(endOfDay(dateRange.endDate), "yyyy-MM-dd'T'HH:mm:ss.SSSX");

    const payload = {
      users_id: usersId,
      from_date: fromDate,
      to_date: toDate,
    };

    try {
      const response = await apiClient.post(
        `${BACKEND_URL}/report/get_reports?type=${type}`,
        payload, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'blob', 
        }
      );
    
      if (response.status === 200) { 
        const blob = response.data; 
        const url = window.URL.createObjectURL(blob); 
        const link = document.createElement('a');
        link.href = url; 
        link.setAttribute('download', 'report_file.xlsx'); 
        document.body.appendChild(link); 
        link.click(); 
        link.parentNode.removeChild(link); 
        window.URL.revokeObjectURL(url); 
        console.log('Report downloaded successfully');
      } else {
        console.error('Failed to download report: ', response.statusText);
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
