import React, { useState,useEffect } from 'react'
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar'
import { info } from './Indent'
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { useNavigate, useParams } from 'react-router-dom';
import { Field } from '../../common/components';
import { Tabs } from '../../common/components/tabs';
import { trip_status_filter } from '../orders/duck';
import { toast } from 'react-toastify';
import  Loader  from '../../common/loader/Loader';
import { ACCESS_TOKEN } from '../../common/utils/config';

export let modifyFlag = 0;
export let modifyId;


const is_admin = localStorage.getItem('is_admin')

const Allindent = () => {
  const temp = localStorage.getItem('user_id');
  const { url_user_id } = useParams();
  console.log("url_user", url_user_id)
  let user_name = null;
  if (parseInt(url_user_id) == 1){
    user_name = "Yash Khandhediya"
  }
  else{
    user_name = "Shivam Gajjar"
  }
  const navigate = useNavigate();
  const [dataFetch, setDataFetch] = useState(false)
  const [filteredInfo, setFilteredInfo] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [price, setPrice] = useState({})
  const [rcslPrice, setRcslPrice] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [popupCardId, setPopupCardId] = useState(null);
  const [showBtn,setShowBtn] = useState(true)
  console.log("IDFFFFFF",selectedTab)

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 

    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

    return `${formattedTime} | ${formattedDate}`;
}


    const fetchData = async () => {
      try {
        const response = await axios.get(BACKEND_URL + `/indent/get_indents?created_by=${url_user_id}`);
        console.log("RESPONSE", response, response.data.length);
        if (response.data.length > 0 && info.length == 0) {
          for (let i = 0; i < response.data.length; i++) {
            info.push(response.data[i]);
          }
        }
        setFilteredInfo(info)
        setDataFetch(true)
      } catch (err) {
        console.log("ERRRRRRRR", err);
      }
    };


  let count = 1
  useEffect(() => {
    if(localStorage.getItem('is_kyc') == 1){
      if(count == 1){
        toast("Complete Your KYC First",{type:'error'})
        count++;
      }
      navigate('/seller/home')
      return
    }else if(localStorage.getItem('is_kyc') == 2){
      if(count == 1){
        toast("KYC Verification Is Pending.",{type:'error'})
        count++
      }
      navigate('/seller/home')
      return
    }
 
      fetchData();
    
  }, [url_user_id]);
  

  const handleModify = (id) => {
    console.log("Idddddddddddd",id)
      modifyId = id;
      modifyFlag = 1;
      axios.get(BACKEND_URL + `/indent/get_indents_by_id?id=${id}`).then((res)=> {
        console.log("TTTTTTTTT",res)
        let data = res.data
        navigate('/indent',{state:{data:data}});
      }).catch((err) => {
        console.log("ERRRRRRRRRRRRR",err)
      })
  }

  const handlePriceChange = (id,value) => {
    setPrice({ ...price, [id]: value }); // Update the price for the corresponding card
  };

  const handleRcslPriceChange = (id,value) => {
    setRcslPrice({ ...rcslPrice, [id]: value }); 
  };

  const handlePrice = (id) => {
    setLoading(true)
    const headers={'Content-Type': 'application/json','Authorization':ACCESS_TOKEN};
    console.log("Price",price)
    axios.post(BACKEND_URL + '/indent/admin_price',
    {
      id:id,
      price:parseInt(price[id]),
    },{headers}).then((res)=>{
      console.log("RESPONSEEEEEE11",res);
      toast('Price Successfully Submitted',{type:'success'})
      setLoading(false)
      window.location.reload();
    }).catch((err) => {
      console.log("Errorororor",err);
    })
  }

  const handleRcslPrice = (id) => {
    setLoading(true)
    const headers={'Content-Type': 'application/json','Authorization':ACCESS_TOKEN};
    console.log("Price",rcslPrice)
    axios.put(BACKEND_URL + '/indent/modify_indent',
    {
      id:id,
      counter_price:parseInt(rcslPrice[id]),
    },{headers}).then((res)=>{
      console.log("RESPONSEEEEEE11",res);
      toast('RCSL Price Successfully Submitted',{type:'success'})
      setLoading(false)
      // window.location.reload();
    }).catch((err) => {
      console.log("Errorororor",err);
    })
  }


  const handleConfirmation = (id,status) => {
    setLoading(true)
    const headers={'Content-Type': 'application/json','Authorization':ACCESS_TOKEN};
    axios.post(BACKEND_URL + '/indent/booking_confirmation',
    {
      id:id,
      status_code:status
    },
    {headers}).then((res)=>{
      console.log("111111111",res);
      if(res?.data?.status_code == 401){
        toast("insufficient balance",{type:"error"})
        setLoading(false)
        return
      }
      status == 2 ? toast('Price Successfully Accepted',{type:'success'}) : toast('Price Successfully Rejected',{type:'error'})
      setLoading(false)
      setShowBtn(false)
      window.location.reload();
    }).catch((err) => {
      console.log("222222222",err);
      setLoading(false)
      setShowBtn(true)
    })
  }

  const handleTabChange = (tabId) => {
    console.log("TAB SELECT",selectedTab)
    setSelectedTab(tabId);
  };

  useEffect(() => {
    let filteredData = info;
    if (selectedTab == 0) {
      setFilteredInfo(filteredData);
    } else {
      filteredData = filteredData.filter(data => data.trip_status == (selectedTab-1));
      setFilteredInfo(filteredData);
      console.log("INFOOOOOOOOO",filteredInfo)
    }
  }, [selectedTab]);

 

  const handleRejectClick = (id) => {
    setShowPopup(true);
    setPopupCardId(id);
  };

  const handleReasonChange = (e) => {
    setSelectedReason(e.target.value);
  };

  const handleSubmitReason = (id, status) => {
    if (selectedReason) {
      handleConfirmation(id, status);
      setShowPopup(false);
      setPopupCardId(null);
      setSelectedReason('');
    } else {
      alert("Please select a reason.");
    }
  };

  // let timeLeft = Math.ceil((new Date() - new Date(info[0].pickupDate) )/(1000 * 60 * 60).toPrecision(1));
  // console.log("diff",timeLeft)
  // console.log("Information ",info)

  return (
    <PageWithSidebar>
    {loading && <Loader />}
     <div>
          <Tabs tabs={trip_status_filter} tabClassNames={'mr-6 px-3 py-3.5 text-[#7f7f7f] font-medium'} onTabChange={handleTabChange} />
    </div>
    {console.log("kkkkkkkkkkkk",info)}
      {dataFetch && <div className="flex flex-wrap">
      {filteredInfo.map((data,index) => (
      <div className="lg:w-1/3 flex flex-row md:w-1/2 sm:w-full" key={index}>
      <div className="mt-5 mx-3 w-full p-4 bg-white rounded-lg shadow"> 
        <div className="mb-2 w-full flex flex-row items-end justify-between border-b border-gray-200 pb-2">
          <div className="flex flex-row w-full">
          <div className="text-red-500 text-sm font-semibold w-[60%]">{data.id} | {data?.coordinator_name || "Niket Dave"} | {data?.coordinator_mobile || "9265435422"}</div>
          <button className="" onClick={() => {handleModify(data.id)}}>
            <svg className="h-5 w-5 text-blue-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
          </div>
          <div className='text-red-500 w-[40%] text-xs'>{formatTimestamp(data?.created_date)}
          {/* {Math.ceil((new Date(data.pickupDate) - new Date() )/(1000 * 60 * 60).toPrecision(1))}h */}
          </div>
        </div>
        <div className="-ml-4 -mr-4 border-b border-gray-200 pb-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-row">
            <input type="checkbox" className="form-checkbox mt-3 ml-3 text-green-500 mr-2" />
            <ul className="list-disc ml-3 pl-4">  
            <li className="text-gray-600 font-bold text-sm">{data?.from_city || 'Bhavnager'}</li>
            <li className="text-gray-600 font-bold text-sm">{data?.to_city || 'Mumbai'}</li>
            </ul>
            </div>
            <span className="bg-purple-100 text-yellow-400 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">0 Stop(s)</span>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x-2">
          <div className="-ml-2 w-2/10 md:w-24">
            <p className='lg:text-xs mb-1 ml-1 w-full text-purple-400 font-semibold md:w-1/3 text-xs'>TARGET PRICE</p>
            <p className="text-sm ml-1 text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">{`₹${data.customer_price}`}</p>
          </div>
          <div className="-ml-14 w-2/10">
            <p className='text-xs mb-1 ml-1 text-purple-400 font-semibold'>TRUCK TYPE & TON</p>
            <p className="text-sm ml-1 text-gray-500">{data.truck_type_id}</p>
          </div>
          <div className="w-6/10">
              <p className=' text-xs mb-1 ml-1 w-full text-purple-400 font-semibold'>MATERIAL TYPE</p>
              <p className="text-sm ml-1 text-gray-500">{data.material_type_id}</p>
          </div>
        </div>
    <div className="-ml-4 -mr-4 flex justify-between items-end border-t border-gray-200">
      <div className="text-sm text-gray-500 mr-auto mt-3">  
      <span className="ml-2 bg-purple-100 text-purple-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
      {"Weight"} : {data?.weight} {data?.weight_type}
      </span>
      </div>
      <div className="flex flex-col">
      <div className="mr-2 text-sm font-medium self-end">
        {localStorage.getItem('user_name')}
      </div>
      <div className="mr-2 text-xs font-medium self-end">
        {`Mobile No : ${localStorage.getItem('contact_no') || '9876543212'}`}
      </div>
      </div>
    </div>
    <div className='-ml-2 mt-6 flex flex-row justify-between items-end'>
    {
      data.trip_status == 0 ? (
        <span className=" bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Booking Price Pending</span>
      ) : data.trip_status == 1 ? (
        <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">Booking Pending</span>
      ) : data.trip_status == 2 ? (
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Booking Confirmed</span>
      ):(
        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Booking Rejected</span>
      )
    }
    <div className="flex flex-row items-end w-[50%]">
      <label className='text-sm font-bold w-[35%] px-0.5 py-0.5 ml-16 md:text-xs'>Total Km :</label>
      <input
        type="text"
        value={data?.kilometer || "500"}
        disabled
        className="block w-[35%] text-sm text-center font-semibold rounded-sm px-0 py-0 bg-gray-100 border-gray-300 shadow-sm cursor-not-allowed"
      />
    </div>
    </div>
    <div className="mt-6 flex flex-row">
      <label className='text-xs font-bold mt-0.5'>Remarks :</label>
      <input
        type="text"
        value={data?.remarks || "Important Remarks About Indent"}
        disabled
        className="block w-[80%] text-xs ml-4 rounded-sm px-2 py-0.5 bg-gray-100 border-gray-300 shadow-sm cursor-not-allowed"
      />
    </div>
    <div className="flex flex-row justify-between items-center">
    {parseInt(is_admin) ? ( // render based on is_admin value
                  <div className="flex flex-row justify-between items-end">
                    <div className='mt-4'>
                      <label className='text-xs text-purple-400 font-semibold'>ACTUAL PRICE</label>
                      {(data.actual_price == null) ? (<input type="text" value={price[data.id] || ''} onChange={(e) => handlePriceChange(data.id,e.target.value)} className="border w-24 h-8 mt-2 ml-4 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-100" />) :
                      (<input type="text" value={`₹${data.actual_price ?? 0}`} disabled onChange={(e) => handlePriceChange(data.id,e.target.value)} className="border w-24 h-8 mt-2 ml-4 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-100" />)}
                    </div>
                    <div className='mt-4'>
                    {(data.actual_price == null) && <button className="bg-green-500 hover:bg-green-600 text-white font-semibold ml-3 py-1 px-3 rounded-lg"
                      onClick={() => {handlePrice(data.id)}}>Save</button>}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row justify-between items-end">
                    <div className='mt-4'>
                      <label className='text-xs text-purple-400 font-semibold'>{data.actual_price == null ? 'ACTUAL PRICE PENDING' : 'ACTUAL PRICE'}</label>
                      {data.actual_price != null && <input type="text" className="border w-36 h-8 mt-2 ml-2 border-gray-300 rounded-md focus:outline-none bg-gray-100 focus:ring focus:border-blue-100 " disabled value={`₹${data.actual_price ?? 0}`} />}
                    </div>
                  </div>
                )}
                {showBtn && <div className='mt-6 flex flex-row'>
                      {(data.trip_status !== 2 && data.trip_status !== 3) && <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs  font-semibold py-2 px-3 rounded-lg mr-2" onClick={() => {handleConfirmation(data.id,2)}}>Confirm</button>}
                      {(data.trip_status !== 2 && data.trip_status !== 3) && <button className="bg-red-500 hover:bg-red-600 text-white  text-xs font-semibold py-2 px-3 rounded-lg" onClick={() => {handleConfirmation(data.id,3)}}>Reject</button>}
                </div>}
                </div>
    {data?.actual_price != null && <div className="flex flex-row justify-between items-center mt-2 p-1 ">
   
            <div className='mt-2'>
                      <label className='text-xs text-purple-400 font-semibold'>RCSL PRICE</label>
                      {(data.counter_price == null && localStorage.getItem('is_company') == 0) ? (<input type="text" value={rcslPrice[data.id] || ''} onChange={(e) => handleRcslPriceChange(data.id,e.target.value)} className="border w-36 h-8 mt-2 ml-4 border-gray-300 rounded-md focus:outline-none focus:border-blue-100" />) :
                      (<input type="text" value={`₹${data.counter_price ?? 0}`} disabled onChange={(e) => handleRcslPriceChange(data.id,e.target.value)} className="border w-36 h-8 mt-2 ml-4 bg-gray-100 cursor-not-allowed border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-100" />)}
            </div>

            {
            localStorage.getItem('is_company') == 0 ? (
            showBtn && <div className='mt-2'>
                    {(data.counter_price == null && localStorage.getItem('is_company') == 0 ) && <button className="bg-green-500 mt-2 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg"
                      onClick={() => {handleRcslPrice(data.id)}}>Counter Offer</button>}
            </div>) : (
              <div className='mt-4 flex flex-row'>
      {(data.trip_status !== 2 && data.trip_status !== 3 && data.trip_status !== 0 && data.counter_price > 0) && (
        <>
          {showBtn && <button
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-1 px-2 rounded-lg mr-2"
            onClick={() => { handleConfirmation(data.id, 2); }}
          >
            Confirm
          </button>}
          {showBtn && <button
            className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded-lg"
            onClick={() => handleRejectClick(data.id)}
          >
            Reject
          </button>}
        </>
      )}

    
    </div>)
            }
    </div>}

    {showPopup && popupCardId == data.id && (
        <div className="mt-2">
          <div className="">
            <h3 className='text-sm text-purple-400 mb-2 font-semibold'>Select a reason for Rejection:</h3>
            <select className='border rounded-md w-[60%]' value={selectedReason} onChange={handleReasonChange}>
              <option value="" disabled>Select a reason</option>
              <option value="Price is too High">Price is too High</option>
              <option value="Indent Closed">Indent Closed</option>
            </select>
            <button className='ml-2 mr-2 border rounded-md p-2 text-sm text-white bg-blue-500' onClick={() => handleSubmitReason(data.id,3)}>Submit</button>
            <button className='ml-2 mr-2 border rounded-md p-2 text-sm text-white bg-red-500' onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>

    </div>
    ))}
      </div>}
    </PageWithSidebar>
  )
}

export default Allindent