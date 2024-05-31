import React from 'react';

function ForwardTable() {
  return (
    <div>
      <table className="min-w-full text-[14px]">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Name (First Last)</th>
            <th className=" px-4 py-2 text-left">Age (Years)</th>
            <th className="">Email (example@example.com)</th>
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
