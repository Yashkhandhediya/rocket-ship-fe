import { createBrowserRouter } from 'react-router-dom';
import { LogIn, Orders, SignUp, Dashboard, AddOrder, OrderTrackDetails, Return } from '../pages';
import Tracking from '../pages/tracking/Tracking';
import PrivateRoute from './private-route/PrivateRoute';
import { Returns } from '../pages/returns';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute component={<Dashboard />} />,
  },
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/orders',
    element: <PrivateRoute component={<Orders />} />,
  },
  {
    path: '/add-order',
    element: <PrivateRoute component={<AddOrder />} />,
  },
  {
    path: '/track-order/:orderId',
    element: <PrivateRoute component={<OrderTrackDetails />} />,
  },
  {
    path: '/tracking',
    element: <PrivateRoute component={<Tracking />} />,
  },
  {
    path: '/add-return',
    element: <PrivateRoute component={<Return />} />,
  },
  {
    path: '/returns',
    element: <PrivateRoute component={<Returns />} />,
  },
]);

export default routes;
