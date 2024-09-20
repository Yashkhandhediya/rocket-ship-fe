// src/App.js
import React, { useState, useEffect } from 'react';
import { weights } from '../constants';
import { CustomMultiSelect, Field } from '../../../common/components';

function Order({show,onClose}) {
  const [weightType, setWeightType] = useState('');
  const [isShow,setIsShow] = useState(show)
  const [isInputShow,setIsInputShow] = useState(false)
  const [additionalFields, setAdditionalFields] = useState([]);
  const [fieldValues, setFieldValues] = useState({
    'Greater Than': '',
    'Less Than': '',
    'Equals To': ''
  });

  useEffect(() => {
    setIsShow(show);
  }, [show]);

  const handleClose = () => {
    setIsShow(false);
    onClose(); 
  };

//   const handleAddField = () => {
//     setAdditionalFields([...additionalFields, { value: '' }]);
//   };

const handleFieldChange = (value) => {
    if (value === 'Equals To') {
      setAdditionalFields(['Equals To']);
    } else {
      setAdditionalFields((prevFields) => {
        let updatedFields = prevFields.filter((field) => field !== 'Equals To');
    
        if (!updatedFields.includes(value) && updatedFields.length < 3) {
          updatedFields.push(value);
        }
        return updatedFields;
      });
    }
  };

  const handleValueChange = (type, newValue) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [type]: newValue
    }));
  };


        return (
            isShow && (<div className="mt-2 border-2 rounded-md p-3">
                <div className="flex flex-row justify-between items-center">
                    <h2 className='font-semibold text-gray-500'>Order Value</h2>
                    <button onClick={() => handleClose()}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="mt-2">
                        <div className="flex items-center space-x-4">
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
                                    handleFieldChange(value)
                                }} 
                            />
                            </div>
                            <button className="ml-2 mt-2 bg-blue-800 text-xl font-bold text-white p-1 rounded-md" onClick={()=> setIsInputShow(true)}>+</button>
                        </div>
                            {(weightType != "Select" && isInputShow) && <div className="w-full flex flex-col mt-2">
                                {additionalFields.map((field, index) => (
                                <div key={index} className="w-full flex items-center space-x-4 mt-2">
                                <h2 className='w-[30%] mb-8'>{`${field} : `}</h2>
                                <div className="w-full flex flex-col">
                                    <Field 
                                        value={fieldValues[field] || 'For E.g. 0.50'}
                                        onChange={(e) => handleValueChange(field, e.target.value)}
                                        type='number'
                                        placeholder="For E.g. 0.50"
                                        leftAddOn='Rs.'
                                    />
                                    <div className="text-xs">(Max 3 digits after decimal place)</div>
                                    <div className="text-xs">Note: The minimum chargeable value is 0.50 Rs.</div>
                                    </div>
                                </div>
                                ))}
                            </div>}
                </div>
            </div>)
        );
}

export default Order;
