import React from 'react';

function ForwardTable() {
  return (
    <div>
      <table className="min-w-full rounded-xl text-[12px]">
        <thead className="bg-white">
          <tr>
            <th className="px-4 py-2 text-left">Name (First Last)</th>
            <th className=" px-4 py-2 text-left">
              <div className="flex flex-col text-center">
                <span>Name</span>
                <span className="mb-3 text-gray-400">(First Last)</span>
                <span>(Additional Info)</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2 text-left">John Doe</td>
            <td className="border px-4 py-2 text-left">30</td>
            <td className="border px-4 py-2 text-left">john@example.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ForwardTable;
