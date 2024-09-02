import React from 'react';
import { Chart } from 'react-google-charts'; // Corrected import
import { noShipment } from '../../../common/images';

function GeoChart({ stateWiseOrderCount }) {
  const data = [
    ['State', 'Orders', 'Revenue (in INR)'],
    ...Object.keys(stateWiseOrderCount).map((state) => [
      state.charAt(0).toUpperCase() + state.slice(1),
      stateWiseOrderCount[state].order,
      stateWiseOrderCount[state].amount,
    ]),
  ];

  const options = {
    region: 'IN', // Focus on India
    resolution: 'provinces', // Show states within India
    colorAxis: { colors: ['#e0e0f8', '#1f4f9b'] }, // Gradient for data
    displayMode: 'State', // Display mode to show regions (states)
    backgroundColor: 'transparent', // Removes the unnecessary background
    datalessRegionColor: 'transparent', // Makes non-data regions transparent
    defaultColor: '#f5f5f5', // Default color for regions with no data
    tooltip: {
      textStyle: {
        color: '#444444',
      },
      showColorCode: true,
    },
  };

  return (
    <div
      className="mt-4 flex flex-1 flex-col overflow-hidden rounded-md border bg-gray-100 px-5 py-3 shadow-md"
      style={{ height: '400px', width: '450px' }}>
      <div className="flex justify-between">
        <h2 className="mb-2 text-lg font-semibold">Orders</h2>
        <span>Last 30 Days</span>
      </div>
      {stateWiseOrderCount.length != 0 ? (
        <div className="mt-10 flex">
          <Chart chartType="GeoChart" width="100%" height="100%" data={data} options={options} />
        </div>
      ) : (
        <div
          className="mb-12 flex w-full flex-col items-center justify-center pt-2"
          style={{ height: '100%' }}>
          <img src={noShipment} alt="" width={'100px'} />
          <div className="mt-10 text-[1.3rem] font-semibold text-[#b54040]">No Data in last 30 days.</div>
        </div>
      )}
    </div>
  );
}

export default GeoChart;
