import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { FreezeModal } from '../weightFreezeModal';
import { useSearchParams } from 'react-router-dom';
import { DiscrepancyModal } from '../weightDiscrepancyModal';
import { BACKEND_URL } from '../../../../common/utils/env.config';
// import { noData } from '../../../../common/images';

const DiscrepancyTable = ({ data, setLoading }) => {
  const [show, setShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();  // eslint-disable-line
  const freezeStatus = searchParams.get('freeze_status');

  const getRemainingTime = (date) => {
    const statusDate = new Date(date);
    const today = new Date();
    const weekLater = new Date(statusDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    if (today.getTime() > weekLater.getTime()) return 2;
    const timeDifference = weekLater.getTime() - today.getTime();
    // Calculate the remaining days, hours, minutes, and seconds
    const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);// eslint-disable-line
    return remainingDays;
  }

  const updateStatus = (id) => {
    axios.put(`${BACKEND_URL}/weight_discrepancy/update?id=${id}`, { "status_name": "Discrepancy Accepted" }, { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        toast('Discrepancy Accepted Successfully', { type: 'success' });
        window.location.reload();
        console.log(res); // eslint-disable-line
      })
      .catch(err => {
        toast('Something went wrong', { type: 'error' });
        console.log(err); // eslint-disable-line
      })
  }

  useEffect(() => {
  }, []);

  return (
    <div className="mt-4 flex flex-col border border-b-0 border-black text-[12px] font-bold text-[#484848]">
      {/* table headings */}
      <div className="flex items-center border border-b-[#E5E7EB] text-left">
        <div className="w-[4%] border-r-2 py-2.5 text-center">
          <input type="checkbox" />
        </div>
        <div className="w-[10.66%] border-r-2 py-2.5 pl-2">Status Updated On</div>
        <div className="w-[10.66%] border-r-2 py-2.5 pl-2">Product Details</div>
        <div className="w-[10.66%] border-r-2 py-2.5 pl-2">Shipping Details</div>
        <div className="w-[10.66%] border-r-2 py-2.5 pl-2">Applied Weight</div>
        <div className="w-[10.66%] border-r-2 py-2.5 pl-2">Charged Weight</div>
        <div className="w-[10.66%] border-r-2 py-2.5 pl-2">Excess Weight</div>
        <div className="w-[10.66%] border-r-2 py-2.5 pl-2">Courier Images</div>
        <div className="w-[10.66%] border-r-2 py-2.5 pl-2">Status</div>
        <div className="w-[10.66%] border-r-2 py-2.5 pl-2">Actions</div>
      </div>
      {/* table data */}
      <div className="flex flex-col items-center justify-center">
        {console.log(data)} {/* eslint-disable-line */}
        {Array.isArray(data) && data.length > 0 ? data.map((item, key) => {
          return (
            <div
              className="flex h-32 w-full flex-row items-center border border-b-[#E5E7EB] text-left"
              key={key}
            >
              <div className="flex h-full w-[4%] items-center justify-center border-r-2 pl-2">
                <input type="checkbox" />
              </div>
              <div className="flex h-full w-[10.66%] items-center border-r-2 pl-2 font-normal">{item.status_updated_on}</div>
              <div className="flex flex-col h-full w-[10.66%] justify-center border-r-2 pl-2 font-normal">
                <div><strong>Product Name:</strong> {item.product_info[0].name}</div>
                <div><strong>PID:</strong> {item.product_info[0].id}</div>
                <div><strong>SKU:</strong> {item.product_info[0].sku}</div>
                <div><strong>QTY:</strong> {item.product_info[0].quantity}</div>
              </div>
              <div className="flex h-full w-[10.66%] flex-col justify-center gap-4 border-r-2 pl-2 text-left">
                <div>AWB: {item.waybill_no}</div>
              </div>
              <div className="h-full flex justify-center flex-col w-[10.66%] border-r-2 pl-2 font-normal">
                <div><strong>{`${item.applicable_weight} Kg`}</strong></div>
                <div>Dead weight: {item.dead_weight} Kg</div>
                <div>Volumetric Weight: {item.volumatric_weight}({item.length}x{item.width}x{item.height} cm)</div>
              </div>
              <div className="h-full flex justify-center flex-col w-[10.66%] border-r-2 pl-2 font-normal">
                <div><strong>{`${item.charged_weight} Kg`}</strong></div>
                <div>Dead weight: {item.dead_weight} Kg</div>
                <div>Volumetric Weight: {item.volumatric_weight}({item.length}x{item.width}x{item.height} cm)</div>
              </div>
              <div className="h-full flex justify-center flex-col w-[10.66%] border-r-2 pl-2 font-normal">
                <div><strong>Excess Weight: </strong><span className='text-red-800'>{item.excess_weight} kg</span></div>
                <div><strong>Excess Charges: </strong><span className='text-red-800'>Rs{item.excess_rate}</span></div>
              </div>
              <div className="h-full flex justify-center flex-col w-[10.66%] items-center border-r-2 pl-2 font-normal">
              </div>
              <div className="px-2 flex item-center h-full w-[10.66%] items-center border-r-2 pl-2 font-normal">
                <div className='rounded basis-full font-semibold bg-red-100 text-red-700 text-center'>{item.discrepancy_status_name}</div>
              </div>
              <div className="p-1 flex flex-col gap-2 h-full w-[10.66%] items-center justify-center border-r-2 font-normal">
                {item.discrepancy_status_name == 'New Discrepancy' && getRemainingTime(item?.status_updated_on) > 0 &&
                // {item.discrepancy_status_name == 'New Discrepancy'  &&
                  <>
                    <button className='border-2 p-1 border-red-600 rounded font-semibold text-red-600'
                      onClick={() => {
                        updateStatus(item.discrepancy_id);
                      }}>Accept Discrepancy</button>
                    <button
                      className='border-2 p-1 border-red-600 rounded font-semibold text-red-600'
                      onClick={() => {
                        setSelectedIndex(key);
                        setShow(true);
                      }}
                    >Dispute Discrepancy</button>
                    <div className='text-center text-red-600 font-bold'>
                      {getRemainingTime(item?.status_updated_on)} working days remaining
                    </div>
                  </>}
                {item.discrepancy_status_name == 'New Discrepancy' && getRemainingTime(item?.status_updated_on) == 0 &&
                  <>
                    <button
                      className='border-2 p-1 border-red-600 rounded font-semibold text-red-600 opacity-45 cursor-not-allowed'
                      disabled
                    >Discrepancy Accepted Automatically</button>
                    <div className='text-center text-red-600 font-bold'>
                      {getRemainingTime(item?.status_updated_on)} working days remaining
                    </div>
                  </>}
                {item.discrepancy_status_name == 'Dispute Raised' &&
                  <>
                    <button className='border-2 p-1 border-red-600 rounded font-semibold text-red-600 opacity-45' disabled>Dispute Discrepancy</button>
                  </>}
              </div>
              {/* <div className="flex h-full w-2/12 items-center border-r-2">
                <div className="flex flex-col gap-2">
                  <div>Dimension :</div>
                  <div className="font-normal">
                    {item.package_details?.length.toFixed(3)} x {item.package_details?.width.toFixed(3)} x{' '}
                    {item.package_details?.height.toFixed(3)}
                  </div>
                  <div>Dead Weight :</div>
                  <div className="font-normal">{item.package_details?.dead_weight}</div>
                </div>
              </div> */}
              {/* <div className="flex h-full w-2/12 items-center border-r-2">
                {freezeStatus == '0' ? '' : (
                  <div className='flex flex-row w-full justify-center'>
                    <img src={`http://43.252.197.60:8050/image/get_image?file_path=${item.images[0]}`} alt="" className='w-[45%] mx-2 border border-black border-dashed' />
                    <img src={`http://43.252.197.60:8050/image/get_image?file_path=${item.images[1]}`} alt="" className='w-[45%] mx-2 border border-black border-dashed' />
                  </div>
                )}
              </div> */}
              {/* <div className="flex h-full w-1/12 items-center border-r-2">{item?.status_name}</div>
              <div className="flex h-full w-[10%] items-center border-r-2">
                <button className="rounded-md border border-red-500 bg-white px-4 py-1 text-red-500"
                  onClick={() => {
                    setSelectedIndex(key);
                    setShow(true);
                  }}
                >
                  {freezeStatus == 0 ? 'Freeze Product' : 'Edit Details'}
                </button>
              </div> */}
            </div>
          );
        }) : (
          <div className='flex flex-col items-center py-24 px-10'>
            <div>
              <img src='https://app.shiprocket.in/app/img/no_data/weight_discrepancy_0.png' />
            </div>
            <div className='text-3xl text-violet-900 font-semibold'>Great! You have 0 weight discrepancies</div>
            <div>Hey user, Read more about weight discrepancy and how to avoid it by clicking the button below</div>
            <button className='mt-5 px-12 py-2 text-slate-300 bg-violet-900 rounded-3xl'>Learn More</button>
          </div>
        )}
      </div>
      {/* Modal for Weight Discrepancy */}
      {show && selectedIndex !== null && <DiscrepancyModal show={show} setShow={setShow} data={data[selectedIndex]} setLoading={setLoading} type={freezeStatus == 0 ? 'Freeze' : 'Edit'} />}
    </div >
  );
};

export default DiscrepancyTable;