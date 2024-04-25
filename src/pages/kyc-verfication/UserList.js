import React, {useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { BACKEND_URL } from '../../common/utils/env.config'
import axios from 'axios'
import { createColumnHelper } from '@tanstack/react-table'
import { toast } from 'react-toastify'
import { CustomDataTable } from '../../common/components'

const UserList = () => {
  const [userData,setUserData] = useState([])
  const [showkyc,setShowKyc] = useState(false)
  const [aadharImg,setAadharImg] = useState(null)
  const [userImg,setUserImg] = useState(null)
  const [fetchData,setFetchData] = useState(false)
  const [idUser,setIdUser] = useState(null)
  const [kyc_status,setKyc_status] = useState(0)
  const location = useLocation()
  const id = location?.state?.data

  const handleUser = () => {
        axios.get(BACKEND_URL + `/company/get_company_users/?companyId=${id}`).then((res)=> {
          console.log("RESSSSSSSSSSSSS",res)
          setUserData(res.data)
          setFetchData(true)
      }).catch((err) => {
          console.log("ERRRRRRRRRR",err)
      })
  }
  useEffect(() => {
      handleUser()
  }, [])

  const rowSubComponent = () => {
    return (
      <>
      </>
    );
  };

  const handleKYC = (row) => {
    setIdUser(row?.original?.id)
    setShowKyc(true)
    const headers={'Content-Type': 'application/json'};
    axios.get(BACKEND_URL + `/kyc/?id=${row?.original?.id}&type=user_aadhar`,{ responseType: 'blob' }).
    then((res) => {
        console.log("Recharge Responsee",res)
        const imgUrl = URL.createObjectURL(res.data)
        setAadharImg(imgUrl)
        console.log("PICCCCCCCCCCCCCc",aadharImg)
        // let newVal = localStorage.getItem('balance') - rechargeAmount
        // localStorage.setItem('balance',newVal)
        // window.location.reload()
    }).catch((err) => {
        console.log("Error In Rechargeee",err)
    })

    axios.get(BACKEND_URL + `/kyc/?id=${row?.original?.id}&type=selfie`,{ responseType: 'blob' }).
    then((res) => {
        console.log("Recharge Responsee",res)
        const imgUrl = URL.createObjectURL(res.data)
        setUserImg(imgUrl)
        console.log("PICCCCCCCCCCCCCc",userImg)
        // let newVal = localStorage.getItem('balance') - rechargeAmount
        // localStorage.setItem('balance',newVal)
        // window.location.reload()
    }).catch((err) => {
        console.log("Error In Rechargeee",err)
    })
  }

  const handleAcceptKYC = () => {
    setKyc_status(1)
    const headers={'Content-Type': 'application/json'};
    axios.post(BACKEND_URL + `/kyc/kyc_status/?client_type=user&status=${3}&id=${idUser}`,{headers})
    .then((res) => {
      console.log("Response ",res)
      toast("KYC Verification Successfully",{type:'success'})
      setShowKyc(false);
    }).catch((err) => {
      console.log("ERRRRRR",err)
      toast("Error in KYC verification",{type:'error'})
    })
 }

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
              {row?.original?.email_address && (
                <div>{row?.original?.email_address}</div>
              )}
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
      columnHelper.accessor('kyc_status_id', {
        header: 'KYC Status',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
              {/* {row?.original?.wallet_balance && <div>{row?.original?.wallet_balance}</div>} */}
              <div>{row?.original?.kyc_status_id == 1 ? 'Upload Pending' : row?.original?.kyc_status_id == 2 ? 'Approve Pending' : 'Approved'}</div>
            </div>
          );
        },
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => {
          return (
            <div className="flex gap-2 text-left text-xs">
              {(
                <button
                  id={row?.original?.id}
                  className="min-w-fit rounded bg-red-400 px-4 py-1.5 text-white hover:bg-green-600"
                  onClick={()=>handleKYC(row)}
                  >
                  {'KYC'}
                </button>
              )}
            </div>
          );
        },
      }),
    ];
  };


  console.log("Company Id",id)
  return (
    <>
    <div className="flex flex-row justify-between">
    <button className='bg-blue-600 p-2 mt-4 ml-8 border rounded-md shadow-md text-white font-semibold'
        onClick={() => {
            window.location.href = '/company-list'
        }}>Back</button>

         <button className='bg-red-600 p-2 mt-4 mr-8 border rounded-md shadow-md text-white font-semibold'
          onClick={() => {
              localStorage.removeItem('user_name')
              localStorage.removeItem('access_token')
              window.location.href = '/login'
          }}>Logout</button>
    </div>
   
    <div className='m-6'>
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
       {showkyc && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="w-[30%] bg-white p-6 rounded-lg">
              <div className="w-full flex flex-row justify-between">
              <h2 className="text-lg font-semibold mb-4">Validate KYC</h2>
                <button
                className="border-0 mb-4 bg-transparent p-1 pt-0 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                onClick={() => {setShowKyc(false)}}>
                <span className="block h-6 w-6 bg-transparent text-black opacity-50 outline-none focus:outline-none">
                  ×
                </span>
              </button>
              </div>
                <div className="w-[40%] flex flex-row justify-evenly">
                    <img src={aadharImg}  alt='Aadhar Image' className='w-[45%] shadow-md mb-4' />
                    <img src={userImg}  alt='User Image' className='w-[45%] shadow-md mb-4' />
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleAcceptKYC}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 ml-2 rounded-lg"
                    onClick={() => setShowKyc(false)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
    </>
  )
}

export default UserList