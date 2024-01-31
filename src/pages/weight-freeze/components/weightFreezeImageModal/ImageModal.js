import ImgContainer from '../../../../common/components/img-container/ImgContainer'

const ImageModal = ({ setShow, images, setImages }) => {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                <div className="relative mx-0 my-6 w-full max-w-xl h-full">
                    {/*content*/}
                    <div className="relative flex w-full gap-8 flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none p-5 pt-0 px-0">
                        {/*header*/}
                        <div className="flex w-full items-center justify-end rounded-t">
                            <button
                                className="border-0 z-[100000] p-1 text-2xl rounded-lg font-semibold leading-none bg-[#ffffff] text-black opacity-100 outline-none focus:outline-none"
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
                        <div className="relative flex-auto mt-2 px-5">
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
