import React from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { Link } from 'react-router-dom';

function Trucks() {
  return (
    <PageWithSidebar>
      <p className="mx-3 mt-3 text-lg font-medium">Truck Master</p>
      <table className="mx-2 mt-5 min-w-full overflow-hidden rounded-lg text-[12px] shadow">
        <thead className="border bg-white">
          <tr>
            <th className="border px-4 py-2 text-left">Company Name</th>{' '}
            <th className="border px-4 py-2 text-left">Company Email Address</th>
            <th className="border px-4 py-2 text-left">Contact Number</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className={`border  bg-white text-[13px] font-semibold text-gray-500`}>
            <td className=" border px-4 py-4 text-left">Demo</td>
            <td className=" border px-4 py-4 text-left">demo@gmail.com</td>
            <td className=" border px-4 py-4 text-left">0987654321</td>
            <td className=" border px-4 py-4 text-left">
              <Link to={'/trucks/1'} className="rounded bg-sky-500 p-2 text-white shadow">
                Show Trucks
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </PageWithSidebar>
  );
}

export default Trucks;
