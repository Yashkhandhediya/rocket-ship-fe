import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component }) => {
  const accessToken = sessionStorage.getItem('access_token');
  const is_otpVerified = JSON.parse(sessionStorage.getItem('is_otpVerified'));
  if (!accessToken || !is_otpVerified) {
    return <Navigate to="/login" />;
  }
  return component;
};

export default PrivateRoute;
