import React from 'react'

const ShipmentDetailCard = ({ title, details, bgColor }) => (
  <div className={`h-40 flex flex-col ${bgColor} space-x-2 border shadow-md rounded-md ml-0 sm:w-full md:w-full mt-4 lg:w-[66%]`}>
    <div className='text-left mt-2 ml-2 font-semibold'>{title}</div>
    <div className='flex flex-row justify-evenly'>
      {details.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center flex-1 mt-2">
          <p className="w-[60px] bg-white rounded-lg shadow-md p-4 text-lg font-semibold">{value}</p>
          <p className="text-xs text-gray-500 mt-2 font-semibold">{label}</p>
        </div>
      ))}
    </div>
  </div>
);

export default ShipmentDetailCard
