import React, {useState} from 'react';
import PageWithSidebar from '../../../common/components/page-with-sidebar/PageWithSidebar';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
import { noData } from '../../../common/images';

function CourierRule() {
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

  return (
    <PageWithSidebar>
      <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xl font-semibold mb-4">Settings - Courier Selection</h2>
        <div className="flex flex-row">
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
        </div>
      </div>
    </div>
    </PageWithSidebar>
  );
}

export default CourierRule;




