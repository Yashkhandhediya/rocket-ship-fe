// src/App.js
import React, { useState, useEffect } from 'react';
import { city, paymentMethod, states } from '../constants';
import { CustomMultiSelect } from '../../../common/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

function City({show,onClose}) {
  const [from, setFrom] = useState([]);
  const [to,setTo] = useState([])
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
                    <h2 className='font-semibold text-gray-500'>City</h2>
                    <button onClick={() => handleClose()}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                    <div className="mt-2 flex flex-row w-full">
                    <div className="mr-2 w-[30%]">
                    <CustomMultiSelect
                        //   isMulti={false}
                        label={'From City'}
                        withCheckbox={true}
                        displayValuesAsStrings
                        options={city}
                        //   selected={showChannelInfo}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        placeholder={ from.length == 0 ? 'From City' : from}
                        onChange={(value) => {
                            setFrom([...from,value]);
                        }}
                        />
                        </div>
                        <div className="ml-2 w-[30%]">
                        <CustomMultiSelect
                            //   isMulti={false}
                            label={'To City'}
                            withCheckbox={true}
                            displayValuesAsStrings
                            options={city}
                            //   selected={showChannelInfo}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            placeholder={to.length == 0 ? 'To City' : to}
                            onChange={(value) => {
                                setTo([...to,value]);
                            }}
                            />
                        </div>
                    </div>
            </div>)
        );
}

export default City;
