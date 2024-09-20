import React from 'react'
import { map } from '../../../common/icons'
import { rate_calculator } from '../../../common/images'
import { rate_international } from '../../../common/images'

const Details = ({flag,onCityChange,onDestinationChange}) => {
  console.log("Jdvnkv",onCityChange)
  return (
    <div className="flex flex-col items-center justify-center gap-8 border rounded-lg shadow-md bg-white mt-4 w-[25%] ml-4">
  <div className="flex flex-col items-center gap-4 w-[100%] mt-2">
  <div className="flex flex-row">
  <img src={map} className='w-7 h-7'></img>
    <span className='font-bold mt-2'>Pickup Location</span>
  </div>
    <div className="w-[60%] bg-gray-100  border-gray-400 rounded-lg p-2 border border-dotted text-gray-600">
    <div className='text-center font-semibold'>{onCityChange?.city || 'City'},</div> 
    <div className='text-center font-bold text-lg'>{onCityChange?.state || 'State'}</div>
    </div>
  </div>
  <div className="h-14 border-l-2 border-dashed border-gray-300"></div>
  <div className="flex flex-col items-center gap-4 w-[100%] mb-2">
  <div className="flex flex-row">
  <img src={map} className='w-7 h-7'/>
   <span className='font-bold mt-2'>
   {flag ? "Delivery Country" : "Delivery Location"}
   </span>
  </div>
  <div className="w-[60%] bg-gray-100  border-gray-400 rounded-lg p-2 border border-dotted text-gray-600">
    {flag ? <div className='text-center font-bold text-lg'>{onCityChange?.country || 'Country'}</div> :
    <div>
    <div className='text-center font-semibold'>{onDestinationChange?.city || 'City'},</div> 
    <div className='text-center font-bold text-lg'>{onDestinationChange?.state || 'State'}</div>
    </div> 
    }
  </div>
  </div>
  {flag ? <img src={rate_international} className='w-[80%]'/> : <img src={rate_calculator} className='w-[80%]'/>}
</div>
  )
}

export default Details