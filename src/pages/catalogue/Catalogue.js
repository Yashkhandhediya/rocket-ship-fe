import React,{useState} from 'react'
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { Loader } from '../../common/components';

const Catalogue = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('')
  const [selectedFile,setSelectedFile] = useState('')
  const [downloadPopup,setDownloadPopup] = useState(false)
  const [loading,setLoading] = useState(false)
  const user_email = localStorage.getItem('user_email')

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

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
  setSelectedFile(file)  
};



const dataURLtoBlob = (dataURL) => {
  const parts = dataURL.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const base64Data = parts[1];
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};

// const arrayBufferToBinaryString = (arrayBuffer) => {
//   const bytes = new Uint8Array(arrayBuffer);
//   let binaryString = '';

//   for (let i = 0; i < bytes.length; i++) {
//       binaryString += String.fromCharCode(bytes[i]);
//   }
  
//   return binaryString;
// };

const handleUpload = async () => {
  if (!selectedFile) {
      console.log("No file selected");
      return;
  }

//   const payload = {
//     excel_file: selectedFileBinaryString
// };

const formData = new FormData();
// const binaryBlob = dataURLtoBlob(selectedFile);
formData.append('excel_file',selectedFile ,'sample.xlsx');
    
// Convert the binary string back to a Blob object for FormData usage
// const binaryBlob = new Blob([selectedFileBinaryString], { type: 'application/octet-stream' });

// Add the binary blob as the value of the excel_file field
// formData.append("excel_file", selectedFileBinaryString, 'sample.xls');

  try {
      // Make the POST request to the server using axios
      const response = await axios.post(BACKEND_URL + '/product/add_product_catalogue', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      });

      // Handle the response
      if (response.status === 200) {
          const data = response.data;
          console.log("File uploaded successfully:", data);
          toast("File uploaded successfully:",{type:'success'})
      } else {
          console.error("Failed to upload file:", response.statusText);
          toast("Failed to upload file:",{type:'error'})
      }
  } catch (error) {
      console.error("Error uploading file:", error);
      toast("Error uploading file:",{type:'error'})
  }
};

  const handleSampleFile = () => {
    const headers = {'Content-Type': 'application/json'}
    axios.get(BACKEND_URL + '/product/get_sample_file/',{
      responseType:'blob'
    },{headers})
    .then((res) => {
      const url = URL.createObjectURL(res.data);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'sample_file.xlsx'; 

        document.body.appendChild(link);

        link.click();

        // Clean up by removing the link element from the DOM
        document.body.removeChild(link);
    }).catch((err) => {
      console.log("Error in File",err)
    })
  }

  const handleDownload = () => {
    setLoading(true)
    const headers = {'Content-Type': 'application/json'}
    axios.get(BACKEND_URL + '/product/send_product_mail/',{headers})
    .then((res) => {
      setLoading(false)
      setDownloadPopup(true)
    }).catch((err) => {
      console.log("Error in File",err)
      setLoading(false)
    })
  }

  return (
    <PageWithSidebar>
    <div className="flex flex-row justify-between">
    {loading && <Loader /> }
    <div className='mt-2 ml-4 text-base'>Channel Catalog</div>
    <div className="flex flex-row justify-between mt-2 mx-2">
    <button className='bg-black border p-2 ml-2 rounded-md' title='Sync Listing' style={{color: "white",backgroundColor:"black"}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF" className="w-6 h-5">
              <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
          </svg>
      </button>
      <button className='bg-black border p-2 ml-2 rounded-md' onClick={togglePopup}>
          <svg className="w-6 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"/>
          </svg>    
      </button>
      <button className='bg-black border p-2 ml-2 rounded-md' title='Download Product File' style={{color: "white"}} onClick={handleDownload}>
          <svg className="w-6 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"/>
          </svg>
      </button>
    </div>
    </div>
    <hr className="ml-2 border-t-2 border-gray-300 my-4"></hr>
    {isPopupVisible && (
      <div className="w-full fixed mt-2 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
              <div className="w-[30%] h-[45%] bg-white rounded-lg p-6 md:w-[35%] sm:w-[40%]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Bulk Upload Channel Products</h3>
                  <button className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setIsPopupVisible(false)}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600 mb-4">Please first download the file and then upload it here after updating the data as per your requirements.</p>
                <div className="flex flex-col">
                  <button className="text-blue-500 font-base text-sm text-left mb-2"
                  onClick={handleSampleFile}>Download Sample Products File</button>
                  <button className="text-blue-500 font-base text-sm text-left mb-2">Download Categories CSV</button>
                </div>

            <div className="w-[100%] h-[15%] mt-2 bg-gray-200 flex flex-row border rounded-md">
                <p className="w-[80%] flex text-left border rounded-md hover:cursor-not-allowed">
                {selectedFileName?selectedFileName:""}
                </p>
                  <div className="w-[20%]">
                    <label className="flex items-center px-4 py-2 bg-gray-50 rounded-md cursor-pointer">
                      <FontAwesomeIcon icon={faFile} />
                      <span className="ml-2 mr-4 md:text-base sm:text-sm">Browse</span>
                      <input type="file" accept='.xlsx' className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
            </div>
            
        
                <div className="flex justify-end mt-6">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleUpload}>Upload Products</button>
                  <button className="ml-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => {setIsPopupVisible(false);setSelectedFileName("")}}>Cancel</button>
                </div>
              </div>
      </div>
      )}

    {downloadPopup && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-row justify-between">
          <h2 className="text-lg font-semibold mb-4">Download Product File Report</h2>
            <button className="mb-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setDownloadPopup(false)}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
            </button>
          </div>
            <p className="mb-2">{`Your report has been sent to ${user_email}`}</p>
            {/* <p className="text-gray-500">OR</p> */}
            {/* <p>You can also download the report from Reports panel. <a href="#" className="text-blue-500 hover:underline">Click Here</a></p> */}
          </div>
    </div>
    )}
    </PageWithSidebar>
  )
}

export default Catalogue