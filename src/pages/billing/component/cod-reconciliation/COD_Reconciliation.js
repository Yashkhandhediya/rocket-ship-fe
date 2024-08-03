import axios from "axios";
import { useState, useEffect } from "react";
import { CustomTooltip } from "../../../../common/components";
import { remitance } from "../../../../common/images";
import { BACKEND_URL } from "../../../../common/utils/env.config";
import { toast } from "react-toastify";

const COD_Reconciliation = ({ charges, data }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const adminStatus = localStorage.getItem('is_admin');
        setIsAdmin(adminStatus === '2');
    }, []);

    const updateStatus = (id, status_name) => {
        axios.put(`${BACKEND_URL}/order/cod_remittance_update_status/${id}?status_name=${status_name}`)
            .then((res) => {
                console.log("Response Of Update Status", res.data);
                toast(`Status updated to ${status_name}`, { type: 'success' });
                window.location.reload();
            }).catch((err) => {
                console.log("Error in updating status", err);
                toast(`Error in updating status`, { type: 'error' });
            });
    };

    return (
        <>
            <div className="flex flex-row w-full justify-evenly my-4 px-6">
                {charges.map((charge, index) => (
                    <div key={index} className="flex flex-col gap-1 font-semibold bg-[#159700] text-white justify-between text-center w-[17rem] py-1">
                        <div className="text-[14px] flex flex-row justify-center items-center gap-1">
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
            <div>
                {data.length > 0 ? (
                    isAdmin ? (<div className="m-2">
                        <div className="flex items-center border border-b-[#E5E7EB] text-left">
                            <div className="w-[11.11%] border-r-2 py-2.5 text-center">User Name</div>
                            <div className="w-[11.11%] border-r-2 py-2.5 text-center">Order ID</div>
                            <div className="w-[11.11%] border-r-2 py-2.5 text-center">Courier Partner</div>
                            <div className="w-[11.11%] border-r-2 py-2.5 text-center">AWB No.</div>
                            <div className="w-[11.11%] border-r-2 py-2.5 text-center">Date</div>
                            <div className="w-[11.11%] border-r-2 py-2.5 text-center">Bank Transaction Id</div>
                            <div className="w-[11.11%] border-r-2 py-2.5 text-center">Status</div>
                            <div className="w-[11.11%] border-r-2 py-2.5 text-center">COD To Remitted</div>
                            <div className="w-[11.11%] border-r-2 py-2.5 text-center">Action</div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            {Array.isArray(data) && data.length > 0 ? data.map((item, key) => (
                                <div
                                    className="flex h-12 w-full flex-row items-center border border-b-[#E5E7EB] text-center"
                                    key={key}
                                >
                                    <div className="flex h-full w-[11.11%] items-center border-r-2 justify-center font-normal">{item.user_name}</div>
                                    <div className="flex h-full w-[11.11%] items-center border-r-2 justify-center font-normal">{item.order_id}</div>
                                    <div className="flex flex-col h-full w-[11.11%] justify-center border-r-2 font-normal">
                                        <div>{item.partner_name}</div>
                                    </div>
                                    <div className="flex h-full w-[11.11%] flex-col justify-center gap-4 border-r-2 text-center">
                                        <div>{item.waybill_no}</div>
                                    </div>
                                    <div className="h-full flex justify-center flex-col w-[11.11%] border-r-2 font-normal">
                                        <div>{item.created_date}</div>
                                    </div>
                                    <div className="h-full flex justify-center flex-col w-[11.11%] border-r-2 font-normal">
                                        <div>{item.bank_transaction_id ? item.bank_transaction_id : '-'}</div>
                                    </div>
                                    <div className="px-2 flex item-center h-full w-[11.11%] items-center border-r-2 justify-center font-normal">
                                        <div className={`rounded basis-full font-semibold bg-red-100 text-red-700 text-center ${item.status === 'done' ? 'text-green-700 bg-green-100' : ''}`}>
                                            {item.status}
                                        </div>
                                    </div>
                                    <div className="h-full flex justify-center flex-col w-[11.11%] border-r-2 font-normal">
                                        <div>{item.cod_to_be_remitted}</div>
                                    </div>
                                    <div className="px-2 flex item-center h-full w-[11.11%] items-center border-r-2 justify-center font-normal">
                                        <button
                                            className={`py-1.5 w-48 bg-[#E02424] text-white text-[14px] rounded-md ${(!item.buttun_flag) ? 'cursor-not-allowed' : ''}`}
                                            onClick={() => updateStatus(item.id, "inprogress")}
                                            disabled={!item.buttun_flag}
                                        >Initiated COD</button>
                                    </div>

                                </div>
                            )) : (
                                <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col'>
                                    <img src="remitance.png" alt="Remittance" width={'200px'} />
                                    <div className='text-3xl mt-10 text-[#b54040] font-bold'>Your remittance is on its way.</div>
                                    <div className='text-[15px] text-[#313131] mt-2 font-semibold opacity-80'>
                                        Hey {localStorage.getItem('user_name')}, We release COD remittance 3 times a week and on the 8th day from the date of delivery.
                                    </div>
                                    <div className="mt-8">
                                        <button className="bg-[#b54040] px-16 py-3 rounded-3xl text-white text-[13px]">
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>) : (<div className="m-2">
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
                            {Array.isArray(data) && data.length > 0 ? data.map((item, key) => (
                                <div
                                    className="flex h-12 w-full flex-row items-center border border-b-[#E5E7EB] text-center"
                                    key={key}
                                >
                                    <div className="flex h-full w-[14.29%] items-center border-r-2 justify-center font-normal">{item.order_id}</div>
                                    <div className="flex flex-col h-full w-[14.29%] justify-center border-r-2 font-normal">
                                        <div>{item.partner_name}</div>
                                    </div>
                                    <div className="flex h-full w-[14.29%] flex-col justify-center gap-4 border-r-2 text-center">
                                        <div>{item.waybill_no}</div>
                                    </div>
                                    <div className="h-full flex justify-center flex-col w-[14.29%] border-r-2 font-normal">
                                        <div>{item.created_date}</div>
                                    </div>
                                    <div className="h-full flex justify-center flex-col w-[14.29%] border-r-2 font-normal">
                                        <div>{item.bank_transaction_id ? item.bank_transaction_id : '-'}</div>
                                    </div>
                                    <div className="px-2 flex item-center h-full w-[14.29%] items-center border-r-2 justify-center font-normal">
                                        <div className={`rounded basis-full font-semibold bg-red-100 text-red-700 text-center ${item.status === 'done' ? 'text-green-700 bg-green-100' : ''}`}>
                                            {item.status}
                                        </div>
                                    </div>
                                    <div className="h-full flex justify-center flex-col w-[14.29%] border-r-2 font-normal">
                                        <div>{item.cod_to_be_remitted}</div>
                                    </div>
                                </div>
                            )) : (
                                <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col'>
                                    <img src="remitance.png" alt="Remittance" width={'200px'} />
                                    <div className='text-3xl mt-10 text-[#b54040] font-bold'>Your remittance is on its way.</div>
                                    <div className='text-[15px] text-[#313131] mt-2 font-semibold opacity-80'>
                                        Hey {localStorage.getItem('user_name')}, We release COD remittance 3 times a week and on the 8th day from the date of delivery.
                                    </div>
                                    <div className="mt-8">
                                        <button className="bg-[#b54040] px-16 py-3 rounded-3xl text-white text-[13px]">
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>)


                ) : (
                    <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col'>
                        <img src={remitance} alt="Remittance" width={'200px'} />
                        <div className='text-3xl mt-10 text-[#b54040] font-bold'>Your remittance is on its way.</div>
                        <div className='text-[15px] text-[#313131] mt-2 font-semibold opacity-80'>
                            Hey {localStorage.getItem('user_name')}, We release COD remittance 3 times in a week and on the 8th day from the date of delivery.
                        </div>
                        <div className="mt-8">
                            <button className="bg-[#b54040] px-16 py-3 rounded-3xl text-white text-[13px]">
                                Learn More
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default COD_Reconciliation;
