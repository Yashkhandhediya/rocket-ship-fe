import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import Loader from '../../common/loader/Loader';

const Field = ({ id, label, type, value, onChange, onBlur, isValid, errorMessage, placeholder }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="mb-1 text-xs font-medium text-gray-600">
      {label}
    </label>
    <div className="flex items-center">
      {type === 'tel' && (
        <div className="flex items-center">
          <span className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 p-[5px] px-2">
            +91
          </span>
          <input
            id={id}
            type="tel"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`h-[36px] flex-grow rounded-r-md border border-gray-300 p-2 text-xs ${
              !isValid ? 'border-red-500' : ''
            }`}
          />
        </div>
      )}
      {type !== 'tel' && (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`h-[36px] w-full rounded-md border border-gray-300 p-2 text-xs ${
            !isValid ? 'border-red-500' : ''
          }`}
        />
      )}
    </div>
    {!isValid && <p className="mt-1 text-xs text-red-500">{errorMessage}</p>}
  </div>
);

const AddAddress = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSaveLocation = (e) => {
    e.preventDefault();

    const newLocation = {
      mobileNumber,
      locationName,
      address,
      pincode,
      state,
      city,
    };
    setLoading(true);
    axios
      .post(BACKEND_URL + '/locations/create', newLocation)
      .then((response) => {
        setLoading(false);
        toast('Location added successfully!', { type: 'success' });
        navigate('/'); // Redirect to a different page after saving
      })
      .catch((err) => {
        setLoading(false);
        toast('Error adding location', { type: 'error' });
        console.error(err);
      });
  };

  const validatePhone = () => {
    setIsValidPhone(/^\d{10}$/.test(mobileNumber));
  };

  return (
    <PageWithSidebar>
      {loading && <Loader />}
      <div className="flex flex-col items-center justify-center gap-8 p-3">
        <div className="mt-4 w-9/12">
          <h1 className="my-2 self-start text-2xl font-bold">Add Location&apos;s Detail</h1>
        </div>
        <div className="w-9/12 rounded p-4 shadow">
          <form onSubmit={handleSaveLocation}>
            <div className="flex w-full flex-col flex-wrap gap-8">
              <div className="flex w-7/12">
                <Field
                  id="mobileNumber"
                  type="tel"
                  label="Mobile No."
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  onBlur={validatePhone}
                  isValid={isValidPhone}
                  errorMessage="Please enter a valid 10-digit number."
                  placeholder="Enter user's Phone Number"
                />
              </div>
              <Field
                id="locationName"
                type="text"
                label="Location Name"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                isValid={true}
                placeholder="Enter Location Name"
              />

              <div>
                <Field
                  id="address"
                  type="text"
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  isValid={true}
                  placeholder="House/Floor No. Building Name or Street, Locality"
                />
              </div>
              <div className="flex justify-between">
                <div className="mr-1 w-4/12">
                  <Field
                    id="pincode"
                    type="text"
                    label="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    isValid={true}
                    placeholder="Enter User's Pincode"
                  />
                </div>
                <div className="mr-1 w-4/12">
                  <Field
                    id="state"
                    type="text"
                    label="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    isValid={true}
                    placeholder="Please Select State"
                  />
                </div>
                <div className="w-4/12">
                  <Field
                    id="city"
                    type="text"
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    isValid={true}
                    placeholder="Enter User's City"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 text-center">
              <button
                type="submit"
                className="mt-4 w-7/12 rounded-full bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-900">
                verify & Save Location
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default AddAddress;
