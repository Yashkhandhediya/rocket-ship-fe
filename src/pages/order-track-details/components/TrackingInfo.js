import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { BACKEND_URL } from '../../../common/utils/env.config';
import { toast } from 'react-toastify';
import { Loader } from '../../../common/components';
import moment from 'moment';
import { ACCESS_TOKEN } from '../../../common/utils/config';
import { useNavigate } from 'react-router-dom';

function TrackingInfo() {
  const [trackOrderData, setTrackOrderData] = useState([]);
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  const headers = {             
    'Content-Type': 'application/json',
    'Authorization': ACCESS_TOKEN};
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);
  const flag = searchParam.get('flag');
  const status_name = searchParam.get('status')

  const fetchOrderDetails = async () => {
    setLoading(true);
    const apiURL = flag == 1 ? `/return/${orderId}/track` : `/order/${orderId}/track`;
    try {
      const response = await axios.get(`${BACKEND_URL}${apiURL}`,{headers:headers});
      if (response.status === 200) {
        //   const data = resp?.data?.ShipmentData?.[0]?.Shipment;
        setTrackOrderData(response.data);
      } else {
        toast('There is some error while fetching orders.', { type: 'error' });
      }
    } catch (err) {
      toast('There is some error while fetching orders.', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(status_name != 'new'){
      fetchOrderDetails();
    }
  }, []);

  const renderTimelinePoint = (isActive) => {
    return isActive ? (
      <span className="absolute left-[-2.6rem] top-[35%] z-[2] grid h-4 w-4 place-items-center rounded-full border border-[#745be7] bg-white">
        <span className="inline-block h-2 w-2 rounded-full bg-[#745be7]"></span>
      </span>
    ) : (
      <span className="absolute left-[-2.6rem] top-[35%] z-[2] grid h-4 w-4 place-items-center rounded-full border border-[#b1b1b1] bg-white">
        <span className="inline-block h-2 w-2 rounded-full bg-[#b1b1b1]"></span>
      </span>
    );
  };

  return (
    <div className="mb-3 ml-11 mr-4 mt-[1.125rem]">
      {loading && <Loader />}
      <div className="relative border-l-0 after:absolute after:left-[-40px] after:top-8 after:ml-1.5  after:h-[calc(100%-67px)] after:border-l-2 after:border-l-[#b1b1b1]">
        {trackOrderData.details &&
          trackOrderData.details.map((data, i) => {
            return (
              <div key={i} className="relative pb-2.5">
                {renderTimelinePoint(i == 0)}
                <div className="mb-1.5 rounded-[4px] bg-[#f4f7f9] p-3 text-[#191919]">
                  <div className="text-xs font-medium">{data?.status}</div>
                  <p className="mb-3 text-[10px] text-gray-400">
                    {moment(data?.timestamp).format('MMM DD YYYY , hh:mm')}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TrackingInfo;
