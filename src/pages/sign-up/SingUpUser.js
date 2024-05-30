import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Field } from '../../common/components';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';

const SignUpUser = () => {
  const navigate = useNavigate();
  const [flag,setFlag] = useState(0)
  const [signupInput, setSignupInput] = useState({
    company_id: localStorage.getItem('company_id'),
    first_name: "",
    last_name: "",
    email_address: "",
    contact_no: "",
    password: "",
    users_type_id:0
  });


  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setSignupInput({
      ...signupInput,
      [id]: value,
    });
  };

  const handleSubmit = () => {
    setFlag(1)
    const headers = {'Content-Type': 'application/json'};
    axios.post(BACKEND_URL + '/users/create_user_and_company',{
      first_name:signupInput.first_name,
      last_name:signupInput.last_name,
      password:signupInput.password,
      contact_no:signupInput.contact_no,
      email_address:signupInput.email_address,
      company_id:signupInput.company_id,
      users_type_id:signupInput.users_type_id
    },{headers}).then((res) => {
      console.log("Reponse of Sign up",res)
      if(res.data.msg == "User already exits"){
        toast("User Already Exists",{type:'error'})
      }else{
        toast("User Added SuccessFully",{type:'success'})
        navigate('/seller/home')
      }
    }).catch((err) => {
      console.log("Error in signup",err);
      toast("Some Error in Sign Up",{type:'error'})
    })
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="mb-8 text-center text-4xl font-bold">
        <h1>Cloud Cargo</h1>
      </div>
      <div className="bg-body mb-3 w-8/12 rounded-2xl bg-white px-12 py-6 shadow md:w-5/12">
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
          <Field
            type={'email'}
            id={'email_address'}
            label={'Email ID'}
            placeHolder={'Enter email ID'}
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
          <Field
            type={'number'}
            id={'users_type_id'}
            label={'User Type Id'}
            placeHolder={'Enter user type id'}
            required={true}
            value={signupInput['user_type_id']}
            onChange={handleChangeInput}
          />
          {/* <div className="mb-3 text-sm">
            {`By clicking Sign up for Free, you agree to Cloud Cargo's `}
            <Link to={'/login'} className="text-decoration-none text-red-700">
              {'Terms Of Service and Privacy Policy.'}
            </Link>
          </div> */}
          <button
            type="button"
            className=" mt-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mb-2 w-full rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
            onClick={() => {
              if(flag == 0){
                handleSubmit()
              }
            }}
          >
           Add User
          </button>
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
  );
};

export default SignUpUser;
