import { createBrowserRouter } from 'react-router-dom';
import { LogIn, Orders, SignUp, Dashboard, AddOrder, OrderTrackDetails, Return, Weight_Freeze, WeightDiscrepancy, Settings, Bank_details, Manage_pickup_add, Change_password, Company_Profile, Home } from '../pages';
import Tracking from '../pages/tracking/Tracking';
import ReturnTracking from '../pages/return-tracking/ReturnTracking';
import PrivateRoute from './private-route/PrivateRoute';
import { SellerKYC } from '../pages/kyc';
import { Returns } from '../pages/returns';
import { COD_Remittance, ShippingCharges, Wallet_history } from '../pages/billing/component';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute component={<Dashboard />} />,
  },
  {
    path: '/seller/home',
    element: <PrivateRoute component={<Home />} />,
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
  {
    path: '/statement',
    element: <PrivateRoute component={<ShippingCharges />} />,
  },
  {
    path: '/remittance-logs',
    element: <PrivateRoute component={<COD_Remittance />} />,
  },
  {
    path: 'future-cod',
    element: <PrivateRoute component={<COD_Remittance />} />,
  },
  {
    path: '/billing-credit-details',
    element: <PrivateRoute component={<Wallet_history />} />,
  },
  {

    path: '/recharge-status',
    element: <PrivateRoute component={<Wallet_history />} />,
  },
  {
    path: '/settings',
    element: <PrivateRoute component={<Settings />} />,
  },
  {
    path: '/company-bank-details',
    element: <PrivateRoute component={<Bank_details />} />,
  },
  {
    path: '/company-pickup-location',
    element: <PrivateRoute component={<Manage_pickup_add />} />,
  },
  {
    path: '/change-password',
    element: <PrivateRoute component={<Change_password />} />,
  },
  {
    path: '/company-general-details',
    element: <PrivateRoute component={<Company_Profile />} />,
  },

]);

export default routes;
