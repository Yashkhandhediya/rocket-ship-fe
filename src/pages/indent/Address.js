import React, {useState} from 'react'
import axios from 'axios';

const Address = ({ isVisible, onClose }) => {
  const [address,setAddress] = useState('')


  const handleSubmit = () => {
    console.log("Submit Address API")
  }


  return (
    
    isVisible && (
      <div className="relative">
      <div className={`fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-500 ease-out`}>
        <div className={`bg-white p-10 rounded shadow-lg w-[50%] transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-500 ease-out`}>
          <h2 className="mb-4 text-xl font-bold">Enter Address</h2>
          <div className="mb-4">
            <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your address"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>)
  )
}

export default Address