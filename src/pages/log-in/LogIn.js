import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Field } from '../../common/components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../common/utils/env.config';
import OtpPopup from './OtpPopup';
import { homelogo, LogoRCSL } from '../../common/images';

export let type_user;

const LogIn = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [handlePopup, setHandlePopup] = useState(false);
  const [singleTimeLoginClick, setSingleTimeLoginClick] = useState(0);
  const [loginInput, setLoginInput] = useState({
    username: '',
    password: '',
  });
  const [userType, setUserType] = useState('user');
  type_user = userType;

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setLoginInput({
      ...loginInput,
      [id]: value,
    });
  };

  const handleForgotPassword = () => {
    type_user = userType;
    navigate('/forgotpassword');
  };

  const handleSubmit = () => {
    setSingleTimeLoginClick(1);
    if (loginInput.username === '' || loginInput.password === '') {
      toast('Email and Password Both are required', { type: 'error' });
      return;
    }
    localStorage.setItem('user_email', loginInput.username);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const apiURL = userType === 'user' ? '/login/access-token' : '/company/access-token';
    const otpURL = userType === 'user' ? '/login' : '/company';
    axios.post(BACKEND_URL + apiURL, {
      username: loginInput.username,
      password: loginInput.password,
    }, { headers }).then((response) => {
      if (response.data.access_token) {
        setUserId(response.data.user_id);
        setCompanyId(response.data.company_id);
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user_name', response.data?.user_name?.split(' ')[0]);
        const user_id = userType === 'user' ? localStorage.getItem('user_id') : localStorage.getItem('company_id');
        axios.post(BACKEND_URL + `${otpURL}/generate_otp?email_id=${loginInput.username}&user_id=${user_id}`, { email_id: String(loginInput.username), user_id: String(response.data.user_id) }, { headers })
          .then((otpResponse) => {
            console.log(otpResponse);
          })
          .catch((otpError) => {
            console.error('Error fetching OTP:', otpError);
          });
        setHandlePopup(true);
      } else if (response.data.msg) {
        setSingleTimeLoginClick(0);
        toast(response.data.msg, { type: 'error' });
      }
    });
  };

  return (
    <>
      <div className="flex flex-column h-full">
        <div className="flex h-full w-[49%] flex-col items-center justify-center">
          <img src={homelogo} className='w-[97%] h-full object-cover' alt="Home Logo" />
        </div>
        <div className="flex h-full w-[49%] flex-col mt-8 items-center justify-center">
          <div className="mb-8 text-center text-4xl font-bold">
            <h1>Cloud Cargo</h1>
          </div>
          {!handlePopup && <div className="bg-body mb-3 w-[95%] rounded-2xl bg-white px-12 py-6 shadow md:w-9/12">
            <div className="mb-2 text-center">
              <h3 className="m-0 text-xl font-medium">Login to Cloud Cargo</h3>
            </div>
            <div className="mb-3 flex flex-row">
              <div className="p-2">
                <input
                  type="radio"
                  id="user"
                  name="userType"
                  value="user"
                  checked={userType === 'user'}
                  onChange={() => setUserType('user')}
                />
                <label className='font-semibold ml-2' htmlFor="user">User</label>
              </div>
              <div className="p-2">
                <input
                  type="radio"
                  id="company"
                  name="userType"
                  value="company"
                  checked={userType === 'company'}
                  onChange={() => setUserType('company')}
                />
                <label className='font-semibold ml-2' htmlFor="company">Company</label>
              </div>
            </div>
            <span className="my-2 inline-flex w-full border border-dashed border-gray-400"></span>
            <form>
              <Field
                type={'email'}
                id={'username'}
                label={'Email ID'}
                placeHolder={'Enter your email ID'}
                required={true}
                value={loginInput['username']}
                onChange={handleChangeInput}
              />
              <Field
                type={'password'}
                id={'password'}
                label={'Password'}
                placeHolder={'Enter password'}
                required={true}
                value={loginInput['password']}
                onChange={handleChangeInput}
              />
              <div className="mb-3 text-sm">
                <Link onClick={handleForgotPassword} className="text-decoration-none text-red-700">
                  Forgot Password?
                </Link>
              </div>
              <button
                type="button"
                className="dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mb-2 w-full rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
                onClick={() => {
                  if (singleTimeLoginClick === 0) {
                    handleSubmit();
                  }
                }}
              >
                Login
              </button>
              <div className="text-center">
                <p className="text-sm">
                  New to Cloud Cargo?{' '}
                  {userType === 'user' ? (
                    <Link to={'/signup-user'} className="text-decoration-none text-red-700">
                      Sign Up Now
                    </Link>
                  ) : (
                    <Link to={'/signup'} className="text-decoration-none text-red-700">
                      Sign Up Now
                    </Link>
                  )}
                </p>
              </div>
            </form>
          </div>
          }
          <div className="flex flex-row justify-between mt-4 items-end ml-auto">
            <h1 className='font-bold text-red-700 text-xl ml-auto mr-4'>Powered By</h1>
            <img src={LogoRCSL} className='ml-auto mt-10 mx-20 w-32 h-25' alt="RCSL Logo" />
          </div>
        </div>
      </div>
      {handlePopup && <OtpPopup userType={userType} username={loginInput.username} userId={userId} companyId={companyId} />}
    </>
  );
};

export default LogIn;
