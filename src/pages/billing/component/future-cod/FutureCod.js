import { useState } from "react"
import { CustomTooltip } from "../../../../common/components"
import { infoIcon } from "../../../../common/icons"
import { noData } from "../../../../common/images"

const FutureCod = () => {
    const [data, setData] = useState([]) //eslint-disable-line
    return (
        <div>
            <div className="flex flex-row justify-around py-2 mx-4 shadow text-[#333333] text-[12px] font-bold border-[#656565]">
                <div>
                    Expected Date Of Remittance
                </div>
                <div>
                    Total AWBs
                </div>
                <div className="flex flex-row justify-center items-center">
                    Total COD To Be Remitted info
                    <CustomTooltip
                        style='dark'
                        text={'COD Order to be Remitted = Order Amount - Early COD charges.Note: Freight Charges and RTO Reversal Amount (if applicable) will be deducted from the COD amount at the time of generating the CRF ID.'}
                        placement='right'
                    >
                        <img src={infoIcon} className="ms-2" />
                    </CustomTooltip>
                </div>
            </div>
            {data.length > 0 ? ('ashjgfdsy') : (
                <div className='pt-16 mb-12 w-full flex justify-center items-center flex-col'>
                    <img src={noData} alt="" width={'200px'} />
                    <div className='text-3xl mt-10 text-[#6457B6] font-bold'>We could not find any data.</div>
                </div>
            )}
        </div>
    )
}

export default FutureCod
