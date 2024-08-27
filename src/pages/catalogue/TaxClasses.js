import React from 'react';
import CatalogueTab from './CatalogueTab';

function TaxClasses() {
  return (
    <CatalogueTab>
      <div className="w-full">
        <div className="flex justify-between border-b pb-3">
          <div className=" mt-2 text-xl">Tax Class</div>
          <button className="flex items-center gap-2 rounded bg-red-800 px-2 py-1 text-white">
            <span className="text-2xl">+</span>Add Tax Class
          </button>
        </div>
        <div className="mx-2">
          <div className="mt-3 flex w-full justify-between">
            <p className="text-2xl">3</p>
            <button className="flex items-center gap-2 rounded bg-red-800 px-2 py-1 text-white">Edit</button>
          </div>
          <table className="mt-2 w-full overflow-hidden rounded-lg text-[12px] shadow">
            <thead className=" bg-white">
              <tr>
                <th className=" border px-4 py-2 text-left"> Price Range</th>
                <th className=" border px-4 py-2 text-left"> GST</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`text-[13px] font-semibold text-gray-400`}>
                <td className=" border px-2 py-2 text-left">{`-`}</td>
                <td className=" border px-2 py-2 text-left">{`-`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CatalogueTab>
  );
}

export default TaxClasses;
