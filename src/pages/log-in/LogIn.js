import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Field } from '../../common/components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { type } from '@testing-library/user-event/dist/type';
import { BACKEND_URL } from '../../common/utils/env.config';
import OtpPopup from './OtpPopup';

const LogIn = () => {
  const navigate = useNavigate();
  const [userId,setUserId] = useState(null)
  const [handlePopup, setHandlePopup] = useState(false)
  const [loginInput, setLoginInput] = useState({
    username: '',
    password: '',
  });

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setLoginInput({
      ...loginInput,
      [id]: value,
    });
  };

  const handleSubmit = () => {
    const headers={'Content-Type': 'application/x-www-form-urlencoded'};
    console.log('username pass', loginInput.username, loginInput.password);
    axios.post(BACKEND_URL+'/login/access-token',{username:loginInput.username, password:loginInput.password}, {headers}).then(
      (response)=>{
        console.log(response);
        if (response.data.access_token){
          setUserId(response.data.user_id)
          localStorage.setItem('access_token',response.data.access_token)
          localStorage.setItem('user_name',response.data?.user_name?.split(' ')[0])
          axios.post(BACKEND_URL + `/login/generate_otp?email_id=${loginInput.username}&user_id=${response.data.user_id}`, { email_id:String(loginInput.username),user_id: String(response.data.user_id) }, { headers })
        .then((otpResponse) => {
          console.log(otpResponse);
        })
        .catch((otpError) => {
          console.error('Error fetching OTP:', otpError);
        });
          // toast('Login Success',{type:'success'})
          // navigate('/')
          setHandlePopup(true)
        }
        else if(response.data.msg){
          toast(response.data.msg,{type:'error'})
        }
      }
    );

  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="mb-8 text-center text-4xl font-bold">
        <h1>ShipRocket</h1>
      </div>
      {!handlePopup && <div className="bg-body mb-3 w-8/12 rounded-2xl bg-white px-12 py-6 shadow md:w-5/12">
        <div className="mb-2 text-center">
          <h3 className="m-0 text-xl font-medium">Login to ShipRocket</h3>
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
            <Link to={'/'} className="text-decoration-none text-red-700">
              Forgot Password?
            </Link>
          </div>
          <button
            type="button"
            className="dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mb-2 w-full rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
            onClick={handleSubmit}
          >
            Login
          </button>
          <div className="text-center">
            <p className="text-sm">
              New to Shiprocket?{' '}
              <Link to={'/signup'} className="text-decoration-none text-red-700">
                Sign Up Now
              </Link>
            </p>
          </div>
        </form>
      </div>}
      {handlePopup && <OtpPopup username={loginInput.username} userId={userId} />}
    </div>
  );
};

export default LogIn;
