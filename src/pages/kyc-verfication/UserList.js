import React, {useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { BACKEND_URL } from '../../common/utils/env.config'
import axios from 'axios'
import { createColumnHelper } from '@tanstack/react-table'
import { toast } from 'react-toastify'
import { CustomDataTable } from '../../common/components'
import { noData } from '../../common/images'
// import { ACCESS_TOKEN } from '../../common/utils/config'

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
  const [itemsPerPage,setItemsPerPage] = useState(10);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageNo,setPageNo] = useState(1)
  const [totalPage,setTotalPage] = useState(1)

  const paginate = (page_item) => {
    if(page_item > 0){
        console.log("kdkl",page_item)
        setItemsPerPage(page_item)
    }else{
        setItemsPerPage(10)
    }
  };


  const handleUser = () => {
        axios.get(BACKEND_URL + `/company/get_company_users/?companyId=${id}`).then((res)=> {
          console.log("RESSSSSSSSSSSSS",res)
          setUserData(res.data)
          let total = Math.ceil(res.data.length / 10)
          setTotalPage(total)
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
      window.location.reload()
    }).catch((err) => {
      console.log("ERRRRRR",err)
      toast("Error in KYC verification",{type:'error'})
    })
 }

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
              sessionStorage.removeItem('user_name')
              sessionStorage.removeItem('is_super')
              sessionStorage.removeItem('access_token')
              sessionStorage.clear()
              window.location.href = '/login'
          }}>Logout</button>
    </div>
   
    <div className='m-6'>
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
      <div className='w-full ml-2 mr-2 text-[14px] border border-collapse font-bold text-[#333333] '>
                    <div className='flex flex-row w-full border border-collapse bg-[#FAFAFA]'>
                        <div className='pl-2 pr-2 w-[15%] py-2'>First Name</div>
                        <div className='pl-2 pr-2 w-[15%] py-2'>Last Name</div>
                        <div className='pl-2 pr-2 w-[25%] py-2'>Email Address</div>
                        <div className='pl-2 pr-2 w-[15%] py-2'>Contact No.</div>
                        <div className='pl-2 pr-2 w-[15%] py-2'>Wallet Balance</div>
                        <div className='pl-2 pr-2 w-[15%] py-2'>KYC Status</div>
                        <div className='pl-2 text-center pr-2 w-[15%] py-2'>Actions</div>
                    </div>
                    <div className='w-full flex flex-col bg-[#FFFFFF] overflow-y-auto' style={{height:"500px"}}>
                        {/* Table Data */}
                        {userData.length === 0 ? (
                            <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col'>
                                <img src={noData} alt="" width={'200px'} />
                                <div className='text-[1.7rem] mt-10 text-[#b54040] font-bold'>We could not find any data.</div>
                                {/* <div className='text-[14px] mt-2 font-normal opacity-80'>Please change filters and retry.</div> */}
                            </div>
                        ) : (
                            userData.map((item, index) => (
                                <div className='w-full flex flex-row border border-collapse bg-[#FAFAFA]' key={index}>
                                    <div className='pl-2 font-semibold border-r-2 pr-2 w-[15%] py-2'>{item.first_name}</div>
                                    <div className='pl-2 font-semibold border-r-2 pr-2 w-[15%] py-2'>{item.last_name}</div>
                                    <div className='pl-2 font-semibold border-r-2 pr-2 w-[25%] py-2'>{item.email_address ? item.email_address : ''}</div>
                                    <div className='pl-2 font-semibold border-r-2 pr-2 w-[15%] py-2'>{item.contact_no ? item.contact_no : 'N.A'}</div>
                                    <div className='pl-2 font-semibold border-r-2 pr-2 w-[15%] py-2'>{item.wallet_balance ? '₹' + item.wallet_balance : '-'}</div>
                                    <div className='pl-2 font-semibold border-r-2 pr-2 w-[15%] py-2'>
                                    {item?.kyc_status_id == 1 ? 'Upload Pending' : item?.kyc_status_id == 2 ? 'Approve Pending' : 'Approved'}
                                    </div>
                                    <div className='pl-2 font-semibold border-r-2 pr-2 w-[15%] py-2'>
                                    <div className="flex flex-row justify-between">
                                    <button
                                        id={index}
                                        className="rounded bg-red-600 p-2 ml-16 font-semibold text-white hover:bg-green-600"
                                        onClick={()=>handleKYC(item)}
                                        >
                                        {'KYC'}
                                      </button>
                                    </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className='mb-6'>
                    <button className={`text-base font-semibold mt-4 ml-4 p-2 border rounded text-white bg-[#159700] ${itemsPerPage === 10 ? 'cursor-not-allowed' : ''}`} onClick={() => {paginate(itemsPerPage - 10);if(pageNo > 1){setPageNo(pageNo - 1)}}} disabled={itemsPerPage === 10}>
                        Previous
                        </button>
                    <span className='font-semibold ml-2 p-2 border-2 border-gray-300 rounded-md text-base'>{pageNo}</span>
                    <span className='font-semibold ml-2 text-base'>Of</span>
                    <span className='font-semibold ml-2 p-2 border-2 border-gray-300 rounded-md text-base'>{totalPage}</span>
                        <button className={`text-base font-semibold mt-4 ml-4 p-2 border rounded text-white bg-[#159700] ${currentItems.length < 10 ? 'cursor-not-allowed' : ''}`} onClick={() => {paginate(itemsPerPage + 10);setPageNo(pageNo + 1)}} disabled={currentItems.length < 10}>
                        Next
                        </button>
                    </div>
      </div>
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
    </div>
    </>
  )
}

export default UserList