import React, {useState,useEffect} from 'react'
import PageWithSidebar from '../../../common/components/page-with-sidebar/PageWithSidebar'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CustomMultiSelect } from '../../../common/components'
import { modules, personalInfo, settings_modules } from './constants'
import axios from 'axios'
import { BACKEND_URL } from '../../../common/utils/env.config'
import { toast } from 'react-toastify'
import {Loader}  from '../../../common/components'

const User_Management = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { userData, isEdit = false } = location?.state || {};
    console.log("UYYYYYYYY",userData)
    const [showPersonalInfo,setShowPersonalInfo] = useState('')
    const [moduleList,setModuleList] = useState([])
    const [settingModuleList,setSettingModuleList] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [isLoading,setIsLoading] = useState(false);
    const [userInfo,setUserInfo] = useState({
        full_name:'',
        email_address:''
    })
    const [modulesId,setModulesId] = useState([])
    const [settingModulesId,setSettingModulesId] = useState([])

    const handleSelect = (option,id) => {
        if (moduleList.includes(option)) {
          setModuleList(moduleList.filter((item) => item !== option));
          setModulesId(moduleList.filter((item) => item !== id));
        } else {
          setModuleList([...moduleList, option]);
          setModulesId([...modulesId, id]);
        }
      };

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
        })
        .then((res) => {
            console.log("Resposne Add User",res.data)
            setIsLoading(false);
            toast('User Added Successfully',{type:'success'})
            navigate('/manage-user')
        })
        .catch((err) => {
            console.log("Error Add User",err)
            toast('Error Adding User',{type:'error'})
            setIsLoading(false);
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
        })
        .then((res) => {
            console.log("Resposne Add User",res.data)
            setIsLoading(false);
            toast('User Updated Successfully',{type:'success'})
            navigate('/manage-user')
        })
        .catch((err) => {
            console.log("Error Add User",err)
            setIsLoading(false);
            toast('Error Updating User',{type:'error'})
        })
    }

  return (
    <PageWithSidebar>
        {isLoading && <Loader />}
        <div className="header bg-[#FAFBFC] border-b border-[#b3b3b3] p-2 text-xl ml-2">Settings-Manage Users</div>
      <div className="bg-[#EDEDED] w-full px-6 pb-16 mx-2">
        <div className="pt-2 pb-5 text-[#656565] font-bold">
          <Link to={'/settings'} className="text-green-500 font-semibold">Settings</Link> &gt; User Role Management &gt; Manage Users
        </div>
        <div className="bg-white flex flex-col gap-4 p-4 min-h-[550px]">
        
          <Link className='text-red-500 flex flex-row font-semibold' to={'/manage-user'}>
          <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8 -mt-1' viewBox="0 0 24 24"><path d="M19 12a1 1 0 0 1-1 1H8.414l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L8.414 11H18a1 1 0 0 1 1 1z" style={{fill:"#f97c4b"}} data-name="Left"/></svg>
          Back To Manage Users</Link>

          <div className="text-[#656565] text-lg font-bold">{isEdit ? 'Update User' :'Add New User'}</div>
          <div className="border-b border-gray-200 -mt-3"></div>
          <div className="text-[10px] -mt-1">{isEdit? 'User can only update the Name and Module access. Cloud Cargo does not allow updation of email ID.' :'Add a user to your account. An email will be sent to the email address specified with instructions and a temporary password to login.'}</div>
        
        <div>
            <div className="mb-4 w-[50%]">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                id="fullName"
                placeholder="Enter user Full Name"
                className="mt-1 block w-full px-2.5 py-1 border border-gray-200 rounded-sm shadow-sm focus:outline-none focus:border-blue-50"
                value={userInfo?.full_name}
                onChange={(e) => setUserInfo({...userInfo,full_name:e.target.value})}
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
                className="mt-1 block w-full px-2.5 py-1 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-blue-50"
                value={userInfo?.email_address}
                onChange={(e) => setUserInfo({...userInfo,email_address:e.target.value})}
            />
            </div>

            <div className="mb-4 w-[50%]">
            <label htmlFor="module" className="block text-sm font-medium text-gray-700">
                Module <span className="text-red-500">*</span>
            </label>

                {(
                <div className='mt-2 relative' tabIndex={0} onKeyDown={handleKeyDown} onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(true)}>
                    <div className="flex flex-wrap p-2 py-4 border border-gray-200 rounded-sm shadow-sm focus:outline-none focus:border-blue-50">
                    {moduleList.map((option) => (
                        <div key={option} className="bg-blue-500 text-white text-xs px-2 py-1 m-1 rounded">
                        {option}
                        </div>
                    ))}
                    <div className="flex-grow" />
                </div>

                    <div className="absolute z-10 w-full bg-white rounded-sm max-h-36 overflow-auto">
                    {isOpen && filteredModules.map((option,index) => (
                        <div
                        id={`option-${index}`}
                        key={option.value}
                        className={`p-2 cursor-pointer ${moduleList.includes(option.value) ? 'bg-gray-200' : ''} ${index === focusedIndex ? 'bg-blue-100' : ''}`}
                        onMouseEnter={() => setFocusedIndex(index)}
                        onClick={() => handleSelect(option.value,option.id)}
                        >
                        {option.label}
                        </div>
                    ))}
                    </div>
                </div>
                )}
            </div>


            {modulesId.includes(5) && <div className="mb-4 w-[50%]">
            <label htmlFor="module" className="block text-sm font-medium text-gray-700">
                Settings Module <span className="text-red-500">*</span>
            </label>

                {(
                <div className='mt-2 relative' tabIndex={0} onKeyDown={handleSettingKeyDown} onBlur={() => setIsSettingOpen(false)} onClick={() => setIsSettingOpen(true)}>
                    <div className="flex flex-wrap p-2 py-4 border border-gray-200 rounded-sm shadow-sm focus:outline-none focus:border-blue-50">
                    {settingModuleList.map((option) => (
                        <div key={option} className="bg-blue-500 text-white text-xs px-2 py-1 m-1 rounded">
                        {option}
                        </div>
                    ))}
                    <div className="flex-grow" />
                </div>

                    <div className="absolute z-10 w-full bg-white rounded-sm max-h-36 overflow-auto">
                    {isSettingOpen && filteredSettingModules.map((option,index) => (
                        <div
                        id={`option-${index}`}
                        key={option.value}
                        className={`p-2 cursor-pointer ${settingModuleList.includes(option.value) ? 'bg-gray-200' : ''} ${index === focusedIndex ? 'bg-blue-100' : ''}`}
                        onMouseEnter={() => setFocusedIndex(index)}
                        onClick={() => handleSettingSelect(option.value,option.id)}
                        >
                        {option.label}
                        </div>
                    ))}
                    </div>
                </div>
                )}
            </div>}

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
                setShowPersonalInfo(value)
                }}
                />
            </div>

            <button
            className="px-3 py-1 bg-blue-600 text-white rounded-sm hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={() => {isEdit ? handleUpdate() : handleAddUser()}}>
            {isEdit ? 'Update User' : 'Add User'}
            </button>
        </div>
        </div>


      </div>
    </PageWithSidebar>
  )
}

export default User_Management
