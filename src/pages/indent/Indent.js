import { useEffect, useRef, useState } from 'react'
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar'
import { cityList } from '../book-truck/cities';
import { CustomMultiSelect, Field } from '../../common/components';
import { materialTypes, truckTypes, weights } from './data';

const Indent = () => {

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    const [selectedCity, setSelectedCity] = useState({
        source: '',
        destination: ''
    })
    const [isDropdownOpen, setIsDropdownOpen] = useState({
        source: false,
        destination: false
    });
    const [truckType, setTruckType] = useState('Select Truck Type');
    const [materialType, setMaterialType] = useState('Select Material Type');
    const [tons, setTons] = useState('Select Tons');
    const [targetPrice, setTargetPrice] = useState(null);

    const userName = localStorage.getItem('user_name');
    const userOptions = [{
        label: userName + '-' + '1234567890',
        value: userName + '-' + '1234567890'
    }];

    function Dropdown({ isOpen, type }) {
        if (!isOpen) return null;

        return (
            <div className="absolute flex flex-row z-[1000000] bg-white shadow-md h-36 p-4 gap-2 overflow-y-scroll rounded mt-20 flex-wrap w-64" ref={dropdownRef}>
                {cityList.map((city) => (
                    <div
                        key={city}
                        className={`px-1.5 text-[12px] cursor-pointer border rounded border-gray-500 hover:border-red-500 hover:text-red-500 ${city === selectedCity.city1 && 'bg-red-500 text-white'}`}
                        onClick={(event) => {
                            event.stopPropagation();
                            setSelectedCity({ ...selectedCity, [type]: city });
                            setIsDropdownOpen({ ...isDropdownOpen, [type]: false });
                        }}
                    >
                        {city}
                    </div>
                ))}
            </div>
        );
    }

    useEffect(() => {
        console.log(truckType);
    }, [truckType]);

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
            <div className="flex flex-col items-center gap-4 justify-center p-3">
                <div className="flex flex-row shadow gap-8 p-4 justify-between rounded w-[80%]">
                    <div className="flex w-1/2 flex-col">
                        <p className='flex flex-row justify-between items-center'>
                            <span className='font-medium'><span className="text-red-800 text-lg">*</span> Source</span>
                            <div className=' flex text-white text-[18px] bg-red-700 h-5 w-5 rounded-full items-center justify-center cursor-pointer'>
                                <span style={{ marginTop: '-2px' }}>+</span>
                            </div>
                        </p>
                        <input
                            ref={inputRef}
                            className="outline-none bg-gray-100 h-10 px-2 w-[100%] rounded border-0 focus:ring-0 ring-0 focus:outline-none"
                            placeholder="Enter your source"
                            type="text"
                            value={selectedCity.source}
                            onFocus={() => setIsDropdownOpen({ ...isDropdownOpen, source: true })}
                        />
                        <Dropdown isOpen={isDropdownOpen.source} type='source' />
                    </div>
                    <div className="flex w-1/2 flex-col">
                        <p className='flex flex-row justify-between items-center'>
                            <span className='font-medium'><span className="text-red-800 text-lg">*</span> Destination</span>
                            <div className=' flex text-white text-[18px] bg-red-700 h-5 w-5 rounded-full items-center justify-center cursor-pointer'>
                                <span style={{ marginTop: '-2px' }}>+</span>
                            </div>
                        </p>
                        <input
                            ref={inputRef}
                            className="outline-none bg-gray-100 h-10 px-2 w-[100%] rounded border-0 focus:ring-0 ring-0 focus:outline-none"
                            placeholder="Enter your destination"
                            type="text"
                            value={selectedCity.destination}
                            onFocus={() => setIsDropdownOpen({ ...isDropdownOpen, destination: true })}
                        />
                        <Dropdown isOpen={isDropdownOpen.destination} type='destination' />
                    </div>
                </div>

                <div className="flex flex-wrap shadow gap-4 p-6 justify-between rounded w-[80%]">
                    <div className="w-[49%]">
                        <CustomMultiSelect
                            isMulti={false}
                            label={'Truck Type'}
                            options={truckTypes}
                            selected={truckType}
                            closeMenuOnSelect={true}
                            placeholder={truckType}
                            hideSelectedOptions={false}
                            onChange={(value) => {
                                setTruckType(value)
                            }} />
                    </div>
                    <div className="w-[49%]">
                        <CustomMultiSelect
                            isMulti={false}
                            placeholder={userOptions[0].label}
                            label={'Truck Type'}
                            options={userOptions}
                            closeMenuOnSelect={true}
                            onChange={() => {
                                console.log('User selected');
                            }}
                        />
                    </div>
                    <div className="w-[49%]">
                        <CustomMultiSelect
                            isMulti={false}
                            label={'Material Type'}
                            options={materialTypes}
                            selected={materialType}
                            closeMenuOnSelect={true}
                            placeholder={materialType}
                            hideSelectedOptions={false}
                            onChange={(value) => {
                                setMaterialType(value)
                            }} />
                    </div>
                    <div className="w-[49%]">
                        <CustomMultiSelect
                            isMulti={false}
                            label={'Weight'}
                            options={weights}
                            selected={tons}
                            closeMenuOnSelect={true}
                            placeholder={tons}
                            hideSelectedOptions={false}
                            onChange={(value) => {
                                setTons(value)
                            }} />
                    </div>
                    <div className="w-[49%]">
                        <Field
                            value={targetPrice}
                            label="Target Price"
                            type='number'
                            placeholder="Enter Target Price"
                            onChange={(e) => setTargetPrice(e.target.value)}
                            leftAddOn='₹'
                        />
                    </div>
                    <div className="w-[49%]">
                        <button
                            className='text-red-500 mt-7 w-full text-left rounded'
                        >
                            Check Price
                        </button>
                    </div>
                </div>
            </div>
        </PageWithSidebar>
    )
}

export default Indent
