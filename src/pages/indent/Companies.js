import React, { useState, useEffect } from 'react';
import { CustomDataTable } from '../../common/components';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { createColumnHelper } from '@tanstack/react-table';
import { Link, useNavigate } from 'react-router-dom';

const Companies = () => {
  const [userData, setUserData] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const [showKyc, setShowKyc] = useState(false);
  const [aadharImg, setAadharImg] = useState('');
  const [userImg, setUserImg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    axios
      .get(BACKEND_URL + `/company/all_company/`)
      .then((res) => {
        console.log('RESSSSSSSSSSSSS', res);
        setUserData(res.data);
        setFetchData(true);
      })
      .catch((err) => {
        console.log('ERRRRRRRRRR', err);
      });
  };

  const handleAcceptKYC = () => {
    // Handle KYC acceptance logic here
    setShowKyc(false);
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
              {/* {(
                <button
                  id={row?.original?.id}
                  className="min-w-fit rounded bg-red-600 px-4 py-1.5 text-white hover:bg-green-600"
                  onClick={() => handleButtonClick(row.id)}
                  >
                  {'Users'}
                </button>
                
              )} */}
              {/* <Link
                to={{
                  pathname: `/user/${row?.original?.id}`,
                }}
                className="min-w-fit rounded bg-sky-500 px-4 py-1.5 text-white hover:bg-sky-700">
                {'Show Users'}
              </Link> */}
              <button
                className="min-w-fit rounded bg-sky-500 px-4 py-1.5 text-white hover:bg-sky-700"
                onClick={() => navigate(`/user/${row?.original?.id}`, { state: row?.original?.name })}>
                {'Show Users'}
              </button>
            </div>
          );
        },
      }),
    ];
  };

  const rowSubComponent = (row) => {
    return <div>Details for {row.companyName}</div>;
  };

  return (
    <>
      <PageWithSidebar>
        {fetchData && (
          <CustomDataTable
            columns={getColumns()}
            rowData={userData}
            enableRowSelection={true}
            shouldRenderRowSubComponent={() => Boolean(Math.ceil(Math.random() * 10) % 2)}
            onRowSelectStateChange={(selected) => console.log('selected-=-', selected)}
            rowSubComponent={rowSubComponent}
            enablePagination={true}
            tableWrapperStyles={{ height: '78vh' }}
          />
        )}
        {showKyc && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="w-[30%] rounded-lg bg-white p-6">
              <div className="flex flex-row justify-between">
                <h2 className="mb-4 text-lg font-semibold">Validate KYC</h2>
                <button
                  className="mb-4 border-0 bg-transparent p-1 pt-0 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                  onClick={() => {
                    setShowKyc(false);
                  }}>
                  <span className="block h-6 w-6 bg-transparent text-black opacity-50 outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="flex flex-row justify-evenly">
                <img src={aadharImg} alt="Aadhar Image" className="mb-4 w-40 shadow-md" />
                <img src={userImg} alt="User Image" className="mb-4 w-40 shadow-md" />
              </div>
              <div className="flex justify-center">
                <button className="rounded-lg bg-blue-500 px-4 py-2 text-white" onClick={handleAcceptKYC}>
                  Accept
                </button>
                <button
                  className="ml-2 rounded-lg bg-red-500 px-4 py-2 text-white"
                  onClick={() => setShowKyc(false)}>
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

export default Companies;
