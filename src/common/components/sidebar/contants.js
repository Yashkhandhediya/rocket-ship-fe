import { home, homeActive } from '../../icons/sidebar-icons';
import { logout } from './utils';

export const sidebarLinks = [
  {
    title: 'Home',
    path: '/',
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
    title: 'Orders',
    path: '/orders',
    icon: home,
    hoverIcon: homeActive,
  },
  {
    title: 'Returns',
    path: '/return',
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
        path: '/',
      },
      {
        title: 'Weight Freeze',
        path: '/',
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
    path: '/',
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
    path: '/',
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
