import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { noShipment } from '../../../common/images';
const ShipmentZone = ({ data, title }) => {
  function formatLabel(text) {
    const withoutPrefix = text.startsWith('total_') ? text.slice(6) : text;

    const spacedText = withoutPrefix.replace(/_/g, ' ');

    const capitalizedText = spacedText
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return capitalizedText;
  }
  return (
    <div
      className="mt-4 flex flex-1 flex-col rounded-md border bg-gray-100 px-5 py-3 shadow-md"
      style={{ height: '400px', width: '400px' }}>
      <div className="flex justify-between">
        <h2 className="mb-2 text-lg font-semibold">{title}</h2>
        <span>Last 30 Days</span>
      </div>
      <div className="p-4" style={{ position: 'relative', height: 'calc(100% - 50px)' }}>
        {data ? (
          <div className="flex flex-col">
            {Object.entries(data).map(([zone, data]) => (
              <div key={zone} className="flex justify-between border-b py-5">
                <div className="flex items-center gap-4">
                  {title == 'Revenue' ? (
                    <p>{formatLabel(zone)}</p>
                  ) : (
                    <>
                      {' '}
                      <input
                        type="radio"
                        checked={true}
                        className={`form-radio h-4 w-4 ${
                          zone == 'A'
                            ? 'text-gray-400'
                            : zone == 'B'
                              ? 'text-green-400'
                              : zone == 'C'
                                ? 'text-red-400'
                                : zone == 'D'
                                  ? 'text-gray-500'
                                  : zone == 'E' && 'text-yellow-400'
                        }`}
                      />
                      <p>Zone {zone}</p>
                    </>
                  )}
                </div>
                {title == 'Revenue' ? (
                  <p>&#8377;{data}</p>
                ) : (
                  <p>
                    {data.order} ({data.order_percent})
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div
            className="mb-12 flex w-full flex-col items-center justify-center pt-16"
            style={{ height: '100%' }}>
            <img src={noShipment} alt="" width={'100px'} />
            <div className="mt-10 text-[1.3rem] font-semibold text-[#b54040]">No Data in last 30 days.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentZone;
