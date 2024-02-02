import { useState } from 'react'
import { noData } from '../../../../common/images';
import { ShippingTable } from '../shipping-table';
const ShippingCharges = () => {
    const [data, setData] = useState([]); //eslint-disable-line

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
                <div className='flex flex-row border-t-2 w-[113%] border-b-2'>
                    <div className='pl-2 border-r-2 pr-2 w-28 py-2'>Order ID</div>
                    <div className='pl-2 border-r-2 pr-2 w-32 py-2'>AWB Number</div>
                    <div className='pl-2 border-r-2 w-36 py-2 pr-2 flex flex-row justify-between'>
                        <span>Courier</span>
                        <svg className="w-4 h-4 text-transparent dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#285FDB" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.8 4H5.2a1 1 0 0 0-.7 1.7l5.3 6 .2.7v4.8c0 .2 0 .4.2.4l3 2.3c.3.2.8 0 .8-.4v-7.1c0-.3 0-.5.2-.7l5.3-6a1 1 0 0 0-.7-1.7Z" />
                        </svg>
                    </div>
                    <div className='pl-2 border-r-2 w-36 py-2 pr-2 flex flex-row justify-between'>
                        <span>Shipment Status</span>
                        <svg className="w-4 h-4 text-transparent dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#285FDB" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.8 4H5.2a1 1 0 0 0-.7 1.7l5.3 6 .2.7v4.8c0 .2 0 .4.2.4l3 2.3c.3.2.8 0 .8-.4v-7.1c0-.3 0-.5.2-.7l5.3-6a1 1 0 0 0-.7-1.7Z" />
                        </svg>
                    </div>
                    <div className='pl-2 border-r-2 w-44 py-2 pr-2 flex flex-col'>
                        <div className='flex flex-row justify-between'>
                            <span>AWB Assigned Date</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill='none' viewBox="0 0 24 24" strokeWidth={1.5} stroke="#285FDB" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>
                        </div>
                        <div>
                            <select name="timeline" id="timeline" className='h-7 mb-3 text-[12px] font-bold text-[#000000c0] border border-[#CFD4D6] py-[1px] px-[14px] focus:border-[#66afe9] focus:ring-0 rounded-sm'>
                                <option value="last_one_year">Last One Year</option>
                                <option value="last_one_year">2023</option>
                                <option value="last_one_year">2022</option>
                                <option value="last_one_year">2021</option>
                                <option value="last_one_year">2020</option>
                                <option value="last_one_year">2019</option>
                                <option value="last_one_year">2018</option>
                                <option value="last_one_year">2017</option>
                                <option value="last_one_year">2016</option>
                            </select>
                        </div>
                    </div>
                    <div className='pl-2 border-r-2 pr-2 w-36 py-2'>Applied Weight Charges (₹)</div>
                    <div className='pl-2 border-r-2 pr-2 w-36 py-2'>Excess Weight Charges (₹)</div>
                    <div className='pl-2 border-r-2 pr-2 w-28 py-2'>On Hold Amount (₹)</div>
                    <div className='pl-2 border-r-2 pr-2 w-32 py-2'>Total Freight Charges (₹)</div>
                    <div className='pl-2 border-r-2 pr-2 w-32 py-2'>
                        Entered Weight & Dimensions
                    </div>
                    <div className='pl-2 border-r-2 pr-2 w-32 py-2'>
                        Charged Weight & Dimensions
                    </div>
                    <div className='pl-2 border-r-2 pr-2 w-32 py-2'>
                        View Transactions Details
                    </div>
                </div>
                <div className='w-full flex flex-col justify-center items-center'>
                    {/* Table Data */}
                    {data.length === 0 ? (
                        <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col'>
                            <img src={noData} alt="" width={'200px'} />
                            <div className='text-[1.7rem] mt-10 text-[#6457B6] font-bold'>We could not find any data for the applied filters.</div>
                            <div className='text-[14px] mt-2 font-normal opacity-80'>Please change filters and retry.</div>
                        </div>
                    ) : (
                        <ShippingTable data={data} />
                    )}
                </div>
            </div>
        </>
    )
}

export default ShippingCharges
