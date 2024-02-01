import { createBrowserRouter } from 'react-router-dom';
import { LogIn, Orders, SignUp, Dashboard, AddOrder, OrderTrackDetails, Return, Weight_Freeze, WeightDiscrepancy } from '../pages';
import Tracking from '../pages/tracking/Tracking';
import ReturnTracking from '../pages/return-tracking/ReturnTracking';
import PrivateRoute from './private-route/PrivateRoute';
import { SellerKYC } from '../pages/kyc';
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
    path: '/tracking/:orderId',
    element: <PrivateRoute component={<Tracking />} />,
  },
  {
    path: '/return-tracking/:orderId',
    element: <PrivateRoute component={<ReturnTracking />} />,
  },
  {
    path: '/add-return',
    element: <PrivateRoute component={<Return />} />,
  },
  {
    path: '/returns',
    element: <PrivateRoute component={<Returns />} />,
  },
  {
    path: '/billing-charge-details',
    element: <PrivateRoute component={<WeightDiscrepancy />} />,
  },
  {
    path: '/seller/kyc',
    element: <PrivateRoute component={<SellerKYC />} />,
  },
  {
    path: '/request-weight-freeze',
    element: <PrivateRoute component={<Weight_Freeze />} />,
  },
]);

export default routes;
