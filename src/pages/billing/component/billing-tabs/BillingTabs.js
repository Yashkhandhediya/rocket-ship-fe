import { earlyCodIcon } from "../../../../common/images"

const BillingTabs = ({ tabs, activeTab, handleTabClick }) => {

    return (
        <>
            <div className="flex justify-between pt-[15px] px-[10px] border-b-[1px] border-[#b3b3b3] m-2 lg:flex-nowrap flex-wrap bg-white">
                <div className='flex flex-row gap-1 items-center lg:flex-nowrap flex-wrap'>
                    <div className="px-2 text-[20px]">Billing</div>
                    {tabs.map((tab, index) => (
                        <button key={index} className={`-mb-[0.10rem] px-2 flex flex-row gap-2 text-[#959595] items-center text-[13px] py-4 ${activeTab === index && 'rounded-t-md border-x-[1px] border-t-2 border-b-[2px] border-t-[#01a0e0] border-x-[#b3b3b3] border-b-white text-[#004989]'}`}
                            onClick={() => handleTabClick(index)}
                        >
                            {tab.icon}
                            {tab.name}
                        </button>
                    ))}
                </div>
                {/* <div className="flex flex-row gap-2">
                    <button className="bg-[#27C24C] flex flex-row justify-start w-28 items-center h-7 rounded-sm text-white hover:bg-[#49a75f] text-[13px]">
                        <img src={earlyCodIcon} alt="" className="bg-[#25B848]" />
                        <span className="ml-4">Early COD</span>
                    </button>
                    <button className="bg-[#555555] flex flex-row gap-2 items-center text-[13px] px-3 h-7 rounded-sm text-white">
                        IMP
                    </button>
                </div> */}
            </div>
        </>
    )
}

export default BillingTabs
