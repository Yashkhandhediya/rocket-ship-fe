import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Field } from '../../common/components';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { homelogo } from '../../common/images';
import { ACCESS_TOKEN } from '../../common/utils/config';

const SignUpUser = () => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(0);
  const headers = {             
    'Content-Type': 'application/json',
    'Authorization': ACCESS_TOKEN};
  const [signupInput, setSignupInput] = useState({
    company_id: localStorage.getItem('company_id'),
    first_name: '',
    last_name: '',
    email_address: '',
    contact_no: '',
    password: '',
    users_type_id:1
  });

  const [error, setError] = useState({});

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setSignupInput({
      ...signupInput,
      [id]: value,
    });
  };

  const requiredFieldErrors = () => {
    const newErrors = {};

    if (!signupInput.first_name) newErrors.first_name = 'First Name is Required';
    if (!signupInput.last_name) newErrors.last_name = 'Last Name is Required';
    if (!signupInput.email_address) newErrors.email_address = 'email address is Required';
    if (!signupInput.contact_no) newErrors.contact_no = 'contact no. is Required';
    if (!signupInput.password) newErrors.password = 'password is Required';
    return newErrors;
  };

  const handleSubmit = () => {
    const requiredError = requiredFieldErrors();
    if (Object.keys(requiredError).length > 0) {
      setError(requiredError);
      return;
    }
    setFlag(1);
    // const headers = { 'Content-Type': 'application/json' };
    if(localStorage.getItem('access_token') != null){
      axios
      .post(
        BACKEND_URL + '/users/signup',
        {
          first_name: signupInput.first_name,
          last_name: signupInput.last_name,
          password: signupInput.password,
          contact_no: signupInput.contact_no,
          email_address: signupInput.email_address,
          company_id: signupInput.company_id,
          users_type_id:signupInput.users_type_id
          
        },
        {  headers:headers  },
      )
      .then((res) => {
        console.log('Reponse of Sign up', res);
        if (res.data.msg == 'User already exits') {
          toast('User Already Exists', { type: 'error' });
        } else {
          toast('User Added SuccessFully', { type: 'success' });
          navigate('/seller/home');
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          localStorage.clear()
          navigate('/login');
      } else {
        console.log('Error in signup', err);
        toast('Some Error in Sign Up', { type: 'error' });
      }
      });
    }else{
    axios
      .post(
        BACKEND_URL + '/users/create_user_and_company',
        {
          first_name: signupInput.first_name,
          last_name: signupInput.last_name,
          password: signupInput.password,
          contact_no: signupInput.contact_no,
          email_address: signupInput.email_address, 
          // company_id: signupInput.company_id,
          // users_type_id:signupInput.users_type_id
        },{ headers:headers }
      )
      .then((res) => {
        console.log('Reponse of Sign up', res);
        if (res.data.msg == 'User already exits') {
          toast('User Already Exists', { type: 'error' });
        } else {
          toast('User Added SuccessFully', { type: 'success' });
          navigate('/seller/home');
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          localStorage.clear()
          navigate('/login');
      } else {
        console.log('Error in signup', err);
        toast('Some Error in Sign Up', { type: 'error' });
      }
      });
    }
  };

  return (
    <div className="flex-column flex h-full">
      <div className="flex h-full w-[49%] flex-col items-center justify-center">
        <img src={homelogo} className="h-full w-[97%] object-cover"></img>
      </div>
      <div className="mt-8 flex h-full w-[49%] flex-col items-center justify-center">
        <div className="mb-8 text-center text-4xl font-bold">
          <h1>Cloud Cargo</h1>
        </div>
        <div className="bg-body mb-3 w-8/12 rounded-2xl bg-white px-12 py-6 shadow md:w-9/12">
          <div className="mb-2 text-center">
            <h3 className="m-0 text-xl font-medium">Add New User For Your Company</h3>
          </div>
          <span className="my-2 inline-flex w-full border border-dashed border-gray-400"></span>
          <form>
            <div className="flex w-full gap-2">
              <Field
                type={'text'}
                id={'first_name'}
                label={'First Name'}
                placeHolder={'First name'}
                required={true}
                value={signupInput['first_name']}
                onChange={handleChangeInput}
              />
              <Field
                type={'text'}
                id={'last_name'}
                label={'Last Name'}
                placeHolder={'Last name'}
                required={true}
                value={signupInput['last_name']}
                onChange={handleChangeInput}
              />
            </div>
            <div className="flex justify-between">
              {error && <p className="w-1/2 text-xs text-red-500">{error?.first_name}</p>}
              {error && <p className="w-1/2 text-xs text-red-500">{error?.last_name}</p>}
            </div>
            <Field
              type={'email'}
              id={'email_address'}
              label={'Email ID'}
              placeHolder={'Enter email ID'}
              required={true}
              value={signupInput['email_address']}
              onChange={handleChangeInput}
            />
            {error && <p className="w-1/2 text-xs text-red-500">{error?.email_address}</p>}

            {/* <Field
              type={'company'}
              id={'company_name'}
              label={'Company Name'}
              placeHolder={'Enter company name'}
              required={true}
              value={signupInput['company_name']}
              onChange={handleChangeInput}
            />
            {error && <p className="w-1/2 text-xs text-red-500">{error?.company_name}</p>} */}

            <Field
              type={'tel'}
              id={'contact_no'}
              label={'Contact No'}
              placeHolder={'Enter Contact No'}
              required={true}
              value={signupInput['contact_no']}
              onChange={handleChangeInput}
            />
            {error && <p className="w-1/2 text-xs text-red-500">{error?.contact_no}</p>}
            <Field
              type={'password'}
              id={'password'}
              label={'Password'}
              placeHolder={'Enter password'}
              required={true}
              value={signupInput['password']}
              onChange={handleChangeInput}
            />
            {error && <p className="w-1/2 text-xs text-red-500">{error?.password}</p>}

            {/* <Field
              type={'number'}
              id={'users_type_id'}
              label={'User Type Id'}
              placeHolder={'Enter user type id'}
              required={true}
              value={signupInput['user_type_id']}
              onChange={handleChangeInput}
            /> */}
            {/* <div className="mb-3 text-sm">
              {`By clicking Sign up for Free, you agree to Cloud Cargo's `}
              <Link to={'/login'} className="text-decoration-none text-red-700">
                {'Terms Of Service and Privacy Policy.'}
              </Link>
            </div> */}
            <button
              type="button"
              className=" dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mb-2 mt-4 w-full rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
              onClick={() => {
                if (flag == 0) {
                  handleSubmit();
                }
              }}>
              Add User
            </button>
            <div className="flex justify-center gap-1">
              <p>Already have an account?</p>
              <Link to={'/login'} className="text-decoration-none text-red-700">
                Login
              </Link>
            </div>
            {/* <div className="text-center">
              <p className="text-sm">
                Already have an account?{' '}
                <Link to={'/login'} className="text-decoration-none text-red-700">
                  Login
                </Link>
              </p>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpUser;
