import React, {useState} from 'react';
import PageWithSidebar from '../../../common/components/page-with-sidebar/PageWithSidebar';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
import { noData } from '../../../common/images';
import { Delivery, Ecom } from '../../../common/icons';

function CourierRule() {
    const [isOn, setIsOn] = useState(false);
    const navigate = useNavigate()
    const handleRule = () => {
        navigate('/add-rule')
    }
    const [activeTab, setActiveTab] = useState('Active');

    const tabs = [
        'Active',
        'Inactive',
        'Archived',
        'All'
    ]

    const couriers = [
        { name: 'Delhivery Air', logo: Delivery },
        { name: 'Ecom Express Surface', logo: Ecom },
        { name: 'Ecom Express Surface 5kg', logo: Ecom },
        { name: 'Ecom Express Surface 10kg', logo: Ecom },
        { name: 'Ecom Express Surface 2kg', logo: Ecom },
        { name: 'Ecom Premium and ROS Surface', logo: Ecom },
        { name: 'Delhivery Surface 20kg', logo: Delivery },
        { name: 'Delhivery Surface 10kg', logo: Delivery },
        { name: 'Delhivery Surface 5kg', logo: Delivery },
        { name: 'Delhivery Surface', logo: Delivery },
      ];

      
      const toggleSwitch = () => {
        setIsOn(!isOn);
      };

  return (
    <PageWithSidebar>
    <div className="bg-gray-100 text-xl p-2">
      Settings - Courier Rules
      </div>
      <div className="border border-gray-300 ml-2 mr-2"></div>
      <div className="min-h-screen bg-gray-200 p-6 ml-2 mr-2">
      <div className="flex flex-row justify-between items-center">
        <div className="-mt-12 font-bold text-[#656565]">
          <Link to={'/settings'} className="font-semibold text-green-500">
            Settings
          </Link>{' '}
          &gt; Courier &gt; Courier Rules
        </div>
        <div className="flex flex-row mb-2">
        <button className="bg-gray-200 text-sm border border-blue-400 rounded-sm p-2 cursor-not-allowed">
            Set Courier Rule Priority
        </button>
        <button className="bg-blue-600 text-sm text-white border rounded-sm p-2 ml-2" onClick={handleRule}>
            Add New Rule
        </button>
        </div>
      </div>
      <div className="bg-gray-100 flex flex-row p-3 rounded-sm">
        <div className="w-1/4 flex">
            <div className="w-64">
            <div className="px-4 py-6">
                <ul className="space-y-2">
                <li>
                    <Link
                    to="/user-couriers"
                    className="rounded-md px-4 py-2 block font-medium"
                    >
                    Courier Priority
                    </Link>
                </li>
                <li>
                    <Link
                    to="/courier-selection"
                    className="text-gray-600 hover:bg-gray-100 rounded-md px-4 py-2 block font-medium"
                    >
                    Courier Selection
                    </Link>
                </li>
                <li className='bg-white'>
                    <Link
                    to="/courier-rule"
                    className="text-gray-600 hover:bg-gray-100 rounded-md px-4 py-2 block font-medium"
                    >
                    Courier Rules
                    </Link>
                </li>
                <li>
                    <Link
                    to="/courier-log"
                    className="text-gray-600 hover:bg-gray-100 rounded-md px-4 py-2 block font-medium"
                    >
                    Courier Activity Logs
                    </Link>
                </li>
                </ul>
            </div>
            </div>
        </div>
        <div className="w-3/4">
            <div className="flex w-full gap-10 border-b">
                {tabs.map((tab) => (
                <div
                    key={tab}
                    className={`cursor-pointer px-4 py-2 ${
                    activeTab === tab ? 'border-b-2 border-[#912517]' : 'border-b-2 border-transparent'
                    }`}
                    onClick={() => setActiveTab(tab)}>
                    {tab}
                </div>
                ))}
            </div>

        <div className="bg-white p-6 rounded-md shadow-md">
        <div className="border border-gray-200 p-2">
            <div className="flex flex-row justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-500">Shipping Rule Name: Jay</h2>
                <div className="flex space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded">Clone</button>
                    <button className="bg-gray-500 text-white px-3 py-1 rounded">Archive</button>
                    <button
                        onClick={toggleSwitch}
                        className={`relative inline-flex items-center p-1 rounded-full transition-colors focus:outline-none ${
                            isOn
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        >
                        <span
                            className={`${
                            isOn ? 'translate-x-0' : 'translate-x-0'
                            } inline-block h-6 w-6 transform rounded-full bg-white transition`}
                        />
                        <span className={`ml-2 mr-2 text-sm font-medium ${isOn ? 'order-first' : 'order-last'}`}>
                            {isOn ? 'On' : 'Off'}
                        </span>
                    </button>
                </div>
                </div>
                <div className="border border-gray-200"></div>

                <div className="mb-6 mt-4">
                <h3 className="text-sm font-semibold mb-2 text-red-500">Shipment Conditions :</h3>
                <p className="text-sm mt-4">Payment Mode: <span className="font-semibold">COD</span></p>
                </div>


                <div>
                    <h3 className="text-sm font-semibold mb-2 text-red-500">Courier Priority :</h3>
                <div className="flex flex-wrap">
                    {couriers.map((courier, index) => (
                    <div key={index} className="flex flex-col w-[15%] items-center m-2">
                        <img src={courier.logo} alt={courier.name} className="w-16 h-16 mb-2" />
                        <p className="text-center text-xs">{courier.name}</p>
                    </div>
                    ))}
                </div>
                </div>


                <div className="mb-6 mt-4">
                <h3 className="text-sm font-semibold mb-2 text-red-500">Restricted Couriers :</h3>
                </div>

                <div className="mb-4 mt-2">
                <h3 className="text-sm font-semibold text-red-500">Creation Details :</h3>
                <div className="flex flex-row">
                <p className="text-sm mt-4 mr-4"><strong className='text-gray-500'>Created By : </strong><span className="text-sm">Shiva</span></p>
                <p className="text-sm mt-4 ml-20"><strong className='text-gray-500'>Creation Date : </strong><span className="text-sm">20 June 2024</span></p>
                </div>
                </div>


                </div>
                {/* <ShipmentConditions />
                <CourierPriority /> */}

              
            </div>


        </div>
      </div>
    </div>
    </PageWithSidebar>
  );
}

export default CourierRule;




