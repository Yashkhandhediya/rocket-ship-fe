import React, { useState } from 'react'
import { BACKEND_URL } from '../../../../../common/utils/env.config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN } from '../../../../../common/utils/config';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    let response = ""
    const [checked, setChecked] = useState(false);
    const headers = {             
        'Content-Type': 'application/json',
        'Authorization': ACCESS_TOKEN};
    const handleToggle = () => {
        setChecked(!checked);
    };
    const navigate = useNavigate()
    const [url, setUrl] = useState('');
    const [storeName, setStoreName] = useState('');

    const handleChange = (event) => {
        setUrl(event.target.value);
    };

    const redirectToShopifyAuth = async () => {
        toast('Redirecting to Shopify authentication...', { type: 'info' });
        
        // console.log(BACKEND_URL+`/shopify/redirect?url=${url}`)

        axios
            .get(BACKEND_URL+`/shopify/redirect?url=${url}&user_id=${sessionStorage.getItem('user_id')}&shop_name=${storeName}`,{headers:headers})

            .then(async (resp) => {
                if (resp.status === 200) {
                    response = resp.data.auth_url;
                    console.log("REsponseeeeeeee", response)
                    window.location.href = response;
                } else {
                    toast('Enter valid url', { type: 'error' });
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    sessionStorage.clear()
                    navigate('/login');
                } else {
                toast('There is some error', { type: 'error' });
                }
            });
    };



    return (
        <div className="flex w-[68%]  bg-white-100 justify-start flex-col rounded-lg relative  bg-white">
            <div className="border-0 w-[10rem] flex justify-center items-center rounded-full mt-5 ml-5">
                <img src="https://app.shiprocket.in/seller//assets/images/channels/shopify.png" alt="My Image" />
            </div>
            <div className='flex items-center text-left mt-5'>
                <span className='ml-9 mr-3 text-[17px] font-semibold text-black'>Custom App Integration</span>
            </div>
            <div className='flex items-center text-left mb-3'>
                <span className='ml-9 mr-3 text-[12px] text-black text-[#999]'>Connect your Shopify store with Cargo Cloud in one click custom app</span>
            </div>
            {/* <div className="flex  bg-white-100 justify-start flex-col rounded-lg relative border-2 mr-9 ml-9">
                <div className='flex items-center text-left mt-5'>
                    <span className='ml-9 mr-3 text-[17px] font-semibold text-black'>General Infomation</span>
                </div>
                <div className='flex items-center text-left mb-3'>
                    <span className='ml-9 mr-3 text-[12px] text-black text-[#999]'>Please fill in the below details to connect your store :</span>
                </div>
                <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Channel Name</label>
                    <input
                        type="text"
                        id="nameInput"
                        placeholder="Enter Channel Name"
                        className='rounded-lg mr-9 h-9 w-40 md:w-48 lg:w-56 xl:w-64'
                    />
                </div>
                <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Communication Brand Name</label>
                    <input
                        type="text"
                        id="nameInput"
                        placeholder="Enter Communication Brand Name"
                        className='rounded-lg mr-9 h-9 w-40 md:w-48 lg:w-56 xl:w-64'
                    />
                </div>
                <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Brand Logo</label>
                    <div className='relative'>
                        <input
                            type="file"
                            id="nameInput"
                            className='opacity-0 absolute inset-0 w-full h-full cursor-pointer'
                        />
                        <div className='mb-5 flex items-center justify-center rounded-lg border-dashed  border border-blue-500 h-20 w-40 md:w-48 lg:w-56 xl:w-64 cursor-pointer mr-9'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="blue"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                width="20"
                                height="20"
                                className='mr-2'
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <span className='text-[12px] text-blue text-[#999]'>Upload File</span>


                        </div>
                    </div>

                </div>
            </div> */}
            <div className="flex bg-white-100 justify-start flex-col rounded-lg relative border-2 mr-9 ml-9 mt-4">
                <div className='flex items-center text-left mt-5'>
                    <span className='ml-9 mr-3 text-[17px] font-semibold text-black'>Seller Panel</span>
                </div>
                <div className='flex items-center text-left mb-3'>
                    <span className='ml-9 mr-3 text-[12px] text-black'>Please provide below given credentials for your store :</span>
                </div>
                <div className='mt-3 mb-5 flex items-center justify-between'>
                    <label htmlFor="storenameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Store Name</label>
                    <input
                        type="text"
                        id="storenameInput"
                        placeholder="Enter Store Name"
                        className='rounded-lg mr-9 h-9 w-40 md:w-48 lg:w-56 xl:w-[70%]'
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                    />
                </div>

                <div className='mt-3 mb-5 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Store Url</label>
                    <input
                        type="text"
                        id="nameInput"
                        placeholder="Enter Channel Name https://yourshopname.myshopify.com"
                        className='rounded-lg mr-9 h-9 w-40 md:w-48 lg:w-56 xl:w-[70%]'
                        value={url}
                        onChange={handleChange}
                    />
                </div>
                {/* <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>API Key</label>
                    <input
                        type="password"
                        id="nameInput"
                        placeholder="Enter API Key"
                        className='rounded-lg mr-9 h-9 w-40 md:w-48 lg:w-56 xl:w-64'
                    />
                </div>
                <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>API Password</label>
                    <input
                        type="password"
                        id="nameInput"
                        placeholder="Enter API Password"
                        className='rounded-lg mr-9 h-9 w-40 md:w-48 lg:w-56 xl:w-64'
                    />
                </div>
                <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Shared secret</label>
                    <input
                        type="password"
                        id="nameInput"
                        placeholder="Enter Shared secret"
                        className='rounded-lg mr-9 h-9 w-40 md:w-48 lg:w-56 xl:w-64'
                    />
                </div> */}
            </div>
            {/* <div className="flex bg-white-100 justify-start flex-col rounded-lg relative border-2 mr-9 ml-9 mt-4">
                <div className='flex items-center text-left mt-5'>
                    <span className='ml-9 mr-3 text-[17px] font-semibold text-black'>Pull Order Statuses</span>
                </div>
                <div className='flex items-center text-left mb-3'>
                    <span className='ml-9 mr-3 text-[12px] text-black text-[#999]'>Please mention order statuses from your channel that you want to pull into the Processing state in Shiprocket.</span>
                </div>
                <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Sync</label>
                    <div className='mr-9'>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={handleToggle}
                            className="hidden"
                            id="toggleSwitch"
                        />
                        <label
                            htmlFor="toggleSwitch"
                            className={`relative inline-block w-10 h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${checked ? 'bg-red-500' : 'bg-gray-400'
                                }`}
                        >
                            <span
                                className={`absolute left-0 inline-block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${checked ? 'translate-x-full' : ''
                                    }`}
                            ></span>
                        </label>
                    </div>
                </div>
                <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Status to fetch</label>
                    <input
                        type="password"
                        id="nameInput"
                        placeholder="unshipped,partial etc."
                        className='rounded-lg mr-9 h-9 w-40 md:w-48 lg:w-56 xl:w-64'
                    />
                </div>
                <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Pull Prepaid orders with Tags</label>
                    <input
                        type="password"
                        id="nameInput"
                        placeholder="Prepaid, Urgent Order etc."
                        className='rounded-lg mr-9 h-9 w-40 md:w-48 lg:w-56 xl:w-64'
                    />
                </div>
                <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Pull COD orders with Tags</label>
                    <input
                        type="password"
                        id="nameInput"
                        placeholder="COD, COD Confirmed etc."
                        className='rounded-lg mr-9 h-9 w-40 md:w-48 lg:w-56 xl:w-64'
                    />
                </div>
                <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Pull Updated orders</label>
                    <div className='mr-9'>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={handleToggle}
                            className="hidden"
                            id="toggleSwitch"
                        />
                        <label
                            htmlFor="toggleSwitch"
                            className={`relative inline-block w-10 h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${checked ? 'bg-red-500' : 'bg-gray-400'
                                }`}
                        >
                            <span
                                className={`absolute left-0 inline-block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${checked ? 'translate-x-full' : ''
                                    }`}
                            ></span>
                        </label>
                    </div>
                </div>
                <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Pull Cancel orders</label>
                    <div className='mr-9'>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={handleToggle}
                            className="hidden"
                            id="toggleSwitch"
                        />
                        <label
                            htmlFor="toggleSwitch"
                            className={`relative inline-block w-10 h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${checked ? 'bg-red-500' : 'bg-gray-400'
                                }`}
                        >
                            <span
                                className={`absolute left-0 inline-block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${checked ? 'translate-x-full' : ''
                                    }`}
                            ></span>
                        </label>
                    </div>
                </div>
                <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Fetch Self Fullfilled Orders</label>
                    <div className='mr-9'>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={handleToggle}
                            className="hidden"
                            id="toggleSwitch"
                        />
                        <label
                            htmlFor="toggleSwitch"
                            className={`relative inline-block w-10 h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${checked ? 'bg-red-500' : 'bg-gray-400'
                                }`}
                        >
                            <span
                                className={`absolute left-0 inline-block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${checked ? 'translate-x-full' : ''
                                    }`}
                            ></span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex bg-white-100 justify-start flex-col rounded-lg relative border-2 mr-9 ml-9 mt-4">
                <div className='flex items-center text-left mt-5'>
                    <span className='ml-9 mr-3 text-[17px] font-semibold text-black'>Push Order Status for Shipment Tracking</span>
                </div>
                <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Enable</label>
                    <div className='mr-9'>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={handleToggle}
                            className="hidden"
                            id="toggleSwitch"
                        />
                        <label
                            htmlFor="toggleSwitch"
                            className={`relative inline-block w-10 h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${checked ? 'bg-red-500' : 'bg-gray-400'
                                }`}
                        >
                            <span
                                className={`absolute left-0 inline-block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${checked ? 'translate-x-full' : ''
                                    }`}
                            ></span>
                        </label>
                    </div>
                </div>
                <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Push paid status to your channel</label>
                    <div className='mr-9'>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={handleToggle}
                            className="hidden"
                            id="toggleSwitch"
                        />
                        <label
                            htmlFor="toggleSwitch"
                            className={`relative inline-block w-10 h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${checked ? 'bg-red-500' : 'bg-gray-400'
                                }`}
                        >
                            <span
                                className={`absolute left-0 inline-block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${checked ? 'translate-x-full' : ''
                                    }`}
                            ></span>
                        </label>
                    </div>
                </div>
                <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Returns Tag</label>
                    <div className='mr-9'>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={handleToggle}
                            className="hidden"
                            id="toggleSwitch"
                        />
                        <label
                            htmlFor="toggleSwitch"
                            className={`relative inline-block w-10 h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${checked ? 'bg-red-500' : 'bg-gray-400'
                                }`}
                        >
                            <span
                                className={`absolute left-0 inline-block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${checked ? 'translate-x-full' : ''
                                    }`}
                            ></span>
                        </label>
                    </div>
                </div>
                <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>RTO Delivered Tag</label>
                    <div className='mr-9'>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={handleToggle}
                            className="hidden"
                            id="toggleSwitch"
                        />
                        <label
                            htmlFor="toggleSwitch"
                            className={`relative inline-block w-10 h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${checked ? 'bg-red-500' : 'bg-gray-400'
                                }`}
                        >
                            <span
                                className={`absolute left-0 inline-block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${checked ? 'translate-x-full' : ''
                                    }`}
                            ></span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex bg-white-100 justify-start flex-col rounded-lg relative border-2 mr-9 ml-9 mt-4">
                <div className='flex items-center text-left mt-5'>
                    <span className='ml-9 mr-3 text-[17px] font-semibold text-black'>Map Payment Statuses</span>
                </div>
                <div className='flex items-center text-left mb-3'>
                    <span className='ml-9 mr-3 text-[12px] text-black text-[#999]'>This feature helps you map new and existing payment gateway/status against COD and Prepaid payment status.</span>
                </div>
                <div className='flex items-center mt-3 mb-3 flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Enable</label>
                    <div className='mr-9'>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={handleToggle}
                            className="hidden"
                            id="toggleSwitch"
                        />
                        <label
                            htmlFor="toggleSwitch"
                            className={`relative inline-block w-10 h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${checked ? 'bg-red-500' : 'bg-gray-400'
                                }`}
                        >
                            <span
                                className={`absolute left-0 inline-block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${checked ? 'translate-x-full' : ''
                                    }`}
                            ></span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex bg-white-100 justify-start flex-col rounded-lg relative border-2 mr-9 ml-9 mt-4">
                <div className='flex items-center text-left mt-5'>
                    <span className='ml-9 mr-3 text-[17px] font-semibold text-black'>Inventory</span>
                </div>

                <div className='flex items-center mt-3  flex items-center justify-between'>
                    <label htmlFor="nameInput" className='ml-9 mr-3 text-[14px] font-semibold text-black text-[#999]'>Sync</label>
                    <div className='mr-9'>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={handleToggle}
                            className="hidden"
                            id="toggleSwitch"
                        />
                        <label
                            htmlFor="toggleSwitch"
                            className={`relative inline-block w-10 h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${checked ? 'bg-red-500' : 'bg-gray-400'
                                }`}
                        >
                            <span
                                className={`absolute left-0 inline-block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${checked ? 'translate-x-full' : ''
                                    }`}
                            ></span>
                        </label>
                    </div>
                </div>
                <div className='flex items-center text-left'>
                    <span className='ml-9 mr-3 text-[12px] text-black text-[#999]'>Last Sync On</span>
                </div>
                <div className='flex items-center text-left mb-3'>
                    <span className='ml-9 mr-3 text-[12px] text-black text-[#999]'>Never Synced</span>
                </div>
            </div>
            <div className="flex bg-white-100 justify-start flex-col rounded-lg relative border-2 mr-9 ml-9 mt-4">
                <div className='flex items-center mt-3  flex items-center justify-between'>
                    <div className='flex items-center text-left mt-5'>
                        <span className='ml-9 mr-3 text-[17px] font-semibold text-black'>Shopify Map Location ID</span>
                    </div>
                    <div className='mr-9'>
                        <button
                            className="mt-3 py-2 px-4 bg-red-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            sync
                        </button>
                    </div>
                </div>
                <div className='flex items-center text-left mb-3'>
                    <span className='ml-9 mr-3 text-[12px] text-black text-[#999]'>Click the sync button to view and map Shopify locations. Once mapped, we will sync SRF inventory to Shopify and sync your location&apos;s inventory into Shiprocket.</span>
                </div>
            </div> */}
            {/* <div className="flex bg-white-100 justify-start flex-col rounded-lg relative mr-9 ml-9 mt-4">
                <div className='flex items-center ml-3 mt-3 flex items-center '>
                    <input
                        type="checkbox"
                        id="nameInput"
                        className='form-checkbox text-red-500'
                    />
                    <div className='flex items-center text-left'>
                        <span className="me-2 inline-flex items-center p-2 text-[#9CA3AF] font-medium">I want to publish my Shopify catalogue to ONDC buyer apps.</span>
                    </div>
                </div>
            </div> */}
            <div className="flex bg-white-100 justify-start flex-col rounded-lg relative mr-9 ml-9 mt-4">
                <div className='flex items-center ml-3 mt-3 mb-5'>
                    <button onClick={redirectToShopifyAuth}
                        className="py-2 px-4 bg-red-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Connect to Shopify
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Form