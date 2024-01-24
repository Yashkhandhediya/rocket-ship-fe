import { useState, useEffect } from 'react';
import { FreezeModal } from '../weightFreezeModal';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
const FreezeTable = ({ data, setLoading }) => {
  const [show, setShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
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
        <div className="w-1/12 border-r-2 py-2.5">PID</div>
        <div className="w-1/12 border-r-2 py-2.5">Produt Name</div>
        <div className="w-2/12 border-r-2 py-2.5">SKU Summary</div>
        <div className="w-1/12 border-r-2 py-2.5">Channel</div>
        <div className="w-2/12 border-r-2 py-2.5">Package Details</div>
        <div className="w-2/12 border-r-2 py-2.5">Images</div>
        <div className="w-1/12 border-r-2 py-2.5">Weight Freeze Status</div>
        <div className="w-[10%] border-r-2 py-2.5">Action</div>
      </div>
      {/* table data */}
      <div className="flex flex-col items-center justify-center">
        {data && data.map((item, key) => {
          return (
            <div
              className="flex h-32 w-full flex-row items-center justify-between border border-b-[#E5E7EB] text-left"
              key={key}>
              <div className="flex h-full w-[4%] items-center justify-center border-r-2">
                <input type="checkbox" />
              </div>
              <div className="flex h-full w-1/12 items-center border-r-2 text-blue-600">{item.id}</div>
              <div className="flex h-full w-1/12 items-center border-r-2 font-normal">{item.name}</div>
              <div className="flex h-full w-2/12 flex-col justify-center gap-4 border-r-2 text-left">
                <div>Channel SKU : {item.sku}</div>
                <div>Channel Product ID : {item.sku}</div>
              </div>
              <div className="flex h-full w-1/12 items-center border-r-2">{item.channel_name}</div>
              <div className="flex h-full w-2/12 items-center border-r-2">
                <div className="flex flex-col gap-2">
                  <div>Dimension :</div>
                  <div className="font-normal">
                    {item.package_details?.length.toFixed(3)} x {item.package_details?.width.toFixed(3)} x{' '}
                    {item.package_details?.height.toFixed(3)}
                  </div>
                  <div>Dead Weight :</div>
                  <div className="font-normal">{item.package_details?.dead_weight}</div>
                </div>
              </div>
              <div className="flex h-full w-2/12 items-center border-r-2">
                {freezeStatus == '0' ? '' : (
                  <div className='flex flex-row w-full justify-center'>
                    <img src={`http://43.252.197.60:8050/image/get_image?file_path=${item.images[0]}`} alt="" className='w-[45%] mx-2 border border-black border-dashed' />
                    <img src={`http://43.252.197.60:8050/image/get_image?file_path=${item.images[1]}`} alt="" className='w-[45%] mx-2 border border-black border-dashed' />
                  </div>
                )}
              </div>
              <div className="flex h-full w-1/12 items-center border-r-2">{item?.status_name}</div>
              <div className="flex h-full w-[10%] items-center border-r-2">
                <button className="rounded-md border border-blue-500 bg-white px-4 py-1 text-blue-500" 
                onClick={() =>{
                  setSelectedIndex(key);
                  setShow(true);
                }}
                >
                  Freeze Product
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Modal for Weight Free */}
      {show && selectedIndex !== null && <FreezeModal show={show} setShow={setShow} data={data[selectedIndex]}/>}
    </div>
  );
};

export default FreezeTable;
