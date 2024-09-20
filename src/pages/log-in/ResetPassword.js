import React, { useState } from 'react'
import { Field } from '../../common/components';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../common/utils/env.config';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const location = useLocation()
    const { username } = location.state || {}
    const navigate = useNavigate()
    const [password, setPassword] = useState({
        newPassword:'',
        confirmPassword:''
    })

    const userType = location.state.userType

    const handleChangeInput = (e) => {
        const { id, value } = e.target;
        setPassword({
          ...password,
          [id]: value,
        });
      };

      const handleSubmit = async (e) => {
        const headers={'Content-Type': 'application/json'};
        e.preventDefault();
        const passwordURL = userType === "user" ? '/users' : '/company'
        
        if (password.newPassword !== password.confirmPassword) {
            toast("New password and confirm password do not match",{type:'error'});
            return;
        }
        try {
            axios.post(BACKEND_URL + `${passwordURL}/update_password`,{
                email:username,
                password:password.newPassword
            },{headers}).then((res) => {
                console.log("Update Password",res)
                toast("Password reset successfully",{type:'success'});
                navigate('/login')
            }).catch((err) => {
                console.log("error in reset passeword",err)
                toast("Error resetting password.",{type:'error'});
            })
        } catch (error) {
            console.error("Error reset password:", error);
            toast("Error resetting password. Please try again later.",{type:'error'});
        }
    };

  return (
    <div className="flex w-full justify-center items-center h-screen bg-gray-100">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[40%]">
      <h2 className="text-2xl mb-4 font-bold">Reset Password</h2>
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  </div>
  )
}

export default ResetPassword