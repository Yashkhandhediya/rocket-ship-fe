import { useState, useEffect } from 'react';
// import { FreezeModal } from '../weightFreezeModal';
import { useSearchParams } from 'react-router-dom';
// import { noData } from '../../../../common/images';

const DiscrepancyTable = ({ data, setLoading }) => {
  const [show, setShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();  // eslint-disable-line
  const freezeStatus = searchParams.get('freeze_status');

  useEffect(() => {
  }, []);

  return (
    <div className="mt-4 flex flex-col border border-b-0 border-black text-[12px] font-bold text-[#484848]">
      {/* table headings */}
      <div className="flex items-center justify-between border border-b-[#E5E7EB] text-left">
        <div className="w-[4%] border-r-2 py-2.5 text-center">
          <input type="checkbox" />
        </div>
        <div className="w-1/12 border-r-2 py-2.5">Status Updated On</div>
        <div className="w-1/12 border-r-2 py-2.5">Product Details</div>
        <div className="w-2/12 border-r-2 py-2.5">Shipping Details</div>
        <div className="w-1/12 border-r-2 py-2.5">Applied Weight</div>
        <div className="w-2/12 border-r-2 py-2.5">Charged Weight</div>
        <div className="w-2/12 border-r-2 py-2.5">Excess Weight</div>
        <div className="w-1/12 border-r-2 py-2.5">Courier Images</div>
        <div className="w-1/12 border-r-2 py-2.5">Status</div>
        <div className="w-[10%] border-r-2 py-2.5">Actions</div>
      </div>
      {/* table data */}
      <div className="flex flex-col items-center justify-center">
      {console.log(data)}
        {Array.isArray(data) && data.length > 0 ? data.map((item, key) => {
          return (
            <div
              className="flex h-32 w-full flex-row items-center justify-between border border-b-[#E5E7EB] text-left"
              key={key}
            >
              <div className="flex h-full w-[4%] items-center justify-center border-r-2">
                <input type="checkbox" />
              </div>
              <div className="flex h-full w-1/12 items-center border-r-2">{item.status_updated_on}</div>
              <div className="flex h-full w-1/12 items-center border-r-2 font-normal">
                <div><strong>Product Name:</strong> {item.product_info[0].name}</div>
                <div><strong>PID:</strong> {item.product_info[0].id}</div>
                <div><strong>SKU:</strong> {item.product_info[0].sku}</div>
                {/* <div><strong>Product Name:</strong> {item.product_info[0].}</div> */}
              </div>
              <div className="flex h-full w-2/12 flex-col justify-center gap-4 border-r-2 text-left">
                <div>Channel SKU : {item.sku}</div>
                <div>Channel Product ID : {item.sku}</div>
              </div>
              <div className="flex h-full w-1/12 items-center border-r-2">{`${item.applicable_weight} Kg`}</div>
              <div className="flex h-full w-2/12 items-center border-r-2">
                <div className="flex flex-col gap-2">
                  <div>Dimension :</div>
                  <div className="font-normal">
                    {/* {item.package_details?.length.toFixed(3)} x {item.package_details?.width.toFixed(3)} x{' '}
                    {item.package_details?.height.toFixed(3)} */}
                  </div>
                  <div>Dead Weight :</div>
                  <div className="font-normal">{item.package_details?.dead_weight}</div>
                </div>
              </div>
              {/* <div className="flex h-full w-2/12 items-center border-r-2">
                {freezeStatus == '0' ? '' : (
                  <div className='flex flex-row w-full justify-center'>
                    <img src={`http://43.252.197.60:8050/image/get_image?file_path=${item.images[0]}`} alt="" className='w-[45%] mx-2 border border-black border-dashed' />
                    <img src={`http://43.252.197.60:8050/image/get_image?file_path=${item.images[1]}`} alt="" className='w-[45%] mx-2 border border-black border-dashed' />
                  </div>
                )}
              </div> */}
              <div className="flex h-full w-1/12 items-center border-r-2">{item?.status_name}</div>
              <div className="flex h-full w-[10%] items-center border-r-2">
                <button className="rounded-md border border-blue-500 bg-white px-4 py-1 text-blue-500"
                  onClick={() => {
                    setSelectedIndex(key);
                    setShow(true);
                  }}
                >
                  {freezeStatus == 0 ? 'Freeze Product' : 'Edit Details'}
                </button>
              </div>
            </div>
          );
        }) : (
          <div className='flex flex-col items-center py-24 px-10'>
            <div>
              <img src='https://app.shiprocket.in/app/img/no_data/weight_discrepancy_0.png' />
            </div>
            <div className='text-3xl text-violet-900 font-semibold'>Great! You have 0 weight discrepancies</div>
            <div>Hey Abhishek, Read more about weight discrepancy and how to avoid it by clicking the button below</div>
            <button className='mt-5 px-12 py-2 text-slate-300 bg-violet-900 rounded-3xl'>Learn More</button>
          </div>
        )}
      </div>
      {/* Modal for Weight Free */}
      {/* {show && selectedIndex !== null && <FreezeModal show={show} setShow={setShow} data={data[selectedIndex]} setLoading={setLoading} type={freezeStatus == 0 ? 'Freeze' : 'Edit'} />} */}
    </div>
  );
};

export default DiscrepancyTable;