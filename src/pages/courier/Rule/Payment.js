// src/App.js
import React, { useState, useEffect } from 'react';
import { paymentMethod } from '../constants';
import { CustomMultiSelect } from '../../../common/components';

function Payment({show,onClose}) {
  const [paymentMode, setPaymentMode] = useState('');
  const [isShow,setIsShow] = useState(show)

  useEffect(() => {
    setIsShow(show);
  }, [show]);

  const handleClose = () => {
    setIsShow(false);
    onClose(); 
  };

        return (
            isShow && (<div className="mt-2 border-2 rounded-md p-3">
                <div className="flex flex-row justify-between items-center">
                    <h2 className='font-semibold text-gray-500'>Select Payment Mode</h2>
                    <button onClick={() => handleClose()}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                    <div className="mt-2 w-[30%]">
                        <CustomMultiSelect
                            isMulti={false}
                            options={paymentMethod}
                            selected={paymentMode}
                            closeMenuOnSelect={true}
                            placeholder={paymentMode || "Select Payment Mode"}
                            hideSelectedOptions={false}
                            onChange={(value) => {
                                setPaymentMode(value)
                            }} 
                        />
                    </div>
            </div>)
        );
}

export default Payment;
