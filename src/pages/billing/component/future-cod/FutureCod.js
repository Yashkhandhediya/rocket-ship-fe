import { useState, useEffect } from 'react';
import { noData } from "../../../../common/images"

const FutureCod = ({ data }) => {

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const adminStatus = localStorage.getItem('is_super');
        setIsAdmin(adminStatus === '3');
    }, []);


    return (
        <div>
            <div>
                <div>
                    {data.length > 0 ? (
                        isAdmin ? (
                            <div className="m-2">
                                <div className="flex items-center border border-b-[#E5E7EB] text-left">
                                    <div className="w-[12.5%] border-r-2 py-2.5 text-center">User Name</div>
                                    <div className="w-[12.5%] border-r-2 py-2.5 text-center">Order ID</div>
                                    <div className="w-[12.5%] border-r-2 py-2.5 text-center">Courier Partner</div>
                                    <div className="w-[12.5%] border-r-2 py-2.5 text-center">AWB No.</div>
                                    <div className="w-[12.5%] border-r-2 py-2.5 text-center">Date</div>
                                    <div className="w-[12.5%] border-r-2 py-2.5 text-center">Bank Transaction Id</div>
                                    <div className="w-[12.5%] border-r-2 py-2.5 text-center">Status</div>
                                    <div className="w-[12.5%] border-r-2 py-2.5 text-center">COD To Remitted</div>
                                    {/* <div className="w-[19.2%] border-r-2 py-2.5 text-center">Action</div> */}
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    {Array.isArray(data) && data.length > 0 ? (
                                        data.filter(item => item.status === 'Pending').map((item, key) => (
                                            <div
                                                className="flex h-12 w-full flex-row items-center border border-b-[#E5E7EB] text-center"
                                                key={key}>
                                                <div className="flex h-full w-[12.5%] items-center justify-center border-r-2 font-normal">
                                                    {item.user_name}
                                                </div>
                                                <div className="flex h-full w-[12.5%] items-center justify-center border-r-2 font-normal">
                                                    {item.order_id}
                                                </div>
                                                <div className="flex h-full w-[12.5%] flex-col justify-center border-r-2 font-normal">
                                                    <div>{item.partner_name}</div>
                                                </div>
                                                <div className="flex h-full w-[12.5%] flex-col justify-center gap-4 border-r-2 text-center">
                                                    <div>{item.waybill_no}</div>
                                                </div>
                                                <div className="flex h-full w-[12.5%] flex-col justify-center border-r-2 font-normal">
                                                    <div>{item.created_date}</div>
                                                </div>
                                                <div className="flex h-full w-[12.5%] flex-col justify-center border-r-2 font-normal">
                                                    <div>{item.bank_transaction_id ? item.bank_transaction_id : '-'}</div>
                                                </div>
                                                <div className="item-center flex h-full w-[12.5%] items-center justify-center border-r-2 px-2 font-normal">
                                                    <div
                                                        className={`basis-full rounded text-center font-semibold ${item.status === 'Transferd' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                            }`}>
                                                        {item.status}
                                                    </div>
                                                </div>
                                                <div className="flex h-full w-[12.5%] flex-col justify-center border-r-2 font-normal">
                                                    <div>{item.cod_to_be_remitted}</div>
                                                </div>
                                                {/* <div className="item-center flex h-full w-[17.77%] items-center justify-center border-r-2 px-2 font-normal">
                                                    <button
                                                        className={`mr-1 w-48 rounded-md bg-[#E02424] py-1.5 text-[14px] text-white ${!item.buttun_flag ? 'cursor-not-allowed' : ''
                                                            }`}
                                                        onClick={() => updateStatus(item.id, 'In Progress')}
                                                        disabled={!item.buttun_flag}>
                                                        Initiated COD
                                                    </button>
                                                    <button
                                                        className={`w-48 rounded-md bg-[#E02424] py-1.5 text-[14px] text-white ${!item.buttun_flag ? 'cursor-not-allowed' : ''
                                                            }`}
                                                        onClick={() => updateStatus(item.id, 'Transferd')}
                                                        disabled={!item.buttun_flag}>
                                                        Manual Transfer
                                                    </button>
                                                </div> */}
                                            </div>
                                        ))
                                    ) : (
                                        <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col'>
                                            <img src={noData} alt="" width={'200px'} />
                                            <div className='text-3xl mt-10 text-[#b54040] font-bold'>We could not find any data.</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="m-2">
                                <div className="flex items-center border border-b-[#E5E7EB] text-left">
                                    <div className="w-[14.29%] border-r-2 py-2.5 text-center">Order ID</div>
                                    <div className="w-[14.29%] border-r-2 py-2.5 text-center">Courier Partner</div>
                                    <div className="w-[14.29%] border-r-2 py-2.5 text-center">AWB No.</div>
                                    <div className="w-[14.29%] border-r-2 py-2.5 text-center">Date</div>
                                    <div className="w-[14.29%] border-r-2 py-2.5 text-center">Bank Transaction Id</div>
                                    <div className="w-[14.29%] border-r-2 py-2.5 text-center">Status</div>
                                    <div className="w-[14.29%] border-r-2 py-2.5 text-center">COD To Remitted</div>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    {Array.isArray(data) && data.length > 0 ? (
                                        data.filter(item => item.status === 'Pending').map((item, key) => (
                                            <div
                                                className="flex h-12 w-full flex-row items-center border border-b-[#E5E7EB] text-center"
                                                key={key}>
                                                <div className="flex h-full w-[14.29%] items-center justify-center border-r-2 font-normal">
                                                    {item.order_id}
                                                </div>
                                                <div className="flex h-full w-[14.29%] flex-col justify-center border-r-2 font-normal">
                                                    <div>{item.partner_name}</div>
                                                </div>
                                                <div className="flex h-full w-[14.29%] flex-col justify-center gap-4 border-r-2 text-center">
                                                    <div>{item.waybill_no}</div>
                                                </div>
                                                <div className="flex h-full w-[14.29%] flex-col justify-center border-r-2 font-normal">
                                                    <div>{item.created_date}</div>
                                                </div>
                                                <div className="flex h-full w-[14.29%] flex-col justify-center border-r-2 font-normal">
                                                    <div>{item.bank_transaction_id ? item.bank_transaction_id : '-'}</div>
                                                </div>
                                                <div className="item-center flex h-full w-[14.29%] items-center justify-center border-r-2 px-2 font-normal">
                                                    <div
                                                        className={`basis-full rounded text-center font-semibold ${item.status === 'Transferd' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                            }`}>
                                                        {item.status}
                                                    </div>
                                                </div>
                                                <div className="flex h-full w-[14.29%] flex-col justify-center border-r-2 font-normal">
                                                    <div>{item.cod_to_be_remitted}</div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col'>
                                            <img src={noData} alt="" width={'200px'} />
                                            <div className='text-3xl mt-10 text-[#b54040] font-bold'>We could not find any data.</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    ) : (
                        <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col'>
                            <img src={noData} alt="" width={'200px'} />
                            <div className='text-3xl mt-10 text-[#b54040] font-bold'>We could not find any data.</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FutureCod
