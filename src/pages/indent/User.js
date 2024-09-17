import React from 'react';
import { BACKEND_URL } from '../../common/utils/env.config';
import { createColumnHelper } from '@tanstack/react-table';
import { useState, useEffect } from 'react';
import { CustomDataTable } from '../../common/components';
import { Badge } from 'flowbite-react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../common/utils/apiClient';

const User = () => {
  const [userData, setUserData] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get(BACKEND_URL + '/indent/get_users')
      .then((res) => {
        console.log('RESSSSSSSSSSSSS', res);
        setUserData(res.data);
        setFetchData(true);
      })
      .catch((err) => {
        console.log('ERRRRRRRRRR', err);
      });
  }, []);

  const handleIndent = (row) => {
    console.log('yash row', row.original);
    navigate('/all-indent/' + row.original.id);
  };

  const getColumns = () => {
    const columnHelper = createColumnHelper();
    return [
      columnHelper.accessor('first_name', {
        header: 'First Name',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              {row?.original?.first_name && <div>{row?.original?.first_name}</div>}
            </div>
          );
        },
      }),
      columnHelper.accessor('email_address', {
        header: 'Email Address',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              {row?.original?.email_address && <div>{row?.original?.email_address}</div>}
            </div>
          );
        },
      }),
      columnHelper.accessor('contact_no', {
        header: 'Contact No.',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              {row?.original?.contact_no && <div>{row?.original?.contact_no}</div>}
            </div>
          );
        },
      }),
      columnHelper.accessor('wallet_balance', {
        header: 'Wallet Balance',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              {row?.original?.wallet_balance && <div>{row?.original?.wallet_balance}</div>}
            </div>
          );
        },
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => {
          return (
            <div className="flex gap-2 text-left text-xs">
              {
                <button
                  id={row?.original?.id}
                  className="min-w-fit rounded bg-red-600 px-4 py-1.5 text-white hover:bg-green-600"
                  onClick={() => handleIndent(row)}>
                  {'Indent'}
                </button>
              }
            </div>
          );
        },
      }),
    ];
  };

  const rowSubComponent = () => {
    return (
      <></>
      // <Badge className="flex w-fit items-center rounded-lg bg-orange-100 text-[8px]">
      //   <div className="flex items-center">
      //     <span className="mr-1 inline-flex h-4 w-4 rounded-full border-4 border-black"></span>
      //     {'Secured'}
      //   </div>
      // </Badge>
    );
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
      </PageWithSidebar>

      {/* <button className='bg-purple-200 font-semibold' onClick={handleUser}>User</button> */}
    </>
  );
};

export default User;
