import React from 'react';

function ShipmentTable({ orderDetails }) {
  const formatDate = (date) => {
    const dateW = date.split(' ')[0];
    const formatted = dateW.split('-').reverse().join('-');
    return formatted;
  };

  return (
    <div className="mt-4 w-full rounded-xl bg-white p-4 text-center">
      <p className="mb-4 text-left font-semibold text-gray-500">Recent Shipment</p>
      <table className="w-full border-t-2 border-gray-300 text-left text-[12px] text-gray-400">
        <thead>
          <tr>
            <th className="w-1/4 border px-2 py-2">Order ID</th>
            <th className="w-1/4 border px-2 py-2">Shipped Date</th>
            <th className="w-1/4 border px-2 py-2">Status</th>
            <th className="w-1/4 border px-2 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails &&
            orderDetails.map((data) => {
              return (
                <tr key={data.order_id}>
                  <td className="w-1/4 border px-2 py-2">{data.order_id}</td>
                  <td className="w-1/4 border px-2 py-2">{formatDate(data.date)}</td>
                  <td className="w-1/4 border px-2 py-2">{data.order_status}</td>
                  <td className="w-1/4 border px-2 py-2">NA</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button className="mt-8 rounded bg-red-800 px-4 py-1 text-sm text-white">Show more</button>
    </div>
  );
}

export default ShipmentTable;
