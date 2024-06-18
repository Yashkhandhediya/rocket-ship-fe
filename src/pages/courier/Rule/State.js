// src/App.js
import React, { useState, useEffect } from 'react';
import { paymentMethod, states } from '../constants';
import { CustomMultiSelect } from '../../../common/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

function State({show,onClose}) {
  const [from, setFrom] = useState('');
  const [to,setTo] = useState('')
  const [isShow,setIsShow] = useState(show)
  const [isPickPopupVisible, setPickIsPopupVisible] = useState(false);
  const [isDelPopupVisible, setDelIsPopupVisible] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  useEffect(() => {
    setIsShow(show);
  }, [show]);

  const handleClose = () => {
    setIsShow(false);
    onClose(); 
  };


  
  const togglePickPopup = () => {
    setPickIsPopupVisible(!isPickPopupVisible);
  };

  const toggleDelPopup = () => {
    setDelIsPopupVisible(!isDelPopupVisible);
  }

  const handleFileChange = (event) => {
    const { id } = event.target;
    const file = event.target.files[0];
    setSelectedFileName(file.name);
    setSelectedFile(file);
  };


  const handleUpload = async () => {
   
  };


  const handleSampleFile = () => {
    // const headers = { 'Content-Type': 'application/json' };

  };

        return (
            isShow && (<div className="mt-2 border-2 rounded-md p-3">
                <div className="flex flex-row justify-between items-center">
                    <h2 className='font-semibold text-gray-500'>State</h2>
                    <button onClick={() => handleClose()}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                    <div className="mt-2 flex flex-row w-full">
                    <div className="mr-2 w-[30%]">
                        <CustomMultiSelect
                            isMulti={false}
                            options={states}
                            selected={from}
                            closeMenuOnSelect={true}
                            placeholder={from || "Select From State"}
                            hideSelectedOptions={false}
                            onChange={(value) => {
                                setFrom(value)
                            }} 
                        />
                        </div>
                        <div className="ml-2 w-[30%]">
                         <CustomMultiSelect
                            isMulti={false}
                            options={states}
                            selected={to}
                            closeMenuOnSelect={true}
                            placeholder={to || "Select To State"}
                            hideSelectedOptions={false}
                            onChange={(value) => {
                                setTo(value)
                            }} 
                        />
                        </div>
                    </div>
                    
                <div className="flex mt-2 items-center justify-center">
                            <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border-4 border-green-500 text-green-500 text-sm font-semibold">
                                OR
                            </span>
                </div>


                
      <div className="w-full p-2 flex items-center">
        <input
          type="text"
          placeholder="No State Uploaded yet."
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          value={selectedFileName}
          disabled
        />
        <button
          className="ml-4 px-3 py-1 bg-[#27c24c] text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        onClick={() => togglePickPopup()}>
          Upload Pickup State
        </button>
      </div>

      <div className="w-full p-2 flex items-center">
        <input
          type="text"
          placeholder="No State Uploaded yet."
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          value={selectedFileName}
          disabled
        />
        <button
          className="ml-4 px-3 py-1 bg-[#27c24c] text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        onClick={() => toggleDelPopup()}>
          Upload Delivery State
        </button>
      </div>


      {isPickPopupVisible && (
        <div className="fixed inset-0 z-50 mt-2 flex w-full items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="h-[40%] w-[30%] rounded-lg bg-white p-6 sm:w-[40%] md:w-[35%]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Upload Pickup State via CSV</h3>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setPickIsPopupVisible(false)}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="mb-4 text-gray-600 text-sm">
            Please download below given template remove sample States and upload your data. Make sure the file is in csv format.
            </p>
            <div className="flex flex-col">
              <button className="font-base mb-2 text-left text-sm text-blue-500" onClick={handleSampleFile}>
                Download Sample File
              </button>
              {/* <button className="font-base mb-2 text-left text-sm text-blue-500">
                Download Categories CSV
              </button> */}
            </div>

            <div className="mt-2 flex h-[15%] w-[100%] flex-row rounded-md border bg-gray-200">
              <p className="flex w-[80%] rounded-md border text-left hover:cursor-not-allowed">
                {selectedFileName ? selectedFileName : ''}
              </p>
              <div className="w-[20%]">
                <label className="flex cursor-pointer items-center rounded-md bg-gray-50 px-4 py-2">
                  <FontAwesomeIcon icon={faFile} />
                  <span className="ml-2 mr-4 sm:text-sm md:text-base">Browse</span>
                  <input type="file" accept=".xlsx" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              <button
                className="focus:shadow-outline rounded bg-blue-500  px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
                onClick={handleUpload}>
                Upload
              </button>
              <button
                className="focus:shadow-outline ml-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700 focus:outline-none"
                onClick={() => {
                  setPickIsPopupVisible(false);
                  setSelectedFileName('');
                }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isDelPopupVisible && (
        <div className="fixed inset-0 z-50 mt-2 flex w-full items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="h-[40%] w-[30%] rounded-lg bg-white p-6 sm:w-[40%] md:w-[35%]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Upload Delivery State via CSV</h3>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setDelIsPopupVisible(false)}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="mb-4 text-gray-600 text-sm">
            Please download below given template remove sample States and upload your data. Make sure the file is in csv format.
            </p>
            <div className="flex flex-col">
              <button className="font-base mb-2 text-left text-sm text-blue-500" onClick={handleSampleFile}>
                Download Sample File
              </button>
              {/* <button className="font-base mb-2 text-left text-sm text-blue-500">
                Download Categories CSV
              </button> */}
            </div>

            <div className="mt-2 flex h-[15%] w-[100%] flex-row rounded-md border bg-gray-200">
              <p className="flex w-[80%] rounded-md border text-left hover:cursor-not-allowed">
                {selectedFileName ? selectedFileName : ''}
              </p>
              <div className="w-[20%]">
                <label className="flex cursor-pointer items-center rounded-md bg-gray-50 px-4 py-2">
                  <FontAwesomeIcon icon={faFile} />
                  <span className="ml-2 mr-4 sm:text-sm md:text-base">Browse</span>
                  <input type="file" accept=".xlsx" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              <button
                className="focus:shadow-outline rounded bg-blue-500  px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
                onClick={handleUpload}>
                Upload
              </button>
              <button
                className="focus:shadow-outline ml-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700 focus:outline-none"
                onClick={() => {
                  setDelIsPopupVisible(false);
                  setSelectedFileName('');
                }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

            </div>)
        );
}

export default State;
