import React, { useState } from 'react';
import ReturnPolicySettings from './ReturnPolicySettings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { noOrdersFound } from '../../common/images';
import { instantRefundDetails, selectRefundDetails } from './constants';
import RefundMode from './components/RefundMode';

function RefundSetting() {
  const [enableOption, setEnableOption] = useState(false);
  const [selectedOrderTypes, setSelectedOrderTypes] = useState([]);
  const [checkedModes, setCheckedModes] = useState({
    backToSource: false,
    storeCredits: false,
    upiTransfer: false,
    bankTransfer: false,
    payoutLink: false,
  });
  const [expirationYears, setExpirationYears] = useState('1');
  const [selectedOption, setSelectedOption] = useState('years'); // Default to 'Days'

  const handleExpirationChange = (event) => {
    setExpirationYears(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckboxChange = (mode) => {
    setCheckedModes((prevModes) => ({
      ...prevModes,
      [mode]: !prevModes[mode],
    }));
  };

  const handleOrderTypeChange = (orderType, mode) => {
    setSelectedOrderTypes((prevSelectedOrderTypes) => {
      const currentTypes = prevSelectedOrderTypes[mode] || [];
      if (currentTypes.includes(orderType)) {
        return {
          ...prevSelectedOrderTypes,
          [mode]: currentTypes.filter((type) => type !== orderType),
        };
      } else {
        return {
          ...prevSelectedOrderTypes,
          [mode]: [...currentTypes, orderType],
        };
      }
    });
  };


  return (
    <ReturnPolicySettings>
      <div className="flex h-full w-full flex-col">
        <div className="4/5 h-full w-full rounded-lg bg-white px-6 py-4 shadow">
          <p className="text-lg font-bold">Refund Settings</p>
          <div className="my-3 rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="mb-4 flex justify-between">
              <div>
                <p className="text-sm font-semibold">Enable Refund option on return orders</p>
                <p className="text-[12px] text-gray-500">
                  To process refunds from Shiprocket return panel, please enable and configure some rules and
                  permissions to define your refund policy.
                </p>
              </div>
              <div className=" flex items-center gap-2">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    value={enableOption}
                    onChange={() => setEnableOption((prev) => !prev)}
                    className="peer sr-only"
                  />
                  <div className="dark:border-gray-600 peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
                </label>
              </div>
            </div>
            <p className="flex items-center rounded-lg bg-yellow-50 p-2 text-[12px] text-gray-500">
              <FontAwesomeIcon icon={faCircleExclamation} className="pr-2 text-xl text-yellow-300" />
              <strong>Note</strong>: The same refund options will be available for your buyers from the
              tracking page return flow.
            </p>
          </div>
          {!enableOption && (
            <div className="grid w-full place-items-center bg-white p-4">
              <img src={noOrdersFound} alt="no orders found" className="w-[140px]" />
              <div className=" w-[500px] text-center text-sm">
                {
                  'You will be able to initate refunds through Store Credits, Instant Refund Modes, such as UPI,Bank Transfer, and Payout Links Auto-refund'
                }
              </div>
            </div>
          )}
        </div>
        {enableOption && (
          <>
            <div className="4/5 mt-4 h-full w-full rounded-lg bg-white px-6 py-4 shadow">
              <p className="text-[17px] font-bold">Select Refund Modes</p>
              <p className="mb-4 text-[12px]  text-gray-500">
                Enable the refund modes through which you want to refund the money back to the buyer.
              </p>
              <div className="mb-4 flex justify-between">
                <div className="w-[60%]">
                  <p className="text-sm font-semibold">1. Manual Refund Mode (Always Active)</p>
                  <p className="text-[12px] text-gray-500">
                    If you process your refunds manually to a buyer, you can update the refund status on
                    Shiprocket panel using this mode by providing the UTR number (Unique Taxpayer Reference
                    No.)
                  </p>
                </div>
                <div className=" flex items-center gap-2">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" checked={true} className="peer sr-only" />
                    <div className="dark:border-gray-600 peer h-4 w-7 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-3 after:w-3 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
                  </label>
                </div>
              </div>

              <div className="mb-4 flex justify-between">
                <div className="w-[60%]">
                  <p className="text-sm font-semibold">2. Back to source</p>
                  <p className="text-[12px] text-gray-500">
                    The refunded amount is credited back by using the original payment method. This is only applicable for Prepaid orders.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={checkedModes.backToSource}
                      onChange={() => handleCheckboxChange('backToSource')}
                      className="peer sr-only"
                    />
                    <div className="dark:border-gray-600 peer h-4 w-7 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-3 after:w-3 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
                  </label>
                </div>
              </div>

              {checkedModes.backToSource && (
                <div className="mb-4 bg-red-50 border border-red-200 p-4 rounded-lg">
                  <h2 className="text-sm font-semibold mb-2">Select the order type for which you need to enable this mode:</h2>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <span>Order Type</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="1"
                        checked={selectedOrderTypes['backToSource']?.includes('1')}
                        onChange={() => handleOrderTypeChange('1', 'backToSource')}
                        className="mr-2 border-red-500 text-red-500 focus:ring-red-500"
                      />
                      <span className="text-[12px] text-gray-500">Prepaid</span>
                    </label>
                  </div>
                </div>
              )}


              <div className="mb-4 flex justify-between">
                <div className="w-[60%]">
                  <p className="text-sm font-semibold">3. Store Credits</p>
                  <p className="text-[12px] text-gray-500">
                    The refunded amount is credited as store credits that can be used for future purchases.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={checkedModes.storeCredits}
                      onChange={() => handleCheckboxChange('storeCredits')}
                      className="peer sr-only"
                    />
                    <div className="dark:border-gray-600 peer h-4 w-7 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-3 after:w-3 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
                  </label>
                </div>
              </div>

              {checkedModes.storeCredits && (
                <div>
                  <div className="mb-4 bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h2 className="text-sm font-semibold mb-2">Select the order type for which you need to enable this mode:</h2>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <span>Order Type</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          value="1"
                          checked={selectedOrderTypes['storeCredits']?.includes('1')}
                          onChange={() => handleOrderTypeChange('1', 'storeCredits')}
                          className="mr-2 border-red-500 text-red-500 focus:ring-red-500"
                        />
                        <span className="text-[12px] text-gray-500">Prepaid</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          value="2"
                          checked={selectedOrderTypes['storeCredits']?.includes('2')}
                          onChange={() => handleOrderTypeChange('2', 'storeCredits')}
                          className="mr-2 border-red-500 text-red-500 focus:ring-red-500"
                        />
                        <span className="text-[12px] text-gray-500">Cash on Delivery</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-4 flex justify-between">
                    <div className="w-[60%]">
                      <p className="text-sm font-semibold">Store credit expiration</p>
                      <p className="text-[12px] text-gray-500">
                        You can customize the validity of the store credits that will be refunded to your buyer.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {selectedOption !== 'never' && (
                          <input
                            type="number"
                            value={expirationYears}
                            onChange={handleExpirationChange}
                            className="border border-gray-300 rounded-md px-4 py-2 mr-3 w-[100px] text-sm"

                          />
                        )}
                        <select
                          value={selectedOption}
                          onChange={handleOptionChange}
                          className="border border-gray-300 text-sm rounded-md px-4 py-2 w-[100px]"

                        >
                          <option value="days">Days</option>
                          <option value="months">Months</option>
                          <option value="years">Years</option>
                          <option value="never">Never</option>
                        </select>
                      </div>
                      
                    </div>
                  </div>
                  <p className="flex items-center rounded-lg bg-yellow-50 p-2 text-[12px] text-gray-500 mb-4">
                        <FontAwesomeIcon icon={faCircleExclamation} className="pr-2 text-xl text-yellow-300" />
                        <strong>Note</strong>: For Shopify and Wocommerce channel, coupon code will be created automatically. In other cases, you’ll have to provide a coupon code to
                        be shared with your customer.
                      </p>
                </div>


              )}

              <div className="mb-5 flex justify-between">
                <div className="w-[60%]">
                  <p className="text-sm font-semibold">4. Instant Refund Modes</p>
                  <p className="text-[12px] text-gray-500">
                    Make quick and effective refund payments using Bank transfer, UPI, & Payout Links. Please
                    note - Razorpay Integration is required to use these payment modes.
                  </p>
                </div>
                <div className=" flex items-center gap-2">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      //   value={enableOption}
                      //   onChange={() => setEnableOption((prev) => !prev)}
                      className="peer sr-only"
                    />
                    <div className="dark:border-gray-600 peer h-4 w-7 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-3 after:w-3 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
                  </label>
                </div>
              </div>
              <div className="mb-3 rounded-xl border border-red-200 bg-red-50 p-4">
                <div className="flex justify-between">
                  <div className="w-[60%]">
                    <p className="text-sm font-semibold">Connect RAZORPAY to enable modes below</p>
                    <p className="text-[12px] text-gray-500">
                      Connect your RazorpayX account with Shiprocket to use the instant refund modes. Learn
                      More about RazorpayX API Authentication.
                    </p>
                  </div>
                  <div className="my-4 text-center">
                    <button className=" w-32 rounded-lg bg-red-800 px-4 py-2 text-sm font-semibold text-white">
                      connect
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-4 flex justify-between">
                <div className="w-[60%]">
                  <p className="text-sm font-semibold">4a. UPI Transfer</p>
                  <p className="text-[12px] text-gray-500">
                    Refund through UPI transfer to the buyer&apos;s UPI ID.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={checkedModes.upiTransfer}
                      onChange={() => handleCheckboxChange('upiTransfer')}
                      className="peer sr-only"
                    />
                    <div className="dark:border-gray-600 peer h-4 w-7 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-3 after:w-3 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
                  </label>
                </div>
              </div>
              {checkedModes.upiTransfer && (
                <div className="mb-4 bg-red-50 border border-red-200 p-4 rounded-lg">
                  <h2 className="text-sm font-semibold mb-2">Select the order type for which you need to enable this mode:</h2>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <span>Order Type</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="1"
                        checked={selectedOrderTypes['upiTransfer']?.includes('1')}
                        onChange={() => handleOrderTypeChange('1', 'upiTransfer')}
                        className="mr-2 border-red-500 text-red-500 focus:ring-red-500"
                      />
                      <span className="text-[12px] text-gray-500">Prepaid</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="2"
                        checked={selectedOrderTypes['upiTransfer']?.includes('2')}
                        onChange={() => handleOrderTypeChange('2', 'upiTransfer')}
                        className="mr-2 border-red-500 text-red-500 focus:ring-red-500"
                      />
                      <span className="text-[12px] text-gray-500">Cash on Delivery</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="mb-4 flex justify-between">
                <div className="w-[60%]">
                  <p className="text-sm font-semibold">4b. Bank Transfer</p>
                  <p className="text-[12px] text-gray-500">
                    Refund through direct bank transfer to the buyer&apos;s bank account.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={checkedModes.bankTransfer}
                      onChange={() => handleCheckboxChange('bankTransfer')}
                      className="peer sr-only"
                    />
                    <div className="dark:border-gray-600 peer h-4 w-7 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-3 after:w-3 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
                  </label>
                </div>
              </div>

              {checkedModes.bankTransfer && (
                <div className="mb-4 bg-red-50 border border-red-200 p-4 rounded-lg">
                  <h2 className="text-sm font-semibold mb-2">Select the order type for which you need to enable this mode:</h2>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <span>Order Type</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="1"
                        checked={selectedOrderTypes['bankTransfer']?.includes('1')}
                        onChange={() => handleOrderTypeChange('1', 'bankTransfer')}
                        className="mr-2 border-red-500 text-red-500 focus:ring-red-500"
                      />
                      <span className="text-[12px] text-gray-500">Prepaid</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="2"
                        checked={selectedOrderTypes['bankTransfer']?.includes('2')}
                        onChange={() => handleOrderTypeChange('2', 'bankTransfer')}
                        className="mr-2 border-red-500 text-red-500 focus:ring-red-500"
                      />
                      <span className="text-[12px] text-gray-500">Cash on Delivery</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="mb-4 flex justify-between">
                <div className="w-[60%]">
                  <p className="text-sm font-semibold">4c. Payout Link</p>
                  <p className="text-[12px] text-gray-500">
                    Refund through a payout link sent to the buyer&apos;s email or phone.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={checkedModes.payoutLink}
                      onChange={() => handleCheckboxChange('payoutLink')}
                      className="peer sr-only"
                    />
                    <div className="dark:border-gray-600 peer h-4 w-7 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-3 after:w-3 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
                  </label>
                </div>
              </div>
              {checkedModes.payoutLink && (
                <div className="mb-4 bg-red-50 border border-red-200 p-4 rounded-lg">
                  <h2 className="text-sm font-semibold mb-2">Select the order type for which you need to enable this mode:</h2>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <span>Order Type</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="1"
                        checked={selectedOrderTypes['payoutLink']?.includes('1')}
                        onChange={() => handleOrderTypeChange('1', 'payoutLink')}
                        className="mr-2 border-red-500 text-red-500 focus:ring-red-500"
                      />
                      <span className="text-[12px] text-gray-500">Prepaid</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="2"
                        checked={selectedOrderTypes['payoutLink']?.includes('2')}
                        onChange={() => handleOrderTypeChange('2', 'payoutLink')}
                        className="mr-2 border-red-500 text-red-500 focus:ring-red-500"
                      />
                      <span className="text-[12px] text-gray-500">Cash on Delivery</span>
                    </label>
                  </div>
                </div>
              )}
            </div>



            <div className="4/5 mt-4 h-full w-full rounded-lg bg-white px-6 py-4 shadow">
              <p className="text-[17px] font-bold">Auto-Refund Mode</p>
              <p className="mb-4 w-[60%] text-[12px]  text-gray-500">
                Automate your refund payment process for Store Credits and Bank Transfer refund modes User can
                also access the reference no. of transaction after refund is initiated.
              </p>

              <div className="mb-5 flex justify-between">
                <div className="w-[60%]">
                  <p className="text-sm font-semibold">When would you like to initiate the auto refund ?</p>
                  <p className="text-[12px] text-gray-500">
                    Please select the status at which you want to initiate the auto-refund to the buyer
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select className="rounded-lg text-[12px]">
                    <option>Return Acknowledge</option>
                    <option>Return Delivered</option>
                    <option>Return Picked Up</option>
                  </select>
                </div>
              </div>
              <div className="mb-5 flex justify-between">
                <div className="w-[60%]">
                  <p className="text-sm font-semibold">Enable Auto Refund in case of Store Credits</p>
                  <p className="text-[12px] text-gray-500">
                    Note : This is only for Shopify and Wocommerce channel.
                  </p>
                </div>
                <div className=" flex items-center gap-2">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      //   value={enableOption}
                      //   onChange={() => setEnableOption((prev) => !prev)}
                      className="peer sr-only"
                    />
                    <div className="dark:border-gray-600 peer h-4 w-7 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-3 after:w-3 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
                  </label>
                </div>
              </div>
              <div className="mb-5 flex justify-between">
                <div className="w-[60%]">
                  <p className="text-sm font-semibold">Enable Auto Refund in case of Bank Transfer</p>
                  <p className="text-[12px] text-gray-500">
                    A transaction will be automatically initiated against the shared account number once the
                    order reaches the selected status.
                  </p>
                </div>
                <div className=" flex items-center gap-2">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      //   value={enableOption}
                      //   onChange={() => setEnableOption((prev) => !prev)}
                      className="peer sr-only"
                    />
                    <div className="dark:border-gray-600 peer h-4 w-7 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-3 after:w-3 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
                  </label>
                </div>
              </div>
              <p className="flex items-center rounded-lg bg-yellow-50 p-2 text-[12px] text-gray-500">
                <FontAwesomeIcon icon={faCircleExclamation} className="pr-2 text-xl text-yellow-300" />
                <strong>Note</strong>: RazorpayX account should be connected and Bank Transfer payment mode
                should be enabled.
              </p>
            </div>
          </>
        )}
        <div className="my-4 w-full text-center">
          <button className=" w-24 rounded-lg bg-red-800 px-4 py-2 text-white">Save</button>
        </div>
      </div>
    </ReturnPolicySettings>
  );
}

export default RefundSetting;
