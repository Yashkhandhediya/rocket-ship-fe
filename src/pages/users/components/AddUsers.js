import React, { useEffect, useState } from 'react';
import { Field, Loader } from '../../../common/components';
import { BACKEND_URL } from '../../../common/utils/env.config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN } from '../../../common/utils/config';
import { useNavigate } from 'react-router-dom';

function AddUsers({ handleClose, getUsersData, editData, handleSetEdit }) {
  console.log(editData);
  const navigate = useNavigate();
  const headers = { 'Content-Type': 'application/json','Authorization': ACCESS_TOKEN };
  const [loading, setLoading] = useState(false);
  const [signupInput, setSignupInput] = useState({
    company_id: sessionStorage.getItem('company_id'),
    first_name: editData ? editData?.first_name : '',
    last_name: editData ? editData?.last_name : '',
    email_address: editData ? editData?.email_address : '',
    contact_no: editData ? editData?.contact_no : '',
    password: '',
    users_type_id: 1,
  });

  const [error, setError] = useState({});

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setSignupInput({
      ...signupInput,
      [id]: value,
    });
  };

  const requiredFieldErrors = () => {
    const newErrors = {};

    if (!signupInput.first_name) newErrors.first_name = 'First Name is Required';
    if (!signupInput.last_name) newErrors.last_name = 'Last Name is Required';
    if (!signupInput.email_address) newErrors.email_address = 'email address is Required';
    if (!signupInput.contact_no) newErrors.contact_no = 'contact no. is Required';
    if (!signupInput.password) newErrors.password = 'password is Required';
    return newErrors;
  };

  const handleClear = () => {
    setSignupInput({
      ...signupInput,
      first_name: '',
      last_name: '',
      email_address: '',
      contact_no: '',
    });
  };

  const handleSubmit = () => {
    const requiredError = requiredFieldErrors();
    if (Object.keys(requiredError).length > 0) {
      setError(requiredError);
      return;
    }
    setLoading(true);
    handleClose();
    const headers = { 'Content-Type': 'application/json','Authorization': ACCESS_TOKEN };
    axios
      .post(
        BACKEND_URL + '/users/signup',
        {
          first_name: signupInput.first_name,
          last_name: signupInput.last_name,
          password: signupInput.password,
          contact_no: signupInput.contact_no,
          email_address: signupInput.email_address,
          company_id: signupInput.company_id,
          users_type_id: signupInput.users_type_id,
        },
        { headers },
      )
      .then((res) => {
        setLoading(false);
        console.log('Reponse of Sign up', res);
        if (res.data.msg == 'User already exits') {
          toast('User Already Exists', { type: 'error' });
        } else {
          getUsersData();
          toast('User Added SuccessFully', { type: 'success' });
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          sessionStorage.clear()
          navigate('/login');
      } else {
          setLoading(false);
          console.log('Error in Adding User', err);
          toast('Error in Adding User', { type: 'error' });
      }
      });
  };

  const handleEdit = async () => {
    setLoading(true);
    handleClose();
    try {
      const response = await axios.put(`${BACKEND_URL}/users/${editData.id}`, {
        first_name: signupInput.first_name,
        last_name: signupInput.last_name,
        password: signupInput.password,
        contact_no: signupInput.contact_no,
        email_address: signupInput.email_address,
      },{headers:headers});
      if (response.data.msg == 'The user with the same email already exists') {
        toast(response.data.msg, { type: 'error' });
      } else {
        toast('User Edited Successfully', { type: 'success' });
      }
      handleClear();
      handleSetEdit();
      getUsersData();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        sessionStorage.clear()
        navigate('/login');
    } else {
        console.log('err');
        toast('There is some error while editing user');
    }
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
            <p className="text-lg font-bold">{editData ? 'Edit' : 'Add'} User</p>
            <button className="text-gray-400" onClick={handleClose}>
              X
            </button>
          </div>
          <div className="flex w-full flex-col flex-wrap gap-4">
            <div className="flex w-full gap-2">
              <Field
                type={'text'}
                id={'first_name'}
                label={'First Name'}
                placeHolder={'First name'}
                required={true}
                value={signupInput['first_name']}
                onChange={handleChangeInput}
              />
              <Field
                type={'text'}
                id={'last_name'}
                label={'Last Name'}
                placeHolder={'Last name'}
                required={true}
                value={signupInput['last_name']}
                onChange={handleChangeInput}
              />
            </div>
            <div className="flex justify-between">
              {error && <p className="w-1/2 text-xs text-red-500">{error?.first_name}</p>}
              {error && <p className="w-1/2 text-xs text-red-500">{error?.last_name}</p>}
            </div>
            <Field
              type={'email'}
              id={'email_address'}
              label={'Email ID'}
              placeHolder={'Enter email ID'}
              required={true}
              value={signupInput['email_address']}
              onChange={handleChangeInput}
            />
            {error && <p className="w-1/2 text-xs text-red-500">{error?.email_address}</p>}

            <Field
              type="number"
              id={'contact_no'}
              label={'Contact No'}
              placeHolder={'Enter Contact No'}
              required={true}
              value={signupInput['contact_no']}
              onChange={handleChangeInput}
              className="rounded text-[14px]"
            />
            {error && <p className="w-1/2 text-xs text-red-500">{error?.contact_no}</p>}
            {!editData && (
              <Field
                type={'password'}
                id={'password'}
                label={'Password'}
                placeHolder={'Enter password'}
                required={true}
                value={signupInput['password']}
                onChange={handleChangeInput}
              />
            )}
            {error && <p className="w-1/2 text-xs text-red-500">{error?.password}</p>}
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
                editData ? handleEdit() : handleSubmit();
              }}>
              {editData ? 'Edit User' : 'Add User'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddUsers;
