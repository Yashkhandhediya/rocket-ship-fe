import React from 'react';
import ReportsTab from './ReportsTab';
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../common/utils/env.config';
import axios from 'axios';
import { toast } from 'react-toastify';

function Reports() {
  
  const [data, setData] = useState([]);
  const usersId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/report/get_report_history?users_id=${usersId}`);
        console.log("COD DATA", response.data);
        setData(response.data);
      } catch (error) {
        toast("Error", { type: 'error' });
        console.log("Error COD DATA", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ReportsTab>
      <table className="mt-5 min-w-full overflow-hidden rounded text-[12px] shadow">
        <thead className="bg-white">
          <tr>
            <th className="border px-4 py-3 text-left">Report Generated On</th>
            <th className="border px-4 py-3 text-left">Title</th>
            {/* <th className="border px-4 py-3 text-left">Report Type</th> */}
            <th className="border px-4 py-3 text-left">User</th>
            <th className="border px-4 py-3 text-left">Report Date Range</th>
            {/* <th className="border px-4 py-3 text-left">Action</th> */}
            {/* <th className="border px-4 py-3 text-left">Size</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="bg-white text-[13px] text-gray-500 transition hover:bg-gray-100">
              <td className="border px-4 py-2 text-left">{new Date(item.created_at).toLocaleString()}</td>
              <td className="border px-4 py-2 text-left">{item.title}</td>
              <td className="border px-4 py-2 text-left">{item.user_name}</td>
              <td className="border px-4 py-2 text-left">
                {new Date(item.from_date).toLocaleDateString()} - {new Date(item.to_date).toLocaleDateString()}
              </td>
              {/* <td className="border px-4 py-2 text-left">
                <button className="rounded bg-green-500 px-2 py-1 text-white">Download</button>
              </td> */}
              {/* <td className="border px-4 py-2 text-left">{item.size}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </ReportsTab>
  );
}

export default Reports;
