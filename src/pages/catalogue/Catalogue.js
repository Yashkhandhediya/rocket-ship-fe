import React,{useState} from 'react'
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';

const Catalogue = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleSampleFile = () => {
    const headers = {'Content-Type': 'application/json'}
    axios.get(BACKEND_URL + '/product/get_sample_file/',{
      responseType:'blob'
    },{headers})
    .then((res) => {
      const url = URL.createObjectURL(res.data);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'sample_file.csv'; // Set the file name you want to use for the download

        // Append the link to the DOM
        document.body.appendChild(link);

        // Programmatically trigger a click on the link to start the download
        link.click();

        // Clean up by removing the link element from the DOM
        document.body.removeChild(link);
    }).catch((err) => {
      console.log("Error in File",err)
    })
  }
  return (
    <PageWithSidebar>
    <div className="flex flex-row justify-between">
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
      <button className='bg-black border p-2 ml-2 rounded-md' title='Download Product File' style={{color: "white"}}>
          <svg className="w-6 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"/>
          </svg>
      </button>
    </div>
    </div>
    <hr className="ml-2 border-t-2 border-gray-300 my-4"></hr>
    {isPopupVisible && (
      <div className="w-full fixed mt-2 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
              <div className="w-[40%] h-[45%] bg-white rounded-lg p-6">
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

                <div className="w-[80%] h-[15%] bg-gray-200 flex flex-row border rounded-md">
                <button className="ml-16 flex items-center border rounded-md hover:cursor-not-allowed" disabled={true}>
                </button>
                <div className="ml-48 border rounded-md xl:ml-96">
                    <div htmlFor="fileUpload" className="ml-2 bg-white  text-black py-1 px-3 rounded-md cursor-pointer flex items-center">
                      <FontAwesomeIcon icon={faFile} />
                      <span className="buttonText">Browse</span>
                    </div>
                    <button className='border rounded-md'><input id="fileUpload" type="file" className="hidden" /></button>
                  </div>
                </div>
        
                <div className="flex justify-end mt-6">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline">Upload Products</button>
                  <button className="ml-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setIsPopupVisible(false)}>Cancel</button>
                </div>
              </div>
      </div>
      )}
    </PageWithSidebar>
  )
}

export default Catalogue