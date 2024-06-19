import React, { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

export default function QuickShipment() {
  const [pickupAddresses, setPickupAddresses] = useState([{ address: '' }]);
  const [buyerDetails, setBuyerDetails] = useState([{ mobile: '', fullName: '', email: '', alternativeMobile: '', resellerName: '', buyerGstin: '' }]);
  const [products, setProducts] = useState([{ name: '', quantity: 1, unitPrice: 0 }]);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [deadWeight, setDeadWeight] = useState(0);
  const [dimensions, setDimensions] = useState({ length: 0, breadth: 0, height: 0 });
  const [volumetricWeight, setVolumetricWeight] = useState(0);
  const [applicableWeight, setApplicableWeight] = useState(0);


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

  const handleProductChange = (index, event) => {
    const newProducts = [...products];
    newProducts[index][event.target.name] = event.target.value;
    setProducts(newProducts);
  };

  const addPickupAddress = () => {
    setPickupAddresses([...pickupAddresses, { address: '' }]);
  };

  const addBuyerDetail = () => {
    setBuyerDetails([...buyerDetails, { mobile: '', fullName: '', email: '', alternativeMobile: '', resellerName: '', buyerGstin: '' }]);
  };

  const addProduct = () => {
    setProducts([...products, { name: '', quantity: 1, unitPrice: 0 }]);
  };

  const toggleBillingSameAsShipping = () => {
    setBillingSameAsShipping(!billingSameAsShipping);
  };

  const handleWeightChange = (e) => {
    const value = parseFloat(e.target.value);
    setDeadWeight(value);
    calculateApplicableWeight(value, dimensions);
  };

  const handleDimensionsChange = (e) => {
    const { name, value } = e.target;
    const newDimensions = { ...dimensions, [name]: parseFloat(value) };
    setDimensions(newDimensions);
    const volumetricWeight = calculateVolumetricWeight(newDimensions);
    setVolumetricWeight(volumetricWeight);
    calculateApplicableWeight(deadWeight, newDimensions);
  };

  const calculateVolumetricWeight = (dims) => {
    const { length, breadth, height } = dims;
    return (length * breadth * height) / 5000;
  };

  const calculateApplicableWeight = (weight, dims) => {
    const volumetricWeight = calculateVolumetricWeight(dims);
    setApplicableWeight(Math.max(weight, volumetricWeight));
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
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Billing Address</h2>
          <div className="mb-4">
            <label className="block text-gray-700">
              <input
                type="checkbox"
                checked={billingSameAsShipping}
                onChange={toggleBillingSameAsShipping}
                className="mr-2"
              />
              Billing address is same as the shipping address
            </label>
          </div>
          {!billingSameAsShipping && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-gray-700">Billing Address</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter billing address"
                />
              </div>
              <div>
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-gray-700">State</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="State"
                />
              </div>
              <div>
                <label className="block text-gray-700">Zip Code</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Zip Code"
                />
              </div>
            </div>
          )}
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          {products.map((product, index) => (
            <div key={index} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-4">
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={(event) => handleProductChange(index, event)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter or search your product name"
                />
              </div>
              <div>
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={(event) => handleProductChange(index, event)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-gray-700">Unit Price</label>
                <input
                  type="number"
                  name="unitPrice"
                  value={product.unitPrice}
                  onChange={(event) => handleProductChange(index, event)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-gray-700">Total Price</label>
                <input
                  type="number"
                  value={(product.quantity * product.unitPrice).toFixed(2)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="0.00"
                  readOnly
                />
              </div>
            </div>
          ))}
          <button className="text-indigo-600 text-sm mt-2" onClick={addProduct}>
            + Add another product
          </button>
        </section>

        <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Package Details</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="block text-gray-700">Dead Weight</label>
          <div className="relative flex items-center mt-1">
  <input
    type="number"
    step="0.001"
    value={deadWeight}
    onChange={handleWeightChange}
    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-12"
    placeholder="0.00"
  />
  <span className="absolute right-0 inset-y-0 flex items-center px-2 py-1 bg-gray-200 border border-gray-300 rounded-r-md text-gray-500 text-sm">Kg</span>
</div>

          <p className="text-gray-500 text-sm mt-1">
            (Max: 3 digits after decimal place) <br />
            Note: The minimum chargeable weight is 0.50 kg.
          </p>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-gray-700">Enter package dimensions (L*B*H) to calculate Volumetric Weight</label>
          <div className="grid grid-cols-3 gap-4 mt-1">
            <div className="relative flex items-center mt-1">
              <input
                type="number"
                step="0.01"
                name="length"
                value={dimensions.length}
                onChange={handleDimensionsChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
              <span className="absolute right-0 inset-y-0 flex items-center px-2 py-1 bg-gray-200 border border-gray-300 rounded-r-md text-gray-500 text-sm">CM</span>
            </div>
            <div className="relative flex items-center mt-1">
              <input
                type="number"
                step="0.01"
                name="breadth"
                value={dimensions.breadth}
                onChange={handleDimensionsChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
              <span className="absolute right-0 inset-y-0 flex items-center px-2 py-1 bg-gray-200 border border-gray-300 rounded-r-md text-gray-500 text-sm">CM</span>
            </div>
            <div className="relative flex items-center mt-1">
              <input
                type="number"
                step="0.01"
                name="height"
                value={dimensions.height}
                onChange={handleDimensionsChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
              <span className="absolute right-0 inset-y-0 flex items-center px-2 py-1 bg-gray-200 border border-gray-300 rounded-r-md text-gray-500 text-sm">CM</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Note: Dimension should be in centimeters only, & values should be greater than 0.50 cm.
          </p>
        </div>
      </div>
      <div className="mt-4 bg-cyan-50 p-4 rounded">
        <h3 className="text-md font-medium">Volumetric Weight</h3>
        <p className="text-gray-700">{volumetricWeight.toFixed(2)} Kg</p>
      </div>
      <div className="mt-4 bg-teal-50 p-4 rounded">
        <h3 className="text-md font-medium">Applicable Weight</h3>
        <p className="text-gray-700">{applicableWeight.toFixed(2)} Kg</p>
        <p className="text-gray-500 text-sm mt-2">
        *Applicable weight is the heavier among the two weights that is Dead Weight Vs the Volumetric Weight, basis on which freight charges are calculated.
        <br />
        *Final chargeable weight will be based on the weight slab of the courier selected before shipping.
      </p>
      </div>
     
    </section>
       
        <div className="mt-8 flex justify-end">
          <button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700">
            Submit
          </button>
        </div>
</div>
    </div>
  );
}

