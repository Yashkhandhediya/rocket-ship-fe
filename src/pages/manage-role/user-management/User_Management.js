import React, { useState, useEffect } from 'react';
import PageWithSidebar from '../../../common/components/page-with-sidebar/PageWithSidebar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CustomMultiSelect } from '../../../common/components';
import { modules, personalInfo, settings_modules } from './constants';
import axios from 'axios';
import { BACKEND_URL } from '../../../common/utils/env.config';
import { toast } from 'react-toastify';
import { Loader } from '../../../common/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ACCESS_TOKEN } from '../../../common/utils/config';

const User_Management = () => {
  const navigate = useNavigate();
  const headers = {             
    'Content-Type': 'application/json',
    'Authorization': ACCESS_TOKEN};
  const location = useLocation();
  const { userData, isEdit = false } = location?.state || {};
  console.log('UYYYYYYYY', userData);
  const [showPersonalInfo, setShowPersonalInfo] = useState('');
  const [moduleList, setModuleList] = useState([]);
  const [settingModuleList, setSettingModuleList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    full_name: '',
    email_address: '',
  });
  const [modulesId, setModulesId] = useState([]);
  const [settingModulesId, setSettingModulesId] = useState([]);

  const handleSelect = (option, id) => {
    if (moduleList.includes(option)) {
      setModuleList(moduleList.filter((item) => item !== option));
      setModulesId(moduleList.filter((item) => item !== id));
    } else {
      setModuleList([...moduleList, option]);
      setModulesId([...modulesId, id])
    }
}


      const handleSettingSelect = (option,id) => {
        if (settingModuleList.includes(option)) {
          setSettingModuleList(settingModuleList.filter((item) => item !== option));
          setSettingModulesId(settingModuleList.filter((item) => item !== id));
        } else {
          setSettingModuleList([...settingModuleList, option]);
          setSettingModulesId([...settingModulesId, id]);
        }
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && moduleList.length > 0) {
          setModuleList(moduleList.slice(0, -1));
          setModulesId(modulesId.slice(0,-1));
        }
        if (e.key === 'ArrowDown') {
            setFocusedIndex((prevIndex) => (prevIndex + 1) % filteredModules.length);
        } else if (e.key === 'ArrowUp') {
            setFocusedIndex((prevIndex) => (prevIndex === 0 ? filteredModules.length - 1 : prevIndex - 1));
        } else if (e.key === 'Enter') {
            if (focusedIndex >= 0 && focusedIndex < modules.length) {
                handleSelect(filteredModules[focusedIndex]?.value);
            }
        }
      };

      const handleSettingKeyDown = (e) => {
        if (e.key === 'Backspace' && settingModuleList.length > 0) {
          setSettingModuleList(settingModuleList.slice(0, -1));
          setSettingModulesId(settingModulesId.slice(0,-1));
        }
        if (e.key === 'ArrowDown') {
            setFocusedIndex((prevIndex) => (prevIndex + 1) % filteredSettingModules.length);
        } else if (e.key === 'ArrowUp') {
            setFocusedIndex((prevIndex) => (prevIndex === 0 ? filteredSettingModules.length - 1 : prevIndex - 1));
        } else if (e.key === 'Enter') {
            if (focusedIndex >= 0 && focusedIndex < settings_modules.length) {
                handleSelect(filteredSettingModules[focusedIndex]?.value);
            }
        }
        setFocusedIndex(-1)
      };

      const handleRemoveModule = (index) => {
        setModuleList((prevState) => prevState.filter((_, i) => i !== index));
      };
    
      const handleRemoveSettingModule = (index) => {
        setSettingModuleList((prevState) => prevState.filter((_, i) => i !== index));
      };

      const filteredModules = modules.filter(module => !moduleList.includes(module.value));
      const filteredSettingModules = settings_modules.filter(module => !settingModuleList.includes(module.value));

    useEffect(() => {
        if (focusedIndex >= 0) {
            document.getElementById(`option-${focusedIndex}`).scrollIntoView({
                block: 'nearest',
            });
        }
    }, [focusedIndex]);

    useEffect(() => {
        if(userData){
            setUserInfo({...userInfo,
                full_name:userData?.user?.name,
                email_address:userData?.user?.email})
            
            setShowPersonalInfo(userData?.user?.show_info ==  1 ? 'Yes' : 'No')
            setModuleList(userData?.module.map((mod) => mod.module_name))
            setSettingModuleList(userData?.setting_module.map((mod) => mod.module_name))
            setModulesId(userData?.module.map((mod) => mod.id))
            setSettingModulesId(userData?.setting_module.map((mod) => mod.id))
        }
    },[userData])

    const handleAddUser = () => {
        setIsLoading(true);
        axios.post(BACKEND_URL + '/roleuser/add_user',{
            "first_name": userInfo?.full_name,
            "email_address": userInfo?.email_address,
            "company_id": parseInt(localStorage.getItem('company_id')),
            "created_by": parseInt(localStorage.getItem('company_id')),
            "show_info": showPersonalInfo == "Yes" ? 1 : 0,
            "modules_id": modulesId,
            "setting_modules_id":settingModulesId
        },{headers:headers})
        .then((res) => {
            if(res.data == "user already exist"){
                setIsLoading(false)
                toast.error("User already exist");
                return;
            }
            console.log("Resposne Add User",res.data)
            setIsLoading(false);
            toast('User Added Successfully',{type:'success'})
            navigate('/manage-user')
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            localStorage.clear()
            navigate('/login');
        } else {
          console.log("Error Add User",err)
          toast('Error Adding User',{type:'error'})
          setIsLoading(false);
        }
        })
    }


    const handleUpdate = () => {
        setIsLoading(true);
        axios.put(BACKEND_URL + `/roleuser/update_user?role_user_id=${userData?.user?.id}`,{
            "first_name": userInfo?.full_name,
            "email_address": userInfo?.email_address,
            "company_id": parseInt(localStorage.getItem('company_id')),
            "created_user_id": parseInt(localStorage.getItem('user_id')),
            "show_info": showPersonalInfo == "Yes" ? 1 : 0,
            "modules_id": modulesId,
            "setting_modules_id":settingModulesId
        },{headers:headers})
        .then((res) => {
            console.log("Resposne Add User",res.data)
            setIsLoading(false);
            toast('User Updated Successfully',{type:'success'})
            navigate('/manage-user')
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            localStorage.clear()
            navigate('/login');
        } else {
          console.log("Error Add User",err)
          setIsLoading(false);
          toast('Error Updating User',{type:'error'})
        }
        })
    }
  

  return (
    <PageWithSidebar>
      {isLoading && <Loader />}
      <div className="header ml-2 border-b border-[#b3b3b3] bg-[#FAFBFC] p-2 text-xl">
        Settings-Manage Users
      </div>
      <div className="mx-2 w-full bg-[#EDEDED] px-6 pb-16">
        <div className="pb-5 pt-2 font-bold text-[#656565]">
          <Link to={'/settings'} className="font-semibold text-green-500">
            Settings
          </Link>{' '}
          &gt; User Role Management &gt; Manage Users
        </div>
        <div className="flex min-h-[550px] flex-col gap-4 bg-white p-4">
          <Link className="flex flex-row font-semibold text-red-500" to={'/manage-user'}>
            <svg xmlns="http://www.w3.org/2000/svg" className="-mt-1 h-8 w-8" viewBox="0 0 24 24">
              <path
                d="M19 12a1 1 0 0 1-1 1H8.414l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L8.414 11H18a1 1 0 0 1 1 1z"
                style={{ fill: '#f97c4b' }}
                data-name="Left"
              />
            </svg>
            Back To Manage Users
          </Link>

          <div className="text-lg font-bold text-[#656565]">{isEdit ? 'Update User' : 'Add New User'}</div>
          <div className="-mt-3 border-b border-gray-200"></div>
          <div className="-mt-1 text-[10px]">
            {isEdit
              ? 'User can only update the Name and Module access. Cloud Cargo does not allow updation of email ID.'
              : 'Add a user to your account. An email will be sent to the email address specified with instructions and a temporary password to login.'}
          </div>

          <div>
            <div className="mb-4 w-[50%]">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter user Full Name"
                className="mt-1 block w-full rounded-sm border border-gray-200 px-2.5 py-1 shadow-sm focus:border-blue-50 focus:outline-none"
                value={userInfo?.full_name}
                onChange={(e) => setUserInfo({ ...userInfo, full_name: e.target.value })}
              />
            </div>

            <div className="mb-4 w-[50%]">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Id <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter user Email Id"
                className="mt-1 block w-full rounded-sm border border-gray-300 px-2.5 py-1 shadow-sm focus:border-blue-50 focus:outline-none"
                value={userInfo?.email_address}
                onChange={(e) => setUserInfo({ ...userInfo, email_address: e.target.value })}
              />
            </div>

            <div className="mb-4 w-[50%]">
              <label htmlFor="module" className="block text-sm font-medium text-gray-700">
                Module <span className="text-red-500">*</span>
              </label>

              {
                <div
                  className="relative mt-2"
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                  onBlur={() => setIsOpen(false)}
                  onClick={() => setIsOpen(true)}>
                  <div className="flex flex-wrap rounded-sm border border-gray-200 p-2 py-4 shadow-sm focus:border-blue-50 focus:outline-none">
                    {moduleList.map((option, index) => (
                      <div
                        key={option}
                        className="m-1 flex items-center gap-2 rounded bg-blue-500 px-2 py-1 text-xs text-white">
                        {option}
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className="cursor-pointer"
                          onClick={() => handleRemoveModule(index)}
                        />
                      </div>
                    ))}
                    <div className="flex-grow" />
                  </div>

                  <div className="absolute z-10 max-h-36 w-full overflow-auto rounded-sm bg-white">
                    {isOpen &&
                      filteredModules.map((option, index) => (
                        <div
                          id={`option-${index}`}
                          key={option.value}
                          className={`cursor-pointer p-2 ${
                            moduleList.includes(option.value) ? 'bg-gray-200' : ''
                          } ${index === focusedIndex ? 'bg-blue-100' : ''}`}
                          onMouseEnter={() => setFocusedIndex(index)}
                          onClick={() => handleSelect(option.value, option.id)}>
                          {option.label}
                        </div>
                      ))}
                  </div>
                </div>
              }
            </div>

            {modulesId.includes(5) && (
              <div className="mb-4 w-[50%]">
                <label htmlFor="module" className="block text-sm font-medium text-gray-700">
                  Settings Module <span className="text-red-500">*</span>
                </label>

                {
                  <div
                    className="relative mt-2"
                    tabIndex={0}
                    onKeyDown={handleSettingKeyDown}
                    onBlur={() => setIsSettingOpen(false)}
                    onClick={() => setIsSettingOpen(true)}>
                    <div className="flex flex-wrap rounded-sm border border-gray-200 p-2 py-4 shadow-sm focus:border-blue-50 focus:outline-none">
                      {settingModuleList.map((option, index) => (
                        <div
                          key={option}
                          className="m-1 flex items-center gap-2 rounded bg-blue-500 px-2 py-1 text-xs text-white">
                          {option}
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="cursor-pointer"
                            onClick={() => handleRemoveSettingModule(index)}
                          />
                        </div>
                      ))}
                      <div className="flex-grow" />
                    </div>

                    <div className="absolute z-10 max-h-36 w-full overflow-auto rounded-sm bg-white">
                      {isSettingOpen &&
                        filteredSettingModules.map((option, index) => (
                          <div
                            id={`option-${index}`}
                            key={option.value}
                            className={`cursor-pointer p-2 ${
                              settingModuleList.includes(option.value) ? 'bg-gray-200' : ''
                            } ${index === focusedIndex ? 'bg-blue-100' : ''}`}
                            onMouseEnter={() => setFocusedIndex(index)}
                            onClick={() => handleSettingSelect(option.value, option.id)}>
                            {option.label}
                          </div>
                        ))}
                    </div>
                  </div>
                }
              </div>
            )}

            <div className="mb-6 w-[50%]">
              <label htmlFor="showInfo" className="block text-sm font-medium text-gray-700">
                Show Buyers Personal Information <span className="text-red-500">*</span>
              </label>
              <CustomMultiSelect
                isMulti={false}
                options={personalInfo}
                selected={showPersonalInfo}
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                placeholder={showPersonalInfo}
                onChange={(value) => {
                  setShowPersonalInfo(value);
                }}
              />
            </div>

            <button
              className="rounded-sm bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
              onClick={() => {
                isEdit ? handleUpdate() : handleAddUser();
              }}>
              {isEdit ? 'Update User' : 'Add User'}
            </button>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
};


export default User_Management
