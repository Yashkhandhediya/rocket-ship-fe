import React, { useState } from 'react';
import { Loader } from '../../../common/components';
import { BACKEND_URL } from '../../../common/utils/env.config';
import axios from 'axios';
import { toast } from 'react-toastify';

const Field = ({ id, label, type, value, onChange, onBlur, isValid, errorMessage, placeholder }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="mb-1 text-xs font-medium text-gray-600">
      {label}
    </label>
    <div className="flex w-full items-center">
      {type === 'tel' && (
        <div className="flex w-full items-center">
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
            className={` h-[36px] w-full flex-grow rounded-r-md border border-gray-300 p-2 text-xs ${
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

function AddAddressModal({ handleClose, getAddressData, editData, handleSetEdit }) {
  console.log(editData);

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(editData ? editData.area : '');
  const [pincode, setPincode] = useState(editData ? editData.pincode : '');
  const [state, setState] = useState(editData ? editData.state : '');
  const [city, setCity] = useState(editData ? editData.city : '');
  const [country, setCountry] = useState(editData ? editData.country : '');
  const company_id = sessionStorage.getItem('company_id');

  const handleClear = () => {
    setAddress('');
    setPincode('');
    setCity('');
    setCountry('');
    setState('');
  };

  const handleSaveLocation = () => {
    setLoading(true);
    axios
      .post(BACKEND_URL + `/address/truck_booking_address/?created_by=${company_id}`, {
        area: address,
        pincode,
        state,
        city,
        country,
      })
      .then((response) => {
        setLoading(false);
        handleClose();

        handleClear();
        getAddressData();
        toast('Address Added successfully!', { type: 'success' });
      })
      .catch((err) => {
        setLoading(false);
        toast('Error adding location', { type: 'error' });
        console.error(err);
      });
  };

  const handleEditLocation = () => {
    setLoading(true);
    handleClose();

    axios
      .put(`${BACKEND_URL}/address/update_address/?id=${editData.id}`, {
        area: address,
        city,
        state,
        pincode,
        country,
      })
      .then((response) => {
        setLoading(false);
        handleClear();
        handleSetEdit();
        getAddressData();
        toast('Address Updated successfully!', { type: 'success' });
      })
      .catch((err) => {
        setLoading(false);
        toast('Error Updating Address', { type: 'error' });
        console.error(err);
      });
  };

  return (
    <>
      {loading && <Loader />}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#24292e57]">
        <div className="flex w-96 flex-col gap-4 rounded-lg bg-white p-4 text-sm font-medium">
          <div className="flex justify-between">
            <p className="text-lg font-bold">{editData ? 'Edit' : 'Add'} Address</p>
            <button className="text-gray-400" onClick={handleClose}>
              X
            </button>
          </div>
          <div className="flex w-full flex-col flex-wrap gap-4">
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
            <div>
              <Field
                id="pincode"
                type="text"
                label="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                isValid={true}
                placeholder="Enter Pincode"
              />
            </div>
            <div className="flex gap-2">
              <div>
                <Field
                  id="state"
                  type="text"
                  label="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  isValid={true}
                  placeholder="Enter State"
                />
              </div>
              <div>
                <Field
                  id="city"
                  type="text"
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  isValid={true}
                  placeholder="Enter City"
                />
              </div>
            </div>
            <div>
              <Field
                id="country"
                type="text"
                label="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                isValid={true}
                placeholder="Enter Country"
              />
            </div>
          </div>

          <div className="mt-8 flex w-full justify-center gap-4">
            <button
              className="w-1/2 rounded-lg bg-zinc-200 px-4 py-2"
              onClick={() => {
                handleClose();
              }}>
              Cancel
            </button>
            <button
              className="w-1/2 rounded-lg bg-sky-500 px-4 py-2 text-white"
              onClick={() => {
                editData ? handleEditLocation() : handleSaveLocation();
              }}>
              {editData ? 'Edit Address' : 'Add Address'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddAddressModal;
