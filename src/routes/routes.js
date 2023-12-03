import {
  createBrowserRouter,
} from "react-router-dom";
import { LogIn, Orders, SignUp, Dashboard } from '../pages';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
]);

export default routes