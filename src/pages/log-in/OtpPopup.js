import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import ResetPassword from './ResetPassword';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader } from '../../common/components';

const OtpPopup = ({
  userType = 'user',
  username,
  userId = null,
  upDatePassWord = false,
  companyId = null,
}) => {
  console.log('DATAAAAAAAAA', userType);
  const is_super = sessionStorage.getItem('is_super');
  const id_user = sessionStorage.getItem('user_id');
  const [seconds, setSeconds] = useState(45);
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState(false);
  const [OTP, setOTP] = useState(Array(6).fill(''));
  const inputRefs = Array(6)
    .fill(0)
    .map((_, index) => useRef(null));

  // Function to handle input change and move focus to the next input
  const handleInputChange = (e, index) => {
    const maxLength = 1;
    const value = e.target.value.slice(0, maxLength);

    setOTP((prevOTP) => {
      const newOTP = [...prevOTP];
      newOTP[index] = value;
      return newOTP;
    });

    // Move to the next input if the current input is filled
    if (value.length >= maxLength && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to clear the current box and move back
    if (e.key === 'Backspace' && index > 0 && OTP[index] === '') {
      const newOtp = [...OTP];
      newOtp[index - 1] = '';
      setOTP(newOtp);
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSendOTP = () => {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    if (upDatePassWord) {
      axios
        .post(BACKEND_URL + `/users/generate_otp?email_id=${username}`, { headers })
        .then((otpResponse) => {
          console.log(otpResponse);
        })
        .catch((otpError) => {
          console.error('Error fetching OTP:', otpError);
        });
    } else {
      axios
        .post(
          BACKEND_URL + `/login/generate_otp?email_id=${username}&user_id=${userId}`,
          { email_id: String(username), user_id: String(userId) },
          { headers },
        )
        .then((otpResponse) => {
          console.log(otpResponse);
        })
        .catch((otpError) => {
          console.error('Error fetching OTP:', otpError);
        });
    }
  };

  //Cursor in Default in first input box when Component Render
  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const otpDigits = pasteData.split('').slice(0, 6);

    setOTP((prevOTP) => {
      const newOTP = prevOTP.map((char, idx) => otpDigits[idx] || char);
      return newOTP;
    });

    otpDigits.forEach((char, idx) => {
      if (inputRefs[idx] && inputRefs[idx].current) {
        inputRefs[idx].current.value = char;
      }
    });

    const firstEmptyIndex = otpDigits.length;
    if (firstEmptyIndex < inputRefs.length) {
      inputRefs[firstEmptyIndex].current.focus();
    }
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    const joinOTP = OTP.join('');
    console.log('OTP checkingg', OTP, userId);
    if (joinOTP.length < 6) {
      toast('Enter your OTP', { type: 'error' });
      return;
    }
    setLoading(true);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const tempId = userType === 'user' ? userId : companyId;
    const otpURL =
      userType === 'user'
        ? `/login/verify_otp/?otp=${joinOTP}&user_id=${tempId}`
        : `/company/verify_otp/?otp=${joinOTP}&id=${tempId}`;
    axios
      .get(BACKEND_URL + otpURL, { otp: OTP, user_id: tempId }, { headers })
      .then((response) => {
        setLoading(false);
        sessionStorage.setItem('is_otpVerified', JSON.stringify(true));
        console.log(response);
        if (is_super == 3) {
          toast('Login Success', { type: 'success' });
          navigate('/company-list');
          window.location.reload();
          return;
        }
        if (response.data.flag == 1 && is_super != 3) {
          toast('Login Success', { type: 'success' });
          // navigate('/seller/home');
          // navigate(`/all-indent/${id_user}`);
          navigate('/book');
          window.location.reload();
        } else {
          setMessage(true);
          toast('OTP Mismatched', { type: 'error' });
          console.log('OTP Mismatched');
        }
        // if(1){
        //   toast('Login Success',{type:'success'})
        //   navigate('/')
        // }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    // navigate('/login')
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const joinOTP = OTP.join('');
    console.log('OTP checkingg', OTP, userId);
    if (joinOTP.length < 6) {
      toast('Enter your OTP', { type: 'error' });
      return;
    }
    setLoading(true);
    const tempId = userType === 'user' ? userId : companyId;
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const verifyURL =
      userType === 'user'
        ? `/users/verify_forgot_pass_otp/?otp=${joinOTP}&user_id=${tempId}`
        : `/company/verify_otp/?otp=${joinOTP}&id=${tempId}`;
    axios
      .get(BACKEND_URL + verifyURL, { headers })
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.data.flag == 1) {
          navigate('/resetpassword', { state: { username, userType } });
        } else {
          setMessage(true);
          toast('OTP Mismatched', { type: 'error' });
          console.log('OTP Mismatched');
        }
        // if(1){
        //   toast('Login Success',{type:'success'})
        //   navigate('/')
        // }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    // navigate('/login')
  };

  return (
    <>
      {loading && <Loader />}
      <div className="relative mx-auto w-full max-w-lg rounded-2xl bg-white px-6 pb-9 pt-10 shadow-xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="text-3xl font-semibold">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {username}</p>
            </div>
          </div>

          <div className="mt-1">
            <form>
              <div className="flex flex-col space-y-16">
                <div className="mx-auto flex w-full max-w-xs flex-row items-center justify-between">
                  {inputRefs.map((ref, index) => (
                    <div key={index} className="h-12 w-12">
                      <input
                        ref={ref}
                        className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-2 text-center text-lg outline-none ring-blue-700 focus:bg-gray-50 focus:ring-1"
                        type="text"
                        maxLength="1"
                        name=""
                        id=""
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                      />
                    </div>
                  ))}
                </div>
                <div>{message && <h3 className="text-center text-red-700">OTP Mismatched!!!</h3>}</div>
                {seconds > 0 ? (
                  <div className="mt-auto">Resend OTP in 00:{formattedSeconds} sec</div>
                ) : (
                  <button
                    className="mb-2 cursor-pointer text-[#7973ef]"
                    onClick={() => {
                      setSeconds(45);
                      handleSendOTP();
                    }}>
                    Resend OTP
                  </button>
                )}
                <div className="flex flex-col space-y-5">
                  <div className="flex flex-col">
                    <button
                      className="flex w-full flex-row items-center justify-center rounded-xl border border-none bg-blue-700 py-5 text-center text-sm text-white shadow-sm outline-none"
                      onClick={!upDatePassWord ? handleSubmitOtp : handleResetPassword}>
                      Verify Account
                    </button>
                    <button
                      className="mb-2 mt-2 cursor-pointer justify-center text-[#7973ef]"
                      onClick={() => {
                        navigate('/login');
                      }}>
                      <span className="">
                        <i className="fa-solid fa-arrow-left"></i>
                      </span>
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpPopup;
