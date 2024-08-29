import React from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { Link } from 'react-router-dom';
import BankDetails from './components/BankDetails';

function ShiprocketBankDetails() {
  const bankDetails = [
    {
      title: 'Entity Name',
      description: 'Cargo Cloud',
    },
    {
      title: 'Account Number',
      description: 'BFRS3970970',
    },
    {
      title: 'RTGS/NEFT/IFSC Code',
      description: 'ICIC0000104',
    },
    {
      title: 'Bank',
      description: 'others',
    },
    {
      title: 'Branch',
      description: 'others',
    },
  ];

  return (
    <PageWithSidebar>
      <div className="ml-4">
        <p className="border-b border-gray-500 bg-red-100 px-3 py-1 text-xl">
          Settings - Cargo Cloud Bank Details
        </p>
        <div className="rounded-b-lg bg-zinc-200 p-3">
          <p className=" font-semibold">
            <Link to={`/settings`} className="text-red-800">
              Settings
            </Link>
            {` > Billing > Cargo Cloud Bank Details`}
          </p>
          <div className="my-2 rounded-lg bg-white p-6 text-gray-600">
            <p className="pb-2 text-xl font-bold">Cargo Cloud Bank Details</p>
            <p className="text-[12px]">All Payments by transfer/check/DD should be drawn in favour of</p>
            <div className="my-4 flex justify-between">
              {bankDetails &&
                bankDetails.map((details, index) => {
                  return <BankDetails key={index} {...details} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default ShiprocketBankDetails;
