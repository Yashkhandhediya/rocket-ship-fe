import { useState } from "react";
import { noData } from "../../../../common/images";

const Recharge_History = () => {
    const [data, setData] = useState([]);
    return (
        <div>
            <div className='ml-4 text-[12px] font-bold text-[#333333] border'>
                <div className='flex flex-row w-full border border-collapse bg-[#FAFAFA]'>
                    <div className='pl-2 border-r-2 pr-2 w-[10%] py-2'>Date</div>
                    <div className='pl-2 border-r-2 pr-2 w-[30%] py-2'>Transaction ID(PG)</div>
                    <div className='pl-2 border-r-2 pr-2 w-[30%] py-2'>(₹) Amount</div>
                    <div className='pl-2 border-r-2 pr-2 w-[10%] py-2'>Status</div>
                    <div className='pl-2 border-r-2 pr-2 w-[20%] py-2'>Description</div>
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

export default Recharge_History
