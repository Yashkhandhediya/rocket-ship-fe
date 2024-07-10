import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Field } from '../../common/components';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';

const SignUp = () => {
  const navigate = useNavigate();
  const [signupInput, setSignupInput] = useState({
    company_name: '',
    company_address: '',
    email_address: '',
    contact_no: '',
    password: '',
    company_gst_no: '',
  });
  const [gstError, setGstError] = useState('');

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setSignupInput({
      ...signupInput,
      [id]: value,
    });
  };

  const validateGST = (gst) => {
    const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[Z]{1}[A-Z\d]{1}$/;
    return gstRegex.test(gst);
  };

  const handleSubmit = () => {
    if (!validateGST(signupInput.company_gst_no)) {
      setGstError('Invalid GST Number');
      toast('Invalid GST Number', { type: 'error' });
      return;
    } else {
      setGstError('');
    }

    const headers = { 'Content-Type': 'application/json' };
    axios
      .post(
        BACKEND_URL + '/company/signup',
        {
          name: signupInput.company_name,
          gst: signupInput.company_gst_no,
          password: signupInput.password,
          contact: parseInt(signupInput.contact_no),
          email: signupInput.email_address,
          address: signupInput.company_address,
        },
        { headers },
      )
      .then((res) => {
        console.log('Response of Sign up', res);
        if (res.data.msg === 'User already exits') {
          toast('User Already Exists', { type: 'error' });
        } else if (res.data.msg === 'Company already exits') {
          toast('Company Already Exists', { type: 'error' });
        } else {
          toast('Sign Up Successfully', { type: 'success' });
          navigate('/login');
        }
      })
      .catch((err) => {
        console.log('Error in signup', err);
        toast('Some Error in Sign Up', { type: 'error' });
      });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="mb-8 text-center text-4xl font-bold">
        <h1>Truck Booking</h1>
      </div>
      <div className="bg-body mb-3 w-8/12 rounded-2xl bg-white px-12 py-6 shadow md:w-5/12">
        <div className="mb-2 text-center">
          <h3 className="m-0 text-xl font-medium">Get Started with a free account</h3>
        </div>
        <span className="my-2 inline-flex w-full border border-dashed border-gray-400"></span>
        <form>
          <div className="flex w-full gap-2">
            <Field
              type={'text'}
              id={'company_name'}
              label={'Company Name'}
              placeHolder={'Company name'}
              required={true}
              value={signupInput['company_name']}
              onChange={handleChangeInput}
            />
            <Field
              type={'text'}
              id={'company_gst_no'}
              label={'Company GST No.'}
              placeHolder={'GST No.'}
              required={true}
              value={signupInput['company_gst_no']}
              onChange={handleChangeInput}
            />
          </div>
          {gstError && <p className="text-red-600">{gstError}</p>}
          <Field
            type={'text'}
            id={'company_address'}
            label={'Company Address'}
            placeHolder={'Enter Company Address'}
            required={true}
            value={signupInput['company_address']}
            onChange={handleChangeInput}
          />
          <Field
            type={'email'}
            id={'email_address'}
            label={'Email ID'}
            placeHolder={'Enter Company email ID'}
            required={true}
            value={signupInput['email_address']}
            onChange={handleChangeInput}
          />
          <Field
            type={'tel'}
            id={'contact_no'}
            label={'Contact No'}
            placeHolder={'Enter Contact No'}
            required={true}
            value={signupInput['contact_no']}
            onChange={handleChangeInput}
          />
          <Field
            type={'password'}
            id={'password'}
            label={'Password'}
            placeHolder={'Enter password'}
            required={true}
            value={signupInput['password']}
            onChange={handleChangeInput}
          />
          <div className="mb-3 text-sm">
            {`By clicking Sign up for Free, you agree to Cloud Cargo's `}
            <Link to={'/login'} className="text-decoration-none text-[#2684FC]">
              {'Terms Of Service and Privacy Policy.'}
            </Link>
          </div>
          <button
            type="button"
            className="dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 mb-2 w-full rounded-lg bg-[#2684FC] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2684FC] focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={handleSubmit}>
            Sign up for Free
          </button>
          <div className="text-center">
            <p className="text-sm">
              Already have an account?{' '}
              <Link to={'/login'} className="text-decoration-none text-[#2684FC]">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
