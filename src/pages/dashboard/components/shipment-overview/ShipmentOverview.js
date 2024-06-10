import React from 'react';

const ShipmentOverview = ({ title, fromDate, setFromDate, toDate, setToDate, handleDateChange, shipData, result, columnNames, noShipment }) => {
  return (
    <div className="mt-4 flex flex-col bg-gray-100 border shadow-md rounded-md">
      <div className="flex flex-row justify-between">
        <div className='font-bold text-left mt-2 ml-2'>
          {title}
        </div>
        <div className='flex flex-row ml-4 mt-4 mx-4'>
          <div className="group relative ml-2">
            <input
              type={'date'}
              id="default-search"
              className={`block w-[150px] rounded-[4px] border-opacity-90 border border-gray-300 bg-gray-50 px-5 py-1 text-[12px] text-[#757575] focus:border-red-500 focus:ring-red-500`}
              required
              onChange={(ev) => {
                setFromDate(ev.target.value);
              }}
              value={fromDate}
            />
          </div>
          <div className="group relative ml-2">
            <input
              type={'date'}
              id="default-search"
              className={`block w-[150px] rounded-[4px] border-opacity-90 border border-gray-300 bg-gray-50 px-5 py-1 text-[12px] text-[#757575] focus:border-red-500 focus:ring-red-500`}
              required
              onChange={(ev) => {
                setToDate(ev.target.value);
              }}
              value={toDate}
            />
          </div>
          <div className='ml-2'>
            <button
              className={`border-1 h-[33px] w-[100px] rounded-[4px] border-[#B07828] bg-[#B07828] text-[12px] leading-[30px] text-white hover:text-white}'}}`}
              onClick={() => { handleDateChange() }}>
              Apply
            </button>
          </div>
        </div>
      </div>

      <div className="w-full mt-2 overflow-x-auto flex flex-col justify-evenly">
        <div className="w-full flex flex-row justify-between">
        {columnNames.map((col, index) => (
          <div 
            key={col.label} 
            className={`flex-1 px-4 py-2 ${index === 0 ? 'text-left' : 'text-center'} font-semibold text-sm`}
          >
            {col.label}
          </div>
        ))}
        </div>
        <div className="mt-4 ml-4 mx-4 border-b border-gray-300"></div>
        <div className="w-full flex flex-col justify-center items-center">
          {shipData.length === 0 ? (
            <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col'>
              <img src={noShipment} alt="" width={'100px'} />
              <div className='text-[1.3rem] mt-10 text-[#b54040] font-semibold'>Courier&apos;s data not found this filter.</div>
            </div>
          ) : (
            result.map((item, index) => (
              <div className='flex flex-row w-full border border-collapse bg-[#FAFAFA]' key={index}>
              {columnNames.map((col, colIndex) => (
                <div key={col.key} className={`flex flex-1 px-4 py-2 ${colIndex === 0 ? '' : 'justify-center'}`}>
                  {item[col.key]}
                </div>
              ))}
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ShipmentOverview;
