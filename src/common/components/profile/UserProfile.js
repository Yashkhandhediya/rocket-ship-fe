import React, {useEffect, useState} from 'react'
import PageWithSidebar from '../page-with-sidebar/PageWithSidebar'
import axios from 'axios';
import { BACKEND_URL } from '../../utils/env.config';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const [data,setData] = useState(null)
  const [editFirstName, setEditFirstName] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [editLastName, setEditLastName] = useState(false);
  const [lastName, setLastName] = useState('');

  const handleFirstNameClick = () => {
    setEditFirstName(true);
  };

  const handleLastNameClick = () => {
    setEditLastName(true);
  };


  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };


  // const handleFirstNameBlur = () => {
  //   setEditFirstName(false);
  // };


  const handleData = () => {
    axios.get(BACKEND_URL + `/users/${sessionStorage.getItem('user_id')}`)
    .then((res) => {
      console.log("Response User Data",res.data)
      sessionStorage.setItem('user_name',res.data.first_name)
      setData(res.data)
      setFirstName(res.data.first_name)
      setLastName(res.data.last_name)
    }).catch((err) => {
      console.log("Error In Fetching User Data",err)
    })
  }

  const handleCancel = () => {
    setEditFirstName(false);
    setEditLastName(false);
    setFirstName(data.first_name)
    setLastName(data.last_name)
  }

  const handleUpdate = () => {
    console.log("Upadte")
    axios.put(BACKEND_URL + `/users/${sessionStorage.getItem('user_id')}`,{
      first_name: firstName,
      last_name: lastName
    }).then((res) => {
      console.log("Response Update User",res.data)
      toast("User Info Updated Successfully",{type:'success'})
      setEditFirstName(false)
      setEditLastName(false)
      // window.location.reload()
      handleData()
    }).catch((err) => {
      console.log("Error in User Info",err)
      toast("Error In updating user info",{type:'error'})
    })
  }

  useEffect(() => {
    handleData()
  },[])

  return (
    <PageWithSidebar>
      <div className="p-2 text-xl bg-gray-100">User Profile</div>
      <div className="border-b ml-3 border-gray-400"></div>

    <div className="bg-gray-200 ml-3 p-6 rounded-sm shadow-md">
        <div className='flex flex-row mt-4'>
        <p className="w-[12%] text-sm font-semibold ml-36">First Name :</p>
        <div className="ml-48 flex flex-row">
            {editFirstName ? (
              <input
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
                // onBlur={handleFirstNameBlur}
                className="text-gray-600 h-7 rounded-md"
              />
            ) : (
              <p className="text-gray-600 text-sm">{data?.first_name || ''}</p>
            )}
            {!editFirstName && <button
              onClick={handleFirstNameClick}
              className="ml-4 text-red-600 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>}
          </div>
        </div>
        <div className='flex flex-row mt-4'>
          <p className="w-[12%] text-sm font-semibold ml-36">Last Name :</p>
          <div className="ml-48 flex flex-row">
            {editLastName ? (
              <input
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
                className="text-gray-600 h-7 rounded-md"
              />
            ) : (
              <p className="text-gray-600 text-sm">{data?.last_name || ''}</p>
            )}
            {!editLastName && <button
              onClick={handleLastNameClick}
              className="ml-4 text-red-600 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>}
          </div>
        </div>
        <div className='flex flex-row mt-4'>
          <p className="w-[12%] text-sm font-semibold ml-36">Email Id :</p>
          <p className="text-gray-600 ml-48 text-sm">{data?.email_address || ''}</p>
        </div>
        <div className='flex flex-row mt-4'>
          <p className="w-[12%] text-sm font-semibold ml-36">Phone :</p>
          <p className="text-gray-600 ml-48 text-sm">{data?.contact_no || ''}</p>
        </div>
        <div className='flex flex-row mt-4'>
          <p className="w-[12%] text-sm font-semibold ml-36">Company ID :</p>
          <p className="text-gray-600 ml-48 text-sm">{data?.company_id || ''}</p>
        </div>
        <div className='flex flex-row mt-4'>
          <p className="w-[12%] text-sm font-semibold ml-36">Company Name :</p>
          <p className="text-gray-600 ml-48 text-sm">Tech IT Easy</p>
        </div>
        <div className='flex flex-row mt-4'>
          <p className="w-[12%] text-sm font-semibold ml-36">Plan :</p>
          <p className="text-gray-600 ml-48 text-sm">Lite Plan </p>
          <Link className="text-red-600 ml-4 text-sm">(Change Plan?)</Link>
        </div>
        <div className='flex flex-row mt-4'>
          <p className="w-[12%] text-sm font-semibold ml-36">Subscription Status :</p>
          <p className="text-gray-600 ml-48 text-sm">Active</p>
        </div>
        <div className='flex flex-row mt-4'>
          <p className="w-[12%] text-sm font-semibold ml-36">Subscription Duration :</p>
          <p className="text-gray-600 ml-48 text-sm">{data?.subscription_span || 'NA'}</p>
        </div>
        <div className='flex flex-row mt-4'>
          <p className="w-[12%] text-sm font-semibold ml-36">Renewal Date :</p>
          <p className="text-gray-600 ml-48 text-sm"></p>
        </div>
        <div className='flex flex-row mt-4'>
          <p className="w-[12%] text-sm font-semibold ml-36">Tier :</p>
          <p className="text-gray-600 ml-48 text-sm">BRONZE</p>
        </div>
        <div className='flex flex-row mt-4'>
          <p className="w-[12%] text-sm font-semibold ml-36">KAM Name :</p>
          <p className="text-gray-600 ml-48 text-sm">Customer Support</p>
        </div>
        <div className='flex flex-row mt-4'>
          <p className="w-[12%] text-sm font-semibold ml-36">KAM Email :</p>
          <p className="text-gray-600 ml-48 text-sm">support@cloudcargo.com</p>
        </div>
        <div className='flex flex-row mt-4'>
          <p className="w-[12%] text-sm font-semibold ml-36">KAM Phone No :</p>
          <p className="text-gray-600 ml-48 text-sm"></p>
        </div>
      
      {(editFirstName || editLastName) && <div className="mt-4 ml-60">
        <button className="bg-blue-600 text-white text-sm p-2 rounded-sm mr-2" onClick={() => handleUpdate()}>Update</button>
        <button className="bg-red-600 text-white text-sm p-2 rounded-sm ml-2" onClick={() => handleCancel()}>Cancel</button>
      </div>}
    </div>
    </PageWithSidebar>
  )
}

export default UserProfile