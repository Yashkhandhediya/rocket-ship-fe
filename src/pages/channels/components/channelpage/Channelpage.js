import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import PageWithSidebar from '../../../../common/components/page-with-sidebar/PageWithSidebar';
import { Steps, WooSteps, BigSteps } from './steps';
import { Form, WooForm, BigForm } from './form';

const handleNameChange = (event) => {};

const Channelpage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const flag = location?.state || {};
  console.log('Flag Val', flag);
  return (
    <PageWithSidebar>
      <div className="flex h-auto w-full flex-col rounded bg-[#f8f8f8] px-5 py-6 shadow">
        <button
          className="mb-5 flex cursor-pointer flex-row items-center gap-2"
          onClick={() => {
            navigate('/channels');
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M20 11H7.414l3.293-3.293a1 1 0 0 0-1.414-1.414l-5 5a1 1 0 0 0 0 1.414l5 5a1 1 0 0 0 1.414-1.414L7.414 13H20a1 1 0 0 0 0-2z" />
          </svg>
          <p className="text-[17px] font-[500] text-black">back</p>
        </button>
        <div className="flex flex-row gap-8">
          {flag == 1 ? <Steps></Steps> : flag == 2 ? <WooSteps></WooSteps> : <BigSteps></BigSteps>}
          {flag == 1 ? <Form></Form> : flag == 2 ? <WooForm></WooForm> : <BigForm></BigForm>}
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Channelpage;
