import { useEffect, useState } from 'react';
// import { upload } from '../../../../common/icons';
import axios from 'axios';
import { toast } from 'react-toastify';

const DiscrepancyModal = ({ setShow, data, setLoading, type }) => {
  const [weightDiscrepancyData, setWeightDiscrepancyData] = useState({
    product_id: data.id,
    length: data.length,
    width: data.width,
    height: data.height,
    weight: data.dead_weight,
    chargable_weight: '0',
    status_name: 'Request Raised',
    status_id: 2,
    product_category: '',
    images: {
      img_1: null,
      img_2: null,
      length_img: null,
      width_img: null,
      height_img: null,
      weight_img: null
    }
  })

  const [images, setImages] = useState({
    img_1: null,
    img_2: null,
    img_3: null,
    img_4: null,
    img_5: null,
    length_img: null,
    width_img: null,
    height_img: null,
    weight_img: null,
    label_img: null,
  });

  // const [packageDetails, setPackageDetails] = useState({
  //     length: data.package_details.length,
  //     width: data.package_details.width,
  //     height: data.package_details.height,
  //     weight: data.package_details.dead_weight,
  //     chargableWeight: '0',
  // })

  const packageData = [
    {
      label: 'Length',
      name: 'length',
      id: 'length',
      value: weightDiscrepancyData.length,
      unit: 'CM',
    },
    {
      label: 'Width',
      name: 'width',
      id: 'width',
      value: weightDiscrepancyData.width,
      unit: 'CM',
    }, {
      label: 'Height',
      name: 'height',
      id: 'height',
      value: weightDiscrepancyData.height,
      unit: 'CM',
    }, {
      label: 'Weight',
      name: 'weight',
      id: 'weight',
      value: weightDiscrepancyData.weight,
      unit: 'KG',
    }, {
      label: 'Chargable Weight',
      name: 'chargableWeight',
      id: 'chargableWeight',
      value: weightDiscrepancyData.chargableWeight,
      unit: 'KG',
    }
  ]

  const packageImagesData = [
    {
      label: 'Length',
      name: 'length_img',
      id: 'length_image',
      value: images.length_img,
    },
    {
      label: 'Width',
      name: 'width_img',
      id: 'width_image',
      value: images.width_img,
    }, {
      label: 'Height',
      name: 'height_img',
      id: 'height_image',
      value: images.height_img,
    }, {
      label: 'Weight',
      name: 'weight_img',
      id: 'weight_image',
      value: images.weight_img,
    }, {
      label: 'with Label',
      name: 'label',
      id: 'label_image',
      value: images.label,
    }
  ]

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
        setWeightDiscrepancyData({ ...weightDiscrepancyData, images: { ...weightDiscrepancyData.images, [name]: response.data.filepath } })
      }).catch((error) => {
        toast('Something went wrong while uploading image', { type: 'error' })
        console.log(error); //eslint-disable-line
      })
    setLoading(false);
  }


  const handleWeightFreezeSubmit = () => {
    if (weightDiscrepancyData.product_category === '' || weightDiscrepancyData.width === 0 || weightDiscrepancyData.height === 0 || weightDiscrepancyData.length === 0 || weightDiscrepancyData.dead_weight === 0) {
      return toast('Please fill all the details', { type: 'error' })
    }
    if (weightDiscrepancyData.images.img_1 === null || weightDiscrepancyData.images.img_2 === null || weightDiscrepancyData.images.length_img === null || weightDiscrepancyData.images.width_img === null || weightDiscrepancyData.images.height_img === null || weightDiscrepancyData.images.weight_img === null) {
      return toast('Please upload all the images', { type: 'error' })
    }
    const headers = { 'Content-Type': 'application/json' };
    const url = type === 'Freeze'
      ? 'http://43.252.197.60:8050/weight_freeze/'
      : `http://43.252.197.60:8050/weight_freeze/update?id=${data.id}`
    axios.post(url, weightDiscrepancyData, { headers })
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
  }

  useEffect(() => {
    if (weightDiscrepancyData.length != 0 && weightDiscrepancyData.width != 0 && weightDiscrepancyData.height != 0 && weightDiscrepancyData.weight != 0) {
      const chargableWeight = Math.max(weightDiscrepancyData.weight, ((weightDiscrepancyData.length * weightDiscrepancyData.width * weightDiscrepancyData.height) / 5000));
      setWeightDiscrepancyData({ ...weightDiscrepancyData, chargable_weight: chargableWeight })
    }
  }, [weightDiscrepancyData.length, weightDiscrepancyData.width, weightDiscrepancyData.height, weightDiscrepancyData.weight])
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
            {console.log(data)}

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
                          <label htmlFor="img_1" className="w-full">
                            <div className="flex cursor-pointer flex-col items-center justify-center">
                              {images.img_1 ? (
                                <div className='flex justify-center w-[90%] h-[90%]'>
                                  <img src={images.img_1} alt="" className='object-fill h-28' />
                                </div>
                              ) : (
                                <>
                                  {/* <img src={upload} alt="" /> */}
                                  <p>Upload Image</p>
                                  <input type="file" className="hidden" name="img_1" accept=".jpg,.png,.gif,.jpeg" id="img_1" onChange={handleFileChange}
                                  />
                                </>
                              )}
                            </div>
                          </label>
                        </div>
                        {images.img_1 && (
                          <button className='border border-blue-400 text-blue-400 mt-2 py-1 rounded-md hover:bg-blue-600 hover:text-white'>
                            <label htmlFor="img_1">
                              Change image
                              <input type="file" className="hidden" name="img_1" accept=".jpg,.png,.gif,.jpeg" id="img_1" onChange={handleFileChange}
                              />
                            </label>
                          </button>
                        )}
                      </div>
                      {/* Image 2 */}
                      <div className='flex h-32 flex-col w-[28%]'>
                        <div className="flex h-32 cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-blue-500">
                          <label htmlFor="img_2" className="w-full">
                            <div className="flex cursor-pointer flex-col items-center justify-center">
                              {images.img_2 ? (
                                <div className='flex justify-center w-[90%] h-[90%]'>
                                  <img src={images.img_2} alt="" className='object-fill h-28' />
                                </div>
                              ) : (
                                <>
                                  {/* <img src={upload} alt="" /> */}
                                  <p>Upload Image</p>
                                  <input type="file" className="hidden" name="img_2" accept=".jpg,.png,.gif,.jpeg" id="img_2" onChange={handleFileChange}
                                  />
                                </>
                              )}
                            </div>
                          </label>
                        </div>
                        {images.img_2 && (
                          <button className='border border-blue-400 text-blue-400 mt-2 py-1 rounded-md hover:bg-blue-600 hover:text-white'>
                            <label htmlFor="img_2">
                              Change image
                              <input type="file" className="hidden" name="img_2" accept=".jpg,.png,.gif,.jpeg" id="img_2" onChange={handleFileChange}
                              />
                            </label>
                          </button>
                        )}
                      </div>
                      {/* Image 3 */}
                      <div className='flex h-32 flex-col w-[28%]'>
                        <div className="flex h-32 cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-blue-500">
                          <label htmlFor="img_3" className="w-full">
                            <div className="flex cursor-pointer flex-col items-center justify-center">
                              {images.img_3 ? (
                                <div className='flex justify-center w-[90%] h-[90%]'>
                                  <img src={images.img_3} alt="" className='object-fill h-28' />
                                </div>
                              ) : (
                                <>
                                  {/* <img src={upload} alt="" /> */}
                                  <p>Upload Image</p>
                                  <input type="file" className="hidden" name="img_3" accept=".jpg,.png,.gif,.jpeg" id="img_3" onChange={handleFileChange}
                                  />
                                </>
                              )}
                            </div>
                          </label>
                        </div>
                        {images.img_3 && (
                          <button className='border border-blue-400 text-blue-400 mt-2 py-1 rounded-md hover:bg-blue-600 hover:text-white'>
                            <label htmlFor="img_3">
                              Change image
                              <input type="file" className="hidden" name="img_3" accept=".jpg,.png,.gif,.jpeg" id="img_3" onChange={handleFileChange}
                              />
                            </label>
                          </button>
                        )}
                      </div>

                      {/* Image 4 */}
                      <div className='flex h-32 flex-col w-[28%]'>
                        <div className="flex h-32 cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-blue-500">
                          <label htmlFor="img_4" className="w-full">
                            <div className="flex cursor-pointer flex-col items-center justify-center">
                              {images.img_4 ? (
                                <div className='flex justify-center w-[90%] h-[90%]'>
                                  <img src={images.img_4} alt="" className='object-fill h-28' />
                                </div>
                              ) : (
                                <>
                                  {/* <img src={upload} alt="" /> */}
                                  <p>Upload Image</p>
                                  <input type="file" className="hidden" name="img_4" accept=".jpg,.png,.gif,.jpeg" id="img_4" onChange={handleFileChange}
                                  />
                                </>
                              )}
                            </div>
                          </label>
                        </div>
                        {images.img_4 && (
                          <button className='border border-blue-400 text-blue-400 mt-2 py-1 rounded-md hover:bg-blue-600 hover:text-white'>
                            <label htmlFor="img_4">
                              Change image
                              <input type="file" className="hidden" name="img_4" accept=".jpg,.png,.gif,.jpeg" id="img_4" onChange={handleFileChange}
                              />
                            </label>
                          </button>
                        )}
                      </div>

                      {/* Image 5 */}
                      <div className='flex h-32 flex-col w-[28%]'>
                        <div className="flex h-32 cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-blue-500">
                          <label htmlFor="img_5" className="w-full">
                            <div className="flex cursor-pointer flex-col items-center justify-center">
                              {images.img_5 ? (
                                <div className='flex justify-center w-[90%] h-[90%]'>
                                  <img src={images.img_5} alt="" className='object-fill h-28' />
                                </div>
                              ) : (
                                <>
                                  {/* <img src={upload} alt="" /> */}
                                  <p>Upload Image</p>
                                  <input type="file" className="hidden" name="img_5" accept=".jpg,.png,.gif,.jpeg" id="img_5" onChange={handleFileChange}
                                  />
                                </>
                              )}
                            </div>
                          </label>
                        </div>
                        {images.img_5 && (
                          <button className='border border-blue-400 text-blue-400 mt-2 py-1 rounded-md hover:bg-blue-600 hover:text-white'>
                            <label htmlFor="img_5">
                              Change image
                              <input type="file" className="hidden" name="img_5" accept=".jpg,.png,.gif,.jpeg" id="img_5" onChange={handleFileChange}
                              />
                            </label>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='flex w-[40%]'>
                    <img className='bg-gray-400 rounded' style={{ backgroundColor: 'grey', width: '100%', height: '1005' }} />
                  </div>
                </div>
                <div className="flex justify-center items-center w-full border-0 text-[12px] border-t-2 bg-[#f8f8f892] py-2">
                  Notes :&nbsp;<span className='font-normal'> Uploaded images should be less than 5mb</span>
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
                  <div className='w-[40%] flex justify-between'>
                    <div>Product Category*</div>
                    <div>Product Url</div>
                    <div>Product Remark</div>
                  </div>
                </div>
                <div className='flex'>
                  <div className='w-[60%] text-gray-400 border-2'>
                    <div>Product Id: { data?.product_info?.[0]?.id }</div>
                    <div>Name: { data?.product_info?.[0]?.name }</div>
                    <div>SKU Id: { data?.product_info?.[0]?.sku }</div>
                  </div>
                  <div className='flex items-center gap-2 px-2 w-[40%] border-2'>
                    <div className='w-[33.33%]'>
                      <input className='rounded border-2 w-full' placeholder='Enter Product Category'/>
                    </div>
                    <div className='w-[33.33%]'>
                      <input className='rounded border-2 w-full' placeholder='Product Url'/>
                    </div>
                    <div className='w-[33.33%]'>
                      <input className='rounded border-2 w-full' placeholder='Product Remark'/>
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
                onClick={() => handleWeightFreezeSubmit()}
                disabled={type != 'Freeze' || weightDiscrepancyData.status_id == 1}
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