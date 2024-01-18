import { useState } from "react";
import { toast } from "react-toastify";
import { Field } from "../../../../common/components";
import { upload } from "../../../../common/icons";

const Document_Upload = () => {
    const [documentType1, setDocumentType1] = useState('');
    const [documentType2, setDocumentType2] = useState('');
    const [disableInput1, setDisableInput1] = useState(true);
    const [disableInput2, setDisableInput2] = useState(true);

    const [showDocument1Info, setShowDocument1Info] = useState(false);
    const [showDocument2Info, setShowDocument2Info] = useState(false);

    const [disableDocument1, setDisableDocument1] = useState(false);
    const [disableDocument2, setDisableDocument2] = useState(true);

    // document 1 number and name
    const [document1number, setDocument1Number] = useState('ABCDE1234F');
    const [document1name, setDocument1Name] = useState('Jai Shree Ram');

    // document 2 number and name
    const [document2number, setDocument2Number] = useState('ABCDE1234F');
    const [document2name, setDocument2Name] = useState('Jai Shree Ram');

    const [document, setDocument] = useState({
        type1Front: '',
        type1Back: '',
        type2Front: '',
        type2Back: ''
    });

    const handleFileChange = (event) => {
        const { id } = event.target;
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setDocument((prev) => ({
                    ...prev,
                    [id]: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSetDocumentType1 = (event) => {
        setDisableInput1(false);
        setDocument((prev) => ({
            ...prev,
            type1Front: '',
            type1Back: ''
        }))
        setDocumentType1(event.target.value);
    }

    const handleSetDocumentType2 = (event) => {
        setDisableInput2(false);
        setDocument((prev) => ({
            ...prev,
            type2Front: '',
            type2Back: ''
        }))
        setDocumentType2(event.target.value);
    }


    const options = [
        { value: 'panCard', label: 'PAN Card' },
        { value: 'drivingLicense', label: 'Driving License' },
        { value: 'validPassport', label: 'Valid Passport' }
    ]

    const optionsForTwo = options.filter((option) => option.value !== documentType1);
    const handleDocument1Submission = () => {
        try {
            // API call to submit document
            setDisableDocument1(true);
            setDisableDocument2(false);
            setShowDocument1Info(true);
            if (documentType1 === documentType2) {
                setDocumentType2('');
                setDocument((prev) => ({
                    ...prev,
                    type2Front: '',
                    type2Back: ''
                }))
                setShowDocument2Info(false);
            }
            toast.success('Document 1 submitted successfully', { type: 'success' })
        } catch (error) {
            // Show error message
            toast.error('Please enter a valid Adhaar number', { type: 'error' })
        }
    }

    const handleDocument2Submission = () => {
        try {
            // API call to submit document
            setDisableDocument2(true);
            setShowDocument2Info(true);
            toast.success('Document 2 submitted successfully', { type: 'success' })
        }
        catch (error) {
            // Show error message
            toast.error('Please enter a valid Adhaar number', { type: 'error' })
        }
    }

    const isSumbit1Disabled = () => {
        if (documentType1 === 'panCard') {
            return document.type1Front !== ''
        }
        else {
            return document.type1Front !== '' && document.type1Back !== ''
        }
    }

    const isSumbit2Disabled = () => {
        if (documentType2 === 'panCard') {
            return document.type2Front !== ''
        }
        else {
            return document.type2Front !== '' && document.type2Back !== ''
        }
    }

    const completeKYC = () => {
        if(showDocument1Info && showDocument2Info){
            return true;
        }
        else{
            return false;
        }
    }

    return (
        <div>
            <div className="flex flex-row items-start gap-4">
                {/* Document 1 */}
                <div className="w-1/2">
                    <div className="text-[14px] font-medium flex flex-row justify-between">
                        <div>Document 1</div>
                        {disableDocument1 &&
                            <button className="text-[#735ae5]"
                                onClick={() => {
                                    setDisableDocument1(false);
                                    setShowDocument1Info(false);
                                    setDisableDocument2(true);
                                    setDocumentType1('');
                                    setDocument((prev) => ({
                                        ...prev,
                                        type1Front: '',
                                        type1Back: ''
                                    }))
                                    if (documentType1 === documentType2) {
                                        setDocumentType2('');
                                        setDocument((prev) => ({
                                            ...prev,
                                            type2Front: '',
                                            type2Back: ''
                                        }))
                                        setShowDocument2Info(false);
                                    }
                                }}
                            >
                                Change Document 1
                            </button>
                        }
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[12px] mt-2 mb-2 font-medium">Document Type</label>
                        <select name="document" disabled={disableDocument1} id="document" value={documentType1} onChange={handleSetDocumentType1} className={`border-gray-200 border rounded-md text-[12px] px-3 py-1.5 focus:outline-none ${disableDocument1 ? 'bg-[#E6E6E6] cursor-not-allowed' : ''}`}>
                            <option value="" hidden>Select Document Type</option>
                            {options.map((option) => (
                                <option value={option.value} className="p-2" key={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    <p className="text-[12px] mt-2 mb-2 font-medium">Document Images</p>
                    <div className="mt-2 flex flex-row">

                        {/* front side */}
                        <div className="w-[48%] mr-auto">
                            <div className="flex items-center justify-center w-full">
                                <div className="flex flex-col items-center justify-evenly w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                                    <label htmlFor="type1Front" className="w-full">
                                        <div className={`flex flex-col items-center justify-center ${document.type1Front ? 'px-8 py-2 bg-none' : 'p-8 bg-[#f0f5ff] hover:bg-[#ecf3ff]'} w-full`}>
                                            {document.type1Front ? (
                                                <img src={document.type1Front} alt="Preview" className="h-32 object-cover rounded-lg cursor-default" />
                                            ) : (
                                                <img src={upload} alt="Upload" />
                                            )}
                                        </div>
                                        {!document.type1Front && (
                                            <div className="flex flex-col items-center justify-center w-full">
                                                <input id="type1Front" type="file" className="hidden" accept=".jpg,.png,.gif,.jpeg" onChange={handleFileChange} disabled={disableInput1} />
                                                <p className={`text-xs ${disableInput1 ? 'text-gray-300' : 'text-[#4f2fde]'} dark:text-gray-400`}>Upload front side</p>
                                            </div>
                                        )}
                                    </label>
                                    {document.type1Front && !showDocument1Info && (
                                        <label className="text-[12px] mb-2 cursor-pointer py-1 hover:bg-gray-200 w-[90%] rounded-md text-center">
                                            Change Front Image
                                            <input id="type1Front" type="file" className="hidden" accept=".jpg,.png,.gif,.jpeg" onChange={handleFileChange} disabled={disableInput1} />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* back side */}
                        {documentType1 !== 'panCard' &&
                            <div className="w-[48%] mr-auto">
                                <div className="flex items-center justify-center w-full">
                                    <div className="flex flex-col items-center justify-evenly w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                                        <label htmlFor="type1Back" className="w-full">
                                            <div className={`flex flex-col items-center justify-center ${document.type1Back ? 'px-8 py-2 bg-none' : 'p-8 bg-[#f0f5ff] hover:bg-[#ecf3ff]'} w-full`}>
                                                {document.type1Back ? (
                                                    <img src={document.type1Back} alt="Preview" className="h-32 object-cover rounded-lg cursor-default" />
                                                ) : (
                                                    <img src={upload} alt="Upload" />
                                                )}
                                            </div>
                                            {!document.type1Back && (
                                                <div className="flex flex-col items-center justify-center w-full">
                                                    <input id="type1Back" type="file" className="hidden" accept=".jpg,.png,.gif,.jpeg" onChange={handleFileChange} disabled={disableInput1} />
                                                    <p className={`text-xs ${disableInput1 ? 'text-gray-300' : 'text-[#4f2fde]'} dark:text-gray-400`}>Upload back side</p>
                                                </div>
                                            )}
                                        </label>
                                        {document.type1Back && (
                                            <label className="text-[12px] mb-2 cursor-pointer py-1 hover:bg-gray-200 w-[90%] rounded-md text-center">
                                                Change Front Image
                                                <input id="type1Back" type="file" className="hidden" accept=".jpg,.png,.gif,.jpeg" onChange={handleFileChange} disabled={disableInput1} />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    {!showDocument1Info ?
                        <div className="flex justify-start gap-4 mt-6">
                            <button
                                className={`px-12 text-[12px] py-2 w-full ${isSumbit1Disabled() ? "bg-white border text-purple-600 border-purple-600" : "bg-[#FAFAFA] border text-purple-400 border-[#e5e5e5]"} transition-colors duration-200 rounded-md`}
                                disabled={!isSumbit1Disabled()}
                                onClick={() => { handleDocument1Submission() }}
                            >
                                Sumbit Document 1
                            </button>
                        </div>
                        :
                        <div className="flex flex-row gap-4 mt-6">
                            <div className="w-[48%]">
                                <Field
                                    type={'text'}
                                    id={"documentNumber"}
                                    label={'Document Number'}
                                    inputClassNames={'text-[12px] bg-[#E9ECEF] font-normal'}
                                    labelClassNames={'text-[12px] text-[#191919]'}
                                    required={true}
                                    value={document1number}
                                    readOnly={true}
                                />
                            </div>
                            <div className="w-[48%]">
                                <Field
                                    type={'text'}
                                    id={"documentName"}
                                    label={'Document Name'}
                                    inputClassNames={'text-[12px] bg-[#E9ECEF] font-normal'}
                                    labelClassNames={'text-[12px] text-[#191919]'}
                                    required={true}
                                    value={document1name}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    }
                </div>

                {/* Document 2 */}
                <div className={`w-1/2 ${disableDocument2 && !disableDocument1 ? 'opacity-20' : 'opacity-100'}`}>
                    <div className="text-[14px] font-medium flex flex-row justify-between">
                        <div>Document 2</div>
                        {disableDocument2 && disableDocument1 &&
                            <button className="text-[#735ae5]"
                                onClick={() => {
                                    setDisableDocument2(false);
                                    setShowDocument2Info(false);
                                    setDocumentType2('');
                                    setDocument((prev) => ({
                                        ...prev,
                                        type2Front: '',
                                        type2Back: ''
                                    }))
                                }}
                            >
                                Change Document 2
                            </button>
                        }
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[12px] mt-2 mb-2 font-medium">Document Type</label>
                        <select name="document" disabled={disableDocument2} id="document" value={documentType2} onChange={handleSetDocumentType2} className={`border-gray-200 border rounded-md text-[12px] px-3 py-1.5 focus:outline-none ${disableDocument2 ? 'bg-[#E6E6E6] cursor-not-allowed' : ''}`}>
                            <option value="" hidden>Select Document Type</option>
                            {optionsForTwo.map((option) => (
                                <option value={option.value} className="p-2" key={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    <p className="text-[12px] mt-2 mb-2 font-medium">Document Images</p>
                    <div className="mt-2 flex flex-row">

                        {/* front side */}
                        <div className="w-[48%] mr-auto">
                            <div className="flex items-center justify-center w-full">
                                <div className="flex flex-col items-center justify-evenly w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                                    <label htmlFor="type2Front" className="w-full">
                                        <div className={`flex flex-col items-center justify-center ${document.type2Front ? 'px-8 py-2 bg-none' : 'p-8 bg-[#f0f5ff] hover:bg-[#ecf3ff]'} w-full`}>
                                            {document.type2Front ? (
                                                <img src={document.type2Front} alt="Preview" className="h-32 object-cover rounded-lg cursor-default" />
                                            ) : (
                                                <img src={upload} alt="Upload" />
                                            )}
                                        </div>
                                        {!document.type2Front && (
                                            <div className="flex flex-col items-center justify-center w-full">
                                                <input id="type2Front" type="file" className="hidden" accept=".jpg,.png,.gif,.jpeg" onChange={handleFileChange} disabled={disableInput2} />
                                                <p className={`text-xs ${disableInput2 ? 'text-gray-300' : 'text-[#4f2fde]'} dark:text-gray-400`}>Upload front side</p>
                                            </div>
                                        )}
                                    </label>
                                    {document.type2Front && (
                                        <label className="text-[12px] mb-2 cursor-pointer py-1 hover:bg-gray-200 w-[90%] rounded-md text-center">
                                            Change Front Image
                                            <input id="type2Front" type="file" className="hidden" accept=".jpg,.png,.gif,.jpeg" onChange={handleFileChange} disabled={disableInput2} />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* back side */}
                        {documentType2 !== 'panCard' &&
                            <div className="w-[48%] mr-auto">
                                <div className="flex items-center justify-center w-full">
                                    <div className="flex flex-col items-center justify-evenly w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                                        <label htmlFor="type2Back" className="w-full">
                                            <div className={`flex flex-col items-center justify-center ${document.type2Back ? 'px-8 py-2 bg-none' : 'p-8 bg-[#f0f5ff] hover:bg-[#ecf3ff]'} w-full`}>
                                                {document.type2Back ? (
                                                    <img src={document.type2Back} alt="Preview" className="h-32 object-cover rounded-lg cursor-default" />
                                                ) : (
                                                    <img src={upload} alt="Upload" />
                                                )}
                                            </div>
                                            {!document.type2Back && (
                                                <div className="flex flex-col items-center justify-center w-full">
                                                    <input id="type2Back" type="file" className="hidden" accept=".jpg,.png,.gif,.jpeg" onChange={handleFileChange} disabled={disableInput2} />
                                                    <p className={`text-xs ${disableInput2 ? 'text-gray-300' : 'text-[#4f2fde]'} dark:text-gray-400`}>Upload back side</p>
                                                </div>
                                            )}
                                        </label>
                                        {document.type2Back && (
                                            <label className="text-[12px] mb-2 cursor-pointer py-1 hover:bg-gray-200 w-[90%] rounded-md text-center">
                                                Change Front Image
                                                <input id="type2Back" type="file" className="hidden" accept=".jpg,.png,.gif,.jpeg" onChange={handleFileChange} disabled={disableInput2} />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    {!showDocument2Info ?
                        <div className="flex justify-start gap-4 mt-6">
                            <button
                                className={`px-12 text-[12px] py-2 w-full ${isSumbit2Disabled() ? "bg-white border text-purple-600 border-purple-600" : "bg-[#FAFAFA] border text-purple-400 border-[#e5e5e5]"} transition-colors duration-200 rounded-md`}
                                disabled={!isSumbit2Disabled()}
                                onClick={() => { handleDocument2Submission() }}
                            >
                                Sumbit Document 2
                            </button>
                        </div>
                        :
                        <div className="flex flex-row gap-4 mt-6 w-full">
                            <div className="w-[48%]">
                                <Field
                                    type={'text'}
                                    id={"documentNumber"}
                                    label={'Document Number'}
                                    inputClassNames={'text-[12px] bg-[#E9ECEF] font-normal'}
                                    labelClassNames={'text-[12px] text-[#191919]'}
                                    required={true}
                                    value={document2number}
                                    readOnly={true}
                                />
                            </div>
                            <div className="w-[48%]">
                                <Field
                                    type={'text'}
                                    id={"documentName"}
                                    label={'Document Name'}
                                    inputClassNames={'text-[12px] bg-[#E9ECEF] font-normal'}
                                    labelClassNames={'text-[12px] text-[#191919]'}
                                    required={true}
                                    value={document2name}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className="flex justify-start gap-4 mt-6">
                <button
                    className={`px-12 text-[12px] py-2 w-4/12 ${isSumbit2Disabled() ? "bg-white border text-purple-600 border-purple-600" : "bg-[#FAFAFA] border text-purple-400 border-[#e5e5e5]"} transition-colors duration-200 rounded-md`}
                    disabled={!completeKYC()}
                    onClick={() => { toast.success('KYC completed successfully', { type: 'success' }) }}
                >
                    Complete KYC
                </button>
            </div>

        </div>
    )
}

export default Document_Upload;