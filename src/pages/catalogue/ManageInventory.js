import React, { useEffect, useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { Loader } from '../../common/components';
// import { ACCESS_TOKEN } from '../../common/utils/config';
import { noData } from '../../common/images';
import { Button } from 'flowbite-react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import CatalogueTab from './CatalogueTab';
import { format, parseISO } from 'date-fns';
import apiClient from '../../common/utils/apiClient';

const ManageInventory = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const user_email = localStorage.getItem('user_email');
  const user_id = localStorage.getItem('user_id');
  const [itemsPerPage, setItemsPerPage] = useState(15);
  // const [currentItems, setCurrentItems] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [incrementDisabled, setIncrementDisable] = useState(false);

  const handleChange = (event) => {
    setItemsPerPage(event.target.value);
  };

  const handlePageIncrement = () => {
    setPage((prev) => prev + 1);
  };

  const handlePageDecrement = () => {
    setPage((prev) => (prev <= 1 ? prev : prev - 1));
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  // const paginate = (page_item) => {
  //   if(page_item > 0){
  //       console.log("kdkl",page_item)
  //       setItemsPerPage(page_item)
  //   }else{
  //       setItemsPerPage(10)
  //   }
  // };

  //   const handleFileChange = (event) => {
  //     // Get the selected file
  //     const file = event.target.files[0];
  //     // Set the file name in the state
  //     const acceptedFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
  //     const validExtensions = ['.xls', '.xlsx'];
  //     if (!acceptedFileTypes.includes(file.type)) {
  //         console.error('Invalid file type selected. Please select an Excel file.');
  //         toast('Invalid file type selected. Please select an Excel file.', { type: 'error' });
  //         return;
  //     }

  //     setSelectedFile(file)
  //     if (file) {
  //         setSelectedFileName(file.name);
  //     }

  //     const fileReader = new FileReader();

  //     // Define the onload event handler
  //     fileReader.onload = (event) => {
  //         // The result contains the file content as an array buffer
  //         const arrayBuffer = event.target.result;

  //         // Convert the array buffer to a binary string
  //         // const binaryString = arrayBufferToBinaryString(arrayBuffer);
  //         const binaryString = new Blob([arrayBuffer], { type: file.type });

  //         // You can use the binary string as needed in your application
  //         console.log('Binary string:', binaryString);
  //         setSelectedFileBinaryString(binaryString); // Set binary string to state if needed
  //     };

  //     // Read the file as an array buffer
  //     fileReader.readAsArrayBuffer(file);
  // };

  const handleFileChange = (event) => {
    const { id } = event.target;
    const file = event.target.files[0];
    setSelectedFileName(file.name);
    setSelectedFile(file);
  };

  const handleCatalogueData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(
        `${BACKEND_URL}/product/get_all_inventory/?user_id=${user_id}&page=${page}&page_size=${itemsPerPage}`,
      );
      if (response.status === 200) {
        setData(response.data);
        setIncrementDisable(false);
      } else {
        toast(`There is some error while fetching orders`, { type: 'error' });
        setIncrementDisable(true);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setIncrementDisable(false);
      toast(`There is some error while fetching orders`, { type: 'error' });
    }
  };

  useEffect(() => {
    handleCatalogueData();
  }, [itemsPerPage, page]);

  // const dataURLtoBlob = (dataURL) => {
  //   const parts = dataURL.split(';base64,');
  //   const contentType = parts[0].split(':')[1];
  //   const base64Data = parts[1];
  //   const byteCharacters = atob(base64Data);
  //   const byteNumbers = new Array(byteCharacters.length);

  //   for (let i = 0; i < byteCharacters.length; i++) {
  //       byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }

  //   const byteArray = new Uint8Array(byteNumbers);
  //   return new Blob([byteArray], { type: contentType });
  // };

  // const arrayBufferToBinaryString = (arrayBuffer) => {
  //   const bytes = new Uint8Array(arrayBuffer);
  //   let binaryString = '';

  //   for (let i = 0; i < bytes.length; i++) {
  //       binaryString += String.fromCharCode(bytes[i]);
  //   }

  //   return binaryString;
  // };

  const handleUpload = async () => {
    console.log('upload');
    // if (!selectedFile) {
    //   console.log('No file selected');
    //   return;
    // }

    // //   const payload = {
    // //     excel_file: selectedFileBinaryString
    // // };

    // const formData = new FormData();
    // // const binaryBlob = dataURLtoBlob(selectedFile);
    // formData.append('excel_file', selectedFile, 'sample.xlsx');

    // // Convert the binary string back to a Blob object for FormData usage
    // // const binaryBlob = new Blob([selectedFileBinaryString], { type: 'application/octet-stream' });

    // // Add the binary blob as the value of the excel_file field
    // // formData.append("excel_file", selectedFileBinaryString, 'sample.xls');

    // try {
    //   // Make the POST request to the server using apiClient
    //   const response = await apiClient.post(BACKEND_URL + '/product/add_product_catalogue', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       // "Authorization":ACCESS_TOKEN
    //     },
    //   });

    //   // Handle the response
    //   if (response.status === 200) {
    //     const data = response.data;
    //     console.log('File uploaded successfully:', data);
    //     toast('File uploaded successfully:', { type: 'success' });
    //   } else {
    //     console.error('Failed to upload file:', response.statusText);
    //     toast('Failed to upload file:', { type: 'error' });
    //   }
    // } catch (error) {
    //   console.error('Error uploading file:', error);
    //   toast('Error uploading file:', { type: 'error' });
    // }
  };

  const handleSampleFile = () => {
    console.log('file');
    // const headers = { 'Content-Type': 'application/json' };
    // apiClient
    //   .get(
    //     BACKEND_URL + '/product/get_sample_file/',
    //     {
    //       responseType: 'blob',
    //     },
    //     { headers },
    //   )
    //   .then((res) => {
    //     const url = URL.createObjectURL(res.data);

    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = 'sample_file.xlsx';

    //     document.body.appendChild(link);

    //     link.click();

    //     // Clean up by removing the link element from the DOM
    //     document.body.removeChild(link);
    //   })
    //   .catch((err) => {
    //     console.log('Error in File', err);
    //   });
  };

  const handleDownload = () => {
    console.log('Download');
    // setLoading(true);
    // const headers = {
    //   'Content-Type': 'application/json',
    //   // "Authorization":ACCESS_TOKEN
    // };
    // apiClient
    //   .get(BACKEND_URL + '/product/send_product_mail/', { headers })
    //   .then((res) => {
    //     setLoading(false);
    //     setDownloadPopup(true);
    //   })
    //   .catch((err) => {
    //     console.log('Error in File', err);
    //     setLoading(false);
    //   });
  };

  return (
    <CatalogueTab>
      {loading && <Loader />}
      {/* <div className="ml-4 mt-2 text-base">Channel Catalog</div> */}
      <div className="w-full">
        <div className="mb-2 flex justify-between">
          <div className="ml-4 mt-2 text-xl">Inventory</div>
          <div>
            <button
              className="ml-2 rounded-md border bg-black p-2"
              title="Sync Listing"
              style={{ color: 'white', backgroundColor: 'black' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF" className="h-5 w-6">
                <path
                  fillRule="evenodd"
                  d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="ml-2 rounded-md border bg-black p-2" onClick={togglePopup}>
              <svg
                className="dark:text-white h-5 w-6 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"
                />
              </svg>
            </button>
            <button
              className="ml-2 rounded-md border bg-black p-2"
              title="Download Product File"
              style={{ color: 'white' }}
              onClick={handleDownload}>
              <svg
                className="dark:text-white h-5 w-6 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex min-h-screen w-full bg-gray-100">
          {/* <div className="ml-4 h-1/4 w-1/4 rounded-lg p-4 shadow">
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
                Channel Product
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
                Manage Inventory
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
                All Products
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
                Manage Catalogue
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
                Categories
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
                Tax Classes
              </a>
            </li>
          </ul>
        </div> */}
          <div className="w-full overflow-x-auto">
            <div className="rounded-lg bg-white shadow">
              <div className="mb-4 flex justify-between">
                <div className="flex w-full flex-row items-center border border-l-2 bg-[#FAFAFA]">
                  <div className="h-full w-1/12 flex-grow border-r-2 p-2 text-sm font-semibold">
                    Category Name
                  </div>
                  <div className="h-full w-1/12 flex-grow border-r-2 p-2 text-sm font-semibold">SKU</div>
                  <div className="h-full w-1/12 flex-grow border-r-2 p-2 text-sm font-semibold">
                    Product Name
                  </div>
                  <div className="h-full w-1/12 flex-grow border-r-2 p-2 text-sm font-semibold">
                    Total Quantity
                  </div>
                  {/* <div className="h-full w-1/12 flex-grow border-r-2 p-2 text-sm font-semibold">
                    Available Quantity
                  </div> */}
                  {/* <div className="h-full w-1/12 flex-grow border-r-2 p-2 text-sm font-semibold">
                    Blocked Quantity
                  </div> */}
                  <div className="h-full w-1/12 flex-grow border-r-2 p-2 text-sm font-semibold">Type</div>
                  {/* <div className="h-full w-1/12 flex-grow border-r-2 p-2 text-sm font-semibold">Brand</div> */}
                  <div className="h-full w-1/12 flex-grow border-r-2 p-2 text-sm font-semibold">
                    Updated On
                  </div>
                </div>
              </div>
              <div className="mb-4 flex flex-col items-center justify-between">
                {data.length === 0 ? (
                  <div className="mb-12 flex w-full flex-col items-center justify-center pt-16">
                    <img src={noData} alt="" width={'200px'} />
                    <div className="mt-10 text-[1.7rem] font-bold text-[#b54040]">No Data Available.</div>
                    <div className="mt-2 text-[14px] font-normal opacity-80">
                      Please change filters and retry.
                    </div>
                  </div>
                ) : (
                  data.map((item, index) => (
                    <div className="flex h-12 w-full flex-row items-center border bg-[#FAFAFA]" key={index}>
                      <div className="h-full w-1/12 flex-grow p-2 text-sm font-semibold">
                        {' '}
                        {item.category_name ? item.category_name : '-'}
                      </div>
                      <div className="h-full w-1/12 flex-grow border-l-2 border-r-2 p-2 text-sm font-semibold">
                        {item.sku ? item.sku : '-'}
                      </div>
                      <div className="h-full w-1/12 flex-grow border-r-2 p-2 text-sm font-semibold">
                        {item.product_name ? item.product_name : 'N.A'}
                      </div>
                      <div className="h-full w-1/12 flex-grow border-r-2 p-1 text-sm font-semibold">
                        {item.total_quantity ? item.total_quantity : '-'}
                      </div>
                      {/* <div className="h-full w-1/12 flex-grow border-r-2 p-1 text-sm font-semibold">
                        {item.available_quantity ? item.available_quantity : '-'}
                      </div> */}
                      {/* <div className="h-full w-1/12 flex-grow border-r-2 p-2 text-sm font-semibold">
                        {item.blocked_quantity ? item.blocked_quantity : '-'}
                      </div> */}
                      <div className="h-full w-1/12 flex-grow border-r-2 p-2 text-sm font-semibold">
                        {item.type ? item.type : '-'}
                      </div>
                      {/* <div className="h-full w-1/12 flex-grow border-r-2 p-2 text-sm font-semibold">
                        {item.brand ? item.brand : '-'}
                      </div> */}
                      <div className="h-full w-1/12 flex-grow border-r-2 p-2 text-sm font-semibold">
                        {item.modified_date
                          ? format(parseISO(item.modified_date), 'dd MMM yyyy hh:mm a')
                          : '-'}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="flex w-full flex-wrap-reverse justify-between gap-2 rounded-lg bg-white px-4 py-2">
              <div className="mr-2 flex items-center">
                <div className="mr-4 text-xs text-black">{'Items per page: '}</div>
                <div>
                  <select
                    id="select"
                    value={itemsPerPage}
                    className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={handleChange}>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="60">60</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center text-xs">
                <Button
                  color="light"
                  className="mr-6 border-0 *:px-3 *:text-xs *:font-normal"
                  onClick={handlePageDecrement}
                  disabled={page === 1 ? true : false}>
                  <FontAwesomeIcon icon={faArrowLeft} className="mx-2 h-4 w-3" />
                  {'PREV'}
                </Button>
                <button className="rounded-lg border-0 bg-gray-100 px-3 py-2 font-medium" disabled={true}>
                  {page}
                </button>
                <Button
                  color="light"
                  className="ml-6 border-0 *:px-3  *:text-xs *:font-normal"
                  disabled={incrementDisabled ? true : false}
                  onClick={handlePageIncrement}>
                  {'NEXT'} <FontAwesomeIcon icon={faArrowRight} className="mx-2 h-4 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <hr className="my-4 ml-2 border-t-2 border-gray-300"></hr> */}

      {isPopupVisible && (
        <div className="fixed inset-0 z-50 mt-2 flex w-full items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="h-[45%] w-[30%] rounded-lg bg-white p-6 sm:w-[40%] md:w-[35%]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Bulk Upload Channel Products</h3>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setIsPopupVisible(false)}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="mb-4 text-gray-600">
              Please first download the file and then upload it here after updating the data as per your
              requirements.
            </p>
            <div className="flex flex-col">
              <button className="font-base mb-2 text-left text-sm text-blue-500" onClick={handleSampleFile}>
                Download Sample Products File
              </button>
              <button className="font-base mb-2 text-left text-sm text-blue-500">
                Download Categories CSV
              </button>
            </div>

            <div className="mt-2 flex h-[15%] w-[100%] flex-row rounded-md border bg-gray-200">
              <p className="flex w-[80%] rounded-md border text-left hover:cursor-not-allowed">
                {selectedFileName ? selectedFileName : ''}
              </p>
              <div className="w-[20%]">
                <label className="flex cursor-pointer items-center rounded-md bg-gray-50 px-4 py-2">
                  <FontAwesomeIcon icon={faFile} />
                  <span className="ml-2 mr-4 sm:text-sm md:text-base">Browse</span>
                  <input type="file" accept=".xlsx" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="focus:shadow-outline rounded bg-blue-500  px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
                onClick={handleUpload}>
                Upload Products
              </button>
              <button
                className="focus:shadow-outline ml-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700 focus:outline-none"
                onClick={() => {
                  setIsPopupVisible(false);
                  setSelectedFileName('');
                }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {downloadPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="flex flex-row justify-between">
              <h2 className="mb-4 text-lg font-semibold">Download Product File Report</h2>
              <button
                className="mb-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setDownloadPopup(false)}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="mb-2">{`Your report has been sent to ${user_email}`}</p>
            {/* <p className="text-gray-500">OR</p> */}
            {/* <p>You can also download the report from Reports panel. <a href="#" className="text-blue-500 hover:underline">Click Here</a></p> */}
          </div>
        </div>
      )}
    </CatalogueTab>
  );
};

export default ManageInventory;
