import React, { useRef, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faDownload } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../common/utils/env.config';

const SkuUpload = ({ id }) => {
    const fileInputRef = useRef(null);
    const [message, setMessage] = useState('');

    const handleButtonClick = () => {
        if (id) {
            fileInputRef.current.click();
        } else {
            toast.error('Please create a return policy before downloading the file.');
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'text/csv') {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post(
                    `${BACKEND_URL}/returnpolicy/save_sku?return_policy_id=${id}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                toast.success('File uploaded successfully!');
                console.log('File uploaded successfully:', response.data);
            } catch (error) {
                toast.error('Error uploading file.');
                console.error('Error uploading file:', error);
            }
        } else {
            toast.error('Please upload a CSV file.');
        }
    };

    const handleDownload = async () => {
        if (id) {
            try {
                const response = await axios.get(
                    `${BACKEND_URL}/returnpolicy/get_sku_file/?return_policy_id=${id}`,
                    {
                        responseType: 'blob', 
                    }
                );
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'sample_file.csv'); 
                document.body.appendChild(link);
                link.click();
                link.remove();
            } catch (error) {
                toast.error('Error downloading file.');
                console.error('Error downloading file:', error);
            }
        } else {
            toast.error('Please create a return policy before downloading the file.');
        }
    };

    return (
        <div className="my-4 rounded-lg bg-red-50 p-4">
            <p className="text-[12px] font-semibold">
                Please upload the list of SKU’s that are eligible for return{' '}
                <span className="text-[10px] text-gray-500">
                    (Only csv file format will be accepted.)
                </span>
            </p>
            <div className="w-full py-2">
                <div className="mt-1 flex items-center">
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".csv"
                        onChange={handleFileChange}
                    />
                    <button
                        type="button"
                        onClick={handleButtonClick}
                        className={`flex cursor-pointer items-center gap-2 rounded-md border ${!id ? 'border-gray-300 text-gray-500' : 'border-red-300 bg-white text-red-800'} px-8 py-3 shadow-sm`}
                    >
                        <FontAwesomeIcon icon={faUpload} className="ml-2 h-4 w-4" />
                        <span className="text-[12px]">Browse and Upload (csv)</span>
                    </button>
                </div>
                {message && <p className="mt-4 text-red-800 font-medium">{message}</p>}
                <p className="mt-4 flex gap-2 font-medium text-red-800">
                    <button
                        type="button"
                        onClick={handleDownload}

                        className={`flex cursor-pointer items-center gap-2 rounded-md  ${!id ? 'border-gray-300 text-gray-500' : 'border-red-300 text-red-800'}`}
                    >
                        <FontAwesomeIcon icon={faDownload} className="ml-2 h-4 w-4" />
                        <span className="text-[12px]">Download Sample file</span>
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SkuUpload;
