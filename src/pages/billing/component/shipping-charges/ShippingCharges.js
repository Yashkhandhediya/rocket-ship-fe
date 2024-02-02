import { useState } from 'react'

const ShippingCharges = () => {
    const [data , setData] = useState([]);

    const charges = [
        {
            label: 'Total Freight Charges',
            value: '₹ 0.00'
        },
        {
            label: 'Billed Freight Charges',
            value: '₹ 0.00'
        },
        {
            label: 'Unbilled Freight Charges',
            value: '₹ 0.00'
        },
        {
            label: 'Total On-hold Charges',
            value: '₹ 0.00'
        },
        {
            label: 'Invoice Due Amount',
            value: '₹ 0.00'
        },
    ]

    return (
        <>
            {/* Bills and amount */}
            <div className="flex flex-row w-full justify-evenly my-4 px-6">
                {charges.map((charge, index) => (
                    <div key={index} className="flex flex-col gap-1 font-semibold bg-[#285FDB] text-white justify-between text-center w-[17rem] py-2">
                        <div className="text-[14px]">{charge.label}</div>
                        <div className="text-[14px]">{charge.value}</div>
                    </div>
                ))}
            </div>

            {/* Search Input */}
            <div className="flex flex-row w-full my-4 px-7">
                <input type="text" name="search_order" id="search_order" className='text-[13px] w-[20rem] h-[2rem] text-[#959595] border border-[#CFD4D6] focus:border-gray-300 focus:ring-0 rounded-l-[0.2rem]'
                    placeholder='Search by Order Id or AWB No.' autoComplete={false} />
                <button className='bg-[#FAFAFA] border-l-0 border border-[#CFD4D6] px-2' disabled>
                    <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                    </svg>
                </button>
            </div>

            {/* Table */}
            <div className='overflow-x-scroll ml-4 text-[12px] font-bold text-[#333333]'>
                <div className='flex flex-row border-t-2 w-[120%]'>
                    <div className='pl-2 border-r-2  pr-8 w-28 py-2'>Order ID</div>
                    <div className='pl-2 border-r-2  pr-8 w-32 py-2'>AWB Number</div>
                    <div className='pl-2 border-r-2  pr-8 w-40 py-2'>Courier</div>
                    <div className='pl-2 border-r-2  pr-8 w-40 py-2'>Shipment Status</div>
                    <div className='pl-2 border-r-2  pr-8 w-44 py-2'>AWB Assigned Date</div>
                    <div className='pl-2 border-r-2  pr-8 w-36 py-2'>Applied Weight Charges (₹)</div>
                    <div className='pl-2 border-r-2  pr-8 w-36 py-2'>Excess Weight Charges (₹)</div>
                    <div className='pl-2 border-r-2  pr-8 w-36 py-2'>On Hold Amount (₹)</div>
                    <div className='pl-2 border-r-2  pr-8 w-36 py-2'>Total Freight Charges (₹)</div>
                    <div className='pl-2 border-r-2  pr-8 w-36 py-2'>
                        Entered Weight & Dimensions
                    </div>
                    <div className='pl-2 border-r-2  pr-8 w-36 py-2'>
                        Charged Weight & Dimensions
                    </div>
                    <div className='pl-2 border-r-2  pr-8 w-36 py-2'>
                        View Transactions Details
                    </div>
                </div>
                <div>
                    {/* Table Data */}
                    {data.length === 0 ? (
                        'no data available'
                    ):(
                        'data available'
                    )}
                </div>
            </div>
        </>
    )
}

export default ShippingCharges
