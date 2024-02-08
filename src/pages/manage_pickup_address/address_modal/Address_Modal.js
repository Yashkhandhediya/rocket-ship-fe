import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CustomTooltip } from '../../../common/components';
import { BACKEND_URL } from '../../../common/utils/env.config';
import OTP_Modal from '../otp_modal/OTP_Modal';
import DifferentRTOAddress from '../different_rto_address/Different_RTO_Address';

const Address_Modal = ({ setShow }) => {

  const [showOTP, setShowOTP] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [rtoPhoneVerified, setRTOPhoneVerified] = useState(false);
  const [isPincodeValid, setIsPincodeValid] = useState(false);
  const [isRTOPincodeValid, setIsRTOPincodeValid] = useState(false);

  const [address, setAddress] = useState({
    nickName: '',
    contactName: '',
    phone: '',
    alternatePhone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    pincode: '',
    city: '',
    state: '',
    openAt: '',
    closesAt: '',
    isVendor: false,
    vendorName: '',
    vendorGSTIN: '',
    isRTO: false,
    rtoNickName: '',
    rtoContactName: '',
    rtoPhone: '',
    rtoAlternatePhone: '',
    rtoEmail: '',
    rtoAddressLine1: '',
    rtoAddressLine2: '',
    rtoPincode: '',
    rtoCity: '',
    rtoState: '',
  });

  const handleClose = () => {
    // iterate through all the keys in address and set them to empty string
    Object.keys(address).forEach((key) => {
      setAddress({ ...address, [key]: '' });
    });
    setShow(false);
  }

  const handleOTP = (type) => {
    // if phone number is not valid, return
    if (type=='phone' && address.phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    if(type=='rto' && address.rtoPhone.length < 10){
      toast.error('Please enter a valid phone number');
      return;
    }
    setShowOTP(true);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // if pincode or rto pincode is more than 6 digits, return
    if ((name === 'pincode' || name === 'rtoPincode') && value.length > 6) {
      return;
    }
    // if phone or alternate phone or rtophone or rto alternatephone is more than 10 digits, return
    if ((name === 'phone' || name === 'alternatePhone' || name === 'rtoPhone' || name === 'rtoAlternatePhone') && value.length > 10) {
      return;
    }
    if (name === 'isVendor' || name === 'isRTO') {
      setAddress({ ...address, [name]: e.target.checked });
      return;
    }
    setAddress({ ...address, [name]: value });
  }

  const fetchPinCodeDetails = async (pincode, isRTO) => {
    const url = `${BACKEND_URL}/pincode/${pincode}`;
    try {
      const response = await axios.get(url);
      const { data } = response;
      if (response.status === 200) {
        toast.success('Pincode details fetched successfully');
      }
      if (data) {
        isRTO ?
          setAddress({ ...address, rtoCity: data.Area, rtoState: data.State })
          :
          setAddress({ ...address, city: data.Area, state: data.State });
        isRTO ? setIsRTOPincodeValid(true) : setIsPincodeValid(true);
      }
    } catch (error) {
      toast.error('Error in fetching pincode details');
    }
  }

  useEffect(() => {
    if (address.pincode.length === 6 && !isPincodeValid) {
      fetchPinCodeDetails(address.pincode, false);
    }
    if (address.pincode < 6) {
      setAddress({ ...address, city: '', state: '' });
    }
    if (address.isRTO) {
      if (address.rtoPincode.length === 6 && !isRTOPincodeValid) {
        fetchPinCodeDetails(address.rtoPincode, true);
      }
      if (address.rtoPincode < 6) {
        setAddress({ ...address, rtoCity: '', rtoState: '' });
      }
    }
  }, [address.pincode, address.rtoPincode]);

  const timings = ['00:00AM', '01:00AM', '02:00AM', '03:00AM', '04:00AM', '05:00AM', '06:00AM', '07:00AM', '08:00AM', '09:00AM', '10:00AM', '11:00AM', '12:00PM', '01:00PM', '02:00PM', '03:00PM', '04:00PM', '05:00PM', '06:00PM', '07:00PM', '08:00PM', '09:00PM', '10:00PM', '11:00PM']

  return (
    <>
      {showOTP && <OTP_Modal setShow={setShowOTP} number={address.isRTO ? address.rtoPhone : address.phone} setPhoneVerified={setPhoneVerified} setRTOPhoneVerified={setRTOPhoneVerified} type={address.isRTO?'rto':'phone'}/>}
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-0 my-6 w-full max-w-4xl">
          {/*content*/}
          <div className="relative flex w-full flex-col shadow-2xl border-black rounded-lg bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="border-blueGray-200 flex w-full items-center justify-between rounded-t border-b border-solid p-5">
              <div></div>
              <h3 className="text-2xl font-semibold">{'Add Pickup Address'}</h3>
              <button
                className="border-0 bg-transparent p-1 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                onClick={() => handleClose()}>
                <span className="block h-6 w-6 bg-transparent text-black opacity-50 outline-none focus:outline-none">
                  ×
                </span>
              </button>
              {/* To do : Active this button and move it to the right corner */}
            </div>
            {/*body*/}
            <div className="overflow-y-scroll max-h-[33rem]">
              <div className="relative flex-auto p-6 pb-4">
                <div>
                  {/* Contact Info */}
                  <p className='text-[#333333] text-[15px] font-semibold'>Contact Info</p>
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
                        name='nickName'
                        className="w-[9.5rem] border border-gray-300 text-[12px] rounded-md p-2 h-7 text-[#3A3F54]"
                        placeholder="Enter Address Nickname"
                        onChange={(e) => handleInputChange(e)}
                        value={address.nickName}
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
                        name='contactName'
                        onChange={(e) => handleInputChange(e)}
                        value={address.contactName}
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
                        name='phone'
                        onChange={(e) => handleInputChange(e)}
                        value={address.phone}
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
                        name='alternatePhone'
                        onChange={(e) => handleInputChange(e)}
                        value={address.alternatePhone}
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
                        name='email'
                        onChange={(e) => handleInputChange(e)}
                        value={address.email}
                      />
                    </div>
                  </div>
                  {/* OTP Button */}
                  <div className="flex flex-row mt-2 justify-between">
                    <div className="flex flex-col gap-1 w-[6.5rem]">
                    </div>
                    <div className={`flex flex-col gap-1 ${phoneVerified ? 'w-[9.5rem]' : 'w-[6.5rem]'}`}>
                    </div>
                    <div className={`flex flex-row gap-1 w-[12.5rem] ${phoneVerified ? 'justify-start' : 'justify-between'} items-center`}>
                      {phoneVerified ?
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
                          <div className='text-[12px] text-green-600 cursor-pointer' onClick={() => handleOTP('phone')}>Verify via OTP</div>
                          <div className='text-[12px] text-gray-600 border rounded-full p-1'>OR</div>
                          <div className='text-[12px] text-green-600 cursor-pointer'>Verify via IVR</div>
                        </>}
                    </div>
                    <div className="flex flex-col gap-1 w-[6.5rem]">
                    </div>
                    <div className="flex flex-col gap-1 w-[6.5rem]">
                    </div>
                  </div>
                  {/* Address Part */}
                  <p className='text-[15px] text-[#333333] font-semibold'>Address Details</p>
                  <div className="flex flex-row gap-5 mt-2">
                    {/* Input Address */}
                    <div className="flex flex-col w-1/2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] text-[#61576E] font-bold flex flex-row items-center gap-1">
                          Address Line 1
                          <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 text-[12px] rounded-md p-2 h-7 text-[#3A3F54]"
                          placeholder="Enter Address Line 1"
                          name='addressLine1'
                          onChange={(e) => handleInputChange(e)}
                          value={address.addressLine1}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] text-[#61576E] font-bold flex flex-row items-center gap-1">
                          Address line 2
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 text-[12px] rounded-md p-2 h-7 text-[#3A3F54]"
                          placeholder="Enter Address line 2"
                          name='addressLine2'
                          onChange={(e) => handleInputChange(e)}
                          value={address.addressLine2}
                        />
                      </div>
                      <div className="flex flex-row justify-between w-full gap-4">
                        <div className="flex flex-col gap-1 w-[47%]">
                          <label className="text-[12px] text-[#61576E] font-bold flex flex-row items-center gap-1">
                            Pincode
                            <span className='text-red-500'>*</span>
                          </label>
                          <input
                            type="number"
                            className="w-full border border-gray-300 text-[12px] rounded-md p-2 h-7 text-[#3A3F54] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            placeholder="Enter Pincode"
                            name='pincode'
                            onChange={(e) => handleInputChange(e)}
                            value={address.pincode}
                            max={999999}
                          />
                        </div>
                        <div className="flex flex-col gap-1 w-[47%]">
                          <label className="text-[12px] text-[#61576E] font-bold flex flex-row items-center gap-1">
                            City
                            <span className='text-red-500'>*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 text-[12px] rounded-md p-2 h-7 text-[#3A3F54] cursor-not-allowed bg-[#DDDDDD] "
                            disabled
                            value={address.city}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-end w-full gap-4">
                        <div className="flex flex-col gap-1 w-[47%]">
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
                            value={address.state}
                          />
                        </div>
                        <div className="flex flex-col w-[47%]">
                          <p className='text-[#61576E] text-[12px] font-bold'>Warehouse Timings</p>
                          <div className="flex flex-row gap-4 pt-1">
                            <div className="flex flex-col w-1/2">
                              <label className="text-[12px] text-[#61576E] font-normal flex flex-row items-center gap-1">
                                Open at :
                              </label>
                              <select name="openAt" id="openAt" className='py-0 px-1 text-[12px] border-[#707070] rounded' onChange={(e) => { handleInputChange(e) }}>
                                {/* all timings */}
                                {timings.map((time, index) => (
                                  <option key={index} value={time}>{time}</option>
                                ))}
                              </select>
                            </div>
                            <div className="flex flex-col w-1/2">
                              <label className="text-[12px] text-[#61576E] font-normal flex flex-row items-center gap-1">
                                Closes at:
                              </label>
                              <select name="closesAt" id="closesAt" className='py-0 px-1 text-[12px] border-[#707070] rounded' onChange={(e) => { handleInputChange(e) }}>
                                {/* all timings */}
                                {timings.map((time, index) => (
                                  <option key={index} value={time}>{time}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Map Address */}
                    <div className="flex h-52 bg-[#D3D3D3] w-1/2 justify-center items-center">
                      <button className='bg-green-600 w-4/5 py-1.5 text-white rounded-md hover:bg-opacity-85'>Add Location on Map for Hyperlocal Orders</button>
                    </div>
                  </div>
                  {/* Supply Vendor and RTO address */}
                  <div className="flex flex-col gap-3 mt-6">
                    <div className="flex flex-col items-start gap-2 w-1/2">
                      <div className="flex flex-row items-center gap-2">
                        <input type="checkbox" name="isVendor" id="isVendor" className='w-4 h-4 rounded focus:ring-0 active:ring-0 active:border-0 focus:border-0 border-gray-200 text-green-500' onChange={(e) => handleInputChange(e)} checked={address.isVendor} />
                        <label htmlFor="isVendor" className='text-[#61576E] text-[12px] font-bold '>Add this address as supplier/vendor address.</label>
                        <CustomTooltip placement='right' style='dark' text={"Enable this to ship orders directly from your vendor's location and generate customer invoice with vendor details."}>
                          <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#9A9A9A" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z" clipRule="evenodd" />
                          </svg>
                        </CustomTooltip>
                      </div>
                      {address.isVendor &&
                        <div className='flex flex-row w-full gap-4 mt-2'>
                          <div className="flex flex-col w-[47%] gap-1.5">
                            <label className="text-[12px] text-[#61576E] font-bold flex flex-row items-center gap-1">
                              {"Supplier/Vendor's Name"}
                              <span className='text-red-500'>*</span>
                            </label>
                            <input
                              type="text"
                              name='vendorName'
                              className="w-full border border-gray-300 text-[12px] rounded-xl p-2 h-7 text-[#3A3F54]"
                              placeholder="Enter Vendor Name"
                              onChange={(e) => handleInputChange(e)}
                              value={address.vendorName}
                            />
                          </div>
                          <div className="flex flex-col w-[47%] gap-1.5">
                            <label className="text-[12px] text-[#61576E] font-bold flex flex-row items-center gap-1">
                              {"Supplier/Vendor's GSTIN"}
                              <span className='text-red-500'>*</span>
                            </label>
                            <input
                              type="text"
                              name='vendorGSTIN'
                              className="w-full border border-gray-300 text-[12px] rounded-xl p-2 h-7 text-[#3A3F54]"
                              placeholder="Enter Vendor GSTIN"
                              onChange={(e) => handleInputChange(e)}
                              value={address.vendorGSTIN}
                            />
                          </div>
                        </div>}
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                      <div className="flex flex-row items-center gap-2">
                        <input type="checkbox" name="isRTO" id="isRTO" className='w-4 h-4 rounded focus:ring-0 active:ring-0 active:border-0 focus:border-0 border-gray-200 text-green-500' onChange={(e) => handleInputChange(e)} checked={address.isRTO} />
                        <label htmlFor="isRTO" className='text-[#61576E] text-[12px] font-bold '>Use a different address as RTO address</label>
                      </div>
                      {address.isRTO && <DifferentRTOAddress rtoPhoneVerified={rtoPhoneVerified} address={address} handleInputChange={handleInputChange} handleOTP={handleOTP}/>}
                    </div>
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex flex-row items-center justify-center px-6 rounded-b-md">
                <button
                  className="mb-1 mr-1 px-12 rounded-lg py-2 text-sm border border-[#B07828] text-[#B07828] outline-none transition-all duration-150 ease-linear focus:outline-none hover:shadow-lg font-semibold"
                  type="button"
                  onClick={() => handleClose()}>
                  Cancel
                </button>
                <button
                  className="mb-1 mr-1 rounded-lg bg-[#B07828] px-6 py-2 text-sm text-white shadow outline-none transition-all duration-150 border ease-linear hover:shadow-lg focus:outline-none font-semibold"
                  type="button"
                  onClick={() => { console.log(address) }} //eslint-disable-line
                >
                  {'Save Address'}
                </button>
              </div>
            </div>
            <div className="h-6"></div>
          </div>
        </div >
      </div >
      <div className="fixed inset-0 z-40 shadow-2xl bg-black opacity-25"></div>
    </>
  );
}

export default Address_Modal
