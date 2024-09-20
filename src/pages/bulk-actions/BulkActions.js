import React, { useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';

function BulkActions() {
  const [bulkActions, setBulkActions] = useState({
    orderID_TrackNumber: '',
    print: '',
  });

  const handleOrderDetails = (e) => {
    const { name, value } = e.target;
    console.log('name', name);

    setBulkActions({ ...bulkActions, [name]: value });
  };

  return (
    <PageWithSidebar>
      <div className="px-2">
        <div className="border-b bg-red-50 px-2 py-1">
          <p className="text-xl text-red-800">Bulk Actions</p>
        </div>
        <div className="w-[45%] px-4 py-2 text-sm">
          <div>
            <p className="font-semibold">
              Enter the Order ID(s) or the Tracking Numbers for which you would like to take action
            </p>
            <div className="mt-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="orderId"
                  value="orderId"
                  name="orderID_TrackNumber"
                  checked={bulkActions?.orderID_TrackNumber === 'orderId'}
                  onChange={handleOrderDetails}
                />
                <label htmlFor="orderId">Order ID</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="trackNumber"
                  value="trackNumber"
                  name="orderID_TrackNumber"
                  checked={bulkActions?.orderID_TrackNumber === 'trackNumber'}
                  onChange={handleOrderDetails}
                />
                <label htmlFor="orderId">Track Number</label>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p className="font-semibold">Select Action Type</p>
            <div className="mt-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="printLabel"
                  value="printLabel"
                  name="print"
                  checked={bulkActions?.print === 'printLabel'}
                  onChange={handleOrderDetails}
                />
                <label htmlFor="printLabel">Print Label </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="printInvoice"
                  value="printInvoice"
                  name="print"
                  checked={bulkActions?.print === 'printInvoice'}
                  onChange={handleOrderDetails}
                />
                <label htmlFor="orderId">Print Invoice</label>
              </div>
            </div>
          </div>
          <textarea
            className="mt-8 h-24 w-full rounded px-4 py-2"
            placeholder="Enter Comma Separated Value"></textarea>
          <button className="mt-3 rounded bg-red-800 px-4 py-2 text-white">Submit</button>
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default BulkActions;
