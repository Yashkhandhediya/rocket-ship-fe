import axios from 'axios'
import React from 'react'
import { BACKEND_URL } from '../../common/utils/env.config'
import { createColumnHelper } from '@tanstack/react-table';
import { useState,useEffect } from 'react';
import { CustomDataTable } from '../../common/components';
import { Badge } from 'flowbite-react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const User = () => {
  const [userData, setUserData] = useState([])
  const [fetchData, setFetchData] = useState(false)
  const navigate = useNavigate()
  const company_id = sessionStorage.getItem('company_id');
  const [idUser,setIdUser] = useState(null)
  const [showkyc,setShowKyc] = useState(false)
  const [aadharImg,setAadharImg] = useState(null)
  const [userImg,setUserImg] = useState(null)
  const [kyc_status,setKyc_status] = useState(0)

    useEffect(() => {

      axios.get(BACKEND_URL + `/indent/get_users?company_id=${company_id}`).then((res)=> {
        console.log("RESSSSSSSSSSSSS",res)
        setUserData(res.data)
        setFetchData(true)
    }).catch((err) => {
        console.log("ERRRRRRRRRR",err)
    })

    }, [])
    

  const handleIndent = (row) => {
    console.log("yash row", row.original)
      navigate('/all-indent/'+row.original.id)
  }

  const handleKYC = (row) => {
    setIdUser(row?.id)
    setShowKyc(true)
    const headers={'Content-Type': 'application/json'};
    axios.get(BACKEND_URL + `/kyc/?id=${row?.id}&type=user_aadhar`,{ responseType: 'blob' }).
    then((res) => {
        console.log("Recharge Responsee",res)
        const imgUrl = URL.createObjectURL(res.data)
        setAadharImg(imgUrl)
        console.log("PICCCCCCCCCCCCCc",aadharImg)
        // let newVal = sessionStorage.getItem('balance') - rechargeAmount
        // sessionStorage.setItem('balance',newVal)
        // window.location.reload()
    }).catch((err) => {
        console.log("Error In Rechargeee",err)
    })

    axios.get(BACKEND_URL + `/kyc/?id=${row?.id}&type=selfie`,{ responseType: 'blob' }).
    then((res) => {
        console.log("Recharge Responsee",res)
        const imgUrl = URL.createObjectURL(res.data)
        setUserImg(imgUrl)
        console.log("PICCCCCCCCCCCCCc",userImg)
        // let newVal = sessionStorage.getItem('balance') - rechargeAmount
        // sessionStorage.setItem('balance',newVal)
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
      // window.location.reload()
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
              {row?.original?.wallet_balance && <div>{row?.original?.wallet_balance}</div>}
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
                  className="min-w-fit rounded bg-red-600 px-4 py-1.5 text-white hover:bg-green-600"
                  onClick={()=>handleIndent(row)}
                  >
                  {'Indent'}
                </button>
              )}
             {row?.original?.kyc_status_id != 3 && (
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

  const rowSubComponent = () => {
    return (
      <>
      </>
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
     {fetchData && <CustomDataTable
        columns={getColumns()}
        rowData={userData}
        enableRowSelection={true}
        shouldRenderRowSubComponent={() => Boolean(Math.ceil(Math.random() * 10) % 2)}
        onRowSelectStateChange={(selected) => console.log('selected-=-', selected)}
        rowSubComponent={rowSubComponent}
        enablePagination={true}
        tableWrapperStyles={{ height: '78vh' }}
      />}
       {showkyc && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="w-[30%] bg-white p-6 rounded-lg">
              <div className="flex flex-row justify-between">
              <h2 className="text-lg font-semibold mb-4">Validate KYC</h2>
                <button
                className="border-0 mb-4 bg-transparent p-1 pt-0 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                onClick={() => {setShowKyc(false)}}>
                <span className="block h-6 w-6 bg-transparent text-black opacity-50 outline-none focus:outline-none">
                  ×
                </span>
              </button>
              </div>
                <div className="flex flex-row justify-evenly">
                    <img src={aadharImg}  alt='Aadhar Image' className='w-40 shadow-md mb-4' />
                    <img src={userImg}  alt='User Image' className='w-40 shadow-md mb-4' />
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
     </PageWithSidebar>
      
    {/* <button className='bg-purple-200 font-semibold' onClick={handleUser}>User</button> */}
  </>
  )
}

export default User