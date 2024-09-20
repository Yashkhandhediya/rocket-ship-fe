// src/App.js
import React, { useState, useEffect } from 'react';
import { awbTime } from '../constants';
import { CustomMultiSelect, Field } from '../../../common/components';

function Awb({show,onClose}) {
  const [awbType, setAwbType] = useState('');
  const [isShow,setIsShow] = useState(show)
  const [isInputShow,setIsInputShow] = useState(false)
  const [additionalFields, setAdditionalFields] = useState([]);
  const [fieldValues, setFieldValues] = useState({
    'Before': '',
    'After': '',
    'Between': {'start':'','end':''}
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
    if (value) {
      setAdditionalFields([value]);
    } 
    // else {
    //   setAdditionalFields((prevFields) => {
    //     let updatedFields = prevFields.filter((field) => field !== 'Equals To');
    
    //     if (!updatedFields.includes(value) && updatedFields.length < 1) {
    //       updatedFields.push(value);
    //     }
    //     return updatedFields;
    //   });
    // }
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
                    <h2 className='font-semibold text-gray-500'>Awb Assigned Time</h2>
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
                                options={awbTime}
                                selected={awbType}
                                closeMenuOnSelect={true}
                                placeholder={awbType || "Select"}
                                hideSelectedOptions={false}
                                onChange={(value) => {
                                    setAwbType(value)
                                    handleFieldChange(value)
                                }} 
                            />
                            </div>
                            <button className="ml-2 mt-2 bg-blue-800 text-xl font-bold text-white p-1 rounded-md" onClick={()=> setIsInputShow(true)}>+</button>
                        </div>
                            {(awbType != "Select" && isInputShow) && <div className="w-[50%] flex flex-col mt-2">
                                {additionalFields.map((field, index) => (
                                <div key={index} className="w-full flex items-center space-x-4 mt-2">
                                <h2 className='w-[20%]'>{`${field} : `}</h2>
                                {(field=='After To' || field == 'Before To') && <div className="w-[20%] flex flex-col">
                                    <Field 
                                        value={fieldValues[field]}
                                        onChange={(e) => handleValueChange(field, e.target.value)}
                                        type='time'
                                    />
                                    </div>}
                                {(field == 'Between') && <div className="w-[20%] flex flex-col">
                                    <Field 
                                        value={fieldValues[field.start]}
                                        onChange={(e) => handleValueChange(field, e.target.value)}
                                        type='time'
                                    />
                                    <Field 
                                        value={fieldValues[field.end]}
                                        onChange={(e) => handleValueChange(field, e.target.value)}
                                        type='time'
                                    />
                                    </div>}
                                </div>
                                ))}
                            </div>}
                </div>
            </div>)
        );
}

export default Awb;
