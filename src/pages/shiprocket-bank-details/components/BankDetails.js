import React from 'react';

function BankDetails({ title, description }) {
  return (
    <div className="border-l-4 border-red-800 pl-2">
      <p className="text-[12px]">{title}</p>
      <p className="text-xl font-bold">{description}</p>
    </div>
  );
}

export default BankDetails;
