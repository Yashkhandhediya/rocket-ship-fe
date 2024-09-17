import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BACKEND_URL } from '../../common/utils/env.config';
import { createColumnHelper } from '@tanstack/react-table';
import { toast } from 'react-toastify';
import { CustomDataTable } from '../../common/components';
import { noData } from '../../common/images';
import apiClient from '../../common/utils/apiClient';
// import { ACCESS_TOKEN } from '../../common/utils/config'

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [showkyc, setShowKyc] = useState(false);
  const [aadharImg, setAadharImg] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [fetchData, setFetchData] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [kyc_status, setKyc_status] = useState(0);
  const location = useLocation();
  const id = location?.state?.data;
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const paginate = (page_item) => {
    if (page_item > 0) {
      console.log('kdkl', page_item);
      setItemsPerPage(page_item);
    } else {
      setItemsPerPage(10);
    }
  };

  const handleUser = () => {
    apiClient
      .get(BACKEND_URL + `/company/get_company_users/?companyId=${id}`)
      .then((res) => {
        console.log('RESSSSSSSSSSSSS', res);
        setUserData(res.data);
        let total = Math.ceil(res.data.length / 10);
        setTotalPage(total);
        setFetchData(true);
      })
      .catch((err) => {
        console.log('ERRRRRRRRRR', err);
      });
  };
  useEffect(() => {
    handleUser();
  }, []);

  const rowSubComponent = () => {
    return <></>;
  };

  const handleKYC = (row) => {
    setIdUser(row?.id);
    setShowKyc(true);
    const headers = { 'Content-Type': 'application/json' };
    apiClient
      .get(BACKEND_URL + `/kyc/?id=${row?.id}&type=user_aadhar`, { responseType: 'blob' })
      .then((res) => {
        console.log('Recharge Responsee', res);
        const imgUrl = URL.createObjectURL(res.data);
        setAadharImg(imgUrl);
        console.log('PICCCCCCCCCCCCCc', aadharImg);
        // let newVal = localStorage.getItem('balance') - rechargeAmount
        // localStorage.setItem('balance',newVal)
        // window.location.reload()
      })
      .catch((err) => {
        console.log('Error In Rechargeee', err);
      });

    apiClient
      .get(BACKEND_URL + `/kyc/?id=${row?.id}&type=selfie`, { responseType: 'blob' })
      .then((res) => {
        console.log('Recharge Responsee', res);
        const imgUrl = URL.createObjectURL(res.data);
        setUserImg(imgUrl);
        console.log('PICCCCCCCCCCCCCc', userImg);
        // let newVal = localStorage.getItem('balance') - rechargeAmount
        // localStorage.setItem('balance',newVal)
        // window.location.reload()
      })
      .catch((err) => {
        console.log('Error In Rechargeee', err);
      });
  };

  const handleAcceptKYC = () => {
    setKyc_status(1);
    const headers = { 'Content-Type': 'application/json' };
    apiClient
      .post(BACKEND_URL + `/kyc/kyc_status/?client_type=user&status=${3}&id=${idUser}`, { headers })
      .then((res) => {
        console.log('Response ', res);
        toast('KYC Verification Successfully', { type: 'success' });
        setShowKyc(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log('ERRRRRR', err);
        toast('Error in KYC verification', { type: 'error' });
      });
  };

  // const getColumns = () => {
  //   const columnHelper = createColumnHelper();
  //   return [
  //     columnHelper.accessor('first_name', {
  //       header: 'First Name',
  //       cell: ({ row }) => {
  //         return (
  //           <div className="flex flex-col gap-2 text-left text-xs">
  //             {row?.original?.first_name && <div>{row?.original?.first_name}</div>}
  //           </div>
  //         );
  //       },
  //     }),
  //     columnHelper.accessor('last_name', {
  //       header: 'Last Name',
  //       cell: ({ row }) => {
  //         return (
  //           <div className="flex flex-col gap-2 text-left text-xs">
  //             {row?.original?.last_name && <div>{row?.original?.last_name}</div>}
  //           </div>
  //         );
  //       },
  //     }),
  //     columnHelper.accessor('email_address', {
  //       header: 'Email Address',
  //       cell: ({ row }) => {
  //         return (
  //           <div className="flex flex-col gap-2 text-left text-xs">
  //             {row?.original?.email_address && (
  //               <div>{row?.original?.email_address}</div>
  //             )}
  //           </div>
  //         );
  //       },
  //     }),
  //     columnHelper.accessor('contact_no', {
  //       header: 'Contact No.',
  //       cell: ({ row }) => {
  //         return (
  //           <div className="flex flex-col gap-2 text-left text-xs">
  //             {row?.original?.contact_no && <div>{row?.original?.contact_no}</div>}
  //           </div>
  //         );
  //       },
  //     }),
  //     columnHelper.accessor('wallet_balance', {
  //       header: 'Wallet Balance',
  //       cell: ({ row }) => {
  //         return (
  //           <div className="flex flex-col gap-2 text-left text-xs">
  //             {/* {row?.original?.wallet_balance && <div>{row?.original?.wallet_balance}</div>} */}
  //             <div>{row?.original?.wallet_balance !== null ? row?.original?.wallet_balance : 0}</div>
  //           </div>
  //         );
  //       },
  //     }),
  //     columnHelper.accessor('kyc_status_id', {
  //       header: 'KYC Status',
  //       cell: ({ row }) => {
  //         return (
  //           <div className="flex flex-col gap-2 text-left text-xs">
  //             {/* {row?.original?.wallet_balance && <div>{row?.original?.wallet_balance}</div>} */}
  //             <div>{row?.original?.kyc_status_id == 1 ? 'Upload Pending' : row?.original?.kyc_status_id == 2 ? 'Approve Pending' : 'Approved'}</div>
  //           </div>
  //         );
  //       },
  //     }),
  //     columnHelper.accessor('action', {
  //       header: 'Action',
  //       cell: ({ row }) => {
  //         return (
  //           <div className="flex gap-2 text-left text-xs">
  //             {(
  //               <button
  //                 id={row?.original?.id}
  //                 className="min-w-fit rounded bg-red-400 px-4 py-1.5 text-white hover:bg-green-600"
  //                 onClick={()=>handleKYC(row)}
  //                 >
  //                 {'KYC'}
  //               </button>
  //             )}
  //           </div>
  //         );
  //       },
  //     }),
  //   ];
  // };

  console.log('Company Id', id);
  return (
    <>
      <div className="flex flex-row justify-between">
        <button
          className="ml-8 mt-4 rounded-md border bg-blue-600 p-2 font-semibold text-white shadow-md"
          onClick={() => {
            window.location.href = '/company-list';
          }}>
          Back
        </button>

        <button
          className="mr-8 mt-4 rounded-md border bg-red-600 p-2 font-semibold text-white shadow-md"
          onClick={() => {
            localStorage.removeItem('user_name');
            localStorage.removeItem('is_super');
            localStorage.removeItem('access_token');
            sessionStorage.clear();
            window.location.href = '/login';
          }}>
          Logout
        </button>
      </div>

      <div className="m-6">
        {/* <CustomDataTable
        columns={getColumns()}
        isHeaderSticky={false}
        rowData={userData}
        enableRowSelection={true}
        shouldRenderRowSubComponent={() => Boolean(Math.ceil(Math.random() * 10) % 2)}
        onRowSelectStateChange={(selected) => console.log('selected-=-', selected)}
        rowSubComponent={rowSubComponent}
        enablePagination={true}
        tableWrapperStyles={{ height: '78vh' }}
      /> */}
        <div className="ml-2 mr-2 w-full border-collapse border text-[14px] font-bold text-[#333333] ">
          <div className="flex w-full border-collapse flex-row border bg-[#FAFAFA]">
            <div className="w-[15%] py-2 pl-2 pr-2">First Name</div>
            <div className="w-[15%] py-2 pl-2 pr-2">Last Name</div>
            <div className="w-[25%] py-2 pl-2 pr-2">Email Address</div>
            <div className="w-[15%] py-2 pl-2 pr-2">Contact No.</div>
            <div className="w-[15%] py-2 pl-2 pr-2">Wallet Balance</div>
            <div className="w-[15%] py-2 pl-2 pr-2">KYC Status</div>
            <div className="w-[15%] py-2 pl-2 pr-2 text-center">Actions</div>
          </div>
          <div className="flex w-full flex-col overflow-y-auto bg-[#FFFFFF]" style={{ height: '500px' }}>
            {/* Table Data */}
            {userData.length === 0 ? (
              <div className="mb-12 flex w-full flex-col items-center justify-center pt-16">
                <img src={noData} alt="" width={'200px'} />
                <div className="mt-10 text-[1.7rem] font-bold text-[#b54040]">
                  We could not find any data.
                </div>
                {/* <div className='text-[14px] mt-2 font-normal opacity-80'>Please change filters and retry.</div> */}
              </div>
            ) : (
              userData.map((item, index) => (
                <div className="flex w-full border-collapse flex-row border bg-[#FAFAFA]" key={index}>
                  <div className="w-[15%] border-r-2 py-2 pl-2 pr-2 font-semibold">{item.first_name}</div>
                  <div className="w-[15%] border-r-2 py-2 pl-2 pr-2 font-semibold">{item.last_name}</div>
                  <div className="w-[25%] border-r-2 py-2 pl-2 pr-2 font-semibold">
                    {item.email_address ? item.email_address : ''}
                  </div>
                  <div className="w-[15%] border-r-2 py-2 pl-2 pr-2 font-semibold">
                    {item.contact_no ? item.contact_no : 'N.A'}
                  </div>
                  <div className="w-[15%] border-r-2 py-2 pl-2 pr-2 font-semibold">
                    {item.wallet_balance ? '₹' + item.wallet_balance : '-'}
                  </div>
                  <div className="w-[15%] border-r-2 py-2 pl-2 pr-2 font-semibold">
                    {item?.kyc_status_id == 1
                      ? 'Upload Pending'
                      : item?.kyc_status_id == 2
                        ? 'Approve Pending'
                        : 'Approved'}
                  </div>
                  <div className="w-[15%] border-r-2 py-2 pl-2 pr-2 font-semibold">
                    <div className="flex flex-row justify-between">
                      <button
                        id={index}
                        className="ml-16 rounded bg-red-600 p-2 font-semibold text-white hover:bg-green-600"
                        onClick={() => handleKYC(item)}>
                        {'KYC'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mb-6">
            <button
              className={`ml-4 mt-4 rounded border bg-[#159700] p-2 text-base font-semibold text-white ${
                itemsPerPage === 10 ? 'cursor-not-allowed' : ''
              }`}
              onClick={() => {
                paginate(itemsPerPage - 10);
                if (pageNo > 1) {
                  setPageNo(pageNo - 1);
                }
              }}
              disabled={itemsPerPage === 10}>
              Previous
            </button>
            <span className="ml-2 rounded-md border-2 border-gray-300 p-2 text-base font-semibold">
              {pageNo}
            </span>
            <span className="ml-2 text-base font-semibold">Of</span>
            <span className="ml-2 rounded-md border-2 border-gray-300 p-2 text-base font-semibold">
              {totalPage}
            </span>
            <button
              className={`ml-4 mt-4 rounded border bg-[#159700] p-2 text-base font-semibold text-white ${
                currentItems.length < 10 ? 'cursor-not-allowed' : ''
              }`}
              onClick={() => {
                paginate(itemsPerPage + 10);
                setPageNo(pageNo + 1);
              }}
              disabled={currentItems.length < 10}>
              Next
            </button>
          </div>
        </div>
        {showkyc && (
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
      </div>
    </>
  );
};

export default UserList;
