import React from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';

function MaterialType() {
  return (
    <PageWithSidebar>
      <p className="mx-3 mt-3 text-lg font-medium">Material Type</p>

      <table className="mx-2 mt-5 min-w-full overflow-hidden rounded-lg text-[12px] shadow">
        <thead className="border bg-white">
          <tr>
            <th className="border px-4 py-2 text-left">Company Name</th>{' '}
            <th className="border px-4 py-2 text-left">Company Email Address</th>
            <th className="border px-4 py-2 text-left">Contact No.</th>
            <th className="border px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className={`border  bg-white text-[13px] font-semibold text-gray-500`}>
            <td className=" border px-4 py-4 text-left">Demo</td>
            <td className=" border px-4 py-4 text-left">demo@gmail.com</td>
            <td className=" border px-4 py-4 text-left">0987654321</td>
            <td className=" border px-4 py-4 text-left">
              <button className="rounded bg-sky-500 p-2 text-white shadow">Show Material</button>
            </td>
          </tr>
        </tbody>
      </table>
    </PageWithSidebar>
  );
}

export default MaterialType;
