import React from 'react';

const ChannelRow = ({ storeName, storeCode, salesChannel,lastOrderSyncStatus, lastOrderSync, lastInventorySyncStatus, lastInventorySync, channelStatus }) => {
const [enabled, setEnabled] = React.useState(channelStatus);

  return (
    <div className="flex shadow-sm items-center justify-evenly p-4 m-1 my-2 bg-white ms-2 border-b">

      <div className="flex-1">
      <span className="text-sm">{storeName}</span><br/>
      <span className="text-sm  text-gray-500">{storeCode}</span>
      </div>

      <div className="flex-1 text-center ">
        <img src={salesChannel} alt={storeName} className="h-[40%] w-[40%]" />
      </div>
      <div className="flex-2">

      <span className="text-sm text-gray-500">{lastOrderSync}: </span>
      <span className="text-sm font-semibold">{lastOrderSyncStatus}</span><br/>
      <span className="text-sm text-gray-500">{lastInventorySync}: </span>
      <span className="text-sm font-semibold">{lastInventorySyncStatus}</span>
      </div>
      <div className="flex-1 text-center">
        <label className="inline-flex items-center me-5 cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={enabled}
            onChange={() => setEnabled(!enabled)}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        
        </label>
      </div>
      <div className="flex-1 text-center">
        <button className={`w-32 rounded-md border border-[#E02424] bg-white py-0.5`}> Reconnect
        </button>
      </div>
    </div>
  );
};

export default ChannelRow;
