import React, {useState} from 'react'
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import axios from 'axios';

const Address = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [address,setAddress] = useState('')

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleSubmit = () => {
    console.log("Submit Address API")
  }


  return (
    <PageWithSidebar>
    <div className="relative">
    <h1 className='ml-4 mt-4 mb-2 text-2xl'>Add New Address</h1>
    <button onClick={togglePopup} className="mt-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded">Add Address</button>

    {/* Popup Component */}
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 ${isPopupVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ${isPopupVisible ? 'pointer-events-auto' : 'pointer-events-none'} flex items-center justify-center`}>
      <div className={`bg-white p-4 rounded shadow-lg w-[40%] h-[25%] transform transition-transform duration-500 ${isPopupVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <label htmlFor="input" className="block text-sm mb-4 font-medium text-gray-700">Enter Address</label>
        <input id="input" type="text" className="block w-full border border-gray-300 rounded-md p-3 mb-4" 
            placeholder="Enter Address"
            value={address || ''}
            onChange={(e) => setAddress(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={togglePopup} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => handleSubmit()}>Submit</button>
        </div>
      </div>
    </div>
  </div>
  </PageWithSidebar>
  )
}

export default Address