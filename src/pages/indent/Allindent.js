import React from 'react'

const Allindent = () => {
  return (
<div className="grid grid-cols-3 gap-4">
  <div className="mt-5 mx-5 w-full p-4 bg-white rounded-lg shadow"> 
    <div className="mb-2 flex  border-b border-gray-200 pb-2">
      <div>#192039</div>
      <div>11-11-2023</div>
    </div>
    <div className="mb-2 border-b border-gray-200 pb-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-row">
        <input type="checkbox" className="form-checkbox mt-3 text-green-500 mr-2" />
        <ul className="list-disc pl-4">  
        <li className="text-gray-600 text-sm">Ahmedabad</li>
        <li className="text-gray-600 text-sm">Mumbai</li>
        </ul>
        </div>
        <div className="text-sm text-gray-500">0 Stop(s)</div>
      </div>
    </div>
    <div className="flex items-center mb-2">
      <div className="w-1/3">
        <label>PRICE</label>
        <p className="text-lg font-bold">₹20</p>
      </div>
      <div className="w-1/3">
      <label>TRUCK TYPE & TON</label>
        <p className="text-sm text-gray-500">32 Ft SXL (5 MT)</p>
      </div>
      <div className="w-1/3 pl-4">
        <label>MATERIAL TYPE</label>
        <p className="text-sm text-gray-500">Agriculture</p>
      </div>
    </div>
<div className="flex w-full justify-between items-end mt-2 border-t border-gray-200">
  <div className="text-sm text-gray-500 mr-auto">  
      <p>12 truck(s) matched</p>
  </div>
  <div className="text-sm font-medium self-end">
    Sujitkumar Tiwari
  </div>
</div>
</div>
</div>

  )
}

export default Allindent