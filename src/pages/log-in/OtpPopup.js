import {useState,useRef,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';

const OtpPopup = ({username,userId}) => {
  const navigate = useNavigate()
  const [message,setMessage] = useState(false)
  const [OTP, setOTP] = useState(Array(6).fill(''));
  const inputRefs = Array(6)
  .fill(0)
  .map((_, index) => useRef(null));

// Function to handle input change and move focus to the next input
const handleInputChange = (e, index) => {
  const maxLength = 1;
  const value = e.target.value;

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

//Cursor in Default in first input box when Component Render
useEffect(() => {
  inputRefs[0].current.focus();
}, [])

  const handleSubmitOtp = (e) => {
    e.preventDefault()
    const joinOTP = OTP.join('');
    console.log("OTP checkingg",OTP,userId)
    const headers={'Content-Type': 'application/x-www-form-urlencoded'};
    axios.get(BACKEND_URL+`/login/verify_otp?otp=${joinOTP}&user_id=${userId}`,{otp:OTP, user_id:userId}, {headers}).then(
      response => {
        console.log(response)
        if(response.data.flag == 1){
          toast('Login Success',{type:'success'})
          navigate('/seller/home')
        }else{
          setMessage(true)
          toast('OTP Mismatched',{type:'error'})
          console.log("OTP Mismatched")
        }
        // if(1){
        //   toast('Login Success',{type:'success'})
        //   navigate('/')
        // }
      }
    ).catch(
      error => {
        console.log(error)
        
      }
    )
      // navigate('/login')
  }

  return (
    <>
  <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your email {username}</p>
        </div>
      </div>

      <div>
        <form>
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
            {inputRefs.map((ref, index) => (
            <div key={index} className="w-12 h-12">
              <input
                ref={ref}
                className="w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="text"
                maxLength="1"
                name=""
                id=""
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
          ))}
            </div>
            
            <div>
              {message && <h3 className='text-center text-red-700'>OTP Mismatched!!!</h3>}
            </div>
            <div className="flex flex-col space-y-5">
              <div>
                <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                onClick={handleSubmitOtp}>
                  Verify Account
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</>
)
}

export default OtpPopup