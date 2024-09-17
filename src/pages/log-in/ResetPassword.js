import React, { useState } from 'react';
import { Field } from '../../common/components';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../common/utils/env.config';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../../common/utils/apiClient';

const ResetPassword = () => {
  const location = useLocation();
  const { username } = location.state || {};
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const userType = location.state.userType;

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setPassword({
      ...password,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    const headers = { 'Content-Type': 'application/json' };
    e.preventDefault();
    const passwordURL = userType === 'user' ? '/users' : '/company';

    if (password.newPassword !== password.confirmPassword) {
      toast('New password and confirm password do not match', { type: 'error' });
      return;
    }
    try {
      apiClient
        .post(BACKEND_URL + `${passwordURL}/update_password`, {
          email: username,
          password: password.newPassword,
        })
        .then((res) => {
          console.log('Update Password', res);
          toast('Password reset successfully', { type: 'success' });
          navigate('/login');
        })
        .catch((err) => {
          console.log('error in reset passeword', err);
          toast('Error resetting password.', { type: 'error' });
        });
    } catch (error) {
      console.error('Error reset password:', error);
      toast('Error resetting password. Please try again later.', { type: 'error' });
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <form className="mb-4 w-[40%] rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Reset Password</h2>
        <div className="mb-4">
          <Field
            type={'password'}
            id={'newPassword'}
            label={'New Password'}
            placeHolder={''}
            required={true}
            value={password['newPassword']}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-6">
          <Field
            type={'password'}
            id={'confirmPassword'}
            label={'Confirm Password'}
            placeHolder={''}
            required={true}
            value={password['confirmPassword']}
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
