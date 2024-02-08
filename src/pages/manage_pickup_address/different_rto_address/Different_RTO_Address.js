import { useState } from "react"
import { CustomTooltip } from "../../../common/components"

const Different_RTO_Address = ({ address, handleInputChange, handleOTP, rtoPhoneVerified }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="flex flex-row w-full items-center justify-between">
        <div className="flex flex-col w-[40%] gap-3">
          <label htmlFor="select_addres" className="text-[12px] flex flex-row items-center gap-4 text-[#656565] font-semibold">
            <span>
              Selected Pickup Address :
            </span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 text-[12px] rounded-md p-2 h-7 text-[#3A3F54]"
            placeholder="Search an Existing Pickup Location"
            name='search'
            onChange={(e) => handleInputChange(e)}
            value={address.search}
          />
          <CustomTooltip text={"RTO Address is only Applicable for: Blue Dart, Delhivery, Ecom Express, Ekart, Shadowfax, Xpressbees , Rapid Delivery, DTDC, Loadshare Networks, Milesawayy, Kerry Indev ,India Post,Dependo"}>
            <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#9A9A9A" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z" clipRule="evenodd" />
            </svg>
          </CustomTooltip>
        </div>
        <div className="text-[12px]">
          <p className="rounded-full border border-[#d3d3d3] p-1">OR</p>
        </div>
        <div className="flex flex-col w-[40%] items-start justify-center">
          <button className="flex-row flex items-center gap-1 text-[12px] bg-green-200 px-2 py-1 rounded text-green-500" onClick={() => { setShow(!show) }}>
            <span>Add a new RTO Address</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`w-4 h-4 transition-all duration ${show ? 'rotate-180' : 'rotate-0'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>
          </button>
          <p className="ml-5 text-[12px] text-[#656565]">*New address will be saved as a pickup address</p>
        </div>
      </div>
      <div className="flex flex-col w-full transition-all duration-300 ease-in-out">
        <div className={`overflow-hidden flex flex-col transition-max-height gap-0 duration-700 ease-in-out ${show ? 'max-h-96 mb-4' : 'max-h-0'}`}>
          <span className="text-[15px] text-[#333333] font-semibold mb-3">RTO Contact Info</span>
          <div className="flex flex-row mt-2 justify-between">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#61576E] font-bold flex flex-row items-center gap-1">
                Address Nickname
                <span className='text-red-500'>*</span>
                <CustomTooltip placement='right' style='dark' text={'It acts as a nickname for your pick up address . We recommend you to enter a value which  can be easily recalled.'}>
                  <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#9A9A9A" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z" clipRule="evenodd" />
                  </svg>
                </CustomTooltip>
              </label>
              <input
                type="text"
                name='rtoNickName'
                className="w-[9.5rem] border border-gray-300 text-[12px] rounded-md p-2 h-7 text-[#3A3F54]"
                placeholder="Enter Address Nickname"
                onChange={(e) => handleInputChange(e)}
                value={address.rtoNickName}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#61576E] font-bold flex flex-row items-center gap-1">
                Contact Name
                <span className='text-red-500'>*</span>
              </label>
              <input
                type="text"
                className="w-[9.5rem] border border-gray-300 text-[12px] rounded-md p-2 h-7 text-[#3A3F54]"
                placeholder="Enter Contact Name"
                name='rtoContactName'
                onChange={(e) => handleInputChange(e)}
                value={address.rtoContactName}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#61576E] font-bold flex flex-row items-center gap-1">
                Phone
                <span className='text-red-500'>*</span>
                <CustomTooltip placement='top' style='dark' text={'Enter contact details of your warehouse manager/operations head available at this pickup location'}>
                  <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#9A9A9A" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z" clipRule="evenodd" />
                  </svg>
                </CustomTooltip>
              </label>
              <input
                type="number"
                className="w-[9.5rem] border border-gray-300 text-[12px] rounded-md p-2 h-7 text-[#3A3F54] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="Enter Phone Number"
                name='rtoPhone'
                onChange={(e) => handleInputChange(e)}
                value={address.rtoPhone}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#61576E] font-bold flex flex-row items-center gap-1">
                Alternate Phone
                <CustomTooltip placement='top' style='dark' text={'Provide a secondary contact number for your buyers (For example: Customer Care Number)'}>
                  <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#9A9A9A" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z" clipRule="evenodd" />
                  </svg>
                </CustomTooltip>
              </label>
              <input
                type="number"
                className="w-[9.5rem] border border-gray-300 text-[12px] rounded-md p-2 h-7 text-[#3A3F54] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="Enter Alternate Number"
                name='rtoAlternatePhone'
                onChange={(e) => handleInputChange(e)}
                value={address.rtoAlternatePhone}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#61576E] font-bold flex flex-row items-center gap-1">
                Email
                <span className='text-red-500'>*</span>
              </label>
              <input
                type="email"
                className="w-[9.5rem] border border-gray-300 text-[12px] rounded-md p-2 h-7 text-[#3A3F54]"
                placeholder="Enter Email Id"
                name='rtoEmail'
                onChange={(e) => handleInputChange(e)}
                value={address.rtoEmail}
              />
            </div>
          </div>
          <div className="flex flex-row mt-2 justify-between">
            <div className="flex flex-col gap-1 w-[6.5rem]">
            </div>
            <div className={`flex flex-col gap-1 ${rtoPhoneVerified ? 'w-[9.5rem]' : 'w-[6.5rem]'}`}>
            </div>
            <div className={`flex flex-row gap-1 w-[12.5rem] ${rtoPhoneVerified ? 'justify-start' : 'justify-between'} items-center`}>
              {rtoPhoneVerified ?
                <>
                  <div className="bg-[#27C24C] text-white flex flex-row gap-2 px-2 rounded-md text-[11px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    Verified
                  </div>
                </>
                :
                <>
                  <div className='text-[12px] text-green-600 cursor-pointer' onClick={() => handleOTP('rto')}>Verify via OTP</div>
                  <div className='text-[12px] text-gray-600 border rounded-full p-1'>OR</div>
                  <div className='text-[12px] text-green-600 cursor-pointer'>Verify via IVR</div>
                </>}
            </div>
            <div className="flex flex-col gap-1 w-[6.5rem]">
            </div>
            <div className="flex flex-col gap-1 w-[6.5rem]">
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row w-full justify-between">
              <div className="flex flex-col gap-1.5 w-[48.5%]">
                <label className="text-[12px] text-[#61576E] font-bold flex flex-row items-center gap-1">
                  Address Line 1
                  <span className='text-red-500'>*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 text-[12px] rounded-md p-2 h-7 text-[#3A3F54]"
                  placeholder="Enter Address Line 1"
                  name='rtoAddressLine1'
                  onChange={(e) => handleInputChange(e)}
                  value={address.rtoAddressLine1}
                />
              </div>
              <div className="flex flex-col gap-1.5 w-[48.5%]">
                <label className="text-[12px] text-[#61576E] font-bold flex flex-row items-center gap-1">
                  Address line 2
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 text-[12px] rounded-md p-2 h-7 text-[#3A3F54]"
                  placeholder="Enter Address line 2"
                  name='rtoAddressLine2'
                  onChange={(e) => handleInputChange(e)}
                  value={address.rtoAddressLine2}
                />
              </div>
            </div>
            <div className="flex flex-row justify-start w-full gap-6">
              <div className="flex flex-col gap-1 w-[23%]">
                <label className="text-[12px] text-[#61576E] font-bold flex flex-row items-center gap-1">
                  Pincode
                  <span className='text-red-500'>*</span>
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 text-[12px] rounded-md p-2 h-7 text-[#3A3F54] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="Enter Pincode"
                  name='rtoPincode'
                  onChange={(e) => handleInputChange(e)}
                  value={address.rtoPincode}
                  max={999999}
                />
              </div>
              <div className="flex flex-col gap-1 w-[23%]">
                <label className="text-[12px] text-[#61576E] font-bold flex flex-row items-center gap-1">
                  City
                  <span className='text-red-500'>*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 text-[12px] rounded-md p-2 h-7 text-[#3A3F54] cursor-not-allowed bg-[#DDDDDD] "
                  disabled
                  value={address.rtoCity}
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-1 w-[23%]">
                <label className="text-[12px] text-[#61576E] font-bold flex flex-row items-center gap-1">
                  State
                  <span className='text-red-500'>*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 text-[12px] rounded-md p-2 h-7 text-[#3A3F54] bg-[#dddddd] cursor-not-allowed"
                  placeholder="Select a State"
                  disabled
                  readOnly
                  value={address.rtoState}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Different_RTO_Address
