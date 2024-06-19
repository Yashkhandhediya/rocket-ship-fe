import React, {useState,useEffect} from 'react'
import { CustomMultiSelect } from '../../../common/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

const Sku = ({show,onClose}) => {
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState('');

    const [isShow,setIsShow] = useState(show)

    useEffect(() => {
        setIsShow(show);
      }, [show]);
    
      const handleClose = () => {
        setIsShow(false);
        onClose(); 
      };
  
      const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
    
      const handleSearchChange = (e) => {
        setSearch(e.target.value);
      };

      const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
      };

      const handleFileChange = (event) => {
        const { id } = event.target;
        const file = event.target.files[0];
        setSelectedFileName(file.name);
        setSelectedFile(file);
      };


      const handleUpload = async () => {
        // if (!selectedFile) {
        //   console.log('No file selected');
        //   return;
        // }
    
        //   const payload = {
        //     excel_file: selectedFileBinaryString
        // };
    
        // const formData = new FormData();
        // // const binaryBlob = dataURLtoBlob(selectedFile);
        // formData.append('excel_file', selectedFile, 'sample.xlsx');
    
        // Convert the binary string back to a Blob object for FormData usage
        // const binaryBlob = new Blob([selectedFileBinaryString], { type: 'application/octet-stream' });
    
        // Add the binary blob as the value of the excel_file field
        // formData.append("excel_file", selectedFileBinaryString, 'sample.xls');
    
        // try {
        //   // Make the POST request to the server using axios
        //   const response = await axios.post(BACKEND_URL + '/product/add_product_catalogue', formData, {
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
        // const headers = { 'Content-Type': 'application/json' };
        // axios
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

  return (
    <div className="w-full mt-2 border-2 rounded-md p-3">
    <div className="flex flex-row justify-between items-center mb-2">
      <label className="block text-gray-500 font-semibold mb-2">Product SKU</label>
      <button onClick={() => handleClose()}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      </div>
      <div className="w-64 relative">
      <button
        onClick={toggleDropdown}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-left"
      >
        Pickup Location ID
        <span className="float-right font-semibold">{isDropdownOpen ? '▲' : '▼'}</span>
      </button>
      {isDropdownOpen && (
        <div className="absolute inset-x-0 top-full w-64 bg-white border-gray-300 rounded-md shadow-lg">
          <input
            type="text"
            className="w-64 border-b rounded-md border-gray-300"
            placeholder="Search Product"
            value={search}
            onChange={handleSearchChange}
          />
          <div>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <div key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  {category}
                </div>
              ))
            ) : (
              <div className="px-2 py-2 text-gray-500">No Product Found</div>
            )}
          </div>
        </div>
      )}
      </div>

      <div className="flex items-center justify-center">
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border-4 border-green-500 text-green-500 text-sm font-semibold">
                    OR
                </span>
      </div>

      <div className="w-full p-4 flex items-center">
        <input
          type="text"
          placeholder="No Product SKU Uploaded yet."
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          value={selectedFileName}
          disabled
        />
        <button
          className="ml-4 px-4 py-2 bg-[#8ce83c] text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        onClick={() => togglePopup()}>
          Upload Product SKU
        </button>
      </div>


      {isPopupVisible && (
        <div className="fixed inset-0 z-50 mt-2 flex w-full items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="h-[40%] w-[30%] rounded-lg bg-white p-6 sm:w-[40%] md:w-[35%]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Upload Product SKU via CSV</h3>
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
            <p className="mb-4 text-gray-600 text-sm">
            Please download below given template remove sample Product SKU and upload your data. Make sure the file is in csv format.
            </p>
            <div className="flex flex-col">
              <button className="font-base mb-2 text-left text-sm text-blue-500" onClick={handleSampleFile}>
                Download Sample File
              </button>
              {/* <button className="font-base mb-2 text-left text-sm text-blue-500">
                Download Categories CSV
              </button> */}
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

            <div className="mt-10 flex justify-end">
              <button
                className="focus:shadow-outline rounded bg-blue-500  px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
                onClick={handleUpload}>
                Upload
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

    </div>
  )
}

export default Sku