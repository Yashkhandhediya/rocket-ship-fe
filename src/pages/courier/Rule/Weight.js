// src/App.js
import React, { useState, useEffect } from 'react';
import { weights } from '../constants';
import { CustomMultiSelect } from '../../../common/components';

function Weight({show,onClose}) {
  const [weightType, setWeightType] = useState('');
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
                    <h2 className='font-semibold text-gray-500'>Weight</h2>
                    <button onClick={() => handleClose()}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="mt-8">
                        <div className="mt-2 flex items-center space-x-4">
                            <div className="w-[25%]">
                            <CustomMultiSelect
                                isMulti={false}
                                options={weights}
                                selected={weightType}
                                closeMenuOnSelect={true}
                                placeholder={weightType || "Select"}
                                hideSelectedOptions={false}
                                onChange={(value) => {
                                    setWeightType(value)
                                }} 
                            />
                            </div>
                            <button className="ml-2 mt-2 bg-blue-800 text-xl font-bold text-white p-1 rounded-md">+</button>
                        </div>
                </div>
            </div>)
        );
}

export default Weight;
