import React, { useState, useEffect } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { Loader } from '../../common/components';
import { ACCESS_TOKEN } from '../../common/utils/config';
// Import images statically
import shopifyImage from '../../common/icons/shopify.png';
import woocommerceImage from '../../common/icons/woocommerce.png';
import bigcommerceImage from '../../common/icons/bigcommerce.png';
import ChannelRow from './ChannelRow';

// Map of channel names/IDs to their corresponding image paths
const channelImages = {
  shopify: shopifyImage,
  woocommerce: woocommerceImage,
  bigcommerce: bigcommerceImage,
  // Add more mappings as needed
};

const Channels = () => {
  const navigate = useNavigate();
  const headers = {             
    'Content-Type': 'application/json',
    'Authorization': ACCESS_TOKEN};
  const [activeChannels, setActiveChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiChannels, setApiChannels] = useState([]);

  useEffect(() => {
    fetchActiveChannels();
    fetchApiChannels();
  }, []);

  const fetchActiveChannels = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/shopchannel/get_active_channel`,
        {headers:headers}
      );
      // Ensure the response data is an array
      if (Array.isArray(response.data)) {
        setActiveChannels(response.data);
      } else {
        console.error('Unexpected response data format:', response.data);
        toast.error('Unexpected response format. Please try again later.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page on 401 Unauthorized
        localStorage.clear()
        navigate('/login');
      }
      console.error('Error fetching active channels:', error);
      toast.error('Failed to fetch active channels. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const id_user = localStorage.getItem('user_id')
  const fetchApiChannels = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/shopchannel/get_store_by_user_id`,
        {headers:headers}
      );
      if (Array.isArray(response.data)) {
        setApiChannels(response.data);
      } else {
        console.error('Unexpected response data format:', response.data);
        toast.error('Unexpected response format from API. Please try again later.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page on 401 Unauthorized
        localStorage.clear()
        navigate('/login');
      }
      console.error('Error fetching API channels:', error);
      toast.error('Failed to fetch channels from API. Please try again later.');
    }
  };

  return (
    <PageWithSidebar>
      <div className="mb-8">
        <div className="flex items-center justify-between border-b bg-gray-100 p-4">
          <div>
            <h2 className="text-2xl font-semibold">Sales Channels</h2>
            <p className="text-sm text-gray-500">
              Connect & manage your sales channels to automate order syncing with Shiprocket
            </p>
          </div>
          {/* <button className="rounded bg-[#E02424] bg-opacity-25 px-4 py-2 text-[#E02424]">
            Connect New Channel
          </button> */}
        </div>

        <div className="flex flex-col">
          {loading ? (
            <Loader /> // Show loader while data is being fetched
          ) : (
            <div className="m-1 my-2 ms-2 flex items-center justify-between border-b bg-white p-4 shadow-sm">
              <div className="flex-1 font-semibold">Store Name/Channel ID</div>
              <div className="flex-1 text-justify font-semibold">Sales Channel</div>
              <div className="flex-1 text-center font-semibold">Sync Info.</div>
              <div className="flex-1 text-center font-semibold">Channel Status</div>
              <div className="flex-1 text-center font-semibold">Action</div>
            </div>
          )}
          {apiChannels.map((channel) => {
            const shopNameLow = channel.store_name ? channel.store_name.toLowerCase() : '';
            const channelImage = channelImages[shopNameLow];

            return (
              <ChannelRow
                key={channel.id}
                storeName={channel.store_name}
                storeCode={channel.name}
                salesChannel={channelImage} // Corrected to use channelImage
                lastOrderSync="Last Order Sync"
                lastOrderSyncStatus={`Last Order Sync ${channel.lastOrderSyncStatus}`}
                lastInventorySync="Last Inventory Sync"
                lastInventorySyncStatus={`Last Inventory Sync ${channel.lastInventorySyncStatus}`} // Corrected variable name
                channelStatus={channel.is_active}
              />
            );
          })}
        </div>

        <div className="flex h-auto w-full flex-col rounded bg-white px-5 py-6 shadow">
          <p className="mb-6 text-[20px] font-[500] text-black">
            Most popularly connected E-commerce, Shopping carts and Marketplaces
          </p>
          <div className="flex flex-row flex-wrap gap-8">
            {loading ? (
              <Loader /> // Show loader while data is being fetched
            ) : (
              activeChannels.map((channel) => {
                const shopNameLower = channel.shopname ? channel.shopname.toLowerCase() : '';
                const channelImage = channelImages[shopNameLower];

                return (
                  <div
                    key={channel.id} // Assuming each channel has a unique ID
                    className="flex h-96 h-[200px] w-[30%] flex-col items-center justify-start rounded-lg bg-red-100"
                  >
                    <div className="mt-1 flex h-2/3 flex-col items-center justify-center">
                      <div className="flex w-[15rem] items-center justify-center rounded-full border-0">
                        {channelImage ? (
                          <img src={channelImage} alt={channel.shopname} /> // Assuming channel has a shopname property
                        ) : (
                          <p>No image available</p> // Placeholder text if image is not found
                        )}
                      </div>
                    </div>
                    <div className="flex h-1/3 items-center justify-center text-[14px] font-normal text-[#E02424]">
                      <button
                        className={`w-32 rounded-md border border-[#E02424] bg-white py-0.5 ${
                          localStorage.getItem('is_kyc') == 1 || localStorage.getItem('is_kyc') == 2
                            ? 'cursor-not-allowed'
                            : ''
                        }`}
                        onClick={() => {
                          navigate('/channels/add_channel', { state: channel.id });
                        }}
                        disabled={localStorage.getItem('is_kyc') == 1 || localStorage.getItem('is_kyc') == 2}
                      >
                        Connect
                      </button>
                    </div>
                    <div className="flex h-1/3 items-center justify-center text-[14px] font-normal text-[#999]">
                      <p className="mpc-b-h m-0">
                        <span>
                          Clicking “Connect” redirects you to {channel.shopname || 'the channel'} Channel
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {/* <div className="flex justify-center">
            <div
              className="mt-6 cursor-pointer font-semibold"
              onClick={() => {
                navigate('/channels/add_channel');
              }}
            >
              View all channels
            </div>
          </div> */}
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Channels;
