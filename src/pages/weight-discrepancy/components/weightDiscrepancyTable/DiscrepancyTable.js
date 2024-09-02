import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { FreezeModal } from '../weightFreezeModal';
import { useSearchParams } from 'react-router-dom';
import { DiscrepancyModal } from '../weightDiscrepancyModal';
import { BACKEND_URL } from '../../../../common/utils/env.config';
import { ACCESS_TOKEN } from '../../../../common/utils/config';
// import { noData } from '../../../../common/images';

const DiscrepancyTable = ({ data, setLoading }) => {
  console.log('Dataaaaaaa', data);
  const [show, setShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams(); // eslint-disable-line
  const freezeStatus = searchParams.get('freeze_status');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const imagePromises = data.map(async (item) => {
        try {
          const response = await axios.get(
            BACKEND_URL +
              `/weight_discrepancy/get_weight_discrepancy_courier_image?weight_discrepancy_id=${item.weight_discrepancy.id}&image_type=courier_image`,
            { responseType: 'blob' },
          );
          const imgUrl = URL.createObjectURL(response.data);
          return { id: item.weight_discrepancy.id, image: imgUrl };
        } catch (error) {
          console.log('Image Fetch Error', error);
          return { id: item.weight_discrepancy.id, image: null };
        }
      });

      const fetchedImages = await Promise.all(imagePromises);
      const imagesMap = fetchedImages.reduce((acc, img) => {
        acc[img.id] = img.image;
        return acc;
      }, {});

      setImages(imagesMap);
    };

    if (Array.isArray(data) && data.length > 0) {
      fetchImages();
    }
  }, [data]);

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
    const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000); // eslint-disable-line
    return remainingDays;
  };

  const updateStatus = (id) => {
    axios
      .put(
        `${BACKEND_URL}/weight_discrepancy/update?id=${id}&user_id=${localStorage.getItem('user_id')}`,
        { status_name: 'Discrepancy Accepted' },
        { headers: { 'Content-Type': 'application/json', Authorization: ACCESS_TOKEN } },
      )
      .then((res) => {
        toast('Discrepancy Accepted Successfully', { type: 'success' });
        window.location.reload();
        console.log(res); // eslint-disable-line
      })
      .catch((err) => {
        toast('Something went wrong', { type: 'error' });
        console.log(err); // eslint-disable-line
      });
  };

  useEffect(() => {}, []);

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
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item, key) => {
            return (
              <div
                className="flex h-32 w-full flex-row items-center border border-b-[#E5E7EB] text-left"
                key={key}>
                <div className="flex h-full w-[4%] items-center justify-center border-r-2 pl-2">
                  <input type="checkbox" />
                </div>
                <div className="flex h-full w-[10.66%] items-center border-r-2 pl-2 font-normal">
                  {item.generation_date}
                </div>
                <div className="flex h-full w-[10.66%] flex-col justify-center border-r-2 pl-2 font-normal">
                  <div>
                    <strong>Product Name:</strong> {item.order_data.product_info[0].name}
                  </div>
                  <div>
                    <strong>PID:</strong> {item.order_data.product_info[0].id}
                  </div>
                  <div>
                    <strong>SKU:</strong> {item.order_data.product_info[0].sku}
                  </div>
                  <div>
                    <strong>QTY:</strong> {item.order_data.product_info[0].quantity}
                  </div>
                </div>
                <div className="flex h-full w-[10.66%] flex-col justify-center gap-4 border-r-2 pl-2 text-left">
                  <div>AWB: {item.order_data.waybill_no}</div>
                </div>
                <div className="flex h-full w-[10.66%] flex-col justify-center border-r-2 pl-2 font-normal">
                  <div>
                    <strong>{`${item.order_data.applicable_weight} Kg`}</strong>
                  </div>
                  <div>Dead weight: {item.order_data.dead_weight} Kg</div>
                  <div>
                    Volumetric Weight: {item.order_data.volumatric_weight}({item.order_data.length}x
                    {item.order_data.width}x{item.order_data.height} cm)
                  </div>
                </div>
                <div className="flex h-full w-[10.66%] flex-col justify-center border-r-2 pl-2 font-normal">
                  <div>
                    <strong>{`${item.weight_discrepancy.charged_weight} Kg`}</strong>
                  </div>
                  <div>Dead weight: {item.order_data.dead_weight} Kg</div>
                  <div>
                    Volumetric Weight: {item.order_data.volumatric_weight}({item.order_data.length}x
                    {item.order_data.width}x{item.order_data.height} cm)
                  </div>
                </div>
                <div className="flex h-full w-[10.66%] flex-col justify-center border-r-2 pl-2 font-normal">
                  <div>
                    <strong>Excess Weight: </strong>
                    <span className="text-red-800">{item.weight_discrepancy.excess_weight} kg</span>
                  </div>
                  <div>
                    <strong>Excess Charges: </strong>
                    <span className="text-red-800">Rs{item.weight_discrepancy.excess_rate}</span>
                  </div>
                </div>
                <div className="flex h-full w-[10.66%] flex-col items-center justify-center border-r-2 bg-none pl-2 font-normal">
                  {images[item.weight_discrepancy.id] ? (
                    <img
                      src={images[item.weight_discrepancy.id]}
                      alt="Product"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div>No Image</div>
                  )}
                </div>
                <div className="item-center flex h-full w-[10.66%] items-center border-r-2 px-2 pl-2 font-normal">
                  <div className="basis-full rounded bg-red-100 text-center font-semibold text-red-700">
                    {item.weight_discrepancy.weight_discrepancy_status_name}
                  </div>
                </div>
                <div className="flex h-full w-[10.66%] flex-col items-center justify-center gap-2 border-r-2 p-1 font-normal">
                  {console.log('Hi')}
                  {item.weight_discrepancy.weight_discrepancy_status_name == 'New Discrepancy' &&
                    getRemainingTime(item?.weight_discrepancy.generation_date) > 0 && (
                      // {item.weight_discrepancy_status_name == 'New Discrepancy'  &&
                      <>
                        <button
                          className="rounded border-2 border-red-600 p-1 font-semibold text-red-600"
                          onClick={() => {
                            updateStatus(item.weight_discrepancy.id);
                          }}>
                          Accept Discrepancy
                        </button>
                        <button
                          className="rounded border-2 border-red-600 p-1 font-semibold text-red-600"
                          onClick={() => {
                            setSelectedIndex(key);
                            setShow(true);
                          }}>
                          Dispute Discrepancy
                        </button>
                        <div className="text-center font-bold text-red-600">
                          {getRemainingTime(item?.weight_discrepancy.generation_date)} working days remaining
                        </div>
                      </>
                    )}
                  {item.weight_discrepancy.weight_discrepancy_status_name == 'New Discrepancy' &&
                    getRemainingTime(item?.weight_discrepancy.generation_date) == 0 && (
                      <>
                        <button
                          className="cursor-not-allowed rounded border-2 border-red-600 p-1 font-semibold text-red-600 opacity-45"
                          disabled>
                          Discrepancy Accepted Automatically
                        </button>
                        <div className="text-center font-bold text-red-600">
                          {getRemainingTime(item?.weight_discrepancy.generation_date)} working days remaining
                        </div>
                      </>
                    )}
                  {item.weight_discrepancy.weight_discrepancy_status_name == 'Dispute Raised' && (
                    <>
                      {/* <button
                        className="rounded border-2 border-red-600 p-1 font-semibold text-red-600 opacity-45"
                        disabled>
                        Dispute Discrepancy
                      </button> */}
                      <button
                        className="rounded border-2 border-red-600 p-1 font-semibold text-red-600"
                        onClick={() => {
                          setSelectedIndex(key);
                          setShow(true);
                        }}>
                        View Dispute Details
                      </button>
                    </>
                  )}
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
          })
        ) : (
          <div className="flex flex-col items-center px-10 py-24">
            <div>
              <img src="https://app.shiprocket.in/app/img/no_data/weight_discrepancy_0.png" />
            </div>
            <div className="text-3xl font-semibold text-violet-900">
              Great! You have 0 weight discrepancies
            </div>
            <div>
              Hey user, Read more about weight discrepancy and how to avoid it by clicking the button below
            </div>
            <button className="mt-5 rounded-3xl bg-violet-900 px-12 py-2 text-slate-300">Learn More</button>
          </div>
        )}
      </div>
      {/* Modal for Weight Discrepancy */}
      {show && selectedIndex !== null && (
        <DiscrepancyModal
          show={show}
          setShow={setShow}
          data={data[selectedIndex]}
          setLoading={setLoading}
          type={freezeStatus == 0 ? 'Freeze' : 'Edit'}
        />
      )}
    </div>
  );
};

export default DiscrepancyTable;
