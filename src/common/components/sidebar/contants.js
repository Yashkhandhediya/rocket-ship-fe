import { home, homeActive } from '../../icons/sidebar-icons';
import { logout } from './utils';

export const sidebarLinks = [
  {
    title: 'Home',
    path: '/seller/home',
    icon: home,
    hoverIcon: homeActive,
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: home,
    hoverIcon: homeActive,
  },
  {
    title: 'Book',
    // path: '/book',
    icon: home,
    hoverIcon: homeActive,
    subMenuOptions:[
      {
        title:"Book",
        path:"/book"
      },
      {
        title:"Create Indent",
        path:"/indent"
      },
      {
        title:"All Indent",
        path:"/all-indent"
      }
    ],
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: home,
    hoverIcon: homeActive,
  },
  {
    title: 'Returns',
    path: '/returns',
    icon: home,
    hoverIcon: homeActive,
  },
  {
    title: 'Delivery Boost',
    path: '/',
    icon: home,
    hoverIcon: homeActive,
  },
  {
    title: 'Weight Management',
    icon: home,
    hoverIcon: homeActive,
    subMenuOptions: [
      {
        title: 'Weight Discrepancy',
        path: '/billing-charge-details?page=1&perPage=15&to=&from=&status=0&search=&courier_id=',
      },
      {
        title: 'Weight Freeze',
        path: '/request-weight-freeze?freeze_status=Not%20Requested&serach=&per_page=&page=1&from=&to=&channel_code=',
      },
    ],
  },
  {
    title: 'Setup & Manage',
    icon: home,
    hoverIcon: homeActive,
    subMenuOptions: [
      {
        title: 'Channels',
        path: '/',
      },
      {
        title: 'Catalogue',
        path: '/',
      },
      {
        title: 'Courier',
        path: '/',
      },
      {
        title: 'Packaging',
        path: '/',
      },
      {
        title: 'Customers',
        path: '/',
      },
    ],
  },
  {
    title: 'Buyer Experiance',
    icon: home,
    hoverIcon: homeActive,
    subMenuOptions: [
      {
        title: 'Brand Boost',
        path: '/',
      },
      {
        title: 'Brand Communication',
        path: '/',
      },
      {
        title: 'Return & Refunds',
        path: '/',
      },
    ],
  },
  {
    title: 'Billing',
    path: '/statement',
    icon: home,
    hoverIcon: homeActive,
  },
  {
    title: 'Tools',
    icon: home,
    hoverIcon: homeActive,
    subMenuOptions: [
      {
        title: 'Rate Calculator',
        path: '/',
      },
      {
        title: 'Rate Card',
        path: '/',
      },
      {
        title: 'Pincode Zone Mapping',
        path: '/',
      },
      {
        title: 'Bulk Print Actions',
        path: '/',
      },
      {
        title: 'Reports',
        path: '/',
      },
      {
        title: 'Activity Logs',
        path: '/',
      },
    ],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: home,
    hoverIcon: homeActive,
  },
  {
    title: 'Help & Support',
    path: '/',
    icon: home,
    hoverIcon: homeActive,
  },
  {
    title: 'Logout',
    icon: home,
    hoverIcon: homeActive,
    onClick: logout
  },
];
