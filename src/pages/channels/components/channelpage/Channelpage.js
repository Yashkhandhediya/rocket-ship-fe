import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import PageWithSidebar from '../../../../common/components/page-with-sidebar/PageWithSidebar';
import { Steps } from './steps';
import { Form } from './form';

const handleNameChange = (event) => {

};

const Channelpage = () => {
    const navigate = useNavigate();
    return (
        <PageWithSidebar>
            <div className="flex flex-col bg-[#f8f8f8] h-auto rounded w-full py-6 px-5 shadow">
                <button className="flex flex-row items-center gap-2 cursor-pointer mb-5"
                onClick={() => {
                    navigate('/channels')
                }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M20 11H7.414l3.293-3.293a1 1 0 0 0-1.414-1.414l-5 5a1 1 0 0 0 0 1.414l5 5a1 1 0 0 0 1.414-1.414L7.414 13H20a1 1 0 0 0 0-2z" />
                    </svg>
                    <p className="text-[17px] text-black font-[500]">back</p>
                </button>
                <div className="flex gap-8 flex-row">
                    <Steps></Steps>
                    <Form></Form>
                    
                </div>
            </div>
        </PageWithSidebar>
    );
};

export default Channelpage;
