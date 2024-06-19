import { Link } from 'react-router-dom';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { Loader } from '../../common/components';
import { Address_Modal } from './address_modal';

const Manage_pickup_add = () => {
  const [pickupAddress, setPickupAddress] = useState([]); //eslint-disable-line
  const [openAddress, setOpenAddress] = useState(false);
  const [openRTOAddress, setOpenRTOAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [openRTOIndex, setOpenRTOIndex] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');
  const [addressId, setAddressId] = useState(null);

  console.log(addressId, pickupAddress);

  const user_id = is_company == 1 ? id_company : id_user;

  const fetchUserAddressList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/address/?user_id=${user_id}`);
      if (response.status === 200) {
        const sortedAddresses = response.data.sort((a, b) => b.is_primary - a.is_primary);
        setPickupAddress(sortedAddresses);
      } else {
        toast('There is some error while fetching orders.', { type: 'error' });
      }
    } catch (err) {
      toast('There is some error while fetching orders.', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSetPrimary = async (id) => {
    setLoading(true);
    try {
      const response = await axios.put(`${BACKEND_URL}/address/${user_id}?address_id=${id}`);
      if (response.status === 200) {
        toast(response.data.msg, { type: 'success' });
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

  const handleAddressToggle = (index) => {
    setOpenAddress(!openAddress);
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleRTOAddressToggle = (index) => {
    setOpenRTOAddress(!openRTOAddress);
    setOpenRTOIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    fetchUserAddressList();
  }, []);

  return (
    <PageWithSidebar>
      {loading && <Loader />}
      {showAddressModal && (
        <Address_Modal
          show={showAddressModal}
          setShow={setShowAddressModal}
          addressId={addressId}
          addressData={pickupAddress}
          userId={user_id}
        />
      )}
      <div className="header mx-2 border-b border-[#b3b3b3] bg-[#FAFBFC] p-2 text-xl">
        Settings-Manage Pickup Addresses
      </div>
      <div className="mx-2 w-[98.5%] bg-[#EDEDED] px-6 pb-12">
        <div className="pb-5 pt-2 font-bold text-[#656565]">
          <Link to={'/settings'} className="font-semibold text-green-500">
            Settings
          </Link>{' '}
          &gt; Pickup Address &gt; Manage Pickup Addresses
        </div>

        <div className="flex flex-col gap-4 bg-white p-4">
          <div className="m-0 flex min-h-72 w-full flex-col gap-5 p-0 text-[12px] font-bold text-[#666666]">
            {/* Top bar */}
            <div className="flex flex-row justify-between">
              {/* Search Bar in the top bar */}
              <div className="flex h-8 w-[60%] flex-row items-center rounded border border-[#b7b7b7]">
                <select
                  name="search_type"
                  id="search_type"
                  className="h-6 w-[22%] rounded border-0 py-0 text-[12px] font-normal focus:border-0 focus:ring-0">
                  <option value="phone">Phone Number</option>
                  <option value="city">City</option>
                  <option value="state">State</option>
                  <option value="pin">Pincode</option>
                  <option value="location">Location</option>
                </select>
                <div className="my-2 h-5 w-[0.5px] bg-[#b7b7b7]"></div>
                <button className="h-7 border-0 bg-none pl-2 focus:border-0" disabled>
                  <svg
                    className="h-4 w-4 text-black"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  id="search"
                  name="search"
                  className="h-6 w-[78%] rounded border-0 py-0 text-[12px] font-normal focus:border-0 focus:ring-0"
                  placeholder="Search by location name, address, city, state, pincode"
                />
              </div>
              {/* Buttons */}
              <div className="flex h-8 flex-row items-center gap-2">
                <button className="rounded-sm bg-[#555555] p-1">
                  <svg
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-2M8 9l4-5 4 5m1 8h0"
                    />
                  </svg>
                </button>
                <button className="rounded-sm bg-[#555555] p-1">
                  <svg
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-2m-1-5-4 5-4-5m9 8h0"
                    />
                  </svg>
                </button>
                <button
                  className="flex flex-row items-center gap-1 rounded-sm bg-[#895d20] p-1 pr-2 text-white"
                  onClick={() => setShowAddressModal(true)}>
                  <svg
                    className="h-6 w-6 pr-1 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14m-7 7V5"
                    />
                  </svg>
                  <span>Add Pickup Address</span>
                </button>
              </div>
            </div>
            {pickupAddress &&
              pickupAddress.map((address, i) => {
                return (
                  <div key={address.id} className="flex flex-col pr-4">
                    <div
                      className={`transition-shadow duration-700 ${
                        openAddress == 1 ? 'rounded-lg shadow' : 'shadow-none'
                      }`}>
                      <div
                        className={`flex flex-row items-center justify-between border bg-white transition-all  duration-700 ${
                          openAddress == 1 ? 'rounded rounded-b-none border-[#99999928]' : 'rounded-lg shadow'
                        } w-full border-[#99999928] border-b-[#eee] px-3 py-2 text-[14px] text-[#444] `}>
                        {/* Address tag */}
                        <div>Primary</div>
                        {/* middle column */}
                        <div className="flex flex-row items-center gap-4">
                          <div>
                            <svg
                              className="h-5 w-5 cursor-pointer text-[#555] hover:text-blue-500"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              onClick={() => {
                                setShowAddressModal(true);
                                setAddressId(address.id);
                              }}>
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"
                              />
                            </svg>
                          </div>
                          <div className="rounded-md bg-[#27C24C] px-4 text-[11px] text-white">Active</div>
                          <div>
                            <span className="font-normal">Location ID: </span>
                            {address.id}
                          </div>
                        </div>
                        {/* end column */}
                        <div className="flex flex-row items-center gap-8 text-[12px] font-normal">
                          <div className="flex flex-row items-center">
                            <input
                              id="primary_address"
                              type="checkbox"
                              checked={address.is_primary === 1}
                              onChange={() => handleSetPrimary(address.id)}
                              className="h-4 w-4 rounded-full bg-gray-100 text-green-600 focus:outline-none focus:ring-0 focus:ring-transparent"
                            />
                            <label
                              htmlFor="primary_address"
                              className="dark:text-gray-300 ms-2 text-sm font-medium text-gray-900">
                              Primary Address
                            </label>
                          </div>
                          <div className="flex flex-row items-center">
                            <label className="relative inline-flex cursor-pointer items-center">
                              <input type="checkbox" value="" className="peer sr-only" />
                              <div className="dark:border-gray-600 peer h-4 w-7 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-3 after:w-3 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 rtl:peer-checked:after:-translate-x-full"></div>
                            </label>
                          </div>
                          <div
                            className="flex h-full w-8 cursor-pointer select-none flex-row items-center justify-center pr-4 text-[24px] font-extrabold text-[#979898]"
                            onClick={() => handleAddressToggle(i)}>
                            {openIndex == i ? (
                              <span
                                className={`transition-opacity duration-500 ${
                                  openIndex == i ? 'opacity-100' : 'opacity-0'
                                } `}>
                                -
                              </span>
                            ) : (
                              <span
                                className={`transition-opacity ${
                                  openIndex == i ? 'opacity-0' : 'opacity-100'
                                } duration-500`}>
                                +
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        id={`accordion-open-body-1`}
                        className={`transition-max-height flex flex-col gap-0 overflow-hidden pt-2 duration-700 ease-in-out ${
                          openIndex === i ? 'max-h-96 rounded-b-lg border border-t-0' : 'max-h-0'
                        }`}
                        aria-labelledby={`accordion-open-heading-1`}>
                        {/* top row */}
                        <div className="flex flex-row justify-start px-8 py-2">
                          <div className="w-1/3">
                            Name:{' '}
                            <span className="font-normal">
                              {address.first_name} {address.last_name}
                            </span>
                          </div>
                          <div className="flex w-1/3 flex-row gap-2">
                            Phone: <span className="font-normal">{address.contact_no}</span>
                            {address.address_verification && (
                              <span className="flex h-4 flex-row items-center gap-1 rounded bg-[#27C24C] px-2 text-white">
                                <svg
                                  className="dark:text-white h-4 w-4 text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24">
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m5 12 4.7 4.5 9.3-9"
                                  />
                                </svg>
                                verified
                              </span>
                            )}
                          </div>
                          <div className="w-1/3">
                            Email: <span className="font-normal">{address.email_address}</span>
                          </div>
                        </div>
                        {/* middle row */}
                        <div className="flex flex-row justify-start px-8 py-2">
                          <div className="w-1/3">
                            Address:
                            <span className="font-normal">{address.complete_address}</span>
                          </div>
                          <div className="w-1/3">
                            Address2: <span className="font-normal">{address.complete_address}</span>
                          </div>
                          <div className="w-1/3">
                            City:: <span className="font-normal">{address.city}</span>
                          </div>
                        </div>
                        {/* bottom row */}
                        <div className="flex flex-row justify-start px-8 py-2">
                          <div className="w-1/3">
                            State: <span className="font-normal">{address.state}</span>
                          </div>
                          <div className="w-1/3">
                            Country: <span className="font-normal">{address.country}</span>
                          </div>
                          <div className="w-1/3">
                            Pin Code: <span className="font-normal">{address.pincode}</span>
                          </div>
                        </div>
                        {/* Associated RTO Address */}
                        <div>
                          <div className="flex flex-row justify-start px-8 py-2 pb-4">
                            <div
                              className="flex cursor-pointer select-none flex-row items-center justify-center gap-2 pt-4 font-normal text-[#895D20]"
                              onClick={() => handleRTOAddressToggle(i)}>
                              <span>Associated RTO Address</span>
                              {openRTOAddress ? (
                                <svg
                                  className="dark:text-white h-4 w-4 rotate-180 text-[#895D20] transition-all duration-500"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24">
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m5 15 7-7 7 7"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="h-4 w-4 text-[#895D20] transition-all duration-500"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24">
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m5 15 7-7 7 7"
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                          <div
                            id={`accordion-open-body-1`}
                            className={`transition-max-height flex flex-col gap-0 overflow-hidden pb-2 duration-700 ease-in-out ${
                              openRTOIndex === i ? 'max-h-96 rounded-b-lg border border-t-0' : 'max-h-0'
                            }`}
                            aria-labelledby={`accordion-open-heading-1`}>
                            {/* top row for Associated RTO Address*/}
                            <div className="flex flex-row justify-start px-8 py-2">
                              <div className="w-1/3">
                                Name:{' '}
                                <span className="font-normal">
                                  {' '}
                                  {address.first_name} {address.last_name}
                                </span>
                              </div>
                              <div className="flex w-1/3 flex-row gap-2">
                                Phone: <span className="font-normal">{address.contact_no}</span>
                                {address.address_verification && (
                                  <span className="flex h-4 flex-row items-center gap-1 rounded bg-[#27C24C] px-2 text-white">
                                    <svg
                                      className="dark:text-white h-4 w-4 text-white"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24">
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m5 12 4.7 4.5 9.3-9"
                                      />
                                    </svg>
                                    verified
                                  </span>
                                )}
                              </div>
                              <div className="w-1/3">
                                Email: <span className="font-normal">{address.email_address}</span>
                              </div>
                            </div>
                            {/* middle row for Associated RTO Address*/}
                            <div className="flex flex-row justify-start px-8 py-2">
                              <div className="w-1/3">
                                Address:
                                <span className="font-normal">{address.complete_address}</span>
                              </div>
                              <div className="w-1/3">
                                Address2: <span className="font-normal">{address.complete_address}</span>
                              </div>
                              <div className="w-1/3">
                                City: <span className="font-normal">{address.city}</span>
                              </div>
                            </div>
                            {/* bottom row for Associated RTO Address*/}
                            <div className="flex flex-row justify-start px-8 py-2">
                              <div className="w-1/3">
                                State: <span className="font-normal">{address.state}</span>
                              </div>
                              <div className="w-1/3">
                                Country: <span className="font-normal">{address.country}</span>
                              </div>
                              <div className="w-1/3">
                                Pin Code: <span className="font-normal">{address.pincode}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Manage_pickup_add;
