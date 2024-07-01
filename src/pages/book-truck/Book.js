import { useEffect, useRef, useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar'
import { cityList } from './cities'
import { useNavigate, Link } from 'react-router-dom';
import { Modal } from 'flowbite-react';

const Book = () => {

    const tabs = [1, 2, 3];

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState([
        {
            isOpen: false
        },
        {
            isOpen: false
        },
        {
            isOpen: false
        }
    ]);

    const [selectedCity, setSelectedCity] = useState([
        {
            city: cityList[43].name
        },
        {
            city: cityList[42].name
        },
        {
            city: cityList[47].name
        }

    ])

    const [trucks, setTrucks] = useState([       //eslint-disable-line
        { label: "20 Feet Container Truck", price: "₹20858" },
        { label: "22 Feet Container Truck", price: "₹22000" },
        { label: "32 Feet Multi Axle Truck", price: "₹40840" },
        { label: "32 Feet Single Axle Truck", price: "₹26420" }
    ]);

    function Dropdown({ isOpen, index }) {
        if (!isOpen) return null;

        return (
            <div className="absolute flex flex-row bg-white shadow-md h-36 p-4 gap-2 overflow-y-scroll rounded mt-24 flex-wrap w-64" ref={dropdownRef}>
                {cityList.map((city) => (
                    <div
                        key={city}
                        className={`px-1.5 text-[12px] cursor-pointer border rounded border-gray-500 hover:border-red-500 hover:text-red-500 ${city === selectedCity.city1 && 'bg-red-500 text-white'}`}
                        onClick={(event) => {
                            event.stopPropagation();
                            setSelectedCity({ ...selectedCity, [index]: { city: city } });
                            setIsDropdownOpen({ ...isDropdownOpen, [index]: { isOpen: false } });
                        }}
                    >
                        {city}
                    </div>
                ))}
            </div>
        );
    }

    function CustomModal({ show, onClose }) {
        return (
            <Modal show={show} onClose={onClose} className="min-w-[400px] z-[100000]">
                <Modal.Header className="p-4 pb-2">{'Choose Booking Type'}</Modal.Header>
                <Modal.Body className="px-4 py-4">
                    <div className="flex flex-col gap-4 p-5">
                        {/* Option 1 */}
                        <div className="flex flex-row shadow border border-transparent hover:border-red-700 hover:text-red-700 cursor-pointer hover:border rounded-lg gap-4 p-2 items-center bg-[#b0772815]"
                        onClick={()=>{
                            onClose();
                            navigate('/indent');
                        }}
                        >
                            <svg className="w-14 h-14 p-2 bg-white rounded-full text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M4 4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.535a3.5 3.5 0 1 0 6.93 0h3.07a3.5 3.5 0 1 0 6.93 0H21a1 1 0 0 0 1-1v-4a.999.999 0 0 0-.106-.447l-2-4A1 1 0 0 0 19 6h-5a2 2 0 0 0-2-2H4Zm14.192 11.59.016.02a1.5 1.5 0 1 1-.016-.021Zm-10 0 .016.02a1.5 1.5 0 1 1-.016-.021Zm5.806-5.572v-2.02h4.396l1 2.02h-5.396Z" clipRule="evenodd" />
                            </svg>
                            <div className="flex flex-col">
                                <p className='text-xl'>Book a Truck/Lorry</p>
                                <p className='text-black'>{"I'm a shipper"}</p>
                            </div>
                        </div>

                        {/* Option 2 */}
                        <div className="flex flex-row shadow border border-transparent hover:border-red-700 hover:text-red-700 cursor-pointer hover:border rounded-lg gap-4 p-2 items-center bg-[#b0772815]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 p-2 bg-white rounded-full text-gray-800 dark:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>

                            <div className="flex flex-col">
                                <p className='text-xl'>Find Load</p>
                                <p className='text-black'>{"I'm Truck Owner"}</p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (inputRef.current && !inputRef.current?.contains(event.target) && !dropdownRef.current?.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <PageWithSidebar>
            <div className="flex flex-col items-center w-full justify-center h-full">
            {localStorage.getItem('is_kyc') == 1 && <div className="w-[99%] p-2 ml-2 mr-4 mb-12 -mt-16 bg-red-600 border shadow-md rounded-lg hover:underline" style={{ textAlign: 'center' }}>
                <marquee className='text-white font-semibold'><Link to={'/seller/kyc'} >Click here to complete your KYC and get non-disrupted shipping and COD remittances</Link></marquee>
            </div>}
            {localStorage.getItem('is_kyc') == 2 && <div className="w-[99%] font-semibold text-md p-2 ml-2 mr-4 mb-12 -mt-16 bg-yellow-400 border shadow-md rounded-lg hover:underline" style={{ textAlign: 'center' }}>
                <marquee className='text-white'>KYC Verification Is Pending</marquee>
            </div>}
                <p className='text-6xl font-bold'>Best Transport Service In India</p>
                <p className='border-[3px] border-red-500 w-[5%] rounded mt-6 mb-3'></p>
                <p className='w-[85%] text-center text-lg text-[#707070]'>
                    Welcome to Cargo Cloud truck transport services, your top choice for truck transport throughout India. We have container trucks and open trucks at competitive rates. Our Ahmedabad transport contact number 8925825497, dial for more information.
                </p>
                <div className="flex flex-row w-[88%] mt-5 gap-6 p-4">
                    {tabs.map((tab, index) => (
                        <div className="flex flex-col border w-[26rem] gap-4 rounded-2xl bg-white py-3" key={index}>
                            <div className="flex flex-row items-center px-3">
                                <div className="rounded bg-green-500 h-2 w-2 mr-2"></div>
                                <div className='mr-2'>Ahmedabad to</div>
                                <div className="flex items-center bg-gray-100 rounded shadow-md ">
                                    <div className="rounded bg-red-500  h-2 w-2 m-2"></div>
                                    <input
                                        ref={inputRef}
                                        className="outline-none bg-gray-100 h-10 px-2 w-[100%] rounded border-0 focus:ring-0 ring-0 focus:outline-none"
                                        placeholder="Enter your unloading city"
                                        type="text"
                                        value={selectedCity[index].city}
                                        onFocus={() => setIsDropdownOpen({ ...isDropdownOpen, [index]: { isOpen: true } })}
                                    />
                                    <Dropdown isOpen={isDropdownOpen[index]?.isOpen} index={index} />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-row justify-between px-3 py-1 text-[16px] font-medium text-[#5f5f5f] bg-[#b0772826]">
                                    <p>Truck Type</p>
                                    <p>Charges</p>
                                </div>
                                {trucks.map((truck, index) => (
                                    <div className="flex flex-row justify-between px-3 py-1.5 text-[16px] font-medium text-[#5f5f5f] border-b" key={index}>
                                        <p className='font-normal'>{truck.label}</p>
                                        <p>{truck.price}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-row px-3 justify-between">
                                <div className='text-[14px] font-medium'>
                                    Ahmedabad to {selectedCity[index].city} transport
                                </div>
                                <div className='text-[14px] font-medium'>
                                    <button className='bg-[#B07828] text-white px-3 rounded py-0.5'
                                        onClick={() => {
                                            setShowModal(true);
                                        }}
                                    >
                                        Book now
                                    </button>
                                    <CustomModal show={showModal} onClose={() => setShowModal(false)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageWithSidebar>
    )
}

export default Book;
