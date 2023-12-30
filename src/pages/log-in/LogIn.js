import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Field } from '../../common/components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { type } from '@testing-library/user-event/dist/type';

const LogIn = () => {
  const navigate = useNavigate();
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
    axios.post('http://43.252.197.60:8030/login/access-token',{username:loginInput.username, password:loginInput.password}, {headers}).then(
      (response)=>{
        console.log(response);
        if (response.data.access_token){
          localStorage.setItem('access_token',response.data.access_token)
          toast('Login Success',{type:'success'})
          navigate('/orders')
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
      <div className="bg-body mb-3 w-8/12 rounded-2xl bg-white px-12 py-6 shadow md:w-5/12">
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
            <Link to={'/'} className="text-decoration-none text-blue-700">
              Forgot Password?
            </Link>
          </div>
          <button
            type="button"
            className="dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mb-2 w-full rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300"
            onClick={handleSubmit}
          >
            Login
          </button>
          <div className="text-center">
            <p className="text-sm">
              New to Shiprocket?{' '}
              <Link to={'/signup'} className="text-decoration-none text-blue-700">
                Sign Up Now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
