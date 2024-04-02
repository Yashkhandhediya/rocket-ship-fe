import { Field } from '../../common/components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import OtpPopup from './OtpPopup';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';


const ForgotPassword = () => {
    const [upDatePassWord, setUpDatePassWord] = useState(true)
    const [userId,setUserId] = useState(null)
    const [userInput, setUserInput] = useState({
        username:''
    })
    const [showOtp,setShowOtp] = useState(false)

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

      const handleOtp = () => {
        setShowOtp(true)
        const headers={'Content-Type': 'application/x-www-form-urlencoded'};  
            axios.post(BACKEND_URL + `/users/generate_otp?email_id=${userInput.username}`,{ headers })
            .then((otpResponse) => {
              console.log(otpResponse);
              setUserId(otpResponse.data.user_id)
            })
            .catch((otpError) => {
              console.error('Error fetching OTP:', otpError);
            });
        }

  return (
        <div className="min-h-screen w-full h-full flex justify-center items-center bg-gray-100 rounded-2xl">
            {!showOtp && <div className="max-w-lg w-[62%] mx-auto p-8 bg-white rounded-md shadow-md">
                <button onClick={() => window.history.back()} className="text-indigo-600 font-semibold mb-4">{'< Back'}</button>
                <h2 className="text-2xl font-bold mb-6">Forgot Your Password</h2>
                <h3 className='text-base mb-6'>Enter your email to receive OTP for password reset.</h3>
                <form className='mb-6'>
                <Field
                    type={'email'}
                    id={'username'}
                    label={'Email ID'}
                    placeHolder={'Enter your email ID'}
                    required={true}
                    value={userInput['username']}
                    onChange={handleChangeInput}
                />
                </form>
                <div>
                    <button className={`flex flex-row mt-4 mb-6 items-center justify-center text-center w-full border rounded-xl outline-none p-4 bg-blue-700 border-none text-white text-base font-semibold shadow-sm hover:bg-blue-800 ${(!userInput.username || !isEmailValid(userInput.username)) ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={handleOtp}
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
            </div>}
        {showOtp && <OtpPopup username={userInput.username} userId={userId} upDatePassWord={upDatePassWord} />}

        </div>
);
}

export default ForgotPassword