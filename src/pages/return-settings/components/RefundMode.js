import React from 'react';

function RefundMode({ title, description }) {
  return (
    <div className="mb-4 flex justify-between">
      <div className="w-[60%]">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-[12px] text-gray-500">{description} </p>
      </div>
      <div className=" flex items-center gap-2">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            //   value={enableOption}
            //   onChange={() => setEnableOption((prev) => !prev)}
            className="peer sr-only"
          />
          <div className="dark:border-gray-600 peer h-4 w-7 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-3 after:w-3 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
        </label>
      </div>
    </div>
  );
}

export default RefundMode;
