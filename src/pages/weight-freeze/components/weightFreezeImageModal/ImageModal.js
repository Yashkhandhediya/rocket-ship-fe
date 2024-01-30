import ImgContainer from '../../../../common/components/img-container/ImgContainer'

const ImageModal = ({ setShow, images, setImages }) => {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                <div className="relative mx-0 my-6 w-full max-w-xl h-full">
                    {/*content*/}
                    <div className="relative flex w-full gap-0 flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none p-5">
                        {/*header*/}
                        <div className="flex w-full items-center justify-end rounded-t">
                            <button
                                className="border-0 z-[100000] bg-transparent p-1 text-2xl font-semibold leading-none rounded-md bg-[#61616180] text-black opacity-100 outline-none focus:outline-none"
                                onClick={() => {
                                    setShow(false);
                                    setImages([]);
                                }}
                                >
                                ×
                            </button>
                            {/* To do : Active this button and move it to the right corner */}
                        </div>
                        {/*body*/}
                        <div className="relative flex-auto">
                            <ImgContainer images={images} />
                        </div>
                    </div>
                </div >
            </div >
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
    )
}

export default ImageModal
