import React, { useEffect, useRef, useState } from 'react';
import { Tooltip, Dropdown, DropdownItem } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import QuickActions from './components/QuickActions';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/env.config';
import { toast } from 'react-toastify';
import RechargeModal from '../../../pages/home/components/rechareModal/RechargeModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { MdLockReset } from 'react-icons/md';
import { GrEdit } from 'react-icons/gr';
import { IoLogOutOutline } from 'react-icons/io5';
import { FaRegComments } from 'react-icons/fa6';
import { IoNotificationsOutline } from 'react-icons/io5';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Navbar = () => {
  const is_company = sessionStorage.getItem('is_company');
  console.log('ISSSSSSSSSSS', is_company);
  const user = sessionStorage.getItem('user_name') ? sessionStorage.getItem('user_name') : null;
  const email = sessionStorage.getItem('user_email') ? sessionStorage.getItem('user_email') : null;

  console.log('USEEEEEEEEEEEE', user);
  const balance = sessionStorage.getItem('balance') <= 0 ? '0.00' : sessionStorage.getItem('balance');
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const id_user = sessionStorage.getItem('user_id');
  const id_company = sessionStorage.getItem('company_id');
  const [showPopup, setShowPopup] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleRequest = () => {
    setShowPopup(true);
  };

  const handleRecharge = () => {
    const headers = { 'Content-Type': 'application/json' };
    axios
      .post(
        BACKEND_URL +
          `/company/request_balance/?user_id=${parseInt(id_user)}&amount=${parseInt(rechargeAmount)}`,
      )
      .then((res) => {
        console.log('Recharge Responsee', res);
        // let newVal = sessionStorage.getItem('balance') - rechargeAmount
        // sessionStorage.setItem('balance',newVal)
        toast.success('Request Recharge successful!');
        setRechargeAmount('');
      })
      .catch((err) => {
        console.log('Error In Rechargeee');
      });
    setShowPopup(false);
    // window.location.reload()
  };

  const navbarLinks = [
    {
      label: userData ? user : 'User',
      email: userData ? email : 'Email',
      icon: <FontAwesomeIcon icon={faUserCircle} className="text-6xl" />,
      onClick: () => {
        console.log('User'); //eslint-disable-line
        sessionStorage.getItem('is_company') == 0
          ? navigate('/user-profile')
          : navigate('/company-general-details');
      },
    },
    {
      othersLinks: [
        // {
        //   label: 'Current Plan',
        //   icon: (
        //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#90949D" className="h-6 w-6">
        //       <path
        //         fillRule="evenodd"
        //         d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
        //         clipRule="evenodd"
        //       />
        //     </svg>
        //   ),
        //   onClick: () => {
        //     console.log('Current Plan'); //eslint-disable-line
        //   },
        // },
        // {
        //   label: 'Refer & Earn',
        //   icon: (
        //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#90949D" className="h-6 w-6">
        //       <path
        //         fillRule="evenodd"
        //         d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
        //         clipRule="evenodd"
        //       />
        //     </svg>
        //   ),
        //   onClick: () => {
        //     console.log('Refer and Earn'); //eslint-disable-line
        //   },
        // },
        // {
        //   label: 'Rate Us',
        //   icon: (
        //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#90949D" className="h-6 w-6">
        //       <path
        //         fillRule="evenodd"
        //         d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
        //         clipRule="evenodd"
        //       />
        //     </svg>
        //   ),
        //   onClick: () => {
        //     console.log('Rate Us'); //eslint-disable-line
        //   },
        // },
        // {
        //   label: 'Terms & Conditions',
        //   icon: (
        //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#90949D" className="h-6 w-6">
        //       <path
        //         fillRule="evenodd"
        //         d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
        //         clipRule="evenodd"
        //       />
        //     </svg>
        //   ),
        //   onClick: () => {
        //     console.log('Terms & Conditions'); //eslint-disable-line
        //   },
        // },
        {
          label: 'Change Password',
          icon: <MdLockReset />,
          onClick: () => {
            navigate('/change-password');
          },
        },
        {
          label: 'Edit Profile',
          icon: <GrEdit />,
          onClick: () => {
            console.log('User'); //eslint-disable-line
            sessionStorage.getItem('is_company') == 0
              ? navigate('/user-profile')
              : navigate('/company-general-details');
          },
        },
        {
          label: 'Logout',
          icon: <IoLogOutOutline />,
          onClick: () => {
            sessionStorage.removeItem('user_name');
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('is_super');
            sessionStorage.removeItem('modules');
            sessionStorage.removeItem('setting_modules');
            window.location.href = '/login';
          },
        },
      ],
    },
  ];

  const hasFetched = useRef(false);

  const handleRefresh = () => {
    getUser();
    toast('Wallet Balance Refreshed', { type: 'success' });
  };

  const getUser = async () => {
    const apiURL =
      is_company == 0 ? `${BACKEND_URL}/users/${id_user}` : `${BACKEND_URL}/company/${id_company}`;
    try {
      const response = await axios.get(apiURL);
      setUserData(response.data);
      console.log('Hallllllllllllll', userData, response.data);
      if (response.data.wallet_balance == null || response.data.wallet_balance <= 0) {
        sessionStorage.setItem('balance', 0.0);
        sessionStorage.setItem(
          'modules',
          response.data.modules.module.map((mod) => mod.id),
        );
        sessionStorage.setItem(
          'setting_modules',
          response.data.modules.setting_module.map((mod) => mod.id),
        );
        console.log('BALLLLLLLL', balance);
      } else {
        sessionStorage.setItem('balance', response.data.wallet_balance);
      }
    } catch (error) {
      console.log(error); //eslint-disable-line
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      getUser();
      hasFetched.current = true;
    }
  }, []);

  return (
    <div className="sticky top-0 z-40 flex h-20 w-full flex-row justify-end gap-3 bg-white text-[13px] font-medium shadow">
      {/* <div className="flex flex-row items-center gap-2 border-r-[1px] px-3">
        <Tooltip content={<QuickActions />} style="light" className="shadow">
          <button className="flex cursor-pointer flex-row items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E02424" className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-[14px] text-[#E02424]">Quick Actions</p>
          </button>
        </Tooltip>
      </div>
      <div className="flex flex-row items-center gap-3 border-r-[1px] px-3">
        <Tooltip
          style="light"
          content={
            <p className="p-3">
              <span className="text-[#707070] ">Usable Amount :</span> ₹
              {userData.wallet_balance && userData.wallet_balance}
            </p>
          }>
          <div className="flex flex-row items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#90949D"
              className="h-5 w-5 cursor-pointer">
              <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
            </svg>
            <p className="cursor-pointer text-[14px]">₹{balance}</p>
            <button onClick={handleRefresh}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#90949D" className="h-5 w-4">
                <path
                  fillRule="evenodd"
                  d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </Tooltip>
        {is_company == 1 ? (
          <button className="ml-2 text-[14px] text-[#E02424]" onClick={() => setShowRechargeModal(true)}>
            Recharge Wallet
            {showRechargeModal && (
              <RechargeModal
                showRechargeModal={showRechargeModal}
                setShowRechargeModal={setShowRechargeModal}
              />
            )}
          </button>
        ) : (
          <button className="ml-2 text-[14px] text-[#E02424]" onClick={() => handleRequest()}>
            Request Recharge
          </button>
        )}
      </div> */}

      <div className=" flex flex-row items-center gap-3">
        {/* <FaRegComments className="rounded-full bg-blue-50 p-2 text-3xl" />
        <IoNotificationsOutline className="rounded-full bg-blue-50 p-2 text-3xl" /> */}

        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#90949D" className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
            clipRule="evenodd"
          />
        </svg> */}
        {/* <button className="flex flex-row p-1 hover:bg-[#f1f1f1]">
          <svg
            className="dark:text-white h-5 w-5 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="#90949D"
            viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M4.9 3C3.9 3 3 3.8 3 4.9V9c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V9c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9h-4Zm-10 10c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9h-4Z"
              clipRule="evenodd"
            />
          </svg>
        </button> */}
        {/* aria-expanded */}

        <div>
          {/* // ref={dropdownRef}
          // dismissOnClick={false}
          // renderTrigger={() => ( */}
          <button className="relative flex items-center gap-2 px-2" onClick={handleToggleDropdown}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#90949D" className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#90949D" className="h-5 w-4">
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
              </svg> */}

            <FontAwesomeIcon icon={faUserCircle} className="text-3xl" />
            <div className="flex flex-col">
              <h1 className="text-left text-base">{sessionStorage.getItem('user_name')}</h1>
              <p className="flex items-center gap-1 text-sky-500">
                <span>Edit Profile</span>{' '}
                {isDropdownOpen ? (
                  <IoIosArrowUp className="self-center" />
                ) : (
                  <IoIosArrowDown className="self-center" />
                )}
              </p>
            </div>
          </button>
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 top-14 my-3 flex h-56 w-56 flex-col items-center justify-center gap-4 border bg-white px-2 py-5 font-medium shadow transition-all duration-500">
            {navbarLinks.map((link, index) => {
              return index === 0 ? (
                <div key={index} onClick={link.onClick} className="flex cursor-pointer flex-col">
                  {link.icon}
                  <p className="text-center text-base">{link.label}</p>
                  <p className="text-center text-[13px] text-zinc-400">{link.email}</p>
                </div>
              ) : (
                <div key={index} className="flex w-full justify-around">
                  {link?.othersLinks?.map((link, index) => {
                    return (
                      <span
                        key={index}
                        className="cursor-pointer rounded-full bg-zinc-200 p-2 text-2xl"
                        onClick={link.onClick}>
                        {' '}
                        <Tooltip key={index} content={link.label}>
                          {link.icon}
                        </Tooltip>
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-400 bg-opacity-50 outline-none focus:outline-none">
          <div className="rounded-lg bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Request Amount</h2>
            <input
              type="number"
              value={rechargeAmount}
              onChange={(e) => setRechargeAmount(e.target.value)}
              placeholder="Enter amount"
              className="mb-4 rounded-lg border border-gray-400 px-3 py-2"
            />
            <div className="flex justify-end">
              <button className="rounded-lg bg-blue-500 px-4 py-2 text-white" onClick={handleRecharge}>
                Request
              </button>
              <button
                className="ml-2 rounded-lg bg-red-500 px-4 py-2 text-white"
                onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
