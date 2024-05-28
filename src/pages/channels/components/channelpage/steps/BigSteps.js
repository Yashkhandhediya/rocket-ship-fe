import React from 'react'

const BigSteps = () => {
    return (
        <div className="flex w-[32%]  bg-white-100  h-[100%]  justify-start flex-col rounded-lg relative  bg-white">
            <div className="flex justify-center bg-red-100 text-black text-[15px] rounded-t-lg font-normal items-center h-1/3">
                <p className='font-bold mt-5 mb-5 ml-3'>Steps to Integrate Big Commerce with Custom App</p>
            </div>
            <div className='flex items-center text-left mb-3 mt-3 text-[12px]'>
                <span className='rounded-full w-6 h-6 flex items-center justify-center border border-gray-400 ml-5 mr-3 text-[#999] bg-white'>1</span>
                <span>Log in to Big Commerce Admin Panel.</span>
            </div>
            <div className='flex items-center text-left mb-3 text-[12px]'>
                <span className='rounded-full w-6 h-6 flex items-center justify-center border border-gray-400 ml-5 mr-3 text-[#999] bg-white'>2</span>
                <span>Go to Apps.</span>
            </div>
            <div className='flex items-center text-left mb-3 text-[12px]'>
                <span className='rounded-full w-6 h-6 flex items-center justify-center border border-gray-400 ml-5 mr-3 text-[#999] bg-white'>3</span>
                <span>Scroll below to find the &quot;Develop apps for your store&quot; <br /> button.</span>
            </div>
            <div className='flex items-center text-left mb-3 text-[12px]'>
                <span className='rounded-full w-6 h-6 flex items-center justify-center border border-gray-400 ml-5 mr-3 text-[#999] bg-white '>4</span>
                <span>Here, click on the &quot;Create an App&quot; button.</span>
            </div>
            <div className='flex items-center text-left mb-3 text-[12px]'>
                <span className='rounded-full w-6 h-6 flex items-center justify-center border border-gray-400 ml-5 mr-3 text-[#999] bg-white'>5</span>
                <span>Go ahead and give your Custom app a recognizable name. <br /> (For e.g. Shiprocket).</span>
            </div>
            <div className='flex items-center text-left mb-3 text-[12px]'>
                <span className='rounded-full w-6 h-6 flex items-center justify-center border border-gray-400 ml-5 mr-3 text-[#999] bg-white'>6</span>
                <span>Click on the &quot;Create app&quot; button to proceed.</span>
            </div>
            <div className='flex items-center text-left mb-3 text-[12px]'>
                <span className='rounded-full w-6 h-6 flex items-center justify-center border border-gray-400 ml-5 mr-3 text-[#999] bg-white'>7</span>
                <span>A &quot;Configure Admin API scopes&quot; button is available <br /> under Overview tab.</span>
            </div>
            <div className='flex items-center text-left mb-3 text-[12px]'>
                {/* <span className='inline-block rounded-full w-7 h-7 flex items-center justify-center border border-gray-400 ml-5 mr-3 text-[#999]'>6</span> */}
                <span className='ml-14 mr-3'>Click on it to see all admin access scopes.</span>
            </div>
            <div className='flex items-center text-left mb-3 text-[12px]'>
                {/* <span className='inline-block rounded-full w-7 h-7 flex items-center justify-center border border-gray-400 ml-5 mr-3 text-[#999]'>6</span> */}
                <span className='ml-14 mr-3'>Read & Write Access: Products, Product Listings, Assigned Fulfillment Orders, Customers, Draft Orders, Orders, Fulfillment Services, Merchant Managed Fulfillment Orders, Order Editing, Store Content, Third-Party Fulfillment Orders.</span>
            </div>
            <div className='flex items-center text-left mb-3 text-[12px]'>
                <span className='rounded-full w-6 h-6 flex items-center justify-center border border-gray-400 ml-5 mr-3 text-[#999] bg-white'>8</span>
                <span>After you&apos;ve defined the scopes, click the Install App button in the<br /> top right corner of the page.</span>
            </div>
            <div className='flex items-center text-left mb-3 text-[12px]'>
                <span className='rounded-full w-6 h-6 flex items-center justify-center border border-gray-400 ml-5 mr-3 text-[#999] bg-white'>9</span>
                <span>Click on Install to get the App credentials (Admin API Access Token,<br /> API key and API secret key) from the API credentials tab</span>
            </div>
            <div className='flex items-center text-left mb-3 text-[12px]'>
                {/* <span className='inline-block rounded-full w-7 h-7 flex items-center justify-center border border-gray-400 ml-5 mr-3 text-[#999]'>6</span> */}
                <span className='ml-14 mr-3'>Note:</span>
            </div>
            <div className='flex items-center text-left mb-3 text-[12px]'>
                {/* <span className='inline-block rounded-full w-7 h-7 flex items-center justify-center border border-gray-400 ml-5 mr-3 text-[#999]'>6</span> */}
                <span className='ml-14 mr-3'>
                    <ul className="list-disc ml-5">
                        <li>
                            For Store URL, use:  https://yourshopname.bigcommerce.com (You&apos;ll find this URL in the address bar of your BigCommerce account).
                        </li>
                        <li>
                            API key - The same API key that was generated following the installation of the custom app.
                        </li>
                        <li>
                            API Password – The Admin API access token, which was generated after installing the custom app.
                        </li>
                        <li>
                            Shared Secret - The API secret key is generated after installing the custom app.
                        </li>
                    </ul>
                </span>
            </div>
            <div className='flex items-center text-left mb-3 text-[12px]'>
                <span className='rounded-full w-6 h-6 flex items-center justify-center border border-gray-400 ml-5 mr-3 text-[#999] bg-white'>10</span>
                <span>Paste the same credentials here to integrate the channel.</span>
            </div>
            <div className='flex items-center text-left mb-3 text-[12px]'>
                {/* <span className='inline-block rounded-full w-7 h-7 flex items-center justify-center border border-gray-400 ml-5 mr-3 text-[#999]'>6</span> */}
                <span className='ml-14 mr-3'>If you&apos;re having problems with Big Commerce integration, troubleshoot it by following the steps outlined here.</span>
            </div>
            {/* <div className="absolute inset-y-0 left-[32px] flex items-center justify-center ">
                            <div className="h-full w-2 border-l border-dotted border-gray-400"></div>
                        </div> */}
        </div>
    )
}

export default BigSteps