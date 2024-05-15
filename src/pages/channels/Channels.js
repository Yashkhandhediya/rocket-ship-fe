import React, { useState } from 'react'
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar'
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { Loader } from '../../common/components';

const Channels = () => {
    const navigate = useNavigate();
    return (
        <PageWithSidebar>
            <div className="flex flex-col  bg-white h-auto rounded w-full py-6 px-5 shadow">
                <p className="text-[20px] text-black font-[500] mb-6">
                    Most popularly connected E-commerce, Shopping carts and Marketplaces
                </p>
                <div className="flex gap-8 flex-row">
                    <div className="flex w-[32%] h-[200px] bg-red-100 justify-start items-center h-96 flex-col rounded-lg">
                        <div className="flex flex-col items-center justify-center mt-1 h-2/3">
                            <div className="border-0 w-[15rem] flex justify-center items-center rounded-full">
                                <img src="https://app.shiprocket.in/seller//assets/images/channels/shopify.png" alt="My Image" />
                            </div>
                        </div>
                        <div className="flex justify-center text-[#E02424] text-[14px] font-normal items-center h-1/3">
                            <button className={`py-0.5 w-32 border border-[#E02424] rounded-md bg-white ${(localStorage.getItem('is_kyc') == 1 || localStorage.getItem('is_kyc') == 2) ? 'cursor-not-allowed' : ''}`}
                                onClick={() => {
                                    navigate('/channels/add_channel')
                                }}
                                disabled={(localStorage.getItem('is_kyc') == 1 || localStorage.getItem('is_kyc') == 2)}
                            >
                                Connect
                            </button>
                        </div>
                        <div className="flex justify-center text-[#999] text-[14px] font-normal items-center h-1/3">
                        <p className="m-0 mpc-b-h"><span>Clicking “Connect” redirects you to Shopify Channel</span></p></div>
                    </div>
                </div>
            </div>
        </PageWithSidebar>
    )
}

export default Channels