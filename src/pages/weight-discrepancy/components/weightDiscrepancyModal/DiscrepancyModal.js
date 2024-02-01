import { useEffect, useState } from 'react';
// import { upload } from '../../../../common/icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { freezeGuide } from '../../../../common/images';

const DiscrepancyModal = ({ setShow, data, setLoading, type }) => {
  const [weightDiscrepancyData, setWeightDiscrepancyData] = useState({
    product_id: data.product_info[0].id,
    category: data.product_info[0].category,
    length_img: null,
    width_img: null,
    height_img: null,
    weight_img: null,
    with_label_img: null,
  })

  const [images, setImages] = useState({
    length_img: null,
    width_img: null,
    height_img: null,
    weight_img: null,
    with_label_img: null,
  });

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages({ ...images, [name]: e.target.result });
      };
      reader.readAsDataURL(file);
    }
    handleUpload(name, file);
  };

  const handleUpload = (name, file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    axios.post(`http://43.252.197.60:8050/image/upload_image?product_id=${data.id}`, { file: file }, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((response) => {
        setWeightDiscrepancyData({ ...weightDiscrepancyData, [name]: response.data.filepath })
      }).catch((error) => {
        toast('Something went wrong while uploading image', { type: 'error' })
        console.log(error); //eslint-disable-line
      })
    setLoading(false);
  }


  const handleWeightFreezeSubmit = () => {
    if (weightDiscrepancyData.length_img === null || weightDiscrepancyData.width_img === null || weightDiscrepancyData.height_img === null || weightDiscrepancyData.weight_img === null || weightDiscrepancyData.with_label_img === null) {
      return toast('Please upload all the images', { type: 'error' })
    }
    if (weightDiscrepancyData.category === '') {
      return toast('Please enter product category', { type: 'error' })
    }
    const headers = { 'Content-Type': 'application/json' };
    const url = `http://43.252.197.60:8050/weight_discrepancy/dispute?id=${data.discrepancy_id}`
    axios.put(url, weightDiscrepancyData, { headers })
      .then((response) => {
        if (response.status === 200) {
          toast('Request submitted successfully', { type: 'success' })
          setShow(false);
        }
      }).catch((error) => {
        toast('Something went wrong', { type: 'error' })
        setShow(false);
        console.log(error); //eslint-disable-line
      })

    console.log(weightDiscrepancyData); //eslint-disable-line
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-0 my-6 w-full max-w-5xl">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="border-blueGray-200 flex w-full items-center justify-between rounded-t border-b border-solid p-5">
              <div></div>
              <h3 className="text-2xl font-semibold">Please share the following details to help us resolve the discrepancy.</h3>
              <button
                className="border-0 bg-transparent p-1 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                onClick={() => setShow(false)}>
                <span className="block h-6 w-6 bg-transparent text-black opacity-50 outline-none focus:outline-none">
                  x
                </span>
              </button>
              {/* To do : Active this button and move it to the right corner */}
            </div>
            {/*body*/}
            <div className="relative flex-auto p-6">
              <p className="text-lg font-semibold">Upload Shipment Images</p>
              <div className="m-1 flex flex-col rounded-md border border-gray-200">
                {/* Product Information */}
                <div className="gap-8 flex flex-row p-4 px-8">

                  {/* Product Image Section */}
                  <div className="flex w-[60%] flex-col">
                    <p>Product Images </p>
                    <div className="mt-2 flex flex-row flex-wrap gap-8 rounded-lg">
                      {/* Image 1 */}
                      <div className='flex h-32 flex-col w-[28%]'>
                        <div className="flex h-32 cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-blue-500">
                          <label htmlFor="length_img" className="w-full">
                            <div className="flex cursor-pointer flex-col items-center justify-center">
                              {images.length_img ? (
                                <div className='flex justify-center w-[90%] h-[90%]'>
                                  <img src={images.length_img} alt="" className='object-fill h-28' />
                                </div>
                              ) : (
                                <>
                                  {/* <img src={upload} alt="" /> */}
                                  <p>Upload Length Image</p>
                                  <input type="file" className="hidden" name="length_img" accept=".jpg,.png,.gif,.jpeg" id="length_img" onChange={handleFileChange}
                                  />
                                </>
                              )}
                            </div>
                          </label>
                        </div>
                        {images.length_img && (
                          <button className='border border-blue-400 text-blue-400 mt-2 py-1 rounded-md hover:bg-blue-600 hover:text-white'>
                            <label htmlFor="length_img">
                              Change image
                              <input type="file" className="hidden" name="length_img" accept=".jpg,.png,.gif,.jpeg" id="length_img" onChange={handleFileChange}
                              />
                            </label>
                          </button>
                        )}
                      </div>
                      {/* Image 2 */}
                      <div className='flex h-32 flex-col w-[28%]'>
                        <div className="flex h-32 cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-blue-500">
                          <label htmlFor="width_img" className="w-full">
                            <div className="flex cursor-pointer flex-col items-center justify-center">
                              {images.width_img ? (
                                <div className='flex justify-center w-[90%] h-[90%]'>
                                  <img src={images.width_img} alt="" className='object-fill h-28' />
                                </div>
                              ) : (
                                <>
                                  {/* <img src={upload} alt="" /> */}
                                  <p>Upload Width Image</p>
                                  <input type="file" className="hidden" name="width_img" accept=".jpg,.png,.gif,.jpeg" id="width_img" onChange={handleFileChange}
                                  />
                                </>
                              )}
                            </div>
                          </label>
                        </div>
                        {images.width_img && (
                          <button className='border border-blue-400 text-blue-400 mt-2 py-1 rounded-md hover:bg-blue-600 hover:text-white'>
                            <label htmlFor="width_img">
                              Change image
                              <input type="file" className="hidden" name="width_img" accept=".jpg,.png,.gif,.jpeg" id="width_img" onChange={handleFileChange}
                              />
                            </label>
                          </button>
                        )}
                      </div>
                      {/* Image 3 */}
                      <div className='flex h-32 flex-col w-[28%]'>
                        <div className="flex h-32 cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-blue-500">
                          <label htmlFor="height_img" className="w-full">
                            <div className="flex cursor-pointer flex-col items-center justify-center">
                              {images.height_img ? (
                                <div className='flex justify-center w-[90%] h-[90%]'>
                                  <img src={images.height_img} alt="" className='object-fill h-28' />
                                </div>
                              ) : (
                                <>
                                  {/* <img src={upload} alt="" /> */}
                                  <p>Upload Height Image</p>
                                  <input type="file" className="hidden" name="height_img" accept=".jpg,.png,.gif,.jpeg" id="height_img" onChange={handleFileChange}
                                  />
                                </>
                              )}
                            </div>
                          </label>
                        </div>
                        {images.height_img && (
                          <button className='border border-blue-400 text-blue-400 mt-2 py-1 rounded-md hover:bg-blue-600 hover:text-white'>
                            <label htmlFor="height_img">
                              Change image
                              <input type="file" className="hidden" name="height_img" accept=".jpg,.png,.gif,.jpeg" id="height_img" onChange={handleFileChange}
                              />
                            </label>
                          </button>
                        )}
                      </div>

                      {/* Image 4 */}
                      <div className='flex h-32 flex-col w-[28%]'>
                        <div className="flex h-32 cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-blue-500">
                          <label htmlFor="weight_img" className="w-full">
                            <div className="flex cursor-pointer flex-col items-center justify-center">
                              {images.weight_img ? (
                                <div className='flex justify-center w-[90%] h-[90%]'>
                                  <img src={images.weight_img} alt="" className='object-fill h-28' />
                                </div>
                              ) : (
                                <>
                                  {/* <img src={upload} alt="" /> */}
                                  <p>Upload Weight Image</p>
                                  <input type="file" className="hidden" name="weight_img" accept=".jpg,.png,.gif,.jpeg" id="weight_img" onChange={handleFileChange}
                                  />
                                </>
                              )}
                            </div>
                          </label>
                        </div>
                        {images.weight_img && (
                          <button className='border border-blue-400 text-blue-400 mt-2 py-1 rounded-md hover:bg-blue-600 hover:text-white'>
                            <label htmlFor="weight_img">
                              Change image
                              <input type="file" className="hidden" name="weight_img" accept=".jpg,.png,.gif,.jpeg" id="weight_img" onChange={handleFileChange}
                              />
                            </label>
                          </button>
                        )}
                      </div>

                      {/* Image 5 */}
                      <div className='flex h-32 flex-col w-[28%]'>
                        <div className="flex h-32 cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-blue-500">
                          <label htmlFor="with_label_img" className="w-full">
                            <div className="flex cursor-pointer flex-col items-center justify-center">
                              {images.with_label_img ? (
                                <div className='flex justify-center w-[90%] h-[90%]'>
                                  <img src={images.with_label_img} alt="" className='object-fill h-28' />
                                </div>
                              ) : (
                                <>
                                  {/* <img src={upload} alt="" /> */}
                                  <p>Upload Label Image</p>
                                  <input type="file" className="hidden" name="with_label_img" accept=".jpg,.png,.gif,.jpeg" id="with_label_img" onChange={handleFileChange}
                                  />
                                </>
                              )}
                            </div>
                          </label>
                        </div>
                        {images.with_label_img && (
                          <button className='border border-blue-400 text-blue-400 mt-2 py-1 rounded-md hover:bg-blue-600 hover:text-white'>
                            <label htmlFor="with_label_img">
                              Change image
                              <input type="file" className="hidden" name="with_label_img" accept=".jpg,.png,.gif,.jpeg" id="with_label_img" onChange={handleFileChange}
                              />
                            </label>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='flex w-[40%]'>
                    <img src={freezeGuide} className='bg-gray-400 rounded' style={{ backgroundColor: 'grey', width: '100%' }} />
                  </div>
                </div>
                <div className="flex justify-center items-center w-full border-0 text-[12px] border-t-2 bg-[#f8f8f892] py-2">
                  Note :&nbsp;<span className='font-normal'> Uploaded images should be less than 5 MB</span>
                </div>
              </div>


              <p className='text-lg font-semibold'>View Images shared by the courier</p>
              <div className="m-1 flex flex-col rounded-md border border-gray-200">
                <img className='m-2 w-32 h-32' alt='product image' />
              </div>

              <p className='text-lg font-semibold'>Package Images</p>
              <div className="m-1 flex flex-col rounded-md border border-gray-200">
                <div className='flex'>
                  <div className='w-[60%]'>
                    <div>Product</div>
                  </div>
                  <div className='w-[40%] pl-4 flex gap-8'>
                    <div>Product Category*</div>
                    <div>Product Url</div>
                    <div>Product Remark</div>
                  </div>
                </div>
                <div className='flex'>
                  <div className='w-[60%] text-gray-400 border-2'>
                    <div>Product Id: {data?.product_info?.[0]?.id}</div>
                    <div>Name: {data?.product_info?.[0]?.name}</div>
                    <div>SKU Id: {data?.product_info?.[0]?.sku}</div>
                  </div>
                  <div className='flex items-center gap-2 px-2 w-[40%] border-2'>
                    <div className='w-[33.33%]'>
                      <input className='rounded border-2 w-full' placeholder='Enter Product Category'
                        onChange={(e) => {
                          setWeightDiscrepancyData({ ...weightDiscrepancyData, category: e.target.value })
                        }}
                        value={weightDiscrepancyData.category} />
                    </div>
                    <div className='w-[33.33%]'>
                      <input className='rounded border-2 w-full' placeholder='Product Url' />
                    </div>
                    <div className='w-[33.33%]'>
                      <input className='rounded border-2 w-full' placeholder='Product Remark' />
                    </div>
                  </div>
                </div>
              </div>

            </div>


            {/*footer*/}
            <div className="border-blueGray-200 flex items-center justify-center rounded-b border-t border-solid p-6">
              <button
                className="mb-1 mr-1 rounded-lg bg-blue-600 px-6 py-2 text-sm text-white shadow outline-none transition-all duration-150 border ease-linear hover:shadow-lg focus:outline-none font-semibold"
                type="button"
                onClick={() => {
                  handleWeightFreezeSubmit()
                  window.location.reload()
                }}
              >
                Submit
              </button>
            </div>

          </div >
        </div >
      </div >
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
};

export default DiscrepancyModal;