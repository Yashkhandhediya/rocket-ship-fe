import { shipRocket, shortShipRocket } from '../../icons';
import { home, homeActive } from '../../icons/sidebar-icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  const sidebarLinks = [
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
      path: '/',
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
  ];

  return (
    <div
      id="mySidebar"
      className="sidebar-transition group/sidebar fixed left-0 top-0 h-full w-[70px] overflow-x-hidden overflow-y-hidden bg-[#06064d] text-white hover:w-[218px] hover:overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar]:w-1">
      <div className="sticky top-0 z-10 bg-[#06064d] pb-4 pl-5 pr-3.5 pt-2.5 ">
        <img src={shortShipRocket} className="object-contain group-hover/sidebar:hidden" />
        <img
          src={shipRocket}
          className="hidden object-contain transition-none duration-0 group-hover/sidebar:block"
        />
      </div>
      <hr className="mb-4 border-[#06064d] text-[#0000001a] md:hidden" />
      <div>
        {sidebarLinks.map((nav, i) => {
          return (
            <Link to={nav?.path} key={i}>
              <div className="group/sidebarItem mx-3.5 mb-3 flex items-center rounded-[4px] p-2 text-white hover:bg-white hover:text-[#06064d]">
                <img src={nav.icon} className="h-6 w-6 group-hover/sidebarItem:hidden" />
                <img src={nav.hoverIcon} className="hidden h-6 w-6 group-hover/sidebarItem:block" />
                <span className="ml-3 hidden truncate text-xs group-hover/sidebar:block group-hover/sidebarItem:text-[#06064d] ">
                  {nav.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
