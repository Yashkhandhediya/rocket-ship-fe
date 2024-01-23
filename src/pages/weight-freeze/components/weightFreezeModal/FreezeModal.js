import { useState } from 'react';
import { upload } from '../../../../common/icons';

const FreezeModal = ({ setShow, data }) => {
    const [images, setImages] = useState({
        image1: '',
        image2: '',
        length: '',
        width: '',
        height: '',
        weight: '',
        label: '',
    });

    const [packageDetails, setPackageDetails] = useState({
        length: data.package_details.length,
        width: data.package_details.width,
        height: data.package_details.height,
        weight: data.package_details.dead_weight,
        chargableWeight: '0',
    })

    const packageData = [
        {
            label: 'Length',
            name: 'length',
            id: 'length',
            value: packageDetails.length,
            unit: 'CM',
        },
        {
            label: 'Width',
            name: 'width',
            id: 'width',
            value: packageDetails.width,
            unit: 'CM',
        }, {
            label: 'Height',
            name: 'height',
            id: 'height',
            value: packageDetails.height,
            unit: 'CM',
        }, {
            label: 'Weight',
            name: 'weight',
            id: 'weight',
            value: packageDetails.weight,
            unit: 'KG',
        }, {
            label: 'Chargable Weight',
            name: 'chargableWeight',
            id: 'chargableWeight',
            value: packageDetails.chargableWeight,
            unit: 'KG',
        }
    ]

    const packageImagesData = [
        {
            label: 'Length',
            name: 'length',
            id: 'length_image',
            value: images.length,
        },
        {
            label: 'Width',
            name: 'width',
            id: 'width_image',
            value: images.width,
        }, {
            label: 'Height',
            name: 'height',
            id: 'height_image',
            value: images.height,
        }, {
            label: 'Weight',
            name: 'weight',
            id: 'weight_image',
            value: images.weight,
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
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                <div className="relative mx-0 my-6 w-full max-w-5xl">
                    {/*content*/}
                    <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                        {/*header*/}
                        <div className="border-blueGray-200 flex w-full items-center justify-center rounded-t border-b border-solid p-5">
                            <h3 className="text-2xl font-semibold">Add Product and Package Details</h3>
                            <button
                                className="border-0 bg-transparent p-1 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                                onClick={() => setShow(false)}>
                                <span className="block h-6 w-6 bg-transparent text-black opacity-50 outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                            {/* To do : Active this button and move it to the right corner */}
                        </div>
                        {/*body*/}
                        <div className="relative flex-auto p-6">

                            <p className="text-lg font-semibold">Product Details</p>
                            <div className="m-1 flex flex-col rounded-md border border-gray-200">
                                {/* Product Information */}
                                <div className="gap-8 flex flex-row p-4 px-8">

                                    {/* Product Name and Category Section */}
                                    <div className="flex w-[55%] flex-col gap-4">
                                        {/* Product Name */}
                                        <div>
                                            <p className="w-full">Product Name</p>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={data.name}
                                                className="mt-2 h-8 w-full rounded-lg border-gray-300 bg-[#ECF1F2] focus:border-gray-300 focus:ring-0"
                                                readOnly
                                            />
                                        </div>
                                        {/* Product Category */}
                                        <div>
                                            <p>Product Category</p>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Product Category"
                                                className="mt-2 h-8 w-full rounded-lg border-gray-300 text-[12px] font-normal focus:border-gray-300 focus:ring-0"
                                            />
                                            {/* Todo : Give auto suggestion filtered on the basis of user input */}
                                        </div>
                                    </div>

                                    {/* Product Image Section */}
                                    <div className="flex w-[45%] flex-col">
                                        <p>Product Images </p>
                                        <div className="mt-2 flex flex-row gap-8 rounded-lg">
                                            {/* Image 1 */}
                                            <div className='flex h-32 flex-col w-[40%]'>
                                                <div className="flex h-32 cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-blue-500">
                                                    <label htmlFor="image1" className="w-full">
                                                        <div className="flex cursor-pointer flex-col items-center justify-center">
                                                            {images.image1 ? (
                                                                <div className='flex justify-center w-[90%] h-[90%]'>
                                                                    <img src={images.image1} alt="" className='object-fill h-28' />
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <img src={upload} alt="" />
                                                                    <p>Upload Image</p>
                                                                    <input type="file" className="hidden" name="image1" accept=".jpg,.png,.gif,.jpeg" id="image1" onChange={handleFileChange}
                                                                    />
                                                                </>
                                                            )}
                                                        </div>
                                                    </label>
                                                </div>
                                                {images.image1 && (
                                                    <button className='border border-blue-400 text-blue-400 mt-2 py-1 rounded-md hover:bg-blue-600 hover:text-white'>
                                                        <label htmlFor="image1">
                                                            Change image
                                                            <input type="file" className="hidden" name="image1" accept=".jpg,.png,.gif,.jpeg" id="image1" onChange={handleFileChange}
                                                            />
                                                        </label>
                                                    </button>
                                                )}
                                            </div>
                                            {/* Image 2 */}
                                            <div className='flex h-32 flex-col w-[40%]'>
                                                <div className="flex h-32 cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-blue-500">
                                                    <label htmlFor="image2" className="w-full">
                                                        <div className="flex cursor-pointer flex-col items-center justify-center">
                                                            {images.image2 ? (
                                                                <div className='flex justify-center w-[90%] h-[90%]'>
                                                                    <img src={images.image2} alt="" className='object-fill h-28' />
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <img src={upload} alt="" />
                                                                    <p>Upload Image</p>
                                                                    <input type="file" className="hidden" name="image2" accept=".jpg,.png,.gif,.jpeg" id="image2" onChange={handleFileChange}
                                                                    />
                                                                </>
                                                            )}
                                                        </div>
                                                    </label>
                                                </div>
                                                {images.image2 && (
                                                    <button className='border border-blue-400 text-blue-400 mt-2 py-1 rounded-md hover:bg-blue-600 hover:text-white'>
                                                        <label htmlFor="image2">
                                                            Change image
                                                            <input type="file" className="hidden" name="image2" accept=".jpg,.png,.gif,.jpeg" id="image2" onChange={handleFileChange}
                                                            />
                                                        </label>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center w-full border-0 text-[12px] border-t-2 bg-[#f8f8f892] py-2">
                                    Notes :&nbsp;<span className='font-normal'> Uploaded images should be less than 5mb</span>
                                </div>
                            </div>


                            <p className='text-lg font-semibold'>Package Details</p>
                            <div className="m-1 flex flex-col rounded-md border border-gray-200">
                                {/* Package Information */}
                                <div className="gap-8 flex flex-row p-4 px-8">
                                    {packageData.map((item, key) => {
                                        return (
                                            <div key={key} className="flex flex-col">
                                                <p>
                                                    {item.label}
                                                    {item.name !== 'chargableWeight' && <span className='text-red-500'>*</span>}
                                                </p>
                                                <div>
                                                    <input type="number" name={item.name} id={item.id}
                                                        className={`mt-2 h-8 w-3/4 rounded-l-lg border border-gray-300 text-[12px] font-normal focus:border-gray-300 focus:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${item.name === 'chargableWeight' && 'bg-[#ECF1F2]'}`}
                                                        onChange={(e) => setPackageDetails({ ...packageDetails, [item.name]: e.target.value })}
                                                        placeholder={item.name !== 'chargableWeight' ? 'Enter ' + item.label : '0'}
                                                        readOnly={item.name === 'chargableWeight'}
                                                        required={item.name !== 'chargableWeight'}
                                                        value={item.value}
                                                    />
                                                    <button className='h-8 w-1/4 rounded-r-lg text-white bg-blue-600 focus:outline-none focus:ring-0'>
                                                        {item.unit}
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="flex justify-center items-center w-full border-0 text-[12px] border-t-2 bg-[#f8f8f892] py-2">
                                    Notes :&nbsp;
                                    <span className='font-normal'>
                                        Chargable weight is the higher between entered weight and volumetric weight
                                    </span>
                                </div>
                            </div>

                            <p className='text-lg font-semibold'>Package Images</p>
                            <div className="m-1 flex flex-col rounded-md border border-gray-200">
                                {/* Package Images */}
                                <div className="gap-8 flex flex-row p-4 h-44 px-8">
                                    {packageImagesData.map((item, key) => {
                                        return (
                                            <div className='flex h-40 flex-col w-[40%]' key={key}>
                                                <div className="flex h-32 cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-blue-500">
                                                    <label htmlFor={item.id} className="w-full">
                                                        <div className="flex cursor-pointer flex-col items-center justify-center">
                                                            {item.value ? (
                                                                <div className='flex justify-center w-[90%] h-[90%]'>
                                                                    <img src={item.value} alt="" className='object-fill h-28' />
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <img src={upload} alt="" />
                                                                    <p>Upload Image</p>
                                                                    <input type="file" className="hidden" name={item.name} accept=".jpg,.png,.gif,.jpeg" id={item.id} onChange={handleFileChange}
                                                                    />
                                                                </>
                                                            )}
                                                        </div>
                                                    </label>
                                                </div>
                                                {item.value ? (
                                                    <button className='border border-blue-400 text-blue-400 py-1 mt-2 rounded-md hover:bg-blue-600 hover:text-white'>
                                                        <label htmlFor={item.id}>
                                                            Change image
                                                            <input type="file" className="hidden" name={item.name} accept=".jpg,.png,.gif,.jpeg" id={item.id} onChange={handleFileChange}
                                                            />
                                                        </label>
                                                    </button>
                                                ) : (
                                                    <p className='text-center py-1 mt-2'>Package {item.label}</p>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="flex justify-center items-center w-full border-0 text-[12px] border-t-2 bg-[#f8f8f892] py-2">
                                    Notes :&nbsp;
                                    <span className='font-normal'>
                                        Uploaded images should be less than 5mb
                                    </span>
                                </div>
                            </div>

                        </div>


                        {/*footer*/}
                        <div className="border-blueGray-200 flex items-center justify-center rounded-b border-t border-solid p-6">
                            <button
                                className="mb-1 mr-1 px-12 rounded-lg py-2 text-sm border border-blue-400 text-blue-400 outline-none transition-all duration-150 ease-linear focus:outline-none hover:shadow-lg font-semibold"
                                type="button"
                                onClick={() => setShow(false)}>
                                Cancel
                            </button>
                            <button
                                className="mb-1 mr-1 rounded-lg bg-blue-600 px-6 py-2 text-sm text-white shadow outline-none transition-all duration-150 border ease-linear hover:shadow-lg focus:outline-none font-semibold"
                                type="button"
                                onClick={() => setShow(false)}>
                                Request Weight Freeze
                            </button>
                        </div>

                    </div>
                </div >
            </div >
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
    );
};

export default FreezeModal;
