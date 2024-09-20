import React from 'react';
import ReportsTab from './ReportsTab';

function ScheduledReports() {
  return (
    <ReportsTab>
      <table className="mt-5 min-w-full overflow-hidden rounded text-[12px] shadow">
        <thead className=" bg-white">
          <tr>
            <th className=" border px-4 py-3 text-left">Report Name</th>
            <th className=" border px-4 py-3 text-left">Send To</th>
            <th className="border px-4 py-3 text-left">Subject</th>
            <th className=" border px-4 py-3 text-left">Sent On</th>
            <th className=" border px-4 py-3 text-left">Date Duration</th>
            <th className=" border px-4 py-3 text-left">Action</th>
            <th className=" border px-4 py-3 text-left">File Size</th>
          </tr>
        </thead>
        <tbody>
          <tr className={`bg-white text-[13px] text-gray-500 transition hover:bg-gray-100`}>
            <td className="border px-2 py-2 text-left ">3-Jul-2024 04:37 PM</td>
            <td className="border px-2 py-2 text-left ">Shipping Charges </td>
            <td className="border px-2 py-2 text-left ">Billing</td>
            <td className="border px-2 py-2 text-left ">Tech Easy</td>
            <td className="border px-2 py-2 text-left ">4 Jun 2024 - 3 Jul 2024</td>

            <td className="border  px-2 py-2 text-left">
              <button className="rounded bg-green-500 px-2 py-1 text-white">Download</button>
            </td>
            <td className="border px-2 py-2 text-left ">735.00</td>
          </tr>
        </tbody>
      </table>
    </ReportsTab>
  );
}

export default ScheduledReports;
