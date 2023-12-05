import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
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
    navigate('/');
  };

  return (
    <div className="signup-container d-flex flex-column justify-content-evenly align-items-center p-4">
      <div className="row w-100 h-100 place-content-center">
        <div className="signup-title text-center mb-3">
          <h1>RocketShip</h1>
        </div>
        <div className="bg-white p-4 shadow bg-body col-11 col-md-10 col-lg-6 rounded-16px">
          <div className="text-center mb-2">
            <h3 className="m-0">Get Started with a free account</h3>
          </div>
          <span className="dashed-divider w-100 my-2"></span>
          <form>
            <div className=" d-flex gap-4 ">
              <div className="mb-3 w-50">
                <label htmlFor="firstName" className="form-label fw-bold">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="form-control rounded-10px"
                  placeholder="First name"
                  value={loginInput['firstName']}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="mb-3 w-50">
                <label htmlFor="lastName" className="form-label fw-bold">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control rounded-10px"
                  placeholder="Last Name"
                  value={loginInput['lastName']}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email ID
              </label>
              <input
                type="email"
                id="email"
                className="form-control rounded-10px"
                placeholder="Enter your email ID"
                value={loginInput['email']}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control rounded-10px"
                placeholder="Enter password"
                value={loginInput['password']}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3 font-14px">
              {`By clicking Sign up for Free, you agree to Shiprocket's `}
              <Link to={'/login'} className="text-decoration-none">
                {'Terms Of Service and Privacy Policy.'}
              </Link>
            </div>
            <button
              className="signup-btn btn btn-primary w-100 mb-3"
              onClick={handleSubmit}>
              Sign up for Free
            </button>
            <div className="text-center">
              <p className="font-14px">
                Already have an account?{' '}
                <Link to={'/login'} className="text-decoration-none">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
