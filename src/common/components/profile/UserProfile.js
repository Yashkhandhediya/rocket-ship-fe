import React, { useEffect, useState } from 'react';
import PageWithSidebar from '../page-with-sidebar/PageWithSidebar';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/env.config';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from '../loader';

const UserProfile = () => {
  const [data, setData] = useState(null);
  const [editFirstName, setEditFirstName] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [editLastName, setEditLastName] = useState(false);
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  const requiredFieldErrors = () => {
    const newErrors = {};

    if (firstName == '') newErrors.first_name = 'First Name is Required';
    if (lastName == '') newErrors.last_name = 'Last Name is Required';
    return newErrors;
  };

  console.log(error);

  const handleData = () => {
    setLoading(true);
    axios
      .get(BACKEND_URL + `/users/${sessionStorage.getItem('user_id')}`)
      .then((res) => {
        setLoading(false);
        console.log('Response User Data', res.data);
        sessionStorage.setItem('user_name', res.data.first_name);
        setData(res.data);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
      })
      .catch((err) => {
        setLoading(false);
        console.log('Error In Fetching User Data', err);
      });
  };

  const handleCancel = () => {
    setEditFirstName(false);
    setEditLastName(false);
    setFirstName(data.first_name);
    setLastName(data.last_name);
  };

  const handleUpdate = () => {
    const requiredError = requiredFieldErrors();
    if (Object.keys(requiredError).length > 0) {
      setError(requiredError);
      return;
    }
    setError(null);
    setLoading(true);
    console.log('Upadte');
    axios
      .put(BACKEND_URL + `/users/${sessionStorage.getItem('user_id')}`, {
        first_name: firstName,
        last_name: lastName,
      })
      .then((res) => {
        setLoading(false);
        console.log('Response Update User', res.data);
        toast('User Info Updated Successfully', { type: 'success' });
        setEditFirstName(false);
        setEditLastName(false);
        // window.location.reload()
        handleData();
      })
      .catch((err) => {
        setLoading(false);
        console.log('Error in User Info', err);
        toast('Error In updating user info', { type: 'error' });
      });
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <PageWithSidebar>
      {loading && <Loader />}
      <div className="bg-gray-100 p-2 text-xl">User Profile</div>
      <div className="ml-3 border-b border-gray-400"></div>

      <div className="ml-3 rounded-sm bg-gray-200 p-6 shadow-md">
        <div className="mt-4 flex flex-row">
          <p className="ml-36 w-[12%] text-sm font-semibold">First Name :</p>
          <div className="ml-48 flex flex-row">
            {editFirstName ? (
              <>
                <input
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  // onBlur={handleFirstNameBlur}
                  className="h-7 rounded-md text-gray-600"
                />
              </>
            ) : (
              <p className="text-sm text-gray-600">{data?.first_name || ''}</p>
            )}

            {!editFirstName && (
              <button onClick={handleFirstNameClick} className="text-primary ml-4 hover:text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            )}
            {error && <p className="w-1/2 text-xs text-red-500">{error?.first_name}</p>}
          </div>
        </div>
        <div className="mt-4 flex flex-row">
          <p className="ml-36 w-[12%] text-sm font-semibold">Last Name :</p>
          <div className="ml-48 flex flex-row">
            {editLastName ? (
              <input
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
                className="h-7 rounded-md text-gray-600"
              />
            ) : (
              <p className="text-sm text-gray-600">{data?.last_name || ''}</p>
            )}
            {!editLastName && (
              <button onClick={handleLastNameClick} className="text-primary ml-4 hover:text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            )}
            {error && <p className="w-1/2 text-xs text-red-500">{error?.last_name}</p>}
          </div>
        </div>
        <div className="mt-4 flex flex-row">
          <p className="ml-36 w-[12%] text-sm font-semibold">Email Id :</p>
          <p className="ml-48 text-sm text-gray-600">{data?.email_address || ''}</p>
        </div>
        <div className="mt-4 flex flex-row">
          <p className="ml-36 w-[12%] text-sm font-semibold">Phone :</p>
          <p className="ml-48 text-sm text-gray-600">{data?.contact_no || ''}</p>
        </div>
        <div className="mt-4 flex flex-row">
          <p className="ml-36 w-[12%] text-sm font-semibold">Company ID :</p>
          <p className="ml-48 text-sm text-gray-600">{data?.company_id || ''}</p>
        </div>
        <div className="mt-4 flex flex-row">
          <p className="ml-36 w-[12%] text-sm font-semibold">Company Name :</p>
          <p className="ml-48 text-sm text-gray-600">Tech IT Easy</p>
        </div>
        <div className="mt-4 flex flex-row">
          <p className="ml-36 w-[12%] text-sm font-semibold">Plan :</p>
          <p className="ml-48 text-sm text-gray-600">Lite Plan </p>
          <Link className="text-primary ml-4 text-sm">(Change Plan?)</Link>
        </div>
        <div className="mt-4 flex flex-row">
          <p className="ml-36 w-[12%] text-sm font-semibold">Subscription Status :</p>
          <p className="ml-48 text-sm text-gray-600">Active</p>
        </div>
        <div className="mt-4 flex flex-row">
          <p className="ml-36 w-[12%] text-sm font-semibold">Subscription Duration :</p>
          <p className="ml-48 text-sm text-gray-600">{data?.subscription_span || 'NA'}</p>
        </div>
        <div className="mt-4 flex flex-row">
          <p className="ml-36 w-[12%] text-sm font-semibold">Renewal Date :</p>
          <p className="ml-48 text-sm text-gray-600"></p>
        </div>
        <div className="mt-4 flex flex-row">
          <p className="ml-36 w-[12%] text-sm font-semibold">Tier :</p>
          <p className="ml-48 text-sm text-gray-600">BRONZE</p>
        </div>
        <div className="mt-4 flex flex-row">
          <p className="ml-36 w-[12%] text-sm font-semibold">KAM Name :</p>
          <p className="ml-48 text-sm text-gray-600">Customer Support</p>
        </div>
        <div className="mt-4 flex flex-row">
          <p className="ml-36 w-[12%] text-sm font-semibold">KAM Email :</p>
          <p className="ml-48 text-sm text-gray-600">support@cloudcargo.com</p>
        </div>
        <div className="mt-4 flex flex-row">
          <p className="ml-36 w-[12%] text-sm font-semibold">KAM Phone No :</p>
          <p className="ml-48 text-sm text-gray-600"></p>
        </div>

        {(editFirstName || editLastName) && (
          <div className="ml-60 mt-4">
            <button
              className="mr-2 rounded-sm bg-blue-600 p-2 text-sm text-white"
              onClick={() => handleUpdate()}>
              Update
            </button>
            <button
              className="ml-2 rounded-sm bg-red-600 p-2 text-sm text-white"
              onClick={() => handleCancel()}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </PageWithSidebar>
  );
};

export default UserProfile;
