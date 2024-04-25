import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../common/utils/env.config'
import { createColumnHelper } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import { CustomDataTable } from '../../common/components'

const CompanyList = () => {
    const navigate = useNavigate()
    const [companyData,setCompanyData] = useState([])
    const [showPopup,setShowPopup] = useState(false)
    const handleCompany = () => {
        axios.get(BACKEND_URL + '/company/get_all_companies/')
        .then((res) => {
            console.log("All Company List",res)
            setCompanyData(res.data)
        }).catch((err) => {
            console.log("Error In Company API",err)
        })
    }

    useEffect(() => {
        handleCompany()
    },[])

    const handleUser = (row) => {
        const id = row?.original?.id
        navigate('/user-list',{state:{data:id}})
    }

    const handleCompanyKYC = (row) => {
      const id = row?.original?.id
      setShowPopup(true)

    }

    const rowSubComponent = () => {
        return (
          <>
          </>
        );
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
                  {row?.original?.email && (
                    <div>{row?.original?.email}</div>
                  )}
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
          columnHelper.accessor('gst', {
            header: 'GST No.',
            cell: ({ row }) => {
              return (
                <div className="flex flex-col gap-2 text-left text-xs">
                  {row?.original?.gst && <div>{row?.original?.gst}</div>}
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
                      className="min-w-fit rounded bg-red-600 px-4 py-1.5 text-white hover:bg-green-600"
                      onClick={()=>handleCompanyKYC(row)}
                      >
                      {'Company KYC'}
                    </button>
                  )}
                  {(
                   <button
                      id={row?.original?.id}
                      className="min-w-fit rounded bg-red-600 px-4 py-1.5 text-white hover:bg-green-600"
                      onClick={()=>handleUser(row)}
                      >
                      {'Show User'}
                    </button>
                  )}
                </div>
              );
            },
          }),
        ];
      };

  return (
    <>
    <div className="mt-2">
      <button className='bg-red-600 p-2 mt-4 ml-4 border rounded-md shadow-md text-white font-semibold'
        onClick={() => {
            localStorage.removeItem('user_name')
            localStorage.removeItem('access_token')
            window.location.href = '/login'
        }}>Logout</button>
    </div>
    <div className="m-6">
    <CustomDataTable
        columns={getColumns()}
        rowData={companyData}
        enableRowSelection={false}
        shouldRenderRowSubComponent={() => Boolean(Math.ceil(Math.random() * 10) % 2)}
        onRowSelectStateChange={(selected) => console.log('selected-=-', selected)}
        rowSubComponent={rowSubComponent}
        enablePagination={true}
        tableWrapperStyles={{ height: '85vh' }}
      />
        {showPopup && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="w-[30%] bg-white p-6 rounded-lg">
              <div className="flex flex-row justify-between">
              <h2 className="text-lg font-semibold">Validate KYC</h2>
                <button
                    className="border-0 bg-transparent p-1 pt-0 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                    onClick={() => {setShowPopup(false)}}>
                    <span className="block h-6 w-6 bg-transparent text-black opacity-50 outline-none focus:outline-none">
                      ×
                    </span>
                </button>
               </div>
               
               <div className="flex flex-col">
                <div className="flex flex-row justify-evenly">
                    <img src=''  alt='Company PAN' className='w-40 mb-4' />
                    <img src=''  alt='Company GST' className='w-40 mb-4' />
                </div>
                <div className="flex flex-row justify-evenly">
                    <img src=''  alt='Company Stamp' className='w-40 mb-4' />
                    <img src=''  alt='Company LOGO' className='w-40 mb-4' />
                </div>
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    // onClick={handleAcceptKYC}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 ml-2 rounded-lg"
                    onClick={() => setShowPopup(false)}
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

export default CompanyList