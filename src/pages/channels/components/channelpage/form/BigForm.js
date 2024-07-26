import React, {useState} from 'react'
import { BACKEND_URL } from '../../../../../common/utils/env.config';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../../../../common/utils/config';
import { toast } from 'react-toastify';
import { bigcommerce } from '../../../../../common/icons';
import { useNavigate } from 'react-router-dom';

const BigForm = () => {
    let response = ""
    const [checked, setChecked] = useState(false);
    const [storeName,setStoreName] = useState('')
    const headers = { 'Content-Type': 'application/json','Authorization': ACCESS_TOKEN };
    const handleToggle = () => {
        setChecked(!checked);
    };
    const navigate = useNavigate();
    const [hashCode, setHashCode] = useState('');
    const [authToken, setAuthToken] = useState('');

    const handleChange = (event) => {
        setHashCode(event.target.value);
    };

    const redirectToBigAuth = async () => {
        axios
            .post(BACKEND_URL+`/bigcommerce/create-webhook?HASH_CODE=${hashCode}&AUTH_TOKEN=${authToken}&user_id=${sessionStorage.getItem('user_id')}&shop_name=${storeName}`,{headers:headers})

            .then(async (resp) => {
                if (resp.status === 200) {
                    console.log("REsponseeeeeeee", resp)
                    toast("Store Connect Successfully",{type:'success'})
                } else {
                    toast('Enter valid url', { type: 'error' });
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    sessionStorage.clear()
                    navigate('/login');
                } else {
                    toast('There is some error', { type: 'error' });
                }
            });
    };



    return (
        <div className="flex w-[68%]  bg-white-100 justify-start flex-col rounded-lg relative  bg-white">
            <div className="border-0 w-[10rem] flex justify-center items-center rounded-full mt-5 ml-5">
                <img src={bigcommerce} alt="My Image" />
            </div>
            <div className='flex items-center text-left mt-5'>
                <span className='ml-9 mr-3 text-[17px] font-semibold text-black'>Custom App Integration</span>
            </div>
            <div className='flex items-center text-left mb-3'>
                <span className='ml-9 mr-3 text-[12px] text-black'>Connect your Big Commerce store with Cargo Cloud in one click custom app</span>
            </div>
            <div className="flex bg-white-100 justify-start flex-col rounded-lg relative border-2 mr-9 ml-9 mt-4">
                <div className='flex items-center text-left mt-5'>
                    <span className='ml-9 mr-3 text-[17px] font-semibold text-black'>Seller Panel</span>
                </div>
                <div className='flex items-center text-left mb-3'>
                    <span className='ml-9 mr-3 text-[12px] text-black'>Please provide below given credentials for your store :</span>
                </div>
                <div className='mt-3 mb-5 flex flex-col justify-between'>

                <div className='flex flex-row mt-4'>
                    <label htmlFor="storenameInput" className='mt-2 ml-8 mr-3 text-[14px] font-semibold text-black'>Store Name</label>
                    <input
                        type="text"
                        id="storenameInput"
                        placeholder="Enter Your Store Name"
                        className='rounded-lg mr-2 h-9 w-[70%] md:w-[70%] lg:w-[70%] xl:w-[70%]'
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                    />
                </div>
                <div className="flex flex-row mt-4">
                    <label className='mt-2 ml-8 mr-4 text-[14px] font-semibold text-black'>Hash Code</label>
                    <input
                        type="text"
                        placeholder="Enter Hash Code"
                        className='rounded-lg mr-2 h-9 w-[70%] md:w-[70%] lg:w-[70%] xl:w-[70%]'
                        value={hashCode}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-row mt-4">
                    <label className='mt-2 ml-8 mr-4 text-[14px] font-semibold text-black'>Auth Token</label>
                    <input
                        type="text"
                        placeholder="Enter Auth Token"
                        className='rounded-lg mr-2 h-9 w-[70%] md:w-[70%] lg:w-[70%] xl:w-[70%]'
                        value={authToken}
                        onChange={(e) => setAuthToken(e.target.value)}
                    />
                </div>
                </div>
            </div>
            <div className="flex bg-white-100 justify-start flex-col rounded-lg relative mr-9 ml-9 mt-4">
                <div className='flex items-center ml-3 mt-3 mb-5'>
                    <button onClick={redirectToBigAuth}
                        className="py-2 px-4 bg-red-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Connect to BigCommerce
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BigForm