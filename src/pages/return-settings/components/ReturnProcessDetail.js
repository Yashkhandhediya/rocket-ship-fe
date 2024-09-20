import { faTractor } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function ReturnProcessDetail({ title, icon }) {
  return (
    <div className="flex w-1/5 flex-col gap-2">
      <FontAwesomeIcon
        icon={icon}
        className="self-center rounded-full bg-red-100 p-5 text-3xl text-red-800"
      />
      <p className="text-center text-[12px]">{title}</p>
    </div>
  );
}

export default ReturnProcessDetail;
