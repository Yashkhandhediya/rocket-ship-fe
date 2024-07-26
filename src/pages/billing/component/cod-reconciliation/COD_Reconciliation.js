import axios from "axios";
import { CustomTooltip } from "../../../../common/components";
import { remitance } from "../../../../common/images";
import { BACKEND_URL } from "../../../../common/utils/env.config";
import { toast } from "react-toastify";
import { ACCESS_TOKEN } from "../../../../common/utils/config";
import { useNavigate } from "react-router-dom";

const COD_Reconciliation = ({ charges, data }) => {
    const navigate = useNavigate();
    const headers={'Content-Type': 'application/json','Authorization': ACCESS_TOKEN};
    console.log("COncil",data)
    const updateStatus = (id,status_name) => {
        axios.put(BACKEND_URL + `/order/cod_remittance_update_status/${id}?status_name=${status_name}`,{headers})
        .then((res) => {
            console.log("Response Of Update Status",res.data)
            toast(`status updated to ${status_name}`,{type:'success'})
            window.location.reload()
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                sessionStorage.clear()
                navigate('/login');
            } else {
            console.log("Error in updating status",err)
            toast(`Error in updating status`,{type:'error'})
            }
        })
    }
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
                        <div className="m-2">
                            <div className="flex items-center border border-b-[#E5E7EB] text-left">
                            <div className="w-[13.66%] border-r-2 py-2.5 pl-2">Order ID</div>
                            <div className="w-[13.66%] border-r-2 py-2.5 pl-2">COD To Remitted</div>
                            <div className="w-[13.66%] border-r-2 py-2.5 pl-2">Last COD Remitted</div>
                            <div className="w-[13.66%] border-r-2 py-2.5 pl-2">Total COD Remitted</div>
                            <div className="w-[16.66%] border-r-2 py-2.5 pl-2">Total Deduction From COD</div>
                            <div className="w-[13.66%] border-r-2 py-2.5 pl-2">Remittence Initiated</div>
                            <div className="w-[12.66%] border-r-2 py-2.5 pl-2">Status</div>
                            <div className="w-[12.66%] border-r-2 py-2.5 pl-2">Action</div>
                        </div>
                        {/* table data */}
                        <div className="flex flex-col items-center justify-center">
                            {console.log(data)} {/* eslint-disable-line */}
                            {Array.isArray(data) && data.length > 0 ? data.map((item, key) => {
                            return (
                                <div
                                className="flex h-12 w-full flex-row items-center border border-b-[#E5E7EB] text-left"
                                key={key}
                                >
                                <div className="flex h-full w-[13.66%] items-center border-r-2 pl-2 font-normal">{item.order_id}</div>
                                <div className="flex flex-col h-full w-[13.66%] justify-center border-r-2 pl-2 font-normal">
                                    <div>{item.cod_to_be_remitted}</div>
                                </div>
                                <div className="flex h-full w-[13.66%] flex-col justify-center gap-4 border-r-2 pl-2 text-left">
                                    <div>{item.last_cod_remitted}</div>
                                </div>
                                <div className="h-full flex justify-center flex-col w-[13.66%] border-r-2 pl-2 font-normal">
                                    <div>{`${item.total_cod_remitted}`}</div>
                                   
                                </div>
                                <div className="h-full flex justify-center flex-col w-[16.66%] border-r-2 pl-2 font-normal">
                                    <div>{`${item.total_deduction_from_cod}`}</div>
                                    
                                </div>
                                <div className="h-full flex justify-center flex-col w-[13.66%] border-r-2 pl-2 font-normal">
                                    <div><span className='text-red-800'>{item.remittance_initiated}</span></div>
                                </div>
                                <div className="px-2 flex item-center h-full w-[12.66%] items-center border-r-2 pl-2 font-normal">
                                    <div className='rounded basis-full font-semibold bg-red-100 text-red-700 text-center'>{
                                        item.status
                                    }
                                    </div>
                                </div> 
                                <div className="px-2 flex item-center h-full w-[12.66%] items-center border-r-2 pl-2 font-normal">
                                <button className={`border-2 p-1 mr-2 border-red-400 rounded font-semibold text-red-600 ${item.status === 'done' ? 'cursor-not-allowed': ''}`}
                                    onClick={() => {
                                        updateStatus(item.id,"done");
                                    }}
                                    disabled={item.status === 'done'}
                                    >Done</button>
                                    <button
                                    className={`border-2 p-1 border-red-400 rounded font-semibold text-red-600 ${(item.status === 'inprogress' || item.status === 'done') ? 'cursor-not-allowed': ''}`}
                                    onClick={() => {
                                        updateStatus(item.id,"inprogress");
                                    }}
                                    disabled={item.status === 'inprogress' || item.status === 'done'}
                                    >InProgrss</button>
                                </div> 
                                </div>
                            );
                            }) : (
                        <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col'>
                        <img src={remitance} alt="" width={'200px'} />
                        <div className='text-3xl mt-10 text-[#b54040] font-bold'>Your remittance is on its way.</div>
                        <div className='text-[15px] text-[#313131] mt-2 font-semibold opacity-80'>
                            Hey {sessionStorage.getItem('user_name')}, We release COD remittance 3 times in a week and on the 8th day from the date of delivery.
                        </div>
                        <div className="mt-8">
                            <button className="bg-[#b54040] px-16 py-3 rounded-3xl text-white text-[13px]">
                                Learn More
                            </button>
                        </div>
                    </div>
                            )}
                        </div>
                </div>
                ) : (
                    <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col'>
                        <img src={remitance} alt="" width={'200px'} />
                        <div className='text-3xl mt-10 text-[#b54040] font-bold'>Your remittance is on its way.</div>
                        <div className='text-[15px] text-[#313131] mt-2 font-semibold opacity-80'>
                            Hey {sessionStorage.getItem('user_name')}, We release COD remittance 3 times in a week and on the 8th day from the date of delivery.
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
    )
}

export default COD_Reconciliation;
