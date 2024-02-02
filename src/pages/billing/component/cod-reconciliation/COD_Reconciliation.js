import { CustomTooltip } from "../../../../common/components";
import { remitance } from "../../../../common/images";

const COD_Reconciliation = ({ charges, data }) => {
    return (
        <>
            <div className="flex flex-row w-full justify-evenly my-4 px-6">
                {charges.map((charge, index) => (
                    <div key={index} className="flex flex-col gap-1 font-semibold bg-[#285FDB] text-white justify-between text-center w-[17rem] py-1">
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
                {data.length > 0 ? ('ashjgfdsy') : (
                    <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col'>
                        <img src={remitance} alt="" width={'200px'} />
                        <div className='text-3xl mt-10 text-[#6457B6] font-bold'>Your remittance is on its way.</div>
                        <div className='text-[15px] text-[#313131] mt-2 font-semibold opacity-80'>
                            Hey {localStorage.getItem('user_name')}, We release COD remittance 3 times in a week and on the 8th day from the date of delivery.
                        </div>
                        <div className="mt-8">
                            <button className="bg-[#4E4298] px-16 py-3 rounded-3xl text-white text-[13px]">
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
