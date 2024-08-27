import React from 'react';
import CatalogueTab from './CatalogueTab';

function Categories() {
  return (
    <CatalogueTab>
      <div className="w-full">
        <div className="flex justify-between border-b pb-3">
          <div className=" mt-2 text-xl">Categories</div>
          <button className="flex items-center gap-2 rounded bg-red-800 px-2 py-1 text-white">
            <span className="text-2xl">+</span>Add Categories
          </button>
        </div>
        <table className="mt-5 w-full overflow-hidden rounded-lg text-[12px] shadow">
          <thead className=" bg-white">
            <tr>
              <th className=" border px-4 py-2 text-left"> Name</th>
              <th className=" border px-4 py-2 text-left"> Code</th>
              <th className=" border px-4 py-2 text-left"> Tax Code</th>
              <th className=" border px-4 py-2 text-left"> HSN</th>
              <th className=" border px-4 py-2 text-left"> Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className={`text-[13px] font-semibold text-gray-400`}>
              <td className=" border px-2 py-2 text-left">{`-`}</td>
              <td className=" border px-2 py-2 text-left">{`-`}</td>
              <td className=" border px-2 py-2 text-left">{`-`}</td>
              <td className=" border px-2 py-2 text-left">{`-`}</td>
              <td className=" border px-2 py-2 text-left">
                <button className="flex items-center gap-2 rounded bg-red-800 px-2 py-1 text-white">
                  Edit
                </button>
              </td>
            </tr>
            <tr className={`text-[13px] font-semibold text-gray-400`}>
              <td className=" border px-2 py-2 text-left">{`-`}</td>
              <td className=" border px-2 py-2 text-left">{`-`}</td>
              <td className=" border px-2 py-2 text-left">{`-`}</td>
              <td className=" border px-2 py-2 text-left">{`-`}</td>
              <td className=" border px-2 py-2 text-left">{`-`}</td>
            </tr>
            <tr className={`text-[13px] font-semibold text-gray-400`}>
              <td className=" border px-2 py-2 text-left">{`-`}</td>
              <td className=" border px-2 py-2 text-left">{`-`}</td>
              <td className=" border px-2 py-2 text-left">{`-`}</td>
              <td className=" border px-2 py-2 text-left">{`-`}</td>
              <td className=" border px-2 py-2 text-left">{`-`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </CatalogueTab>
  );
}

export default Categories;
