import React from 'react';

function CustomSingleSelect({ data }) {
  return (
    <div>
      <div className="flex w-52 items-center justify-between">
        <p className="text-[12px] font-bold">{data.selectName}</p>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4">
          <path d="M3.81 4.38 8 8.57l4.19-4.19 1.52 1.53L8 11.62 2.29 5.91l1.52-1.53z" />
        </svg>
      </div>
    </div>
  );
}

export default CustomSingleSelect;
