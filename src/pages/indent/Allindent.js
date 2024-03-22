import React, { useState,useEffect } from 'react'
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar'
import { info } from './Indent'
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { useNavigate } from 'react-router-dom';

export let modifyFlag = 0;
export let modifyId;

const Allindent = () => {
  const navigate = useNavigate();
  const [dataFetch, setDataFetch] = useState(false)
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(BACKEND_URL + `/indent/get_indents?created_by=1`);
        console.log("RESPONSE", response, response.data.length);
        if (response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            info.push(response.data[i]);
          }
        }
        setDataFetch(true)
      } catch (err) {
        console.log("ERRRRRRRR", err);
      }
    };

    if (info.length == 0) {
      fetchData();
    }else{
      setDataFetch(true)
    }
  }, []);


  const handleModify = (id) => {
    console.log("Idddddddddddd",id)
      modifyId = id;
      modifyFlag = 1;
      axios.get(BACKEND_URL + `indent/get_indent_by_id?id=${id}`).then((res)=> {
        console.log("TTTTTTTTT",res)
      }).catch((err) => {
        console.log("ERRRRRRRRRRRRR",err)
      })
      // navigate('/indent');
  }

  // let timeLeft = Math.ceil((new Date() - new Date(info[0].pickupDate) )/(1000 * 60 * 60).toPrecision(1));
  // console.log("diff",timeLeft)
  // console.log("Information ",info)
  return (
    <PageWithSidebar>
    {console.log("kkkkkkkkkkkk",info)}
      {dataFetch && <div className="flex flex-wrap">
      {info.map((data,index) => (
      <div className="w-1/3 flex flex-row" key={index}>
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
            <li className="text-gray-600 font-bold text-sm">{data.source_id}</li>
            <li className="text-gray-600 font-bold text-sm">{data.destination_id}</li>
            </ul>
            </div>
            <span className="bg-purple-100 text-yellow-400 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">0 Stop(s)</span>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x-2">
          <div className="-ml-2 w-1/10">
            <p className='text-xs mb-1 ml-1 text-purple-400 font-semibold'>PRICE</p>
            <p className="text-sm ml-1 text-gray-500">{`₹${data.customer_price}`}</p>
          </div>
          <div className="-ml-14 w-3/10">
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
    </div>
    </div>
      ))}
      </div>}
    </PageWithSidebar>
  )
}

export default Allindent