import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CustomTooltip, Loader } from '../../../common/components';
import { BACKEND_URL } from '../../../common/utils/env.config';
import OTP_Modal from '../otp_modal/OTP_Modal';
import DifferentRTOAddress from '../different_rto_address/Different_RTO_Address';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../common/utils/apiClient';

const Address_Modal = ({ setShow, addressId, addressData, fetchUserAddressList }) => {
  const [showOTP, setShowOTP] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [rtoPhoneVerified, setRTOPhoneVerified] = useState(false);
  const [isPincodeValid, setIsPincodeValid] = useState(false);
  const [isRTOPincodeValid, setIsRTOPincodeValid] = useState(false);
  const dataAddress = addressData.find((address) => address.id === addressId);
  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(dataAddress, addressId);

  const user_id = is_company == 1 ? id_company : id_user;

  const [address, setAddress] = useState({
    nickName: addressId ? dataAddress?.tag : '',
    contactName: addressId ? `${dataAddress?.first_name || ''} ${dataAddress?.last_name || ''}` : '',
    phone: addressId ? dataAddress?.contact_no : '',
    alternatePhone: '',
    email: addressId ? dataAddress?.email_address : '',
    addressLine1: addressId ? dataAddress?.complete_address : '',
    addressLine2: addressId ? dataAddress?.line2 : '',
    pincode: addressId ? dataAddress?.pincode : '',
    city: addressId ? dataAddress?.city : '',
    state: addressId ? dataAddress?.state : '',
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

  console.log(dataAddress, addressId, address);

  const handleClose = () => {
    // iterate through all the keys in address and set them to empty string
    Object.keys(address).forEach((key) => {
      setAddress({ ...address, [key]: '' });
    });
    setShow(false);
  };

  const handleOTP = (type) => {
    // if phone number is not valid, return
    if (type == 'phone' && address.phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    if (type == 'rto' && address.rtoPhone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    setShowOTP(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // if pincode or rto pincode is more than 6 digits, return
    if ((name === 'pincode' || name === 'rtoPincode') && value.length > 6) {
      return;
    }
    // if phone or alternate phone or rtophone or rto alternatephone is more than 10 digits, return
    if (
      (name === 'phone' ||
        name === 'alternatePhone' ||
        name === 'rtoPhone' ||
        name === 'rtoAlternatePhone') &&
      value.length > 10
    ) {
      return;
    }
    if (name === 'isVendor' || name === 'isRTO') {
      setAddress({ ...address, [name]: e.target.checked });
      return;
    }
    setAddress({ ...address, [name]: value });
  };

  const handlePostAddress = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post(`${BACKEND_URL}/address/?created_by=${user_id}`, {
        contact_no: address.phone,
        first_name: address.contactName,
        email_address: address.email,
        complete_address: address.addressLine1,
        tag: address.nickName,
        pincode: address.pincode,
        city: address.city,
        state: address.state,
      });
      if (response.status === 200) {
        setShow(false);
        toast('Address Added Successfully', { type: 'success' });
        fetchUserAddressList();
      } else {
        toast('There is some error while fetching orders.', { type: 'error' });
      }
    } catch (err) {
      toast('There is some error while fetching orders.', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchPinCodeDetails = async (pincode, isRTO) => {
    const url = `${BACKEND_URL}/pincode/${pincode}`;
    try {
      const response = await apiClient.get(url);
      const { data } = response;
      if (response.status === 200) {
        toast.success('Pincode details fetched successfully');
      }
      if (data) {
        isRTO
          ? setAddress({ ...address, rtoCity: data.Area, rtoState: data.State })
          : setAddress({ ...address, city: data.Area, state: data.State });
        isRTO ? setIsRTOPincodeValid(true) : setIsPincodeValid(true);
      }
    } catch (error) {
      toast.error('Error in fetching pincode details');
    }
  };

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

  const timings = [
    '00:00AM',
    '01:00AM',
    '02:00AM',
    '03:00AM',
    '04:00AM',
    '05:00AM',
    '06:00AM',
    '07:00AM',
    '08:00AM',
    '09:00AM',
    '10:00AM',
    '11:00AM',
    '12:00PM',
    '01:00PM',
    '02:00PM',
    '03:00PM',
    '04:00PM',
    '05:00PM',
    '06:00PM',
    '07:00PM',
    '08:00PM',
    '09:00PM',
    '10:00PM',
    '11:00PM',
  ];

  return (
    <>
      {showOTP && (
        <OTP_Modal
          setShow={setShowOTP}
          number={address.isRTO ? address.rtoPhone : address.phone}
          setPhoneVerified={setPhoneVerified}
          setRTOPhoneVerified={setRTOPhoneVerified}
          type={address.isRTO ? 'rto' : 'phone'}
        />
      )}
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        {loading && <Loader />}
        <div className="relative mx-0 my-6 w-full max-w-4xl">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-black bg-white shadow-2xl outline-none focus:outline-none">
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
            <div className="max-h-[33rem] overflow-y-scroll">
              <div className="relative flex-auto p-6 pb-4">
                <div>
                  {/* Contact Info */}
                  <p className="text-[15px] font-semibold text-[#333333]">Contact Info</p>
                  <div className="mt-2 flex flex-row justify-between">
                    <div className="flex flex-col gap-1">
                      <label className="flex flex-row items-center gap-1 text-[12px] font-bold text-[#61576E]">
                        Address Nickname
                        <span className="text-red-500">*</span>
                        <CustomTooltip
                          placement="right"
                          style="dark"
                          text={
                            'It acts as a nickname for your pick up address . We recommend you to enter a value which  can be easily recalled.'
                          }>
                          <svg
                            className="dark:text-white h-4 w-4 text-gray-800"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#9A9A9A"
                            viewBox="0 0 24 24">
                            <path
                              fillRule="evenodd"
                              d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </CustomTooltip>
                      </label>
                      <input
                        type="text"
                        name="nickName"
                        className="h-7 w-[9.5rem] rounded-md border border-gray-300 p-2 text-[12px] text-[#3A3F54]"
                        placeholder="Enter Address Nickname"
                        onChange={(e) => handleInputChange(e)}
                        value={address.nickName}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="flex flex-row items-center gap-1 text-[12px] font-bold text-[#61576E]">
                        Contact Name
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="h-7 w-[9.5rem] rounded-md border border-gray-300 p-2 text-[12px] text-[#3A3F54]"
                        placeholder="Enter Contact Name"
                        name="contactName"
                        onChange={(e) => handleInputChange(e)}
                        value={address.contactName}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="flex flex-row items-center gap-1 text-[12px] font-bold text-[#61576E]">
                        Phone
                        <span className="text-red-500">*</span>
                        <CustomTooltip
                          placement="top"
                          style="dark"
                          text={
                            'Enter contact details of your warehouse manager/operations head available at this pickup location'
                          }>
                          <svg
                            className="dark:text-white h-4 w-4 text-gray-800"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#9A9A9A"
                            viewBox="0 0 24 24">
                            <path
                              fillRule="evenodd"
                              d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </CustomTooltip>
                      </label>
                      <input
                        type="number"
                        className="h-7 w-[9.5rem] rounded-md border border-gray-300 p-2 text-[12px] text-[#3A3F54] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        placeholder="Enter Phone Number"
                        name="phone"
                        onChange={(e) => handleInputChange(e)}
                        value={address.phone}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="flex flex-row items-center gap-1 text-[12px] font-bold text-[#61576E]">
                        Alternate Phone
                        <CustomTooltip
                          placement="top"
                          style="dark"
                          text={
                            'Provide a secondary contact number for your buyers (For example: Customer Care Number)'
                          }>
                          <svg
                            className="dark:text-white h-4 w-4 text-gray-800"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#9A9A9A"
                            viewBox="0 0 24 24">
                            <path
                              fillRule="evenodd"
                              d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </CustomTooltip>
                      </label>
                      <input
                        type="number"
                        className="h-7 w-[9.5rem] rounded-md border border-gray-300 p-2 text-[12px] text-[#3A3F54] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        placeholder="Enter Alternate Number"
                        name="alternatePhone"
                        onChange={(e) => handleInputChange(e)}
                        value={address.alternatePhone}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="flex flex-row items-center gap-1 text-[12px] font-bold text-[#61576E]">
                        Email
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        className="h-7 w-[9.5rem] rounded-md border border-gray-300 p-2 text-[12px] text-[#3A3F54]"
                        placeholder="Enter Email Id"
                        name="email"
                        onChange={(e) => handleInputChange(e)}
                        value={address.email}
                      />
                    </div>
                  </div>
                  {/* OTP Button */}
                  <div className="mt-2 flex flex-row justify-between">
                    <div className="flex w-[6.5rem] flex-col gap-1"></div>
                    <div
                      className={`flex flex-col gap-1 ${phoneVerified ? 'w-[9.5rem]' : 'w-[6.5rem]'}`}></div>
                    <div
                      className={`flex w-[12.5rem] flex-row gap-1 ${
                        phoneVerified ? 'justify-start' : 'justify-between'
                      } items-center`}>
                      {phoneVerified ? (
                        <>
                          <div className="flex flex-row gap-2 rounded-md bg-[#27C24C] px-2 text-[11px] text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={4}
                              stroke="currentColor"
                              className="h-4 w-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            Verified
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className="cursor-pointer text-[12px] text-green-600"
                            onClick={() => handleOTP('phone')}>
                            Verify via OTP
                          </div>
                          <div className="rounded-full border p-1 text-[12px] text-gray-600">OR</div>
                          <div className="cursor-pointer text-[12px] text-green-600">Verify via IVR</div>
                        </>
                      )}
                    </div>
                    <div className="flex w-[6.5rem] flex-col gap-1"></div>
                    <div className="flex w-[6.5rem] flex-col gap-1"></div>
                  </div>
                  {/* Address Part */}
                  <p className="text-[15px] font-semibold text-[#333333]">Address Details</p>
                  <div className="mt-2 flex flex-row gap-5">
                    {/* Input Address */}
                    <div className="flex w-1/2 flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="flex flex-row items-center gap-1 text-[12px] font-bold text-[#61576E]">
                          Address Line 1<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="h-7 w-full rounded-md border border-gray-300 p-2 text-[12px] text-[#3A3F54]"
                          placeholder="Enter Address Line 1"
                          name="addressLine1"
                          onChange={(e) => handleInputChange(e)}
                          value={address.addressLine1}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="flex flex-row items-center gap-1 text-[12px] font-bold text-[#61576E]">
                          Address line 2
                        </label>
                        <input
                          type="text"
                          className="h-7 w-full rounded-md border border-gray-300 p-2 text-[12px] text-[#3A3F54]"
                          placeholder="Enter Address line 2"
                          name="addressLine2"
                          onChange={(e) => handleInputChange(e)}
                          value={address.addressLine2}
                        />
                      </div>
                      <div className="flex w-full flex-row justify-between gap-4">
                        <div className="flex w-[47%] flex-col gap-1">
                          <label className="flex flex-row items-center gap-1 text-[12px] font-bold text-[#61576E]">
                            Pincode
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            className="h-7 w-full rounded-md border border-gray-300 p-2 text-[12px] text-[#3A3F54] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            placeholder="Enter Pincode"
                            name="pincode"
                            onChange={(e) => handleInputChange(e)}
                            value={address.pincode}
                            max={999999}
                          />
                        </div>
                        <div className="flex w-[47%] flex-col gap-1">
                          <label className="flex flex-row items-center gap-1 text-[12px] font-bold text-[#61576E]">
                            City
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="h-7 w-full cursor-not-allowed rounded-md border border-gray-300 bg-[#DDDDDD] p-2 text-[12px] text-[#3A3F54] "
                            disabled
                            value={address.city}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="flex w-full flex-row items-end justify-between gap-4">
                        <div className="flex w-[47%] flex-col gap-1">
                          <label className="flex flex-row items-center gap-1 text-[12px] font-bold text-[#61576E]">
                            State
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="h-7 w-full cursor-not-allowed rounded-md border border-gray-300 bg-[#dddddd] p-2 text-[12px] text-[#3A3F54]"
                            placeholder="Select a State"
                            disabled
                            readOnly
                            value={address.state}
                          />
                        </div>
                        <div className="flex w-[47%] flex-col">
                          <p className="text-[12px] font-bold text-[#61576E]">Warehouse Timings</p>
                          <div className="flex flex-row gap-4 pt-1">
                            <div className="flex w-1/2 flex-col">
                              <label className="flex flex-row items-center gap-1 text-[12px] font-normal text-[#61576E]">
                                Open at :
                              </label>
                              <select
                                name="openAt"
                                id="openAt"
                                className="rounded border-[#707070] px-1 py-0 text-[12px]"
                                onChange={(e) => {
                                  handleInputChange(e);
                                }}>
                                {/* all timings */}
                                {timings.map((time, index) => (
                                  <option key={index} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="flex w-1/2 flex-col">
                              <label className="flex flex-row items-center gap-1 text-[12px] font-normal text-[#61576E]">
                                Closes at:
                              </label>
                              <select
                                name="closesAt"
                                id="closesAt"
                                className="rounded border-[#707070] px-1 py-0 text-[12px]"
                                onChange={(e) => {
                                  handleInputChange(e);
                                }}>
                                {/* all timings */}
                                {timings.map((time, index) => (
                                  <option key={index} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Map Address */}
                    <div className="flex h-52 w-1/2 items-center justify-center bg-[#D3D3D3]">
                      <button className="w-4/5 rounded-md bg-green-600 py-1.5 text-white hover:bg-opacity-85">
                        Add Location on Map for Hyperlocal Orders
                      </button>
                    </div>
                  </div>
                  {/* Supply Vendor and RTO address */}
                  <div className="mt-6 flex flex-col gap-3">
                    <div className="flex w-1/2 flex-col items-start gap-2">
                      <div className="flex flex-row items-center gap-2">
                        <input
                          type="checkbox"
                          name="isVendor"
                          id="isVendor"
                          className="h-4 w-4 rounded border-gray-200 text-green-500 focus:border-0 focus:ring-0 active:border-0 active:ring-0"
                          onChange={(e) => handleInputChange(e)}
                          checked={address.isVendor}
                        />
                        <label htmlFor="isVendor" className="text-[12px] font-bold text-[#61576E] ">
                          Add this address as supplier/vendor address.
                        </label>
                        <CustomTooltip
                          placement="right"
                          style="dark"
                          text={
                            "Enable this to ship orders directly from your vendor's location and generate customer invoice with vendor details."
                          }>
                          <svg
                            className="dark:text-white h-4 w-4 text-gray-800"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#9A9A9A"
                            viewBox="0 0 24 24">
                            <path
                              fillRule="evenodd"
                              d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </CustomTooltip>
                      </div>
                      {address.isVendor && (
                        <div className="mt-2 flex w-full flex-row gap-4">
                          <div className="flex w-[47%] flex-col gap-1.5">
                            <label className="flex flex-row items-center gap-1 text-[12px] font-bold text-[#61576E]">
                              {"Supplier/Vendor's Name"}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="vendorName"
                              className="h-7 w-full rounded-xl border border-gray-300 p-2 text-[12px] text-[#3A3F54]"
                              placeholder="Enter Vendor Name"
                              onChange={(e) => handleInputChange(e)}
                              value={address.vendorName}
                            />
                          </div>
                          <div className="flex w-[47%] flex-col gap-1.5">
                            <label className="flex flex-row items-center gap-1 text-[12px] font-bold text-[#61576E]">
                              {"Supplier/Vendor's GSTIN"}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="vendorGSTIN"
                              className="h-7 w-full rounded-xl border border-gray-300 p-2 text-[12px] text-[#3A3F54]"
                              placeholder="Enter Vendor GSTIN"
                              onChange={(e) => handleInputChange(e)}
                              value={address.vendorGSTIN}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex w-full flex-col items-start gap-2">
                      <div className="flex flex-row items-center gap-2">
                        <input
                          type="checkbox"
                          name="isRTO"
                          id="isRTO"
                          className="h-4 w-4 rounded border-gray-200 text-green-500 focus:border-0 focus:ring-0 active:border-0 active:ring-0"
                          onChange={(e) => handleInputChange(e)}
                          checked={address.isRTO}
                        />
                        <label htmlFor="isRTO" className="text-[12px] font-bold text-[#61576E] ">
                          Use a different address as RTO address
                        </label>
                      </div>
                      {address.isRTO && (
                        <DifferentRTOAddress
                          rtoPhoneVerified={rtoPhoneVerified}
                          address={address}
                          handleInputChange={handleInputChange}
                          handleOTP={handleOTP}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex flex-row items-center justify-center rounded-b-md px-6">
                <button
                  className="mb-1 mr-1 rounded-lg border border-[#B07828] px-12 py-2 text-sm font-semibold text-[#B07828] outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={() => handleClose()}>
                  Cancel
                </button>
                <button
                  className="mb-1 mr-1 rounded-lg border bg-[#B07828] px-6 py-2 text-sm font-semibold text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={() => {
                    handlePostAddress();
                  }} //eslint-disable-line
                >
                  {'Save Address'}
                </button>
              </div>
            </div>
            <div className="h-6"></div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25 shadow-2xl"></div>
    </>
  );
};

export default Address_Modal;
