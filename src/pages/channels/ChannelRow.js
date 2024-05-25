import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const ChannelRow = ({
  storeName,
  storeCode,
  salesChannel,
  lastOrderSyncStatus,
  lastOrderSync,
  lastInventorySyncStatus,
  lastInventorySync,
  channelStatus,
}) => {
  const [enabled, setEnabled] = React.useState(channelStatus);
  const navigate = useNavigate();

  const handleToggle = () => {
    setEnabled(!enabled);
    toast(`This channel has been ${enabled ? 'deactivated You cannot now fetch orders from this channel.' : 'activated. You can now fetch orders from this channel.'}`, { type: 'info' });
  };

  return (
    <div className="m-1 my-2 ms-2 flex items-center justify-evenly border-b bg-white p-4 shadow-sm">
      <div className="flex-1">
        <span className="text-sm font-semibold">{storeName}</span>
        <br />
        <span className="text-sm  text-gray-500">{storeCode}</span>
      </div>

      <div className="flex-1 text-center ">
        <img src={salesChannel} alt={storeName} className="h-[40%] w-[40%]" />
      </div>
      <div className="flex-2">
        <span className="text-sm text-gray-500">{lastOrderSync}: </span>
        <span className="text-sm font-semibold">{lastOrderSyncStatus}</span>
        <br />
        <span className="text-sm text-gray-500">{lastInventorySync}: </span>
        <span className="text-sm font-semibold">{lastInventorySyncStatus}</span>
      </div>
      <div className="flex-1 text-center">
        <label className="me-5 inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            value=""
            className="peer sr-only"
            checked={enabled}
            onChange={handleToggle}
          />
          <div
            className="dark:bg-gray-700 dark:peer-focus:ring-green-800 dark:border-gray-600 peer relative h-6 w-12 rounded-full bg-gary-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-green-700 after:transition-all after:content-[''] peer-checked:bg-gray-200 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-1 peer-focus:ring-green-600 rtl:peer-checked:after:-translate-x-full"></div>
        </label>
      </div>
      
      <div className="flex-1 text-center">
        <button className="w-32 rounded-md border border-[#E02424] bg-white py-0.5" onClick={() => {
                navigate('/channels/add_channel');
              }}> Reconnect</button>
      </div>
    </div>
  );
};

export default ChannelRow;
