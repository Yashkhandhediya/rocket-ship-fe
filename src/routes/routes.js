import { createBrowserRouter } from 'react-router-dom';
import {
  LogIn,
  Orders,
  SignUp,
  Dashboard,
  AddOrder,
  OrderTrackDetails,
  Return,
  Weight_Freeze,
  WeightDiscrepancy,
  Settings,
  Bank_details,
  Manage_pickup_add,
  Change_password,
  Company_Profile,
  Home,
  Book,
  Indent,
  Allindent,
  Address,
  User,
  ForgotPassword,
  ResetPassword,
  AllUser,
  CompanyList,
  UserList,
  Catalogue,
  Manage_user,
} from '../pages';

import Tracking from '../pages/tracking/Tracking';
import ReturnTracking from '../pages/return-tracking/ReturnTracking';
import PrivateRoute from './private-route/PrivateRoute';
import { SellerKYC } from '../pages/kyc';
import { AllUsers, Returns } from '../pages/returns';
import { COD_Remittance, Passbook, ShippingCharges, Wallet_history } from '../pages/billing/component';
import { Adhaar_Document } from '../pages/kyc/component/adhaar_document';
import { RateCalculator } from '../pages/rate-calculator';
import SignUpUser from '../pages/sign-up/SingUpUser';
import { Channels } from '../pages/channels';
import Channelpage from '../pages/channels/components/channelpage/Channelpage';
import { CreateTicket } from '../pages/create-ticket';
import { Courier } from '../pages/courier';
import { CourierLog } from '../pages/courier/CourierLogs';
import { Customers } from '../pages/customers';
import CourierRule from '../pages/courier/CourierRules/CourierRule';
import { Rule } from '../pages/courier/Rule';
import { UserProfile } from '../common/components/profile';
import { Customer, CustomerOverview } from '../pages/customer-overview';
import { User_Management } from '../pages/manage-role/user-management';
import { CustomerEdit } from '../pages/customer-edit';
import { CustomerAddresses } from '../pages/customer-addresses';
import { CustomerAddressEdit } from '../pages/customer-address-edit';
import { AddCustomer } from '../pages/add-customer';
import Courier_Selection from '../pages/courier/courier-selection/Courier_Selection';
import Priority from '../pages/courier/Rule/Priority';
import { InvoicePreferences, LabelPreferences } from '../pages/Label-Invoice';
import { BillingAddress } from '../pages/billing-address';
import { ShiprocketBankDetails } from '../pages/shiprocket-bank-details';
import { RefundSetting, ReturnSettings } from '../pages/return-settings';
import AddAddress from '../pages/add-address/AddAddress';
import { TruckSize } from '../pages/truck';
import { MaterialType } from '../pages/material-type';

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
    path: '/dashboard',
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
    path: '/signup-user',
    element: <SignUpUser />,
  },
  {
    path: '/company-list',
    element: <CompanyList />,
  },
  {
    path: '/user-list',
    element: <UserList />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/forgotpassword',
    element: <ForgotPassword />,
  },
  {
    path: '/resetpassword',
    element: <ResetPassword />,
  },
  {
    path: '/book',
    element: <PrivateRoute component={<Book />} />,
  },
  {
    path: '/indent',
    element: <PrivateRoute component={<Indent />} />,
  },
  {
    path: '/all-indent/:url_user_id',
    element: <PrivateRoute component={<Allindent />} />,
  },
  {
    path: '/user',
    element: <PrivateRoute component={<User />} />,
  },
  {
    path: '/all-user',
    element: <PrivateRoute component={<AllUser />} />,
  },
  {
    path: '/all-users',
    element: <PrivateRoute component={<AllUsers />} />,
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
    path: '/aadhar',
    element: <PrivateRoute component={<Adhaar_Document />} />,
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
    path: '/passbook',
    element: <PrivateRoute component={<Passbook />} />,
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
  {
    path: '/rate-calculator',
    element: <PrivateRoute component={<RateCalculator />} />,
  },
  {
    path: '/catalogue',
    element: <PrivateRoute component={<Catalogue />} />,
  },
  {
    path: '/channels',
    element: <PrivateRoute component={<Channels />} />,
  },
  {
    path: '/channels/add_channel',
    element: <PrivateRoute component={<Channelpage />} />,
  },

  {
    path: '/create-ticket',
    element: <PrivateRoute component={<CreateTicket />} />,
  },
  {
    path: '/user-couriers',
    element: <PrivateRoute component={<Courier />} />,
  },
  {
    path: '/courier-log',
    element: <PrivateRoute component={<CourierLog />} />,
  },
  {
    path: '/customers',
    element: <PrivateRoute component={<Customers />} />,
  },
  {
    path: '/courier-rule',
    element: <PrivateRoute component={<CourierRule />} />,
  },
  {
    path: '/add-rule',
    element: <PrivateRoute component={<Rule />} />,
  },
  {
    path: '/user-profile',
    element: <PrivateRoute component={<UserProfile />} />,
  },
  {
    path: '/customer-overview/:buyerId',
    element: <PrivateRoute component={<CustomerOverview />} />,
  },
  {
    path: '/customer/:buyerId/addresses/:addressId',
    element: <PrivateRoute component={<CustomerAddresses />} />,
  },
  {
    path: '/customer/edit/:buyerId',
    element: <PrivateRoute component={<CustomerEdit />} />,
  },
  {
    path: '/add-customer',
    element: <PrivateRoute component={<AddCustomer />} />,
  },
  {
    path: '/customer/:buyerId/address/edit/:addressId',
    element: <PrivateRoute component={<CustomerAddressEdit />} />,
  },
  {
    path: '/manage-user',
    element: <PrivateRoute component={<Manage_user />} />,
  },
  {
    path: '/user-management',
    element: <PrivateRoute component={<User_Management />} />,
  },
  {
    path: '/courier-selection',
    element: <PrivateRoute component={<Courier_Selection />} />,
  },
  {
    path: '/custom-priority',
    element: <PrivateRoute component={<Priority />} />,
  },
  {
    path: '/label-buyer-settings',
    element: <PrivateRoute component={<LabelPreferences />} />,
  },
  {
    path: '/invoice-preferences',
    element: <PrivateRoute component={<InvoicePreferences />} />,
  },
  {
    path: '/billing-address',
    element: <PrivateRoute component={<BillingAddress />} />,
  },
  {
    path: '/shiprocket-bank-details',
    element: <PrivateRoute component={<ShiprocketBankDetails />} />,
  },
  {
    path: '/return-settings',
    element: <PrivateRoute component={<ReturnSettings />} />,
  },
  {
    path: '/refund-settings',
    element: <PrivateRoute component={<RefundSetting />} />,
  },
  // {
  //   path: '/add-address',
  //   element: <PrivateRoute component={<Indent />} />,
  // },
  {
    path: '/add-address',
    element: <PrivateRoute component={<AddAddress />} />,
  },
  {
    path: '/material-type',
    element: <PrivateRoute component={<MaterialType />} />,
  },
  {
    path: '/truck-size',
    element: <PrivateRoute component={<TruckSize />} />,
  },
]);

export default routes;
