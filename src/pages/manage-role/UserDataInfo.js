import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../common/utils/env.config';
import apiClient from '../../common/utils/apiClient';

const UserDataInfo = ({ key, userName, userEmail, module, userStatus, LastLogin, PII, data, info }) => {
  console.log('ooooooo', info, key);
  const [enabled, setEnabled] = React.useState(userStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => {
    setEnabled(!enabled);
    toast(` ${enabled ? 'User DeActivate Successfully' : 'User Activated Successfully.'}`, { type: 'info' });
  };

  const handleModuleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    apiClient
      .get(BACKEND_URL + `/roleuser/user_role/${info?.user?.id}`)
      .then((res) => {
        console.log('Single User Info', res.data);
        navigate('/user-management', { state: { userData: res.data, isEdit } });
      })
      .catch((err) => {
        console.log(err);
        toast('Error in fetching Data', { type: 'error' });
      });
  };

  return (
    <div className="m-2 flex items-center justify-between border-b bg-white p-4 shadow-sm">
      <div className="flex-1 justify-between">
        <span className="text-sm font-normal">{userName}</span>
      </div>

      <div className="flex-1">
        <span className="text-sm font-normal">{userEmail}</span>
      </div>

      <div className="flex-1 text-center">
        <Link
          className="font-semibold text-red-600"
          onClick={() => handleModuleClick()}>{`${module.length} Modules Selected`}</Link>
      </div>

      <div className="ml-4 flex-1 text-center">
        <label className="me-5 inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            value=""
            className="peer sr-only"
            checked={enabled}
            onChange={handleToggle}
          />
          <div
            className={`relative h-6 w-12 rounded-full border-2 ${
              enabled ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-gray-200'
            } flex items-center transition-colors duration-200 ease-in-out`}>
            <div
              className={`absolute h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${
                enabled ? 'translate-x-6' : 'translate-x-1'
              }`}></div>
          </div>
        </label>
      </div>

      <div className="flex-1 text-center">
        <span className="text-sm font-normal">{LastLogin}</span>
      </div>

      <div className="flex-1 text-center">
        <span className="text-sm font-normal">{PII}</span>
      </div>

      <div className="flex-1 text-center">
        <button
          className="w-32 rounded-md border border-[#E02424] bg-white py-0.5 font-normal"
          onClick={() => handleEdit()}>
          {' '}
          Edit
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex overflow-auto bg-black bg-opacity-50">
          <div className="relative m-auto mt-16 flex w-full max-w-md flex-col rounded-lg bg-white p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Selected Modules</h3>
              <button className="text-gray-600" onClick={() => closeModal()}>
                ×
              </button>
            </div>
            <div className="mt-2">
              <ul>
                {data.map((mod, index) => (
                  <li className="mb-2 bg-gray-100 p-2 text-xs font-semibold" key={index}>
                    {mod.module_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDataInfo;
