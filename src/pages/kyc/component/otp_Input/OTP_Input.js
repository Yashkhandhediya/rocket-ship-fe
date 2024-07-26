import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../../common/utils/env.config';
import { ACCESS_TOKEN } from '../../../../common/utils/config';
import { useNavigate } from 'react-router-dom';

const OTP_Input = ({ handleSendOTP, timer, setIsKYCCompleted, id = null }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [seconds, setSeconds] = useState(timer);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const isOtpEntered = otp.every((digit) => digit !== '');
  const headers = {             
    'Content-Type': 'application/json',
    'Authorization': ACCESS_TOKEN};
  const handleInputChange = (index, value) => {
    if (isNaN(value)) return; // Allow only numeric input

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Move to the next input box
    if (index < inputRefs.length - 1 && value !== '') {
      inputRefs[index + 1].current.focus();
    }
  };
  const navigate = useNavigate();
  const handleKeyDown = (index, e) => {
    // Handle backspace to clear the current box and move back
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs[index - 1].current.focus();
    }
  };

  const completeKYC = () => {
    if (isOtpEntered) {
      // API call to verify OTP
      let temp_otp = otp.join('');
      axios
        .post(BACKEND_URL + `/kyc/adhaar_submit_otp?reference_id=${id}&otp=${temp_otp}`,{headers:headers})
        .then((res) => {
          toast.success('KYC completed successfully', { type: 'success' });
          setIsKYCCompleted(true);
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            sessionStorage.clear()
            navigate('/login');
        } else {
          toast('Mismatch OTP', { type: 'error' });
        }
        });
    } else {
      // Show error message
      toast.error('Please enter a valid OTP', { type: 'error' });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mt-4 flex flex-col gap-4">
      <p className="text-[12px]">
        OTP has been generated successfully. Please Check your registered mobile number for OTP.
      </p>
      <p className="text-[12px] font-medium">Enter OTP</p>
      <div className="flex items-center justify-start space-x-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength="1"
            className="h-10 w-10 rounded-md border border-[#D3D3D3] text-center text-[12px]"
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-start gap-4 text-[12px] font-medium">
        <button
          className={`px-12 py-2 text-white ${
            isOtpEntered ? 'bg-sky-500' : 'border border-[#e5e5e5] bg-sky-600 text-[#c6c6c6]'
          } rounded-md transition-colors duration-200`}
          disabled={!isOtpEntered}
          onClick={() => {
            completeKYC();
          }}>
          Complete KYC
        </button>
        {seconds > 0 ? (
          <div>Resend OTP in 00:{seconds} sec</div>
        ) : (
          <button
            className="cursor-pointer text-sky-500"
            onClick={() => {
              setSeconds(timer);
              handleSendOTP();
            }}>
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default OTP_Input;
