const Freeze_Header = () => {
    return (
        <div className="h-full bg-[#f8f8f8] pl-4">
            <div className="py-4">
                {/* header-wrapper */}
                <div className="text-[#484848] text-xl font-[600] flex flex-col">
                    <div className="flex w-full justify-end">
                        <button className="bg-[rgb(40,95,219,0.1)] mt-[25px] text-black text-[12px] leading-[30px] bg-opacity-10 w-[220px] h-[30px] border-1 border-[rgb(194 203 224,0.2)] rounded-[4px]">
                            Learn more in 2 minutes
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-5 h-5 inline">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </div>
                    <div className="text-2xl font-bold w-full">Weight Freeze</div>
                    <p className="text-[#707070] text-[16px] text-left font-normal">
                        {`Experience weight discrepancy free shipping with our 'Weight Freeze' feature. You can freeze the weight of your products' shipments by sharing`}
                        <br />
                        {`data and sample images or by giving consent on the freezing recommendations made by Shiprocket based on your shipment history.`}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Freeze_Header;