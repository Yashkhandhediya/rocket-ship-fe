import { Field } from '../../common/components';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import OtpPopup from './OtpPopup';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { type_user } from './LogIn';

const ForgotPassword = () => {
  const location = useLocation();
  const [upDatePassWord, setUpDatePassWord] = useState(true);
  const [userId, setUserId] = useState(null);
  const [compId, setCompId] = useState(null);
  const [userInput, setUserInput] = useState({ username: '' });
  const [handlePopup, setHandlePopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setUserInput({
      ...userInput,
      [id]: value,
    });
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    setErrorMessage(''); // Clear previous error message
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const otpURL =
      type_user === 'user'
        ? `/users/generate_otp?email_id=${userInput.username}`
        : `/company/forget_password_otp?email=${userInput.username}`;


    axios
      .post(BACKEND_URL + otpURL, { headers })
      .then((otpResponse) => {
        console.log('OTP Response:', otpResponse);

        if (otpResponse.data.status === 'Success') {
            // Proceed to generate OTP
            const generateOtpUrl = type_user === 'user' ? `/users/generate_otp` : `/company/generate_otp`;
            console.log(generateOtpUrl);
            setHandlePopup(true); // Show OTP popup
            axios
              .post(BACKEND_URL + generateOtpUrl, { email: userInput.username }, { headers })
              .then((generateOtpResponse) => {
                console.log('Generate OTP Response:', generateOtpResponse);
                setUserId(generateOtpResponse.data.user_id);
                setCompId(generateOtpResponse.data.comp_id);
                console.log(user_id, comp_id)
  
              })
              .catch((generateOtpError) => {
                console.error('Error generating OTP:', generateOtpError);
              });
          }
        else if (otpResponse.data.status === 'User not found') {
          setErrorMessage('Email does not exist');
        } 
      })
      .catch((otpError) => {
        console.error('Error fetching OTP:', otpError);
      });
  };

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center rounded-2xl bg-gray-100">
      {!handlePopup && (
        <div className="mx-auto w-[62%] max-w-lg rounded-md bg-white p-8 shadow-md">
          <button onClick={() => window.history.back()} className="mb-4 font-semibold text-indigo-600">
            {'< Back'}
          </button>
          <h2 className="mb-6 text-2xl font-bold">Forgot Your Password</h2>
          <h3 className="mb-6 text-base">Enter your email to receive OTP for password reset.</h3>
          {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
          <form className="mb-6">
            <Field
              type= 'email'
              id= 'username' 
              label= 'Email ID'
              placeHolder= 'Enter your email ID'
              required={true}
              value={userInput.username}
              onChange={handleChangeInput}
            />
          </form>
          <div>
            <button
              className={`mb-6 mt-4 flex w-full flex-row items-center justify-center rounded-xl border border-none bg-blue-700 p-4 text-center text-base font-semibold text-white shadow-sm outline-none hover:bg-blue-800 ${
                !userInput.username || !isEmailValid(userInput.username)
                  ? 'cursor-not-allowed opacity-50'
                  : ''
              }`}
              onClick={handleSubmit}
              disabled={!userInput.username || !isEmailValid(userInput.username)}>
              Send OTP
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm">
              Remember the password?{' '}
              <Link to={'/login'} className="text-decoration-none text-red-700">
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
      {handlePopup && (
        <OtpPopup
          userType={type_user}
          username={userInput.username}
          userId={userId}
          companyId={compId}
          upDatePassWord={upDatePassWord}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
