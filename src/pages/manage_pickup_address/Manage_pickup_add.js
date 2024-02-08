import { Link } from "react-router-dom";
import PageWithSidebar from "../../common/components/page-with-sidebar/PageWithSidebar"
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../common/utils/env.config";
import { toast } from "react-toastify";
import { Loader } from "../../common/components";
import { Address_Modal } from "./address_modal";

const Manage_pickup_add = () => {

  const [pickupAddress, setPickupAddress] = useState([]); //eslint-disable-line
  const [openAddress, setOpenAddress] = useState(false);
  const [openRTOAddress, setOpenRTOAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [openRTOIndex, setOpenRTOIndex] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const fetchUserAddressList = () => {
    setLoading(true);
    axios
      .get(BACKEND_URL + '/address', {
        params: {
          user_id: 1,
        },
      })
      .then((resp) => {
        if (resp.status == 200) {
          setPickupAddress(resp?.data || []);
        }
        setLoading(false);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        toast('Unable to fetch address', { type: 'error' });
        setLoading(false);
      });
  };


  const handleAddressToggle = (index) => {
    setOpenAddress(!openAddress);
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleRTOAddressToggle = (index) => {
    setOpenRTOAddress(!openRTOAddress);
    setOpenRTOIndex((prevIndex) => (prevIndex === index ? null : index));
  }

  useEffect(() => {
    fetchUserAddressList();
  }, []);

  return (
    <PageWithSidebar>
      {loading && <Loader />}
      {showAddressModal && <Address_Modal show={showAddressModal} setShow={setShowAddressModal} />}
      <div className="header bg-[#FAFBFC] border-b border-[#b3b3b3] p-2 text-xl mx-2">Settings-Manage Pickup Addresses</div>
      <div className="bg-[#EDEDED] w-[98.5%] px-6 pb-12 mx-2">
        <div className="pt-2 pb-5 text-[#656565] font-bold">
          <Link to={'/settings'} className="text-green-500 font-semibold">Settings</Link> &gt; Pickup Address &gt; Manage Pickup Addresses
        </div>


        <div className="bg-white flex flex-col gap-4 p-4">


          <div className="flex w-full flex-col text-[#666666] text-[12px] p-0 m-0 font-bold gap-5 min-h-72">
            {/* Top bar */}
            <div className="flex flex-row justify-between">
              {/* Search Bar in the top bar */}
              <div className="flex flex-row w-[60%] border h-8 border-[#b7b7b7] rounded items-center">
                <select name="search_type" id="search_type" className="h-6 py-0 border-0 focus:border-0 text-[12px] rounded font-normal w-[22%] focus:ring-0">
                  <option value="phone">Phone Number</option>
                  <option value="city">City</option>
                  <option value="state">State</option>
                  <option value="pin">Pincode</option>
                  <option value="location">Location</option>
                </select>
                <div className="h-5 w-[0.5px] bg-[#b7b7b7] my-2"></div>
                <button className="bg-none border-0 pl-2 h-7 focus:border-0" disabled >
                  <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                  </svg>
                </button>
                <input
                  type="text"
                  id="search"
                  name="search"
                  className="h-6 py-0 border-0 focus:border-0 text-[12px] font-normal w-[78%] rounded focus:ring-0"
                  placeholder="Search by location name, address, city, state, pincode" />
              </div>
              {/* Buttons */}
              <div className="flex flex-row h-8 items-center gap-2">
                <button className="bg-[#555555] p-1 rounded-sm">
                  <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-2M8 9l4-5 4 5m1 8h0" />
                  </svg>
                </button>
                <button className="bg-[#555555] p-1 rounded-sm">
                  <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-2m-1-5-4 5-4-5m9 8h0" />
                  </svg>
                </button>
                <button className="flex-row flex bg-[#895d20] text-white items-center p-1 pr-2 rounded-sm gap-1">
                  <svg className="w-6 h-6 text-white pr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                  <span>Add Pickup Address</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col overflow-y-scroll h-[32rem] gap-4 pr-4">
              <div className={`transition-shadow duration-700 ${openAddress == 1 ? 'shadow rounded-lg' : 'shadow-none'}`}>
                <div className={`flex flex-row items-center justify-between transition-all duration-700 bg-white  border ${openAddress == 1 ? 'border-[#99999928] rounded-b-none rounded' : 'rounded-lg shadow'} border-[#99999928] border-b-[#eee] px-3 py-2 w-full text-[#444] text-[14px] `}>
                  {/* Address tag */}
                  <div>Primary</div>
                  {/* middle column */}
                  <div className="flex flex-row items-center gap-4">
                    <div>
                      <svg className="w-5 h-5 text-[#555] hover:text-blue-500 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" onClick={() => { setShowAddressModal(true) }}>
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z" />
                      </svg>
                    </div>
                    <div className="bg-[#27C24C] text-white px-4 rounded-md text-[11px]">
                      Active
                    </div>
                    <div>
                      <span className="font-normal">Location ID: </span>4752204
                    </div>
                  </div>
                  {/* end column */}
                  <div className="flex flex-row items-center text-[12px] font-normal gap-8">
                    <div className="flex flex-row items-center">
                      <input id="primary_address" type="checkbox" value=""
                        className="w-4 h-4 text-green-600 bg-gray-100 rounded-full focus:ring-0 focus:ring-transparent focus:outline-none"
                      />
                      <label htmlFor="primary_address" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Primary Address
                      </label>
                    </div>
                    <div className="flex flex-row items-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-7 h-4 bg-gray-200 rounded-full peer peer-focus:ring-0 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <div className="flex flex-row items-center font-extrabold text-[#979898] w-8 justify-center text-[24px] h-full pr-4 cursor-pointer select-none"
                      onClick={() => handleAddressToggle(1)}
                    >
                      {openAddress ? <span className={`transition-opacity duration-500 ${openAddress ? 'opacity-100' : 'opacity-0'} `}>-</span> : <span className={`transition-opacity ${openAddress ? 'opacity-0' : 'opacity-100'} duration-500`}>+</span>}
                    </div>
                  </div>
                </div>
                <div
                  id={`accordion-open-body-1`}
                  className={`overflow-hidden flex flex-col pt-2 transition-max-height gap-0 duration-700 ease-in-out ${openIndex === 1 ? 'max-h-96 border border-t-0 rounded-b-lg' : 'max-h-0'}`}
                  aria-labelledby={`accordion-open-heading-1`}
                >
                  {/* top row */}
                  <div className="flex flex-row px-8 py-2 justify-start">
                    <div className="w-1/3">
                      Name: <span className="font-normal">Aarav Shah</span>
                    </div>
                    <div className="w-1/3 flex flex-row gap-2">
                      Phone: <span className="font-normal">9601356474</span>
                      <span className="bg-[#27C24C] text-white px-2 rounded flex h-4 gap-1 flex-row items-center">
                        <svg className="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 12 4.7 4.5 9.3-9" />
                        </svg>
                        verified
                      </span>
                    </div>
                    <div className="w-1/3">
                      Email: <span className="font-normal">varisrajak.cse20@ggct.co.in</span>
                    </div>
                  </div>
                  {/* middle row */}
                  <div className="flex flex-row px-8 py-2 justify-start">
                    <div className="w-1/3">
                      Address:   Ahmedabad
                      <span className="font-normal">00 Raj carrying house</span>
                    </div>
                    <div className="w-1/3">
                      Address2: <span className="font-normal">near avakar guest house, old lati bajar, behind Geetamandir bus stand</span>
                    </div>
                    <div className="w-1/3">
                      City:: <span className="font-normal">00 Raj carrying house</span>
                    </div>
                  </div>
                  {/* bottom row */}
                  <div className="flex flex-row px-8 py-2 justify-start">
                    <div className="w-1/3">
                      State: <span className="font-normal">Gujarat</span>
                    </div>
                    <div className="w-1/3">
                      Country: <span className="font-normal">India</span>
                    </div>
                    <div className="w-1/3">
                      Pin Code: <span className="font-normal">380002</span>
                    </div>
                  </div>
                  {/* Associated RTO Address */}
                  <div>
                    <div className="flex flex-row px-8 py-2 pb-4 justify-start">
                      <div className="flex flex-row items-center pt-4 gap-2 text-[#895D20] font-normal justify-center cursor-pointer select-none"
                        onClick={() => handleRTOAddressToggle(1)}
                      >
                        <span>Associated RTO Address</span>
                        {openRTOAddress ?
                          <svg className="w-4 h-4 text-[#895D20] dark:text-white rotate-180 transition-all duration-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7" />
                          </svg> :
                          <svg className="w-4 h-4 text-[#895D20] transition-all duration-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7" />
                          </svg>}
                      </div>
                    </div>
                    <div
                      id={`accordion-open-body-1`}
                      className={`overflow-hidden flex flex-col pb-2 transition-max-height gap-0 duration-700 ease-in-out ${openRTOIndex === 1 ? 'max-h-96 border border-t-0 rounded-b-lg' : 'max-h-0'}`}
                      aria-labelledby={`accordion-open-heading-1`}
                    >
                      {/* top row for Associated RTO Address*/}
                      <div className="flex flex-row px-8 py-2 justify-start">
                        <div className="w-1/3">
                          Name: <span className="font-normal">Aarav Shah</span>
                        </div>
                        <div className="w-1/3 flex flex-row gap-2">
                          Phone: <span className="font-normal">9601356474</span>
                          <span className="bg-[#27C24C] text-white px-2 rounded flex h-4 gap-1 flex-row items-center">
                            <svg className="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 12 4.7 4.5 9.3-9" />
                            </svg>
                            verified
                          </span>
                        </div>
                        <div className="w-1/3">
                          Email: <span className="font-normal">varisrajak.cse20@ggct.co.in</span>
                        </div>
                      </div>
                      {/* middle row for Associated RTO Address*/}
                      <div className="flex flex-row px-8 py-2 justify-start">
                        <div className="w-1/3">
                          Address:   Ahmedabad
                          <span className="font-normal">00 Raj carrying house</span>
                        </div>
                        <div className="w-1/3">
                          Address2: <span className="font-normal">near avakar guest house, old lati bajar, behind Geetamandir bus stand</span>
                        </div>
                        <div className="w-1/3">
                          City:: <span className="font-normal">00 Raj carrying house</span>
                        </div>
                      </div>
                      {/* bottom row for Associated RTO Address*/}
                      <div className="flex flex-row px-8 py-2 justify-start">
                        <div className="w-1/3">
                          State: <span className="font-normal">Gujarat</span>
                        </div>
                        <div className="w-1/3">
                          Country: <span className="font-normal">India</span>
                        </div>
                        <div className="w-1/3">
                          Pin Code: <span className="font-normal">380002</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar >
  )
}

export default Manage_pickup_add
