import React, { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

export default function QuickShipment() {
  const [pickupAddresses, setPickupAddresses] = useState([{ address: '' }]);
  const [buyerDetails, setBuyerDetails] = useState([{ mobile: '', fullName: '', email: '', alternativeMobile: '', resellerName: '', buyerGstin: '' }]);

  const handlePickupChange = (index, event) => {
    const newPickupAddresses = [...pickupAddresses];
    newPickupAddresses[index][event.target.name] = event.target.value;
    setPickupAddresses(newPickupAddresses);
  };

  const handleBuyerDetailsChange = (index, event) => {
    const newBuyerDetails = [...buyerDetails];
    newBuyerDetails[index][event.target.name] = event.target.value;
    setBuyerDetails(newBuyerDetails);
  };

  const addPickupAddress = () => {
    setPickupAddresses([...pickupAddresses, { address: '' }]);
  };

  const addBuyerDetail = () => {
    setBuyerDetails([...buyerDetails, { mobile: '', fullName: '', email: '', alternativeMobile: '', resellerName: '', buyerGstin: '' }]);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-8xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Quick Shipment</h1>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Pick Up From</h2>
          {pickupAddresses.map((pickup, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700">Where is the order being sent from?</label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="address"
                  value={pickup.address}
                  onChange={(event) => handlePickupChange(index, event)}
                  className="block w-full pl-10 pr-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search your pick up address here by nickname or phone number"
                />
              </div>
            </div>
          ))}
          <button className="text-indigo-600 text-sm" onClick={addPickupAddress}>+ Add another pickup address</button>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Add Buyer&apos;s Details</h2>
          {buyerDetails.map((buyer, index) => (
            <div key={index} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-gray-700">Mobile number</label>
                <input
                  type="text"
                  name="mobile"
                  value={buyer.mobile}
                  onChange={(event) => handleBuyerDetailsChange(index, event)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your mobile number"
                />
              </div>
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={buyer.fullName}
                  onChange={(event) => handleBuyerDetailsChange(index, event)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={buyer.email}
                  onChange={(event) => handleBuyerDetailsChange(index, event)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
              {buyer.alternativeMobile && (
                <div>
                  <label className="block text-gray-700">Alternative Mobile number</label>
                  <input
                    type="text"
                    name="alternativeMobile"
                    value={buyer.alternativeMobile}
                    onChange={(event) => handleBuyerDetailsChange(index, event)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter alternative mobile number"
                  />
                </div>
              )}
              {buyer.resellerName && (
                <div>
                  <label className="block text-gray-700">Reseller Name</label>
                  <input
                    type="text"
                    name="resellerName"
                    value={buyer.resellerName}
                    onChange={(event) => handleBuyerDetailsChange(index, event)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter reseller name"
                  />
                </div>
              )}
              {buyer.buyerGstin && (
                <div>
                  <label className="block text-gray-700">Buyer GSTIN</label>
                  <input
                    type="text"
                    name="buyerGstin"
                    value={buyer.buyerGstin}
                    onChange={(event) => handleBuyerDetailsChange(index, event)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter buyer GSTIN"
                  />
                </div>
              )}
            </div>
          ))}
          <button className="text-indigo-600 text-sm mt-2" onClick={addBuyerDetail}>
            + Add Alternative mobile number, Reseller Name, Buyer GSTIN
          </button>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Where is the order being delivered? (Buyer&apos;s Address)</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-gray-700">Complete Address</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="House/Floor No., Building Name or Street, Locality"
              />
            </div>
            <div>
              <label className="block text-gray-700">Landmark (Optional)</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Any nearby post office, market, Hospital as the landmark"
              />
            </div>
            <div>
              <label className="block text-gray-700">Pincode</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Buyer&apos;s Pincode"
              />
            </div>
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your city"
              />
            </div>
            <div>
              <label className="block text-gray-700">State</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your state"
              />
            </div>
            <div>
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your Country"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
