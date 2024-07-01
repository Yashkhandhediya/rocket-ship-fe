import React,{useState} from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { ACCESS_TOKEN } from '../../common/utils/config';

const UserDataInfo = ({
  key,
  userName,
  userEmail,
  module,
  userStatus,
  LastLogin,
  PII,
  data,
  info
}) => {
  console.log("ooooooo",info,key)
  const [enabled, setEnabled] = React.useState(userStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit,setIsEdit] = useState(true)
  const navigate = useNavigate();
  const headers = {             
    'Content-Type': 'application/json',
    'Authorization': ACCESS_TOKEN};
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
    axios.get(BACKEND_URL + `/roleuser/user_role/${info?.user?.id}`,{headers:headers})
    .then((res) => {
      console.log("Single User Info",res.data)
      navigate('/user-management',{state:{userData:res.data,isEdit}})
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
        localStorage.clear()
        navigate('/login');
    } else {
      console.log(err);
      toast('Error in fetching Data',{type:'error'})
    }
    })
  }

  return (
    <div className="m-2 flex items-center justify-between border-b bg-white p-4 shadow-sm">
      <div className="flex-1 justify-between">
        <span className="text-sm font-normal">{userName}</span>
      </div>

      <div className="flex-1">
        <span className="text-sm font-normal">{userEmail}</span>
      </div>

      <div className="flex-1 text-center">
        <Link className='text-red-600 font-semibold' onClick={() => handleModuleClick()} >{`${module.length} Modules Selected`}</Link>
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
        <button className="w-32 font-normal rounded-md border border-[#E02424] bg-white py-0.5" onClick={() => handleEdit()}> Edit</button>
      </div>


      {isModalOpen && <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
      <div className="relative mt-16 p-4 w-full max-w-md m-auto flex-col flex bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Selected Modules</h3>
          <button className="text-gray-600" onClick={() => closeModal()}>
            ×
          </button>
        </div>
        <div className="mt-2">
        <ul>
          {data.map((mod, index) => (
            <li className='mb-2 bg-gray-100 font-semibold p-2 text-xs' key={index}>{mod.module_name}</li>
          ))}
        </ul>
        </div>
      </div>
    </div>}


    </div>
  );
};

export default UserDataInfo;
