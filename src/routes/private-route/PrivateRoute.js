import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ component }) => {
const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  return component;
};

export default PrivateRoute;