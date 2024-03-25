import React, { useState,useEffect } from 'react'
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar'
import { info } from './Indent'
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { useNavigate } from 'react-router-dom';
import { Field } from '../../common/components';
import { Tabs } from '../../common/components/tabs';
import { trip_status_filter } from '../orders/duck';

export let modifyFlag = 0;
export let modifyId;


const is_Admin = localStorage.getItem('is_Admin')

const Allindent = () => {
  const temp = localStorage.getItem('user_id');
  const navigate = useNavigate();
  const [dataFetch, setDataFetch] = useState(false)
  const [filteredInfo, setFilteredInfo] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [price, setPrice] = useState({})
  console.log("IDFFFFFF",selectedTab)


    const fetchData = async () => {
      try {
        const response = await axios.get(BACKEND_URL + `/indent/get_indents?created_by=${temp}`);
        console.log("RESPONSE", response, response.data.length);
        if (response.data.length > 0 && info.length == 0) {
          debugger
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


  useEffect(() => {
    if (info.length === 0 && !dataFetch) {
      debugger;
      fetchData();
    }
  }, []);
  

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


  const handlePrice = (id) => {
    const headers={'Content-Type': 'application/json'};
    console.log("Price",price)
    axios.post(BACKEND_URL + '/indent/admin_price',
    {
      id:id,
      price:parseInt(price[id]),
    },{headers}).then((res)=>{
      console.log("RESPONSEEEEEE11",res);
    }).catch((err) => {
      console.log("Errorororor",err);
    })
  }


  const handleConfirmation = (id,status) => {
    const headers={'Content-Type': 'application/json'};
    axios.post(BACKEND_URL + '/indent/booking_confirmation',
    {
      id:id,
      status_code:status
    },
    {headers}).then((res)=>{
      console.log("111111111",res);
    }).catch((err) => {
      console.log("222222222",err);
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

  // let timeLeft = Math.ceil((new Date() - new Date(info[0].pickupDate) )/(1000 * 60 * 60).toPrecision(1));
  // console.log("diff",timeLeft)
  // console.log("Information ",info)
  return (
    <PageWithSidebar>
     <div>
          <Tabs tabs={trip_status_filter} tabClassNames={'mr-6 px-3 py-3.5 text-[#7f7f7f] font-medium'} onTabChange={handleTabChange} />
    </div>
    {console.log("kkkkkkkkkkkk",info)}
      {dataFetch && <div className="flex flex-wrap">
      {filteredInfo.map((data,index) => (
      <div className="lg:w-1/3 flex flex-row md:w-1/2 sm:w-full" key={index}>
      <div className="mt-5 mx-5 w-full p-4 bg-white rounded-lg shadow"> 
        <div className="mb-2 flex flex-row items-end justify-between border-b border-gray-200 pb-2">
          <div className="text-red-500 font-semibold">{data.id}</div>
          <div className='text-red-500 text-xs'>{data.pickupDate} | Time Left : 
          {Math.ceil((new Date() - new Date(data.pickupDate) )/(1000 * 60 * 60).toPrecision(1))}h
          </div>
        </div>
        <div className="-ml-4 -mr-4 border-b border-gray-200 pb-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-row">
            <input type="checkbox" className="form-checkbox mt-3 ml-3 text-green-500 mr-2" />
            <ul className="list-disc ml-3 pl-4">  
            <li className="text-gray-600 font-bold text-sm">{data.source_id.toUpperCase()}</li>
            <li className="text-gray-600 font-bold text-sm">{data.destination_id.toUpperCase()}</li>
            </ul>
            </div>
            <span className="bg-purple-100 text-yellow-400 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">0 Stop(s)</span>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x-2">
          <div className="-ml-2 w-2/10 md:w-24">
            <p className='lg:text-xs mb-1 ml-1 w-full text-purple-400 font-semibold md:w-1/3'>TARGET PRICE</p>
            <p className="text-sm ml-1 text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">{`₹${data.customer_price}`}</p>
          </div>
          <div className="-ml-14 w-2/10">
            <p className='text-xs mb-1 ml-1 text-purple-400 font-semibold'>TRUCK TYPE & TON</p>
            <p className="text-sm ml-1 text-gray-500">{data.truck_type_id}</p>
          </div>
          <div className="w-6/10">
              <p className=' text-xs mb-1 ml-1 w-full text-purple-400 font-semibold'>MATERIAL TYPE</p>
              <p className="text-sm ml-1 text-gray-500">{data.material_type_id}</p>
          <button className="ml-28" onClick={() => {handleModify(data.id)}}>
            <svg className="h-6 w-6 text-blue-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
          </div>
        </div>
    <div className="-ml-4 -mr-4 flex justify-between items-end border-t border-gray-200">
      <div className="text-sm text-gray-500 mr-auto mt-3">  
      <span className="ml-2 bg-purple-100 text-purple-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
      12 truck(s) matched
      </span>
      </div>
      <div className="mr-2 text-sm font-medium self-end">
        Sujitkumar Tiwari
      </div>
    </div>
    <div className='-ml-2 mt-6'>
    {
      data.trip_status == 0 ? (
        <span className=" bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Booking_Price_Pending</span>
      ) : data.trip_status == 1 ? (
        <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">Booking_Pending</span>
      ) : data.trip_status == 2 ? (
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Booking_confirmed</span>
      ):(
        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Booking_Rejected</span>
      )
    }
    </div>
    {is_Admin ? ( // render based on is_admin value
                  <div className="flex flex-row justify-between items-end">
                    <div className='mt-4'>
                      <label className='text-xs text-purple-400 font-semibold'>ACTUAL PRICE</label>
                      <input type="text" value={price[data.id] || ''} onChange={(e) => handlePriceChange(data.id,e.target.value)} className="border w-36 h-10 mt-2 ml-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-100" />
                    </div>
                    <div className='mt-4'>
                      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
                      onClick={() => {handlePrice(data.id)}}>Save</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row justify-between items-end">
                    <div className='mt-4'>
                      <label className='text-xs text-purple-400 font-semibold'>ACTUAL PRICE</label>
                      <input type="text" className="border w-36 h-10 mt-2 ml-2 border-gray-300 rounded-md focus:outline-none bg-gray-100 focus:ring focus:border-blue-100 " disabled value={`₹${data.actual_price ?? 0}`} />
                    </div>
                    <div className='mt-4'>
                      {(data.trip_status !== 2 && data.trip_status !== 3 && data.trip_status != 0) && <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2" onClick={() => {handleConfirmation(data.id,2)}}>Confirm</button>}
                      {(data.trip_status !== 2 && data.trip_status !== 3 && data.trip_status != 0) && <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg" onClick={() => {handleConfirmation(data.id,3)}}>Reject</button>}
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