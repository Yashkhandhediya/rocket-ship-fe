import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const LogIn = () => {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({
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
    <div className="login-container h-100 d-flex flex-column justify-content-evenly align-items-center w-100">
      {/* <div className="w-75 w-md-50"> */}
      <div className="row w-100 h-100 place-content-center">
        <div className="login-title text-center">
          <h1>RocketShip</h1>
        </div>
        <div className="bg-white p-4 shadow mb-3 bg-body col-10 col-md-6 rounded-16px">
          <div className="text-center mb-2">
            <h3 className="m-0">Login to RocketShip</h3>
          </div>
          <span className="dashed-divider w-100 my-2"></span>
          <form>
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
              <Link to={'/'} className="text-decoration-none">
                Forgot Password?
              </Link>
            </div>
            <button
              className="login-btn btn btn-primary w-100 mb-3 rounded-10px"
              onClick={handleSubmit}>
              Login
            </button>
            <div className="text-center">
              <p className="font-14px">
                New to Shiprocket?{' '}
                <Link to={'/signup'} className="text-decoration-none">
                  Sign Up Now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
