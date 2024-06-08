import axios from 'axios';
import { createColumnHelper } from '@tanstack/react-table';
import { useState, useEffect } from 'react';
import { CustomDataTable } from '../../common/components';
import { Badge } from 'flowbite-react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { user } from '../../common/icons/sidebar-icons';

const Users = () => {
  let amount = 0;
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState(amount);
  const [showkyc, setShowKyc] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const company_id = localStorage.getItem('company_id');
  const [aadharImg, setAadharImg] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [kyc_status, setKyc_status] = useState(0);
  const navigate = useNavigate();

  //   const fetchUsers = () => {
  //     axios
  //     .get(BACKEND_URL+`/company/get_company_users?companyId=8`)
  //     .then(async (resp) => {
  //       if (resp.status === 200) {
  //         // dispatch(setAllOrders(resp?.data || []));
  //         setIsLoading(false);
  //         // resData = resp.data
  //         // console.log("REsponseeeeeeee",resData)
  //       } else {
  //         toast('There is some error while fetching orders.', { type: 'error' });
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch(() => {
  //       toast('There is some error while fetching orders.', { type: 'error' });
  //       setIsLoading(false);
  //     });
  //   }

  useEffect(() => {
    axios
      .get(BACKEND_URL + `/company/get_company_users/?companyId=${company_id}`)
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
    //   navigate('/all-indent/'+row.original.id)
    amount = row?.original?.requested_balance;
    setRechargeAmount(amount);
    setIdUser(row?.original?.id);
    setShowPopup(true);
  };

  const handleReturn = (row) => {
    const id = row?.original?.id;
    const data = {
      id: id,
      flag: true,
    };
    navigate('/returns', { state: { data: data } });
  };

  const handleKYC = (row) => {
    setIdUser(row?.original?.id);
    setShowKyc(true);
    const headers = { 'Content-Type': 'application/json' };
    axios
      .get(BACKEND_URL + `/kyc/?id=${row?.original?.id}&type=user_aadhar`, { responseType: 'blob' })
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

    axios
      .get(BACKEND_URL + `/kyc/?id=${row?.original?.id}&type=selfie`, { responseType: 'blob' })
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
    axios
      .post(BACKEND_URL + `/kyc/kyc_status/?client_type=user&status=${3}&id=${idUser}`, { headers })
      .then((res) => {
        console.log('Response ', res);
        toast('KYC Verification Successfully', { type: 'success' });
        setShowKyc(false);
      })
      .catch((err) => {
        console.log('ERRRRRR', err);
        toast('Error in KYC verification', { type: 'error' });
      });
  };

  // const checkKYC = ) => {
  //   const headers={'Content-Type': 'application/json'};
  //   axios.post(BACKEND_URL + `/kyc/?id=${idUser}&type=user_aadhar`).
  //   then((res) => {
  //       console.log("Recharge Responsee",res)
  //       // let newVal = localStorage.getItem('balance') - rechargeAmount
  //       // localStorage.setItem('balance',newVal)
  //       window.location.reload()
  //   }).catch((err) => {
  //       console.log("Error In Rechargeee")
  //   })
  //   setShowKyc(false);
  // }

  const handleRecharge = () => {
    const headers = { 'Content-Type': 'application/json' };
    axios
      .post(
        BACKEND_URL +
          `/company/update_wallet_balance?companyId=${parseInt(company_id)}&user_id=${parseInt(
            idUser,
          )}&amount=${parseInt(rechargeAmount)}`,
      )
      .then((res) => {
        console.log('Recharge Responsee', res);
        if (res?.data?.message) {
          toast('Insufficient Balance', { type: 'error' });
        } else {
          toast('Recharge Successfully', { type: 'success' });
          axios
            .get(BACKEND_URL + `/company/get_company_users/?companyId=${company_id}`)
            .then((res) => {
              console.log('RESSSSSSSSSSSSS', res);
              setUserData(res.data);
              setFetchData(true);
            })
            .catch((err) => {
              console.log('ERRRRRRRRRR', err);
            });
        }
        // let newVal = localStorage.getItem('balance') - rechargeAmount
        // localStorage.setItem('balance',newVal)
        // window.location.reload()
      })
      .catch((err) => {
        console.log('Error In Rechargeee');
      });
    setShowPopup(false);
    // toast.success('Recharge successful!');
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
      columnHelper.accessor('last_name', {
        header: 'Last Name',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              {row?.original?.last_name && <div>{row?.original?.last_name}</div>}
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
              {/* {row?.original?.wallet_balance && <div>{row?.original?.wallet_balance}</div>} */}
              <div>{row?.original?.wallet_balance !== null ? row?.original?.wallet_balance : 0}</div>
            </div>
          );
        },
      }),
      columnHelper.accessor('requested_balance', {
        header: 'Request Balance',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              {/* {row?.original?.wallet_balance && <div>{row?.original?.wallet_balance}</div>} */}
              <div>{row?.original?.requested_balance !== null ? row?.original?.requested_balance : 0}</div>
            </div>
          );
        },
      }),
      columnHelper.accessor('kyc_status_id', {
        header: 'KYC Status',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              {/* {row?.original?.wallet_balance && <div>{row?.original?.wallet_balance}</div>} */}
              <div>
                {row?.original?.kyc_status_id == 1
                  ? 'Upload Pending'
                  : row?.original?.kyc_status_id == 2
                    ? 'Approve Pending'
                    : 'Approved'}
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => {
          const disableButtons = row?.original?.kyc_status_id === 3;
          const showKYCBtn = row?.original?.kyc_status_id !== 3;
          return (
            <div className="flex gap-2 text-left text-xs">
              {
                <button
                  id={row?.original?.id}
                  className={`min-w-fit rounded bg-red-600 px-4 py-1.5 text-white hover:bg-green-600 ${
                    !disableButtons ? 'cursor-not-allowed' : ''
                  }`}
                  onClick={() => handleIndent(row)}
                  disabled={!disableButtons}>
                  {'Recharge'}
                </button>
              }
              {
                <button
                  id={row?.original?.id}
                  className={`min-w-fit rounded bg-blue-500 px-4 py-1.5 text-white hover:bg-green-600 ${
                    !disableButtons ? 'cursor-not-allowed' : ''
                  }`}
                  onClick={() => handleReturn(row)}
                  disabled={!disableButtons}>
                  {'Show Returns'}
                </button>
              }
              {showKYCBtn && (
                <button
                  id={row?.original?.id}
                  className="min-w-fit rounded bg-red-400 px-4 py-1.5 text-white hover:bg-green-600"
                  onClick={() => handleKYC(row)}>
                  {'KYC'}
                </button>
              )}
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
        <div className="mt-2">
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
          {showPopup && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="rounded-lg bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold">Recharge Wallet</h2>
                <input
                  type="number"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="mb-4 rounded-lg border border-gray-400 px-3 py-2"
                />
                <div className="flex justify-end">
                  <button className="rounded-lg bg-blue-500 px-4 py-2 text-white" onClick={handleRecharge}>
                    Recharge
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

          {showkyc && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <button
                className="border-0 bg-transparent p-1 pt-0 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                onClick={() => {
                  setShowKyc(false);
                }}>
                <span className="block h-6 w-6 bg-transparent text-black opacity-50 outline-none focus:outline-none">
                  ×
                </span>
              </button>
              <div className="w-[30%] rounded-lg bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold">Validate KYC</h2>
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
      </PageWithSidebar>

      {/* <button className='bg-purple-200 font-semibold' onClick={handleUser}>User</button> */}
    </>
  );
};

export default Users;
