import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { noShipment } from '../../../../common/images';

const DonutChart = ({ data, title }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    if (chartRef.current && data && data.datasets && data.datasets.length > 0) {
      chartInstance.current = new Chart(chartRef.current, {
        type: 'doughnut',
        data: data,
        options: {
          cutout: '65%',
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 20,
                boxWidth: 10,
                boxHeight: 10,
                font: {
                  size: 12,
                },
              }
            },
          },
          maintainAspectRatio: false,
        }
      });
    }
  }, [data, title]);

  const hasData = data && data.datasets && data.datasets.length > 0;

  return (
    <div className="mt-4 flex flex-col bg-gray-100 border shadow-md rounded-md flex-1 px-5 py-3" style={{ height: '400px', width: '400px' }}>
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <span>Last 30 Days</span>
      </div>
      <div className="p-4" style={{ position: 'relative', height: 'calc(100% - 50px)' }}>
        {hasData ? (
          <canvas ref={chartRef}></canvas>
        ) : (
          <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col' style={{ height: '100%' }}>
            <img src={noShipment} alt="" width={'100px'} />
            <div className='text-[1.3rem] mt-10 text-[#b54040] font-semibold'>No Shipment Delivered in last 30 days.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonutChart;
