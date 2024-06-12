import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

function OrdersOverview({ title, value }) {
  return (
    <div className="flex w-full items-center overflow-hidden rounded-xl bg-white">
      <div className="flex w-1/2 flex-col gap-4 bg-zinc-500 p-4 text-center text-white">
        <FontAwesomeIcon icon={faBagShopping} className="text-4xl" />
        <p className="text-[12px] font-semibold">{title}</p>
      </div>
      <div className="w-1/2 text-center text-3xl font-bold text-red-800">
        <p>{value}</p>
      </div>
    </div>
  );
}

export default OrdersOverview;
