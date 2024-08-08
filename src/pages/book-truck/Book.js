import { useEffect, useRef, useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { useNavigate, Link } from 'react-router-dom';
import { Modal } from 'flowbite-react';
import copyRightIcon from '../../common/images/copyright.png';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { ACCESS_TOKEN } from '../../common/utils/config';

const Book = () => {
  // const tabs = [1, 2, 3];
  const inputRef = useRef(null);
  const dropdownRefs = useRef([]);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState([
    { isOpen: false },
    { isOpen: false },
    { isOpen: false },
  ]);

  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedTrucks, setSelectedTrucks] = useState({});
  const [filteredCities, setFilteredCities] = useState([]);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: ACCESS_TOKEN,
  };

  const fetchTruckRates = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/truck_rates`, { headers });
      setTrucks(response.data);

      // Extract unique 'to_city' from the truck rates data
      const toCity = [...new Set(response.data.map(truck => truck.to_city))];
      setCityList(toCity);
      setFilteredCities(toCity);

      // Initialize selectedTrucks with truck data for the first city
      const initialTrucks = response.data.find(truck => truck.to_city === toCity[0]);
      setSelectedTrucks(
        initialTrucks ? { [toCity[0]]: initialTrucks.truck_rates } : {}
      );
    } catch (err) {
      console.log('Error fetching truck rates', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTruckRates();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (inputRef.current && !inputRef.current.contains(event.target)) &&
        (dropdownRef.current && !dropdownRef.current.contains(event.target))
      ) {
        setIsDropdownOpen(prev => prev.map((item, index) => ({ isOpen: false })));
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleCitySelect(city, index) {
    setSelectedCity(prev => {
      const newSelected = [...prev];
      newSelected[index] = city;
      return newSelected;
    });

    // Filter trucks based on selected city
    const selectedTrucksData = trucks.find(truck => truck.to_city === city);
    if (selectedTrucksData) {
      setSelectedTrucks(prev => ({
        ...prev,
        [city]: selectedTrucksData.truck_rates,
      }));
    }

    setIsDropdownOpen(prev => prev.map((item, i) => (i === index ? { isOpen: false } : item)));
  }

  function handleInputChange(event, index) {
    const inputValue = event.target.value;
    setSelectedCity(prev => {
      const newSelected = [...prev];
      newSelected[index] = inputValue;
      return newSelected;
    });

    // Filter cities based on user input
    if (inputValue) {
      setFilteredCities(
        cityList.filter(city => city.toLowerCase().includes(inputValue.toLowerCase()))
      );
    } else {
      setFilteredCities(cityList);
    }

    setIsDropdownOpen(prev => {
      const newDropdown = [...prev];
      newDropdown[index] = { isOpen: true };
      return newDropdown;
    });
  }

  function Dropdown({ isOpen, index }) {
    if (!isOpen) return null;

    return (
      <div
        className="absolute z-10 mt-40 w-60 max-w-full border border-gray-300 bg-white shadow-lg"
        ref={el => dropdownRefs.current[index] = el}
      >
        <div className="grid gap-1 p-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
          {filteredCities.map(city => (
            <button
              key={city}
              className={`w-full px-2 py-1 text-md border border-gray-300 text-gray-700 rounded-lg ${
                selectedCity[index] === city ? 'text-red-600 border-red-600' : ''
              } hover:text-red-600 hover:border-red-600 transition-colors`}
              onClick={() => handleCitySelect(city, index)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    );
  }

  function CustomModal({ show, onClose }) {
    return (
      <Modal show={show} onClose={onClose} className="z-[100000] min-w-[400px]">
        <Modal.Header className="p-4 pb-2">Choose Booking Type</Modal.Header>
        <Modal.Body className="px-4 py-4">
          <div className="flex flex-col gap-4 p-5">
            <div
              className="flex cursor-pointer flex-row items-center gap-4 rounded-lg border border-transparent bg-[#b0772815] p-2 shadow hover:border hover:border-red-700 hover:text-red-700"
              onClick={() => {
                onClose();
                navigate('/indent');
              }}
            >
              <svg
                className="dark:text-white h-14 w-14 rounded-full bg-white p-2 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.535a3.5 3.5 0 1 0 6.93 0h3.07a3.5 3.5 0 1 0 6.93 0H21a1 1 0 0 0 1-1v-4a.999.999 0 0 0-.106-.447l-2-4A1 1 0 0 0 19 6h-5a2 2 0 0 0-2-2H4Zm14.192 11.59.016.02a1.5 1.5 0 1 1-.016-.021Zm-10 0 .016.02a1.5 1.5 0 1 1-.016-.021Zm5.806-5.572v-2.02h4.396l1 2.02h-5.396Z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex flex-col">
                <p className="text-xl">Book a Truck/Lorry</p>
                <p className="text-black">Im a shipper</p>
              </div>
            </div>
            <div className="flex cursor-pointer flex-row items-center gap-4 rounded-lg border border-transparent bg-[#b0772815] p-2 shadow hover:border hover:border-red-700 hover:text-red-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="dark:text-white h-14 w-14 rounded-full bg-white p-2 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              <div className="flex flex-col">
                <p className="text-xl">Find Load</p>
                <p className="text-black">Im Truck Owner</p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <PageWithSidebar>
      <div className="flex h-full w-full flex-col items-center justify-center">
        {sessionStorage.getItem('is_kyc') == 1 && (
          <div
            className="bg-primary -mt-16 mb-12 ml-2 mr-4 w-[99%] rounded-lg border p-2 shadow-md hover:underline"
            style={{ textAlign: 'center' }}>
            <marquee className="font-semibold text-white">
              <Link to={'/seller/kyc'}>
                Click here to complete your KYC and get non-disrupted Book Truck and COD remittances
              </Link>
            </marquee>
          </div>
        )}
        {sessionStorage.getItem('is_kyc') == 2 && (
          <div
            className="text-md -mt-16 mb-12 ml-2 mr-4 w-[99%] rounded-lg border bg-yellow-400 p-2 font-semibold shadow-md hover:underline"
            style={{ textAlign: 'center' }}>
            <marquee className="text-white">KYC Verification Is Pending</marquee>
          </div>
        )}
        <p className="text-5xl font-bold">Book Truck from Anywhere to Anywhere</p>
        <p className="border-primary mb-3 mt-6 w-[5%] rounded border-[3px]"></p>
        <p className="w-[85%] text-center text-lg text-[#707070]">
          Welcome to BookTruck Online Portal, your preferred partner for any type of road logistics throughout
          India. Now, get instant and competitive rates for any type of truck. Contact our Central Helpdesk at
          <span className="text-primary underline underline-offset-2"> +91 9327885065</span> or mail at{' '}
          <a href="mailto:enquiry@vcscl.in" className="text-primary underline underline-offset-2">
            enquiry@vcscl.in
          </a>{' '}
          for more information
        </p>
        <div className="mt-5 flex w-[88%] flex-row gap-6 p-4">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg font-semibold">Loading...</p>
            </div>
          )}
          {trucks.slice(0, 3).map((route, index) => (
            <div
              className="flex flex-col w-[26rem] gap-4 rounded-2xl border bg-white py-3"
              key={index}
            >
              <div className="flex flex-row items-center px-3">
                <div className="mr-2 h-2 w-2 rounded bg-green-500"></div>
                <div className="mr-2">{route.from_city} to </div>
                <div className="flex items-center rounded bg-gray-100 shadow-md ">
                  <div className="m-2 h-2  w-2 rounded bg-red-500"></div>
                   <input
                    ref={inputRef}
                    className="h-10 w-[100%] cursor-pointer rounded border-0 bg-gray-100 px-2 outline-none ring-0 focus:outline-none focus:ring-0"
                    placeholder="Select a city"
                    value={selectedCity[index] || route.to_city}
                    onChange={(e) => handleInputChange(e, index)}
                    // readOnly
                    onClick={() => setIsDropdownOpen(prev => {
                      const newDropdown = [...prev];
                      newDropdown[index] = { isOpen: !newDropdown[index]?.isOpen };
                      return newDropdown;
                    })}
                  />
                  <Dropdown isOpen={isDropdownOpen[index]?.isOpen} index={index} />
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <div className="flex flex-row justify-between bg-sky-50 px-3 py-1 text-[16px] font-medium text-[#5f5f5f]">
                  <p>Truck Type</p>
                  <p>Charges</p>
                </div>
                {selectedCity[index] ? (
                  (selectedTrucks[selectedCity[index]] || []).map((truck, truckIndex) => (
                    <div
                      className="flex flex-row justify-between border-b px-3 py-1.5 text-[16px] font-medium text-[#5f5f5f] cursor-pointer hover:bg-gray-100"
                      key={truckIndex}
                      onClick={() => setShowModal(true)}
                    >
                      <p className="font-normal">{truck.truck_type}</p>
                      <p>{truck.avg_price}</p>
                    </div>
                  ))
                ) : (
                  route.truck_rates.map((truck, truckIndex) => (
                    <div
                      className="flex flex-row justify-between border-b px-3 py-1.5 text-[16px] font-medium text-[#5f5f5f] cursor-pointer hover:bg-gray-100"
                      key={truckIndex}
                      onClick={() => setShowModal(true)}
                    >
                      <p className="font-normal">{truck.truck_type}</p>
                      <p>{truck.avg_price}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="flex flex-row justify-between px-3 mt-auto">
                <div className="text-[14px] font-medium">
                  {route.from_city} to {selectedCity[index] || route.to_city} Transport
                </div>
                <div className="text-[14px] font-medium">
                  <button
                    className="bg-primary rounded px-3 py-0.5 text-white"
                    onClick={() => setShowModal(true)}
                  >
                    Book Now
                  </button>
                  <CustomModal show={showModal} onClose={() => setShowModal(false)} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-2 flex items-center gap-1">
          <img src={copyRightIcon} className="h-5" /> <p className="italic">Copyrights by Veracity</p>
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Book;
