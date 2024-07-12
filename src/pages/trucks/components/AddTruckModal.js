import React, { useEffect, useState } from 'react';
import { CustomMultiSelect, Loader } from '../../../common/components';
import { truckTypes } from '../../indent/data';
import { BACKEND_URL } from '../../../common/utils/env.config';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddTruckModal({ handleClose, getTruckData, editData, handleSetEdit }) {
  console.log(editData);

  const [loading, setLoading] = useState(false);
  const company_id = sessionStorage.getItem('company_id');
  const [truckData, setTruckData] = useState({
    truck_type: editData ? editData?.truck_type : 'Select Type',
    capacity_type: editData ? editData?.capacity_type : 'KG',
    truck_number: editData ? editData.truck_number : '',
    truckDimensions: editData ? editData.length : '',
    capacity: editData ? editData.capacity : '',
  });

  const handleToggleCapacity = (e) => {
    const { innerText } = e.target;
    console.log(innerText);
    setTruckData({ ...truckData, capacity_type: innerText });
  };
  console.log(truckData);

  const handleAddTruck = async () => {
    setLoading(true);
    handleClose();
    try {
      const response = await axios.post(`${BACKEND_URL}/trucktype/create_truck_type/`, {
        ...truckData,
        length: truckData.truckDimensions,
        height: truckData.truckDimensions,
        created_by: company_id,
      });
      setTruckData({
        truck_type: 'Select Type',
        capacity_type: '',
        truck_number: '',
        truckDimensions: '',
        capacity: '',
      });
      console.log(response);
      getTruckData();
      toast('Added Truck Sucessfully', { type: 'success' });
    } catch (err) {
      toast('There is some error while Adding Truck', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditTruck = async () => {
    setLoading(true);
    handleClose();

    try {
      const response = await axios.put(`${BACKEND_URL}/trucktype/update_truck_type/?id=${editData.id}`, {
        ...truckData,
        length: truckData.truckDimensions,
        height: truckData.truckDimensions,
      });
      setTruckData({
        truck_type: 'Select Type',
        capacity_type: '',
        truck_number: '',
        truckDimensions: '',
        capacity: '',
      });
      handleSetEdit();
      console.log(response);
      getTruckData();
      toast('Edited Truck Sucessfully', { type: 'success' });
    } catch (err) {
      toast('There is some error while Editing Truck', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#24292e57]">
        <div className="flex w-96 flex-col gap-4 rounded-lg bg-white p-4 text-sm font-medium">
          <div className="flex justify-between">
            <p className="text-lg font-bold">{editData ? 'Edit' : 'Add'} Truck</p>
            <button className="text-gray-400" onClick={handleClose}>
              X
            </button>
          </div>
          <div className="mb-2 ">
            <label htmlFor="" className="block text-[12px] font-semibold">
              Truck Type <span className="text-red-500">*</span>
            </label>
            <CustomMultiSelect
              isMulti={false}
              options={truckTypes}
              selected={truckData.truck_type}
              closeMenuOnSelect={true}
              placeholder={truckData.truck_type}
              hideSelectedOptions={false}
              onChange={(value) => {
                setTruckData({ ...truckData, truck_type: value });
              }}
            />
          </div>

          <div className="mb-2 ">
            <label htmlFor="truck_capacity" className="block text-[12px] font-medium">
              Truck Capacity <span className="text-red-500">*</span>{' '}
            </label>
            <div className="mt-1 flex w-full border border-gray-200 p-0">
              <input
                type="text"
                id="truck_capacity"
                className="block w-2/3 rounded-sm border-none px-2.5 py-1 text-[12px] shadow-sm outline-none focus:border-zinc-50 focus:outline-none"
                value={truckData.capacity}
                onChange={(e) => setTruckData({ ...truckData, capacity: e.target.value })}
              />
              <div
                className="my-1 mr-1 flex w-1/3 gap-4 rounded bg-zinc-200 px-2 py-1 transition-all duration-500"
                onClick={(e) => handleToggleCapacity(e)}>
                <button className={`${truckData.capacity_type === 'KG' && 'rounded bg-white shadow'} w-1/2 `}>
                  KG
                </button>
                <button
                  className={`${truckData.capacity_type !== 'KG' && ' w-1/2 rounded bg-white px-2 shadow'}`}>
                  Tonne
                </button>
              </div>
            </div>
          </div>
          <div className="mb-2 ">
            <label htmlFor="truck_number" className="block text-[12px] font-medium ">
              Truck Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="truck_number"
              className="mt-1 block w-full rounded-sm border border-gray-200 px-2.5 py-1 text-[12px] shadow-sm focus:border-blue-50 focus:outline-none"
              value={truckData.truck_number}
              onChange={(e) => setTruckData({ ...truckData, truck_number: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="truck_dimensions" className="block text-[12px] font-medium ">
              Truck Dimensions <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="truck_dimensions"
              className="mt-1 block w-full rounded-sm border border-gray-200 px-2.5 py-1 text-[12px] shadow-sm focus:border-blue-50 focus:outline-none"
              value={truckData.truckDimensions}
              onChange={(e) => setTruckData({ ...truckData, truckDimensions: e.target.value })}
            />
          </div>
          <div className="flex w-full justify-center gap-4">
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
                editData ? handleEditTruck() : handleAddTruck();
              }}>
              {editData ? 'Edit Truck' : 'Add Truck'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddTruckModal;
