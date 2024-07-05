import {
  bill,
  book,
  dashboard,
  help,
  home,
  homeActive,
  manage,
  order,
  settings,
  tool,
  user,
  weight,
  return1,
  boost,
  newHome,
  
} from '../../icons/sidebar-icons';
import truckSize from '../../icons/sidebar-icons/truckSize.svg' 
import { logout } from './utils';
import { modules } from '../../../pages/manage-role/user-management/constants';

const is_admin = sessionStorage.getItem('is_admin');
const user_id = sessionStorage.getItem('user_id');
const is_company = sessionStorage.getItem('is_company');
const is_super = sessionStorage.getItem('is_super');
const access_modules = sessionStorage.getItem('modules');

const mapModuleToLink = (module) => ({
  title: module.label,
  path: module.url,
  icon: module.icon,
  hoverIcon: module.icon,
});

export const sidebarLinks = [
  is_company == 1 && {
    title: 'Add Address',
    path: '/add-address',
    icon: bill,
    hoverIcon: bill,
  },
  !parseInt(is_admin) && {
    title: 'Book',
    path: '/book',
    icon: book,
    hoverIcon: book,
  },
  !parseInt(is_admin) && {
    title: 'Create Indent',
    path: '/indent',
    icon: book,
    hoverIcon: book,
  },
  !parseInt(is_admin) && {
    title: 'All Indent',
    path: '/all-indent/' + user_id,
    icon: book,
    hoverIcon: book,
  },
  parseInt(is_company) && {
    title: 'Truck Size',
    path: '#',
    onClick: 'openTruckSizeModal',
    icon: truckSize,
    hoverIcon: truckSize,
  },
  parseInt(is_company) && {
    title: 'Material Type',
    path: '#',
    onClick: 'openMaterialTypeModal',
    icon: book,
    hoverIcon: book,
  },
  parseInt(is_admin) && {
    title: 'User Booking',
    path: '/User',
    icon: book,
    hoverIcon: book,
  },
  parseInt(is_company)
      ? {
          title: 'Add User',
          path: '/signup-user',
          icon: user,
          hoverIcon: user,
        }
      : null,
].filter((option) => option);



// if(access_modules == null || access_modules?.length == 0){
// if (sessionStorage.getItem('is_super') != 3) {
//   sidebarLinks = [
//     {
//       title: 'Home',
//       path: '/seller/home',
//       icon: newHome,
//       hoverIcon: newHome,
//     },
//     parseInt(is_company)
//       ? {
//           title: 'Add User',
//           path: '/signup-user',
//           icon: user,
//           hoverIcon: user,
//         }
//       : null,
//     {
//       title: 'Dashboard',
//       path: '/dashboard',
//       icon: dashboard,
//       hoverIcon: dashboard,
//     },
//     {
//       title: 'Truck Booking',
//       // path: '/book',
//       icon: book,
//       hoverIcon: book,
//       subMenuOptions: [
//         !parseInt(is_admin) && {
//           title: 'Book',
//           path: '/book',
//         },
//         !parseInt(is_admin) && {
//           title: 'Create Indent',
//           path: '/indent',
//         },
//         !parseInt(is_admin) && {
//           title: 'All Indent',
//           path: '/all-indent/' + user_id,
//         },
//         parseInt(is_admin) && {
//           title: 'User Booking',
//           path: '/User',
//         },
//       ].filter((option) => option),
//     },
//     {
//       title: 'Orders',
//       path: '/orders',
//       icon: order,
//       hoverIcon: order,
//     },
//     {
//       title: 'Returns',
//       path: '/returns',
//       icon: return1,
//       hoverIcon: return1,
//     },
//     {
//       title: 'Delivery Boost',
//       path: '/',
//       icon: boost,
//       hoverIcon: boost,
//     },
//     {
//       title: 'Weight Management',
//       icon: weight,
//       hoverIcon: weight,
//       subMenuOptions: [
//         {
//           title: 'Weight Discrepancy',
//           path: '/billing-charge-details?page=1&perPage=15&to=&from=&status=0&search=&courier_id=',
//         },
//         {
//           title: 'Weight Freeze',
//           path: '/request-weight-freeze?freeze_status=Not%20Requested&serach=&per_page=&page=1&from=&to=&channel_code=',
//         },
//       ],
//     },
//     {
//       title: 'Setup & Manage',
//       icon: manage,
//       hoverIcon: manage,
//       subMenuOptions: [
//         {
//           title: 'Channels',
//           path: '/channels',
//         },
//         {
//           title: 'Catalogue',
//           path: '/catalogue',
//         },
//         {
//           title: 'Courier',
//           path: '/user-couriers',
//         },
//         {
//           title: 'Packaging',
//           path: '/',
//         },
//         {
//           title: 'Customers',
//           path: '/customers',
//         },
//       ],
//     },
//     // {
//     //   title: 'Buyer Experiance',
//     //   icon: user,
//     //   hoverIcon: user,
//     //   subMenuOptions: [
//     //     {
//     //       title: 'Brand Boost',
//     //       path: '/',
//     //     },
//     //     {
//     //       title: 'Brand Communication',
//     //       path: '/',
//     //     },
//     //     {
//     //       title: 'Return & Refunds',
//     //       path: '/',
//     //     },
//     //   ],
//     // },
//     {
//       title: 'Billing',
//       path: '/statement',
//       icon: bill,
//       hoverIcon: bill,
//     },
//     {
//       title: 'Tools',
//       icon: tool,
//       hoverIcon: tool,
//       subMenuOptions: [
//         {
//           title: 'Rate Calculator',
//           path: '/rate-calculator',
//         },
//         {
//           title: 'Rate Card',
//           path: '/',
//         },
//         {
//           title: 'Pincode Zone Mapping',
//           path: '/',
//         },
//         {
//           title: 'Bulk Print Actions',
//           path: '/',
//         },
//         {
//           title: 'Reports',
//           path: '/',
//         },
//         {
//           title: 'Activity Logs',
//           path: '/',
//         },
//       ],
//     },
//     {
//       title: 'Settings',
//       path: '/settings',
//       icon: settings,
//       hoverIcon: settings,
//     },
//     {
//       title: 'Help & Support',
//       path: '/',
//       icon: help,
//       hoverIcon: help,
//     },
//     {
//       title: 'Logout',
//       icon: home,
//       hoverIcon: homeActive,
//       onClick: logout,
//     },
//   ].filter((option) => option !== null);
// } else if (sessionStorage.getItem('is_super') == 3) {
//   sidebarLinks = [
//     {
//       title: 'KYC',
//       path: '/company-list',
//       icon: newHome,
//       hoverIcon: newHome,
//     },
//     {
//       title: 'COD Remittance',
//       path: '/remittance-logs',
//       icon: bill,
//       hoverIcon: bill,
//     },
//     {
//       title: 'Weight Discrepancy',
//       path: '/billing-charge-details?page=1&perPage=15&to=&from=&status=0&search=&courier_id=',
//       icon: weight,
//       hoverIcon: weight,
//     },
//   ];
// }
// }else{
//   sidebarLinks = modules
//   .filter((module) => access_modules?.includes(module.id))
//   .map((module) => mapModuleToLink(module))
//   .filter((link) => link !== null);
// }
