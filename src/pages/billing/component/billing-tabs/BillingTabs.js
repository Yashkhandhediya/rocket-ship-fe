import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { earlyCodIcon } from '../../../../common/images';
import EarlyCOD from '../cod-remittance/EarlyCOD'; // Adjust the import path accordingly

const BillingTabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const is_company = localStorage.getItem('is_company');

  const tabs = [
    {
      name: 'Shipping Charges',
      icon: (
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
          />
        </svg>
      ),
      path: '/statement',
    },
    {
      name: 'COD Remittance',
      icon: (
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
      path: '/remittance-logs',
    },
    {
      name: 'Wallet History',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
          />
        </svg>
      ),
      path: '/billing-credit-details',
    },
    is_company != 0
      ? null
      : {
          name: 'Invoices',
          icon: (
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 8h6m-5 4h6m-5 4h6M6 3v18l2-2 2 2 2-2 2 2 2-2 2 2V3l-2 2-2-2-2 2-2-2-2 2-2-2Z"
              />
            </svg>
          ),
          path: '/invoices',
        },
    is_company != 0
      ? null
      : {
          name: 'Current Plan Details',
          icon: (
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 24 24">
              <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 8v3c0 .6-.4 1-1 1H5m11 4h2c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1h-7a1 1 0 0 0-1 1v1m4 3v10c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1v-7.1c0-.3 0-.5.2-.7l2.5-2.9c.2-.2.5-.3.8-.3H13c.6 0 1 .4 1 1Z"
              />
            </svg>
          ),
          path: '/current-plan-details',
        },
    {
      name: 'Passbook',
      icon: (
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 19V4c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v13H7a2 2 0 0 0-2 2Zm0 0c0 1.1.9 2 2 2h12M9 3v14m7 0v4"
          />
        </svg>
      ),
      path: '/passbook',
    },
    is_company != 0
      ? null
      : {
          name: 'Credit Receipt',
          icon: (
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
          ),
          path: '/credit-receipt',
        },
    is_company != 0
      ? null
      : {
          name: 'International Shipping Bill',
          icon: (
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
          ),
          path: '/international-shipping-bill',
        },
  ];
  const supertab = [
    {
      name: 'COD Remittance',
      icon: (
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
      path: '/remittance-logs',
    },
  ];

  const is_super = localStorage.getItem('is_super');

  const handleTabClick = (index) => {
    setActiveTab(index);
    navigate(tabs[index].path);
  };

  const handleEarlyCODClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const path = window.location.pathname;
    let index = tabs.findIndex((tab) => tab != null && tab.path === path);
    if (path === '/future-cod') {
      index = 1;
    }
    if (path === '/recharge-status') {
      index = 2;
    }
    if (is_super === '3') {
      index = 0;
    }
    setActiveTab(index);
  }, [window.location.pathname]);

  return (
    <>
      <div className="m-2 flex flex-wrap justify-between border-b-[1px] border-[#b3b3b3] bg-white px-[10px] pt-[15px] lg:flex-nowrap">
        <div className="flex flex-row flex-wrap items-center gap-1 lg:flex-nowrap">
          <div className="px-2 text-[20px]">Billing</div>
          {(is_super === '3' ? supertab : tabs).map((tab, index) => {
            return (
              tab != null && (
                <button
                  key={index}
                  className={`-mb-[0.10rem] flex flex-row items-center gap-2 px-2 py-4 text-[13px] ${
                    activeTab === index
                      ? 'rounded-t-md border-x-[1px] border-b-[2px] border-t-2 border-x-[#b3b3b3] border-b-white border-t-[#ca4545] text-[#a84949]'
                      : 'text-[#959595]'
                  }`}
                  onClick={() => handleTabClick(index)}>
                  {tab.icon}
                  {tab.name}
                </button>
              )
            );
          })}
        </div>
        {[0, 1, 2, 3, 5].includes(activeTab) && (
          <div className="flex flex-row items-center gap-2">
            {activeTab !== 5 && is_super !== '3' && (
              <button
                className="flex h-7 w-28 flex-row items-center justify-start rounded-[4px] bg-[#27C24C] text-[13px] text-white hover:bg-[#49a75f]"
                onClick={handleEarlyCODClick}>
                <img src={earlyCodIcon} alt="" className="bg-[#25B848]" />
                <span className="ml-4">Early COD</span>
              </button>
            )}
            {activeTab !== 3 && is_super !== '3' && (
              <button className="flex h-7 flex-row items-center gap-2 rounded-sm bg-[#555555] px-3 text-[13px] text-white">
                IMP
              </button>
            )}
          </div>
        )}
      </div>
      <div>{children}</div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <EarlyCOD onClose={closeModal} />
        </div>
      )}
    </>
  );
};

export default BillingTabs;
