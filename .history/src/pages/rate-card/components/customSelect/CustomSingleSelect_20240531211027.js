import React from 'react';

function CustomSingleSelect({ data }) {
  return (
    <div className="relative">
      <div className="flex w-52 items-center justify-between rounded-sm bg-white px-2.5 py-1.5">
        <p className="text-[12px] font-bold">{data.selectName}</p>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4">
          <path d="M3.81 4.38 8 8.57l4.19-4.19 1.52 1.53L8 11.62 2.29 5.91l1.52-1.53z" />
        </svg>
      </div>
      <div className="absolute z-50 mt-2 w-full rounded-lg bg-white">
        {data &&
          data.lists.map((list, index) => {
            return (
              <div key={index}>
                <ul className="flex gap-2 px-2 py-2 text-[12px] font-semibold">
                  {data.selectName !== 'Sort by:Low to High Weight' && (
                    <input
                      type="checkbox"
                      id="check-box"
                      name="check-box"
                      className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                  <p>{list}</p>
                </ul>
              </div>
            );
          })}
        {data.selectName !== 'Sort by:Low to High Weight' && (
          <div className="border-t">
            <button>clear</button>
            <button>Apply</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomSingleSelect;
