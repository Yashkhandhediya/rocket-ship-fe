import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { Loader } from '../../common/components';
import { ACCESS_TOKEN } from '../../common/utils/config';
import { useNavigate } from 'react-router-dom';

const Address = ({ isVisible, onClose }) => {
  const [address, setAddress] = useState({
    area: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  const headers = { 'Content-Type': 'application/json','Authorization': ACCESS_TOKEN };
  const checkField = () => {
    if (
      address.area === '' ||
      address.pincode === '' ||
      address.city === '' ||
      address.state === '' ||
      address.country === ''
    ) {
      toast.error('Please fill all the fields');
    }
  };

  const handleSubmit = () => {
    console.log('Submit Address API');
    checkField();
    setLoading(true);
    axios
      .post(
        BACKEND_URL + `/address/truck_booking_address/?created_by=${sessionStorage.getItem('company_id')}`,
        address,{headers:headers}
      )
      .then((res) => {
        setLoading(false);
        console.log('Response Data', res.data);
        toast('Address Saved Successfully', { type: 'success' });
        setAddress({ ...address, area: '', pincode: '', city: '', state: '', country: '' });
        onClose();
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          sessionStorage.clear()
          navigate('/login');
      } else {
          setLoading(false);
          console.log('Error In saving', err);
          toast('Error In saving Address', { type: 'error' });
      }
      });
  };

  return (
    isVisible && (
      <div className="relative">
        {loading && <Loader />}
        <div
          className={`fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 ${
            isVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          } transition-opacity duration-500 ease-out`}>
          <div
            className={`w-[50%] transform rounded bg-white p-10 shadow-lg ${
              isVisible ? 'translate-y-0' : '-translate-y-full'
            } transition-transform duration-500 ease-out`}>
            <h2 className="mb-4 text-xl font-bold">Enter Address</h2>
            <div className="mb-4">
              <label htmlFor="area" className="mb-2 block text-sm font-medium text-gray-700">
                Area
              </label>
              <input
                type="text"
                id="area"
                name="area"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your area"
                value={address.area}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pincode" className="mb-2 block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your pincode"
                value={address.pincode}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your city"
                value={address.city}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="mb-2 block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your state"
                value={address.state}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="mb-2 block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your country"
                value={address.country}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Address;
