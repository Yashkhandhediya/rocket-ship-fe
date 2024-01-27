import { useState, useEffect } from 'react';
import { FreezeModal } from '../weightFreezeModal';
import { useSearchParams } from 'react-router-dom';
import { noData } from '../../../../common/images';
import { CustomTooltip } from '../../../../common/components';
import { infoIcon } from '../../../../common/icons';
const FreezeTable = ({ data, setLoading, setShowImages, setImages }) => {
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
        <div className="w-1/12 border-r-2 py-2.5 flex flex-row items-center">
          <span>PID</span>
          <CustomTooltip text={'PID is a product ID that uniquely identifies a SKU for each channel'} style='dark' placement='right'>
            <img src={infoIcon} className="ms-2" />
          </CustomTooltip>
        </div>
        <div className="w-1/12 border-r-2 py-2.5">Produt Name</div>
        <div className="w-2/12 border-r-2 py-2.5">SKU Summary</div>
        <div className="w-1/12 border-r-2 py-2.5">Channel</div>
        <div className="w-2/12 border-r-2 py-2.5">Package Details</div>
        <div className="w-1/12 border-r-2 py-2.5 text-center">Images</div>
        <div className="w-2/12 border-r-2 py-2.5 text-center">Weight Freeze Status</div>
        <div className="w-[14%] border-r-2 py-2.5 text-center">Action</div>
      </div>
      {/* table data */}
      <div className="flex flex-col items-center justify-center">
        {data.length ? data.map((item, key) => {
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
                    {item.package_details?.height.toFixed(3)} cm
                  </div>
                  <div>Dead Weight :</div>
                  <div className="font-normal">{item.package_details?.dead_weight.toFixed(3)} Kg</div>
                </div>
              </div>
              <div className="flex h-full w-1/12 items-center border-r-2">
                {freezeStatus == '0' ? '' : (
                  <div className='flex flex-row w-full justify-center items-baseline'>
                    {/* <img src={`http://43.252.197.60:8050/image/get_image?file_path=${item.images[0]}`} alt="" className='w-[45%] mx-2 border border-black border-dashed' />
                    <img src={`http://43.252.197.60:8050/image/get_image?file_path=${item.images[1]}`} alt="" className='w-[45%] mx-2 border border-black border-dashed' /> */}
                    <span
                      className='font-normal text-blue-700 text-decoration-underline cursor-pointer'
                      onClick={() => {
                        setImages(item.images);
                        setShowImages(true);
                      }}
                    >View Images</span>
                  </div>
                )}
              </div>
              <div className="flex h-full w-2/12 items-center justify-center border-r-2">
                {freezeStatus == '0' && ('Not Requested')}
                {freezeStatus == '1' && (<span className='w-[90%] bg-green-200 text-green-700 text-center py-1 rounded-sm text-[12px]'>Accepted</span>)}
                {freezeStatus == '2' && (<span className='w-[90%] bg-red-200 text-red-700 text-center py-1 rounded-sm text-[12px]'>Requested</span>)}
              </div>
              <div className="flex flex-col gap-2 h-full w-[14%] justify-center items-center border-r-2">
                <button className={`rounded-sm border px-4 py-2 ${freezeStatus == 0 ? 'bg-white text-blue-500 border-blue-500' : 'bg-gray-200 text-gray-500 border-blue-400 cursor-not-allowed'}`}
                  onClick={() => {
                    setSelectedIndex(key);
                    setShow(true);
                  }}
                  disabled={freezeStatus == 0 ? false : true}
                >
                  {'Request Weight Freeze'}
                </button>
                {freezeStatus != 0 &&
                  <span className='text-[10px]'>
                    View more info
                  </span>
                }
              </div>
            </div>
          );
        }) : (
          <div className='pt-12 mb-12 w-full flex justify-center items-center flex-col'>
            <img src={noData} alt="" width={'230px'} />
            <div className='text-3xl mt-10 text-[#6457B6]'>We could not find any data for the applied filters.</div>
            <div className='text-[14px] mt-2 font-normal opacity-80'>Please change filters and retry.</div>
          </div>
        )}
      </div>
      {/* Modal for Weight Free */}
      {show && selectedIndex !== null && <FreezeModal show={show} setShow={setShow} data={data[selectedIndex]} setLoading={setLoading} type={freezeStatus == 0 ? 'Freeze' : 'Edit'} />}
    </div>
  );
};

export default FreezeTable;
