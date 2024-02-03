import { faAngleDown, faCloudArrowUp, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FileInput, Label } from 'flowbite-react';

const BulkOrder = () => {
    return (
        <div>
            <div className="px-4 lg:pl-[100px] lg:pr-[120px]">
                <div className="mb-5 mt-8 text-xl font-bold"> {'Bulk Returns'} </div>
                <div className="rounded-xl bg-white p-5">
                    <div className="flex w-full flex-wrap gap-2 md:gap-0">
                        <div className="px-2 text-base font-medium md:w-6/12">{'Import Bulk Returns'}</div>
                        <div className="flex justify-end px-2 md:w-6/12">
                            <button className="flex w-[180px] items-center justify-between rounded-[4px] border border-[#d3d3d3] bg-[#efedff] pb-2 pl-4 pr-4 pt-2.5 text-xs text-orange-600">
                                <FontAwesomeIcon icon={faDownload} />
                                <span>{'Download Template'}</span>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </button>
                        </div>
                    </div>
                    <div className="mt-2 whitespace-pre-wrap text-wrap px-2 text-xs text-gray-400 md:mt-[-10px]">
                        {
                            'Download the sample file and replace its data with your order data. Make sure all mandatory fields are filled. \nSave the file and upload it back.'
                        }
                    </div>
                    <div className="mt-7">
                        <Label htmlFor="bulkOrderDropZone">
                            <div className="grid h-[190px] place-items-center rounded-[10px] border border-dashed border-orange-700 bg-[#f4f8ff99]">
                                <div className="flex flex-col items-center gap-1.5">
                                    <FontAwesomeIcon icon={faCloudArrowUp} className="h-6 w-8 text-orange-700" />
                                    <div className="text-[10px] font-medium text-[#919192]">
                                        {'Drag And Drop to upload the files here.'}
                                    </div>
                                    <div className="text-xs font-medium text-black">{'OR'}</div>
                                    <Label
                                        htmlFor="bulkOrderDropZone"
                                        className="cursor-pointer rounded-md bg-orange-500 px-5 py-2 text-[10px] font-medium text-white">
                                        {'Browse and Upload'}
                                    </Label>
                                    <div className="text-wrap text-[10px] font-medium text-gray-400">
                                        {'Only '}
                                        <span className="text-black">{'csv, xls & xlsx'}</span>
                                        {' file formal will be accepted.'}
                                    </div>
                                </div>
                            </div>
                            <FileInput id="bulkOrderDropZone" className="hidden" />
                        </Label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BulkOrder;
