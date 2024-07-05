import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../common/utils/env.config'
import { createColumnHelper } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import { CustomDataTable } from '../../common/components'
import { toast } from 'react-toastify'
import { noData } from '../../common/images'
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar'
// import { ACCESS_TOKEN } from '../../common/utils/config'

const CompanyList = () => {
    const navigate = useNavigate()
    const [companyData,setCompanyData] = useState([])
    const [showPopup,setShowPopup] = useState(false)
    const [idUser,setIdUser] = useState(null)
    const [companyPan,setCompanyPan] = useState(null)
    const [companyLogo,setCompanyLogo] = useState(null)
    const [companyGst,setCompanyGst] = useState(null)
    const [companyStamp,setCompanyStamp] = useState(null)
    const [currentPage, setCurrentPage] = useState(2);
    const [itemsPerPage,setItemsPerPage] = useState(10);
    const [currentItems, setCurrentItems] = useState([]);
    const [reload,setReload] = useState(false)
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

    const handleCompany = () => {
        axios.get(BACKEND_URL + '/company/get_all_companies/')
        .then((res) => {
            console.log("All Company List",res)
            setCompanyData(res.data)
            let total = Math.ceil(res.data.length / 10)
            setTotalPage(total)
            setCurrentItems(res.data.slice(itemsPerPage-10, itemsPerPage));
        }).catch((err) => {
            console.log("Error In Company API",err)
        })
    }

    useEffect(() => {
        handleCompany()
    },[])

    useEffect(() => {
      setCurrentItems(companyData.slice(itemsPerPage-10, itemsPerPage))
    }, [companyData,itemsPerPage])

    const handleUser = (row) => {
        const id = row?.id
        navigate('/user-list',{state:{data:id}})
    }

    const handleCompanyKYC = (row) => {
      setShowPopup(true)
      setIdUser(row?.id)
      axios.get(BACKEND_URL + `/kyc/?id=${row?.id}&type=company_pan`,{ responseType: 'blob' }).
      then((res) => {
          console.log("Recharge Responsee",res)
          const imgUrl = URL.createObjectURL(res.data)
          setCompanyPan(imgUrl)
      }).catch((err) => {
          console.log("Error In Rechargeee",err)
      })

      axios.get(BACKEND_URL + `/kyc/?id=${row?.id}&type=company_logo`,{ responseType: 'blob' }).
      then((res) => {
          console.log("Recharge Responsee",res)
          const imgUrl = URL.createObjectURL(res.data)
          setCompanyLogo(imgUrl)
      }).catch((err) => {
          console.log("Error In Rechargeee",err)
      })

      axios.get(BACKEND_URL + `/kyc/?id=${row?.id}&type=company_gst`,{ responseType: 'blob' }).
      then((res) => {
          console.log("Recharge Responsee",res)
          const imgUrl = URL.createObjectURL(res.data)
          setCompanyGst(imgUrl)
      }).catch((err) => {
          console.log("Error In Rechargeee",err)
      })

      axios.get(BACKEND_URL + `/kyc/?id=${row?.id}&type=company_stamp`,{ responseType: 'blob' }).
      then((res) => {
          console.log("Recharge Responsee",res)
          const imgUrl = URL.createObjectURL(res.data)
          setCompanyStamp(imgUrl)
      }).catch((err) => {
          console.log("Error In Rechargeee",err)
      })

    }

    const handleAcceptKYC = () => {
      const headers={'Content-Type': 'application/json'};
      axios.post(BACKEND_URL + `/kyc/kyc_status/?client_type=company&status=${3}&id=${idUser}`,{headers})
      .then((res) => {
        console.log("Response ",res)
        toast("KYC Verification Successfully",{type:'success'})
        setShowPopup(false);
      }).catch((err) => {
        console.log("ERRRRRR",err)
        toast("Error in KYC verification",{type:'error'})
      })
    }

    // const rowSubComponent = () => {
    //     return (
    //       <>
    //       </>
    //     );
    //   };
  
    // const getColumns = () => {
    //     const columnHelper = createColumnHelper();
    //     return [
    //       columnHelper.accessor('name', {
    //         header: 'Company Name',
    //         cell: ({ row }) => {
    //           return (
    //             <div className="flex flex-col gap-2 text-left text-xs">
    //               {row?.original?.name && <div>{row?.original?.name}</div>}
    //             </div>
    //           );
    //         },
    //       }),
    //       columnHelper.accessor('email', {
    //         header: 'Email Address',
    //         cell: ({ row }) => {
    //           return (
    //             <div className="flex flex-col gap-2 text-left text-xs">
    //               {row?.original?.email && (
    //                 <div>{row?.original?.email}</div>
    //               )}
    //             </div>
    //           );
    //         },
    //       }),
    //       columnHelper.accessor('contact', {
    //         header: 'Contact No.',
    //         cell: ({ row }) => {
    //           return (
    //             <div className="flex flex-col gap-2 text-left text-xs">
    //               {row?.original?.contact && <div>{row?.original?.contact}</div>}
    //             </div>
    //           );
    //         },
    //       }),
    //       columnHelper.accessor('gst', {
    //         header: 'GST No.',
    //         cell: ({ row }) => {
    //           return (
    //             <div className="flex flex-col gap-2 text-left text-xs">
    //               {row?.original?.gst && <div>{row?.original?.gst}</div>}
    //             </div>
    //           );
    //         },
    //       }),
    //       columnHelper.accessor('wallet_balance', {
    //         header: 'Wallet Balance',
    //         cell: ({ row }) => {
    //           return (
    //             <div className="flex flex-col gap-2 text-left text-xs">
    //               {/* {row?.original?.wallet_balance && <div>{row?.original?.wallet_balance}</div>} */}
    //               <div>{row?.original?.wallet_balance !== null ? row?.original?.wallet_balance : 0}</div>
    //             </div>
    //           );
    //         },
    //       }),
    //       columnHelper.accessor('kyc_status_id', {
    //         header: 'KYC Status',
    //         cell: ({ row }) => {
    //           return (
    //             <div className="flex flex-col gap-2 text-left text-xs">
    //               {/* {row?.original?.wallet_balance && <div>{row?.original?.wallet_balance}</div>} */}
    //               <div>{row?.original?.kyc_status_id == 1 ? 'Upload Pending' : row?.original?.kyc_status_id == 2 ? 'Approve Pending' : 'Approved'}</div>
    //             </div>
    //           );
    //         },
    //       }),
    //       columnHelper.accessor('action', {
    //         header: 'Action',
    //         cell: ({ row }) => {
    //           return (
    //             <div className="flex gap-2 text-left text-xs">
    //              {(
    //                <button
    //                   id={row?.original?.id}
    //                   className="min-w-fit rounded bg-red-600 px-4 py-1.5 text-white hover:bg-green-600"
    //                   onClick={()=>handleCompanyKYC(row)}
    //                   >
    //                   {'Company KYC'}
    //                 </button>
    //               )}
    //               {(
    //                <button
    //                   id={row?.original?.id}
    //                   className="min-w-fit rounded bg-red-600 px-4 py-1.5 text-white hover:bg-green-600"
    //                   onClick={()=>handleUser(row)}
    //                   >
    //                   {'Show User'}
    //                 </button>
    //               )}
    //             </div>
    //           );
    //         },
    //       }),
    //     ];
    //   };

  return (
    <PageWithSidebar>
    <div className="mt-2 flex justify-end mr-4">
      <button className='bg-red-600 p-2 mt-4 ml-4 border rounded-md shadow-md text-white font-semibold'
        onClick={() => {
            sessionStorage.clear()
            sessionStorage.clear()
            window.location.href = '/login'
        }}>Logout</button>
    </div>
    <div className="mt-2 m-6">
    {/* <CustomDataTable
        columns={getColumns()}
        rowData={companyData}
        isHeaderSticky={false}
        enableRowSelection={false}
        shouldRenderRowSubComponent={() => Boolean(Math.ceil(Math.random() * 10) % 2)}
        onRowSelectStateChange={(selected) => console.log('selected-=-', selected)}
        rowSubComponent={rowSubComponent}
        enablePagination={true}
        tableWrapperStyles={{ height: '85vh' }}
      /> */}
      <div className='w-full ml-2 mr-2 text-[14px] border border-collapse font-bold text-[#333333] '>
                    <div className='flex flex-row w-full border border-collapse bg-[#FAFAFA]'>
                        <div className='pl-2 pr-2 w-[15%] py-2'>Company Name</div>
                        <div className='pl-2 pr-2 w-[20%] py-2'>Email Address</div>
                        <div className='pl-2 pr-2 w-[13%] py-2'>Contact No.</div>
                        <div className='pl-2 pr-2 w-[15%] py-2'>GST No.</div>
                        <div className='pl-2 pr-2 w-[10%] py-2'>Wallet Balance</div>
                        <div className='pl-2 pr-2 w-[12%] py-2'>KYC Status</div>
                        <div className='pl-2 text-center pr-2 w-[15%] py-2'>Actions</div>
                    </div>
                    <div className='w-full flex flex-col bg-[#FFFFFF] overflow-y-auto' style={{height:"500px"}}>
                        {/* Table Data */}
                        {companyData.length === 0 ? (
                            <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col'>
                                <img src={noData} alt="" width={'200px'} />
                                <div className='text-[1.7rem] mt-10 text-[#b54040] font-bold'>We could not find any data.</div>
                                {/* <div className='text-[14px] mt-2 font-normal opacity-80'>Please change filters and retry.</div> */}
                            </div>
                        ) : (
                            currentItems.map((item, index) => (
                                <div className='w-full flex flex-row border border-collapse bg-[#FAFAFA]' key={index}>
                                    <div className='pl-2 font-semibold border-r-2 pr-2 w-[15%] py-2'>{item.name}</div>
                                    <div className='pl-2 font-semibold border-r-2 pr-2 w-[20%] py-2'>{item.email ? item.email : ''}</div>
                                    <div className='pl-2 font-semibold border-r-2 pr-2 w-[13%] py-2'>{item.contact ? item.contact : 'N.A'}</div>
                                    <div className='pl-2 font-semibold border-r-2 pr-2 w-[15%] py-2'>{item.gst ? item.gst : 'N.A'}</div>
                                    <div className='pl-2 font-semibold border-r-2 pr-2 w-[10%] py-2'>{item.wallet_balance ? '₹' + item.wallet_balance : '-'}</div>
                                    <div className='pl-2 font-semibold border-r-2 pr-2 w-[12%] py-2'>
                                    {item?.kyc_status_id == 1 ? 'Upload Pending' : item?.kyc_status_id == 2 ? 'Approve Pending' : 'Approved'}
                                    </div>
                                    <div className='pl-2 font-semibold border-r-2 pr-2 w-[15%] py-2'>
                                    <div className="flex flex-row justify-between">
                                    <button
                                        id={index}
                                        className={`min-w-fit rounded bg-red-600 p-1.5 font-semibold text-white hover:bg-green-600 ${item?.kyc_status_id == 1 ? 'cursor-not-allowed' : ''}`}
                                        onClick={()=>handleCompanyKYC(item)}
                                        disabled={item?.kyc_status_id == 1}
                                        >
                                        {'Company KYC'}
                                      </button>
                                      <button
                                          id={index}
                                          className="min-w-fit text-sm rounded bg-red-600 p-1.5 font-semibold text-white hover:bg-green-600"
                                          onClick={()=>handleUser(item)}
                                          >
                                          {'Show User'}
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
                        <button className={`text-base font-semibold mt-4 ml-2 p-2 border rounded text-white bg-[#159700] ${currentItems.length < 10 ? 'cursor-not-allowed' : ''}`} onClick={() => {paginate(itemsPerPage + 10);setPageNo(pageNo + 1)}} disabled={currentItems.length < 10}>
                        Next
                        </button>
                    </div>
      </div>
        {showPopup && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="w-[60%] bg-white p-6 rounded-lg">
              <div className="flex flex-row justify-between">
              <h2 className="text-lg font-semibold">Validate KYC</h2>
                <button
                    className="bg-transparent p-1 pt-0 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                    onClick={() => {setShowPopup(false)}}>
                    <span className="block h-6 w-6 bg-transparent text-black opacity-50 outline-none focus:outline-none">
                      ×
                    </span>
                </button>
               </div>
               
               <div className="mt-6 flex flex-col items-center justify-center md:w-[50%]">
                <div className="flex flex-row items-center justify-between  md:w-[99%]">
                    <img src={companyPan}  alt='Company PAN' className=' ml-20 mb-4 md:w-full ' style={{width:'300px',height:'300px'}} />
                    <img src={companyGst}  alt='Company GST' className=' ml-20 mb-4 md:w-full ' style={{width:'300px',height:'300px'}} />
                </div>
                <div className="flex flex-row items-center justify-between md:w-[99%]">
                    <img src={companyStamp}  alt='Company Stamp' className='w-40 ml-20 mb-4 md:w-full h-25' style={{width:'300px',height:'300px'}} />
                    <img src={companyLogo}  alt='Company LOGO' className='w-40 ml-20 mb-4 md:w-full h-25' style={{width:'300px',height:'300px'}} />
                </div>
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
                    onClick={() => setShowPopup(false)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
  </PageWithSidebar>
  )
}

export default CompanyList