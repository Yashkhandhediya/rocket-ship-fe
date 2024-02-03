import { useState } from "react";
import { CustomTooltip } from "../../../../common/components"
import { noData } from "../../../../common/images";

const Wallet_Data = () => {
    const [data, setData] = useState([]); //eslint-disable-line
    const charges = [
        {
            label: 'Successfull Recharge',
            value: '₹ 0.00'
        },
        {
            label: 'Total Credit',
            value: '₹ 0.00',
            tooltip: 'Total Credit is inclusive of successful recharge sum.'
        },
        {
            label: 'Total Debit',
            value: '₹ 0.00'
        }
    ]

    return (
        <div>
            <div className="flex flex-row w-full justify-evenly my-4 px-6">
                {charges.map((charge, index) => (
                    <div key={index} className="flex flex-col mx-1 font-semibold bg-[#159700] text-white justify-between text-center w-full py-1">
                        <div className="text-[14px] flex flex-row justify-center items-center gap-3">
                            {charge.label}
                            {charge.tooltip &&
                                <CustomTooltip text={charge.tooltip} style="dark" placement="right">
                                    {/* info svg */}
                                    <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clipRule="evenodd" />
                                    </svg>
                                </CustomTooltip>
                            }
                        </div>
                        <div className="text-[14px]">{charge.value}</div>
                    </div>
                ))}
            </div>
            <div className='ml-4 text-[12px] font-bold text-[#333333] border'>
                <div className='flex flex-row w-full border border-collapse bg-[#FAFAFA]'>
                    <div className='pl-2 border-r-2 pr-2 w-full py-2'>Date</div>
                    <div className='pl-2 border-r-2 pr-2 w-full py-2'>SR Transaction ID</div>
                    <div className='pl-2 border-r-2 pr-2 w-full py-2'>Amount</div>
                    <div className='pl-2 border-r-2 pr-2 w-full py-2'>Description</div>
                </div>
                <div className='w-full flex flex-col justify-center items-center bg-[#FFFFFF]'>
                    {/* Table Data */}
                    {data.length === 0 ? (
                        <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col'>
                            <img src={noData} alt="" width={'200px'} />
                            <div className='text-[1.7rem] mt-10 text-[#b54040] font-bold'>We could not find any data for the applied filters.</div>
                            <div className='text-[14px] mt-2 font-normal opacity-80'>Please change filters and retry.</div>
                        </div>
                    ) : (
                        'Wallet Data'
                    )}
                </div>
            </div>
        </div>
    )
}


export default Wallet_Data
