import React from 'react'
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar'

const Allindent = () => {
  return (
    <PageWithSidebar>
    <div className="grid grid-cols-3 gap-4">
      <div className="mt-5 mx-5 w-full p-4 bg-white rounded-lg shadow"> 
        <div className="mb-2 flex flex-row items-end justify-between border-b border-gray-200 pb-2">
          <div>#192039</div>
          <div>11-11-2023</div>
        </div>
        <div className="-ml-4 -mr-4 border-b border-gray-200 pb-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-row">
            <input type="checkbox" className="form-checkbox mt-3 ml-3 text-green-500 mr-2" />
            <ul className="list-disc ml-3 pl-4">  
            <li className="text-gray-600 font-bold text-sm">Ahmedabad</li>
            <li className="text-gray-600 font-bold text-sm">Mumbai</li>
            </ul>
            </div>
            <span className="bg-purple-100 text-yellow-400 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">0 Stop(s)</span>
          </div>
        </div>
        <div className="grid grid-cols-4 divide-x-2">
          <div className="-ml-2 w-1/10">
            <p className='text-xs mb-1 ml-1 text-purple-400 font-semibold'>PRICE</p>
            <p className="text-sm ml-1 text-gray-500">₹20</p>
          </div>
          <div className="-ml-14 w-3/10">
            <p className='text-xs mb-1 ml-1 text-purple-400 font-semibold'>TRUCK TYPE & TON</p>
            <p className="text-sm ml-1 text-gray-500">32Ft SXL (5 MT)</p>
          </div>
          <div className="w-6/10 flex flex-row items-end justify-between">
          <div className="">
              <p className='text-xs mb-1 ml-1 w-[50%] text-purple-400 font-semibold'>MATERIAL TYPE</p>
              <p className="text-sm ml-1 text-gray-500">Agriculture</p>
          </div>
            <button className="ml-32">
            <svg className="h-6 w-6 text-blue-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            </button>
          </div>
        </div>
    <div className="-ml-4 -mr-4 flex justify-between items-end border-t border-gray-200">
      <div className="text-sm text-gray-500 mr-auto mt-3">  
      <span className="ml-2 bg-purple-100 text-purple-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
      12 truck(s) matched
      </span>
      </div>
      <div className="mr-2 text-sm font-medium self-end">
        Sujitkumar Tiwari
      </div>
    </div>
    </div>
    </div>
    </PageWithSidebar>
  )
}

export default Allindent