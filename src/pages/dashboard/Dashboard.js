import axios from 'axios';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { BACKEND_URL } from '../../common/utils/env.config';
import { useState,useEffect } from 'react';
import { noShipment } from '../../common/images';
import { toast } from 'react-toastify';
import { Loader } from '../../common/components';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate()
  const company_id = localStorage.getItem('company_id')
  const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 10);
  const todayDate = new Date().toISOString().slice(0, 10);
  const [fromDate,setFromDate] = useState(oneMonthAgo.toString())
  const [toDate,setToDate] = useState(todayDate.toString())
  const [todayOrder,setTodayOrder] = useState(0)
  const [yesterdayOrder,setYesterdayOrder] = useState(0)
  const [shipData,setShipData] = useState([])
  const [result, setResult] = useState([]);
  const [flag,setFlag] = useState(false)
  const [loading,setLoading] = useState(false)
  const [shipmentDetail,setShipmentDetail] = useState({
    total_shipment:0,
    pickup_pending:0,
    in_transit:0,
    delivered:0,
    ndr_pending:0,
    rto:0
  })

  const handleData = () => {
    axios.post(BACKEND_URL + `/dashboard/order_analysis/?company_id=${company_id}&start_date=${fromDate}&end_date=${toDate}`)
    .then((res) => {
      console.log("DATAAAAAAAAA",res)
      setTodayOrder(res.data.todays_order_count)
      setYesterdayOrder(res.data.yesterdays_order_count)
      let total = 0
      const data = res.data.order_details
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          total += data[key];
      }
    }
      setShipmentDetail({
        total_shipment:total,
        pickup_pending:0,
        in_transit:res.data.order_details['5'],
        delivered:res.data.order_details['6'],
        ndr_pending:0,
        rto:res.data.order_details['7']
      })
      setShipData(res.data.shipment_details)
      setFlag(true)
      setLoading(false)
    }).catch((err) => {
      console.log("ERRRRRR",err)
    })
  }


  const StatusCounts = ( data ) =>  {
        // Calculate the total status count based on partner_name and status_id
        const calculateStatusCounts = () => {
            const counts = {};

            data.forEach(entry => {
                const partnerName = entry.partner_name.trim();
                const statusId = entry.status_id;
                const statusCount = entry.status_count;

                if (!counts[partnerName]) {
                  counts[partnerName] = {};  // Initialize as an empty object
              }

                if (counts[partnerName][statusId]) {
                    counts[partnerName][statusId] += statusCount;
                } else {
                    counts[partnerName][statusId] = statusCount;
                }
            });

            // Convert the counts object to an array of objects
            const resultArray = Object.entries(counts).map(([partnerName, statusCounts]) => {
              // Construct an object with the partner name and a list of status counts
              const statusArray = [];
              let total = 0;
              for (let statusId = 1; statusId <= 9; statusId++) {
                  statusArray.push(statusCounts[statusId] || 0);
              }

              for(let i=0;i<statusArray.length;i++){
                total += parseInt(statusArray[i]);
              }
              return {
                  partner_name: partnerName,
                  status_counts: statusArray,
                  total_counts:total
              };
         
            });
            // Update the state with the calculated results
            setResult(resultArray);
            console.log("RESUUUUUU",result)
        };

        // Call the function to calculate the status counts
        calculateStatusCounts();

  }

  const checkDate = (fromDate, toDate) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    return from <= to;
};

  const handleDateChange = () => {
    setLoading(true)
    if (checkDate(fromDate, toDate)) {
       handleData()
       StatusCounts(shipData)
    } else {
        toast.error('From date should be less than To date');
    }
};

  
  useEffect(() => {
    if(!flag){
      handleData()
    }
    StatusCounts(shipData)

  }, [fromDate,toDate,shipData])

  return (
    <PageWithSidebar>
      <div style={{ textAlign: 'center' }}>
        {loading && <Loader />}
        {/* <h1>Dashboard</h1> */}
        {localStorage.getItem('is_kyc') == 1 && <div className="w-[98%] p-2 mt-2 ml-4 mr-4 bg-red-600 border shadow-md rounded-lg hover:underline">
          <Link to={'/seller/kyc'} className='text-white'>Click here to complete your KYC and get non-disrupted shipping and COD remittances</Link>
        </div>}
        <div className="flex items-center justify-between p-4 md:w-full flex-col lg:flex-row">
            <div className="h-40 bg-gray-100 flex items-center border shadow-md rounded-md sm:w-full md:w-full mt-4 lg:w-[33%]">
              <div className="text-white border bg-white rounded-full p-2 mr-4 ml-20">
              <svg className="w-12 h-12 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"/>
              </svg>
              </div>
              <div>
                <p className="text-sm text-left font-medium text-gray-600">Today&apos;s Orders</p>
                <p className="text-lg text-left font-semibold">{todayOrder}</p>
                <p className="text-xs text-left font-semibold text-gray-500">{`Yesterday ${yesterdayOrder}`}</p>
              </div>
            </div>
          <div className="h-40 flex flex-col bg-gray-100 space-x-2 border shadow-md rounded-md ml-0 sm:w-full md:w-full mt-4 lg:w-[65%]">
            <div className='text-left mt-2 ml-2 font-semibold'>
              Shipments Details
            </div>
            <div className='flex flex-row justify-evenly'>
            <div className="w-[9%] h-[70%] mt-4 ml-4">
              <p className="bg-white rounded-lg shadow-md p-4 text-lg font-semibold">{shipmentDetail.total_shipment}</p>
              <p className="text-xs text-gray-500 mt-2 font-semibold">Total Shipments</p>
            </div>
            <div className="w-[9%] h-[70%] mt-4 ml-4">
              <p className="bg-white rounded-lg shadow-md p-4 text-lg font-semibold">{shipmentDetail.pickup_pending}</p>
              <p className="text-xs text-gray-500 mt-2 font-semibold">Pickup Pending</p>
            </div>
            <div className="w-[9%] h-[70%] mt-4 ml-4">
              <p className="bg-white rounded-lg shadow-md p-4 text-lg font-semibold">{shipmentDetail.in_transit}</p>
              <p className="text-xs text-gray-500 mt-2 font-semibold">In-Transit</p>
            </div>
            <div className="w-[9%] h-[70%] mt-4 ml-4">
              <p className="bg-white rounded-lg shadow-md p-4 text-lg font-semibold">{shipmentDetail.delivered}</p>
              <p className="text-xs text-gray-500 mt-2 font-semibold">Delivered</p>
            </div>
            <div className="w-[9%] h-[70%] mt-4 ml-4">
              <p className="bg-white rounded-lg shadow-md p-4 text-lg font-semibold">{shipmentDetail.ndr_pending}</p>
              <p className="text-xs text-gray-500 mt-2 font-semibold">NDR Pending</p>
            </div>
            <div className="w-[9%] h-[70%] mt-4 ml-4">
              <p className="bg-white rounded-lg shadow-md p-4 text-lg font-semibold">{shipmentDetail.rto}</p>
              <p className="text-xs text-gray-500 mt-2 font-semibold">RTO</p>
            </div>
            </div>
          
          </div>
        </div>
        <div className="w-[98%] ml-4 flex flex-col bg-gray-100 border shadow-md rounded-md">
      <div className="flex flex-row justify-between">
        <div className='font-bold text-left mt-2 ml-2'>
            Shipment Overview By Courier
        </div>
        <div className='flex flex-row ml-4 mt-4 mx-4'>
              <div className="group relative ml-2">
                  <input
                    type={'date'}
                    id="default-search"
                    className={`block w-[150px] rounded-[4px] border-opacity-90 border border-gray-300 bg-gray-50 px-5 py-1 text-[12px] text-[#757575] focus:border-red-500 focus:ring-red-500`}
                    required
                    onChange={(ev) => {
                        setFromDate(ev.target.value);
                    }}
                    value={fromDate}
                  />
              </div>
              <div className="group relative ml-2">
                  <input
                    type={'date'}
                    id="default-search"
                    className={`block w-[150px] rounded-[4px] border-opacity-90 border border-gray-300 bg-gray-50 px-5 py-1 text-[12px] text-[#757575] focus:border-red-500 focus:ring-red-500`}
                    required
                    onChange={(ev) => {
                        setToDate(ev.target.value);
                    }}
                    value={toDate}
                  />
              </div>
              <div className='ml-2'>
                  <button
                      className={`border-1 h-[33px] w-[100px] rounded-[4px] border-[#B07828] bg-[#B07828] text-[12px] leading-[30px] text-white hover:text-white}'}}`}
                      onClick={() => {handleDateChange()}}>
                      Apply
                  </button>
              </div>
          </div>
      </div>
         
    <div className="w-full mt-2 overflow-x-auto flex flex-col justify-evenly">
      <div className="w-full flex flex-row justify-between">
        <div className="px-4 py-2 text-left font-semibold text-sm">Courier Name</div>
        <div className="px-4 py-2 text-left font-semibold text-sm">Pickup Unscheduled</div>
        <div className="px-4 py-2 text-left font-semibold text-sm">Pickup Scheduled</div>
        <div className="px-4 py-2 text-left font-semibold text-sm">In-Transit</div>
        <div className="px-4 py-2 text-left font-semibold text-sm">Delivered</div>
        <div className="px-4 py-2 text-left font-semibold text-sm">NDR Raised</div>
        <div className="px-4 py-2 text-left font-semibold text-sm">NDR Delivered</div>
        <div className="px-4 py-2 text-left font-semibold text-sm">NDR Pending</div>
        <div className="px-4 py-2 text-left font-semibold text-sm">RTO</div>
        <div className="px-4 py-2 text-left font-semibold text-sm">Lost/Damaged</div>
        <div className="px-4 py-2 text-left font-semibold text-sm">Total Shipment</div>
      </div>
      <div className="mt-4 ml-4 mx-4 border-b border-gray-300"></div>
        <div className="w-full flex flex-col justify-center items-center">
        {shipData.length === 0 ? (
                            <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col'>
                                <img src={noShipment} alt="" width={'100px'} />
                                <div className='text-[1.3rem] mt-10 text-[#b54040] font-semibold'>Courier&apos;s data not found this filter.</div>
                            </div>
                        ) : (
                            result.map((item, index) => (
                              <div className=' flex flex-row w-full border border-collapse bg-[#FAFAFA]' key={index}>
                                <div className="px-4 py-2 w-full text-left">{item.partner_name}</div>
                                <div className="px-4 py-2 w-full text-right">{item.status_counts[0]}</div>
                                <div className="px-4 py-2 w-full text-right">{item.status_counts[1]}</div>
                                <div className="px-4 py-2 w-full text-right">{item.status_counts[4]}</div>
                                <div className="px-4 py-2 w-full text-right">{item.status_counts[5]}</div>
                                <div className="px-4 py-2 w-full text-right">0</div>
                                <div className="px-4 py-2 w-full text-right">0</div>
                                <div className="px-4 py-2 w-full text-right">0</div>
                                <div className="px-4 py-2 ml-4 w-full text-center">{item.status_counts[6]}</div>
                                <div className="px-4 py-2 w-full text-center">0</div>
                                <div className="px-4 py-2 w-full text-right">{item.total_counts}</div>
                              </div>
                            ))
                        )}
        </div>
</div>
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Dashboard;
