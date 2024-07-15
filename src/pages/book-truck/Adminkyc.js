import React, { useState, useEffect } from 'react';
import { CustomDataTable } from '../../common/components';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { createColumnHelper } from '@tanstack/react-table';
import { Link, useNavigate } from 'react-router-dom';
import emptyBox from '../../common/images/empty-box.png';
import { toast } from 'react-toastify';
import addressIcon from '../../common/images/address_icon.png';
import kycIcon from '../../common/images/kyc_verification_icon.png';
import truckIcon from '../../common/images/truck_icon.png';
import materialIcon from '../../common/images/materials_icon.png';
import userIcon from '../../common/images/show_users_icon.png';
import { Tooltip } from 'flowbite-react';

const Adminkyc = () => {
  const [userData, setUserData] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [showKyc, setShowKyc] = useState(false);
  const [aadharImg, setAadharImg] = useState('');
  const [userImg, setUserImg] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [companyPan, setCompanyPan] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyGst, setCompanyGst] = useState(null);
  const [companyStamp, setCompanyStamp] = useState(null);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const navigate = useNavigate();

  const fetchDataFromAPI = async () => {
    axios
      .get(BACKEND_URL + `/company/all_company/`)
      .then((res) => {
        console.log('RESSSSSSSSSSSSS', res);
        const filteredData = res.data.filter((item) => item.kyc_status_id === 1);
        setUserData(filteredData);
        setFetchData(true);
      })
      .catch((err) => {
        console.log('ERRRRRRRRRR', err);
      });
  };

  const handleAcceptKYC = () => {
    const headers = { 'Content-Type': 'application/json' };
    axios
      .post(BACKEND_URL + `/kyc/kyc_status/?client_type=company&status=${3}&id=${idUser}`, { headers })
      .then((res) => {
        console.log('Response ', res);
        toast('KYC Verification Successfully', { type: 'success' });
        setShowPopup(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log('ERRRRRR', err);
        toast('Error in KYC verification', { type: 'error' });
      });
  };

  const getColumns = () => {
    const columnHelper = createColumnHelper();
    return [
      columnHelper.accessor('name', {
        header: 'Company Name',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              {row?.original?.name && <div>{row?.original?.name}</div>}
            </div>
          );
        },
      }),
      columnHelper.accessor('email', {
        header: 'Email Address',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              {row?.original?.email && <div>{row?.original?.email}</div>}
            </div>
          );
        },
      }),
      columnHelper.accessor('contact', {
        header: 'Contact No.',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              {row?.original?.contact && <div>{row?.original?.contact}</div>}
            </div>
          );
        },
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => {
          return (
            <div className="flex gap-2 text-left text-xs">
              <div
                className="min-w-fit rounded bg-sky-500 px-2 py-1.5 text-white hover:bg-sky-700"
                onClick={() => {
                  setIdUser(row?.original?.id);
                  setShowPopup(true);
                }}>
                <Tooltip content="KYC">
                  <img src={kycIcon} className="h-5" />
                </Tooltip>
              </div>
              <button
                className="min-w-fit rounded bg-sky-500 px-2 py-1 text-white hover:bg-sky-700"
                onClick={() => navigate(`/trucks`, { state: row?.original })}>
                <Tooltip content="Trucks">
                  <img src={truckIcon} className="h-5" />
                </Tooltip>
              </button>
              <button
                className="min-w-fit rounded bg-sky-500 px-2 py-1.5 text-white hover:bg-sky-700"
                onClick={() => navigate(`/materials`, { state: row?.original })}>
                <Tooltip content="Materials">
                  <img src={materialIcon} className="h-5" />
                </Tooltip>
              </button>
              <button
                className="min-w-fit rounded bg-sky-500 px-2 py-1.5 text-white hover:bg-sky-700"
                onClick={() => navigate(`/address`, { state: row?.original })}>
                <Tooltip content="Addresses">
                  <img src={addressIcon} className="h-5" />
                </Tooltip>
              </button>
              <button
                className="min-w-fit rounded bg-sky-500 px-2 py-1.5 text-white hover:bg-sky-700"
                onClick={() => navigate(`/user/${row?.original?.id}`, { state: row?.original?.name })}>
                <Tooltip content="Users">
                  <img src={userIcon} className="h-5" />
                </Tooltip>
              </button>
            </div>
          );
        },
      }),
    ];
  };

  // const rowSubComponent = (row) => {
  //   return <div>Details for {row.companyName}</div>;
  // };

  return (
    <>
      <PageWithSidebar>
        {fetchData ? (
          userData.length > 0 ? (
            <CustomDataTable
              columns={getColumns()}
              rowData={userData}
              enableRowSelection={true}
              shouldRenderRowSubComponent={() => console.log(`Boolean(Math.ceil(Math.random() * 10) % 2)`)}
              onRowSelectStateChange={(selected) => console.log('selected-=-', selected)}
              // rowSubComponent={rowSubComponent}
              enablePagination={true}
              tableWrapperStyles={{ height: '78vh' }}
            />
          ) : (
            <div className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center bg-white">
              <img src={emptyBox} className="h-60" />
              <p>{`No Action Required`}</p>
            </div>
          )
        ) : null}

        {showPopup && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="w-[60%] rounded-lg bg-white p-6">
              <div className="flex flex-row justify-between">
                <h2 className="text-lg font-semibold">Validate KYC</h2>
                <button
                  className="bg-transparent p-1 pt-0 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                  onClick={() => {
                    setShowPopup(false);
                  }}>
                  <span className="block h-6 w-6 bg-transparent text-black opacity-50 outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>

              <div className="mt-6 flex flex-col items-center justify-center md:w-[50%]">
                <div className="flex flex-row items-center justify-between  md:w-[99%]">
                  <img
                    src={companyPan}
                    alt="Company PAN"
                    className=" mb-4 ml-20 md:w-full "
                    style={{ width: '300px', height: '300px' }}
                  />
                  <img
                    src={companyGst}
                    alt="Company GST"
                    className=" mb-4 ml-20 md:w-full "
                    style={{ width: '300px', height: '300px' }}
                  />
                </div>
                <div className="flex flex-row items-center justify-between md:w-[99%]">
                  <img
                    src={companyStamp}
                    alt="Company Stamp"
                    className="h-25 mb-4 ml-20 w-40 md:w-full"
                    style={{ width: '300px', height: '300px' }}
                  />
                  <img
                    src={companyLogo}
                    alt="Company LOGO"
                    className="h-25 mb-4 ml-20 w-40 md:w-full"
                    style={{ width: '300px', height: '300px' }}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button className="rounded-lg bg-blue-500 px-4 py-2 text-white" onClick={handleAcceptKYC}>
                  Accept
                </button>
                <button
                  className="ml-2 rounded-lg bg-red-500 px-4 py-2 text-white"
                  onClick={() => setShowPopup(false)}>
                  Decline
                </button>
              </div>
            </div>
          </div>
        )}
      </PageWithSidebar>
    </>
  );
};

export default Adminkyc;
