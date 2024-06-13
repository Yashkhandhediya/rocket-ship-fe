import React from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


const UserDataInfo = ({
  userName,
  userEmail,
  module,
  userStatus,
  LastLogin,
  PII,
}) => {
  const [enabled, setEnabled] = React.useState(userStatus);
  const navigate = useNavigate();

  const handleToggle = () => {
    setEnabled(!enabled);
    toast(` ${enabled ? 'User DeActivate Successfully' : 'User Activated Successfully.'}`, { type: 'info' });
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
        <Link className='text-red-600 font-semibold' >{`${module.length} Modules Selected`}</Link>
      </div>


      <div className="flex-1 text-center ml-4">
        <label className="me-5 inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            value=""
            className="peer sr-only"
            checked={enabled}
            onChange={handleToggle}
          />
          <div
            className={`relative h-6 w-12 rounded-full border-2 ${enabled ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-gray-200'} flex items-center transition-colors duration-200 ease-in-out`}
          >
            <div
              className={`absolute h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ease-in-out transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
            ></div>
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
        <button className="w-32 font-normal rounded-md border border-[#E02424] bg-white py-0.5" onClick={() => {
                navigate('/user-management');
              }}> Edit</button>
      </div>
    </div>
  );
};

export default UserDataInfo;
