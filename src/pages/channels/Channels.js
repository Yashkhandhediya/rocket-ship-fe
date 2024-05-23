import React, { useState, useEffect } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { Loader } from '../../common/components';

// Import images statically
import shopifyImage from '../../common/icons/shopify.png';
import woocommerceImage from '../../common/icons/woocommerce.png';
import bigcommerceImage from '../../common/icons/bigcommerce.png';


// Map of channel names/IDs to their corresponding image paths
const channelImages = {
    shopify: shopifyImage,
    woocommerce: woocommerceImage,
    bigcommerce: bigcommerceImage,
    // Add more mappings as needed
};


const Channels = () => {
    const navigate = useNavigate();
    const [activeChannels, setActiveChannels] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchActiveChannels();
    }, []);

    const fetchActiveChannels = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BACKEND_URL}/shopchannel/get_active_channel`);
            // Ensure the response data is an array
            if (Array.isArray(response.data)) {
                setActiveChannels(response.data);
            } else {
                console.error('Unexpected response data format:', response.data);
                toast.error('Unexpected response format. Please try again later.');
            }
        } catch (error) {
            console.error('Error fetching active channels:', error);
            toast.error('Failed to fetch active channels. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWithSidebar>
            <div className="flex flex-col bg-white h-auto rounded w-full py-6 px-5 shadow">
                <p className="text-[20px] text-black font-[500] mb-6">
                    Most popularly connected E-commerce, Shopping carts and Marketplaces
                </p>
                <div className="flex gap-8 flex-row">
                    {loading ? (
                        <Loader /> // Show loader while data is being fetched
                    ) : (
                        activeChannels.map((channel) => {
                            const shopNameLower = channel.shopname ? channel.shopname.toLowerCase() : '';
                            const channelImage = channelImages[shopNameLower];
                            console.log(channel)
                            console.log(`Channel: ${channel.shopname}, shopNameLower ${shopNameLower} Image: ${channelImage}`);

                            return (
                                <div
                                    key={channel.id} // Assuming each channel has a unique ID
                                    className="flex w-[32%] h-[200px] bg-red-100 justify-start items-center h-96 flex-col rounded-lg"
                                >
                                    <div className="flex flex-col items-center justify-center mt-1 h-2/3">
                                        <div className="border-0 w-[15rem] flex justify-center items-center rounded-full">
                                            {channelImage ? (
                                                <img src={channelImage} alt={channel.shopname} /> // Assuming channel has a shopname property
                                            ) : (
                                                <p>No image available</p> // Placeholder text if image is not found
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-center text-[#E02424] text-[14px] font-normal items-center h-1/3">
                                        <button
                                            className={`py-0.5 w-32 border border-[#E02424] rounded-md bg-white ${
                                                localStorage.getItem('is_kyc') == 1 || localStorage.getItem('is_kyc') == 2 ? 'cursor-not-allowed' : ''
                                            }`}
                                            onClick={() => {
                                                navigate('/channels/add_channel', { state: channel.id });
                                            }}
                                            disabled={localStorage.getItem('is_kyc') == 1 || localStorage.getItem('is_kyc') == 2}
                                        >
                                            Connect
                                        </button>
                                    </div>
                                    <div className="flex justify-center text-[#999] text-[14px] font-normal items-center h-1/3">
                                        <p className="m-0 mpc-b-h">
                                            <span>Clicking “Connect” redirects you to {channel.shopname || 'the channel'} Channel</span>
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </PageWithSidebar>
    );
};

export default Channels;
