import axios from 'axios'
import React from 'react'
import { createColumnHelper } from '@tanstack/react-table';
import { useState,useEffect } from 'react';
import { CustomDataTable } from '../../common/components';
import { Badge } from 'flowbite-react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../common/utils/env.config';
import {toast} from 'react-toastify'


const User = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([])
  const [fetchData, setFetchData] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [idUser,setIdUser] = useState(null)
  const navigate = useNavigate()

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

      axios.get(BACKEND_URL + '/company/get_company_users?companyId=8').then((res)=> {
        console.log("RESSSSSSSSSSSSS",res)
        setUserData(res.data)
        setFetchData(true)
    }).catch((err) => {
        console.log("ERRRRRRRRRR",err)
    })

    }, [])
    

  const handleIndent = (row) => {
    console.log("yash row", row.original)
    //   navigate('/all-indent/'+row.original.id)
    setIdUser(row?.original?.id)
    setShowPopup(true);
  }

  const handleOrder = (row) => {
    const id = row?.original?.id
    axios.get(BACKEND_URL + `/order/get_filtered_orders_company?created_by=${id}`).then
    ((res) => {
      console.log("RESSSSSSSS",res)
      navigate('/orders')
    }).catch((err) => {
      console.log("ERRRRR",err)
    })
  }

  const handleRecharge = () => {
    const headers={'Content-Type': 'application/json'};
    const company_id = localStorage.getItem('company_id')
    axios.post(BACKEND_URL + `/company/update_wallet_balance?companyId=${parseInt(company_id)}&user_id=${parseInt(idUser)}&amount=${parseInt(rechargeAmount)}`).
    then((res) => {
        console.log("Recharge Responsee",res)
        let newVal = localStorage.getItem('balance') - rechargeAmount
        localStorage.setItem('balance',newVal)
        window.location.reload()
    }).catch((err) => {
        console.log("Error In Rechargeee")
    })
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
                  {'Recharge'}
                </button>
              )}
              {(
                <button
                  id={row?.original?.id}
                  className="min-w-fit rounded bg-blue-500 px-4 py-1.5 text-white hover:bg-green-600"
                  onClick={()=>handleOrder(row)}
                  >
                  {'Show Order'}
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
      {showPopup && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Recharge Wallet</h2>
                <input
                  type="number"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="border border-gray-400 rounded-lg px-3 py-2 mb-4"
                />
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleRecharge}
                  >
                    Recharge
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 ml-2 rounded-lg"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
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