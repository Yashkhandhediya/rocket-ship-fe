import { useState } from 'react';
import { toast } from 'react-toastify';
import { Field } from '../../../../common/components';
import { upload } from '../../../../common/icons';
import { BACKEND_URL } from '../../../../common/utils/env.config';
import apiClient from '../../../../common/utils/apiClient';

const Document_Upload = ({ setIsKYCCompleted, KYCType = 'user' }) => {
  const user_name = localStorage.getItem('user_name');
  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const [documentType1, setDocumentType1] = useState('');
  const [documentType2, setDocumentType2] = useState('');
  const [documentType3, setDocumentType3] = useState('');
  const [documentType4, setDocumentType4] = useState('');
  const [disableInput1, setDisableInput1] = useState(true);
  const [disableInput2, setDisableInput2] = useState(true);
  const [disableInput3, setDisableInput3] = useState(true);
  const [disableInput4, setDisableInput4] = useState(true);

  const [showDocument1Info, setShowDocument1Info] = useState(false);
  const [showDocument2Info, setShowDocument2Info] = useState(false);
  const [showDocument3Info, setShowDocument3Info] = useState(false);
  const [showDocument4Info, setShowDocument4Info] = useState(false);

  const [disableDocument1, setDisableDocument1] = useState(false);
  const [disableDocument2, setDisableDocument2] = useState(true);
  const [disableDocument3, setDisableDocument3] = useState(true);
  const [disableDocument4, setDisableDocument4] = useState(false);

  // document 1 number and name
  // const [document1number, setDocument1Number] = useState('ABCDE1234F');
  // const [document1name, setDocument1Name] = useState('Jai Shree Ram');

  // // document 2 number and name
  // const [document2number, setDocument2Number] = useState('ABCDE1234F');
  // const [document2name, setDocument2Name] = useState('Jai Shree Ram');

  // // document 3 number and name
  // const [document3number, setDocument3Number] = useState('ABCDE1234F');
  // const [document3name, setDocument3Name] = useState('Har Har Mahadev');

  // // document 4 number and name
  // const [document4number, setDocument4Number] = useState('ABCDE1234F');
  // const [document4name, setDocument4Name] = useState('Har Har Mahadev');

  const [document, setDocument] = useState({
    type1Front: '',
    type1Back: '',
    type2Front: '',
    type2Back: '',
    type3Front: '',
    type3Back: '',
    type4Front: '',
    type4Back: '',
  });

  const handleFileChange = (event) => {
    const { id } = event.target;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDocument((prev) => ({
          ...prev,
          [id]: e.target.result,
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
      type1Back: '',
    }));
    setDocumentType1(event.target.value);
  };

  const handleSetDocumentType2 = (event) => {
    setDisableInput2(false);
    setDocument((prev) => ({
      ...prev,
      type2Front: '',
      type2Back: '',
    }));
    setDocumentType2(event.target.value);
  };

  const handleSetDocumentType3 = (event) => {
    setDisableInput3(false);
    setDocument((prev) => ({
      ...prev,
      type3Front: '',
      type3Back: '',
    }));
    setDocumentType3(event.target.value);
  };

  const handleSetDocumentType4 = (event) => {
    setDisableInput4(false);
    setDocument((prev) => ({
      ...prev,
      type4Front: '',
      type4Back: '',
    }));
    setDocumentType4(event.target.value);
  };

  const dataURLtoBlob = (dataURL) => {
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const base64Data = parts[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  };

  const options = [
    { value: 'aadharCard', label: 'AADHAR Card' },
    // { value: 'drivingLicense', label: 'Driving License' },
    // { value: 'validPassport', label: 'Valid Passport' }
  ];

  const options1 = [
    { value: 'panCard', label: 'PAN Card' },
    { value: 'companyLogo', label: 'Company Logo' },
    { value: 'gstDoc', label: 'GST Document' },
    { value: 'companyStamp', label: 'Company Stamp' },
    // { value: 'drivingLicense', label: 'Driving License' },
    // { value: 'validPassport', label: 'Valid Passport' }
  ];

  const optionsForTwo =
    KYCType == 'user'
      ? options.filter((option) => option.value !== documentType1)
      : options1.filter((option) => option.value !== documentType1);
  const optionsForThree =
    KYCType == 'user'
      ? options.filter((option) => option.value !== documentType2 && option.value !== documentType1)
      : options1.filter((option) => option.value !== documentType2 && option.value !== documentType1);
  const optionsForFour =
    KYCType == 'user'
      ? options.filter((option) => option.value !== documentType2 && option.value !== documentType1)
      : options1.filter(
          (option) =>
            option.value !== documentType3 &&
            option.value !== documentType2 &&
            option.value !== documentType1,
        );
  const handleDocument1Submission = () => {
    const headers = { 'Content-Type': 'application/json' };
    const formData = new FormData();
    console.log('FRONTTTTTTTTT', document.type1Front);
    const type1FrontBlob = dataURLtoBlob(document.type1Front);
    console.log('23211111111', type1FrontBlob);
    formData.append('file', type1FrontBlob, 'selfie.jpg');
    try {
      // API call to submit document
      if (KYCType == 'company') {
        const headers = { 'Content-Type': 'multipart/form-data' };
        apiClient
          .post(
            BACKEND_URL +
              `/kyc/upload_selfie/?image_id=${id_company}&user_name=${user_name}&type=company_pan`,
            formData,
            { headers },
          )
          .then((res) => {
            console.log('RESSSSSSSS', res);
            toast('Document 1 submitted successfully', { type: 'success' });
          })
          .catch((err) => {
            toast('Error in submitting Document 1', { type: 'error' });
          });
      } else {
        const headers = { 'Content-Type': 'multipart/form-data' };
        apiClient
          .post(
            BACKEND_URL + `/kyc/upload_selfie/?image_id=${id_user}&user_name=${user_name}&type=user_aadhar`,
            formData,
            { headers },
          )
          .then((res) => {
            console.log('RESSSSSSSS', res);
            toast('Document 1 submitted successfully', { type: 'success' });
          })
          .catch((err) => {
            toast('Error in submitting Document 1', { type: 'error' });
          });
      }
      setDisableDocument1(true);
      setDisableDocument2(false);
      setShowDocument1Info(true);
      if (documentType1 === documentType2) {
        setDocumentType2('');
        setDocument((prev) => ({
          ...prev,
          type2Front: '',
          type2Back: '',
        }));
        setShowDocument2Info(false);
      }
    } catch (error) {
      // Show error message
      toast.error('Please enter a valid Adhaar number', { type: 'error' });
    }
  };

  const handleDocument2Submission = () => {
    const headers = { 'Content-Type': 'application/json' };
    const formData = new FormData();
    console.log('FRONTTTTTTTTT', document.type2Front);
    const type2FrontBlob = dataURLtoBlob(document.type2Front);
    console.log('23211111111', type2FrontBlob);
    formData.append('file', type2FrontBlob, 'selfie.jpg');
    try {
      // API call to submit document
      const headers = { 'Content-Type': 'multipart/form-data' };
      apiClient
        .post(
          BACKEND_URL + `/kyc/upload_selfie/?image_id=${id_company}&user_name=${user_name}&type=company_logo`,
          formData,
          { headers },
        )
        .then((res) => {
          console.log('RESSSSSSSS', res);
          toast('Document 2 submitted successfully', { type: 'success' });
        })
        .catch((err) => {
          toast('Error in submitting Document 2', { type: 'error' });
        });
      setDisableDocument2(true);
      setDisableDocument3(false);
      setShowDocument2Info(true);
      // toast.success('Document 2 submitted successfully', { type: 'success' })
    } catch (error) {
      // Show error message
      toast.error('Please enter a valid Adhaar number', { type: 'error' });
    }
  };

  const handleDocument3Submission = () => {
    const headers = { 'Content-Type': 'application/json' };
    const formData = new FormData();
    console.log('FRONTTTTTTTTT', document.type3Front);
    const type3FrontBlob = dataURLtoBlob(document.type3Front);
    console.log('23211111111', type3FrontBlob);
    formData.append('file', type3FrontBlob, 'selfie.jpg');
    try {
      // API call to submit document
      const headers = { 'Content-Type': 'multipart/form-data' };
      apiClient
        .post(
          BACKEND_URL + `/kyc/upload_selfie/?image_id=${id_company}&user_name=${user_name}&type=company_gst`,
          formData,
          { headers },
        )
        .then((res) => {
          console.log('RESSSSSSSS', res);
          toast('Document 3 submitted successfully', { type: 'success' });
        })
        .catch((err) => {
          toast('Error in submitting Document 3', { type: 'error' });
        });
      setDisableDocument3(true);
      setShowDocument3Info(true);
      // toast.success('Document 2 submitted successfully', { type: 'success' })
    } catch (error) {
      // Show error message
      toast.error('Please enter a valid Adhaar number', { type: 'error' });
    }
  };

  const handleDocument4Submission = () => {
    const headers = { 'Content-Type': 'application/json' };
    const formData = new FormData();
    console.log('FRONTTTTTTTTT', document.type4Front);
    const type4FrontBlob = dataURLtoBlob(document.type4Front);
    console.log('23211111111', type4FrontBlob);
    formData.append('file', type4FrontBlob, 'selfie.jpg');
    try {
      // API call to submit document
      const headers = { 'Content-Type': 'multipart/form-data' };
      apiClient
        .post(
          BACKEND_URL +
            `/kyc/upload_selfie/?image_id=${id_company}&user_name=${user_name}&type=company_stamp`,
          formData,
          { headers },
        )
        .then((res) => {
          console.log('RESSSSSSSS', res);
          toast('Document 4 submitted successfully', { type: 'success' });
        })
        .catch((err) => {
          toast('Error in submitting Document 4', { type: 'error' });
        });
      setDisableDocument4(true);
      setShowDocument4Info(true);
      // toast.success('Document 2 submitted successfully', { type: 'success' })
    } catch (error) {
      // Show error message
      toast.error('Please enter a valid Adhaar number', { type: 'error' });
    }
  };

  const isSumbit1Disabled = () => {
    if (documentType1 === 'panCard') {
      return document.type1Front !== '';
    } else {
      // return document.type1Front !== '' && document.type1Back !== ''
      return document.type1Front !== '';
    }
  };

  const isSumbit2Disabled = () => {
    if (documentType2 === 'panCard') {
      return document.type2Front !== '';
    } else {
      // return document.type2Front !== '' && document.type2Back !== ''
      return document.type2Front !== '';
    }
  };

  const isSumbit3Disabled = () => {
    if (documentType3 === 'panCard') {
      return document.type3Front !== '';
    } else {
      // return document.type2Front !== '' && document.type2Back !== ''
      return document.type3Front !== '';
    }
  };

  const isSumbit4Disabled = () => {
    if (documentType4 === 'panCard') {
      return document.type4Front !== '';
    } else {
      // return document.type2Front !== '' && document.type2Back !== ''
      return document.type4Front !== '';
    }
  };

  const isCompleteKYC = () => {
    if (KYCType != 'user' && showDocument1Info && showDocument2Info && showDocument3Info) {
      return true;
    }
    if (KYCType == 'user' && showDocument1Info) {
      return true;
    } else {
      return false;
    }
  };

  const completeKYC = () => {
    if (isCompleteKYC()) {
      // toast.success('KYC completed successfully', { type: 'success' })
      const headers = { 'Content-Type': 'application/json' };
      const id = localStorage.getItem('is_company') == 1 ? id_company : id_user;
      const type_client = localStorage.getItem('is_company') == 1 ? 'company' : 'user';
      apiClient
        .post(BACKEND_URL + `/kyc/kyc_status/?client_type=${type_client}&status=${2}&id=${id}`, { headers })
        .then((res) => {
          console.log('Response ', res);
          toast('KYC Verification Successfully', { type: 'success' });
        })
        .catch((err) => {
          console.log('ERRRRRR', err);
          toast('Error in KYC verification', { type: 'error' });
        });
      setIsKYCCompleted(true);
    } else {
      // Show error message
      toast.error('Please complete KYC', { type: 'error' });
    }
  };

  return (
    <div>
      <div className="flex flex-row items-start gap-4">
        {/* Document 1 */}
        <div className="w-1/2">
          <div className="flex flex-row justify-between text-[14px] font-medium">
            <div>Document 1</div>
            {disableDocument1 && (
              <button
                className="text-[#735ae5]"
                onClick={() => {
                  setDisableDocument1(false);
                  setShowDocument1Info(false);
                  setDisableDocument2(true);
                  setDocumentType1('');
                  setDocument((prev) => ({
                    ...prev,
                    type1Front: '',
                    type1Back: '',
                  }));
                  if (documentType1 === documentType2) {
                    setDocumentType2('');
                    setDocument((prev) => ({
                      ...prev,
                      type2Front: '',
                      type2Back: '',
                    }));
                    setShowDocument2Info(false);
                  }
                }}>
                Change Document 1
              </button>
            )}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 mt-2 text-[12px] font-medium">Document Type</label>
            <select
              name="document"
              disabled={disableDocument1}
              id="document"
              value={documentType1}
              onChange={handleSetDocumentType1}
              className={`rounded-md border border-gray-200 px-3 py-1.5 text-[12px] focus:outline-none ${
                disableDocument1 ? 'cursor-not-allowed bg-[#E6E6E6]' : ''
              }`}>
              <option value="" hidden>
                Select Document Type
              </option>
              {KYCType == 'user'
                ? options.map((option) => (
                    <option value={option.value} className="p-2" key={option.value}>
                      {option.label}
                    </option>
                  ))
                : options1.map((option) => (
                    <option value={option.value} className="p-2" key={option.value}>
                      {option.label}
                    </option>
                  ))}
            </select>
          </div>

          <p className="mb-2 mt-2 text-[12px] font-medium">Document Images</p>
          <div className="mt-2 flex flex-row">
            {/* front side */}
            <div className="mr-auto w-[48%]">
              <div className="flex w-full items-center justify-center">
                <div className="flex h-44 w-full cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                  <label htmlFor="type1Front" className="w-full">
                    <div
                      className={`flex flex-col items-center justify-center ${
                        document.type1Front ? 'bg-none px-8 py-2' : 'bg-[#f0f5ff] p-8 hover:bg-[#ecf3ff]'
                      } w-full`}>
                      {document.type1Front ? (
                        <img
                          src={document.type1Front}
                          alt="Preview"
                          className="h-32 cursor-default rounded-lg object-cover"
                        />
                      ) : (
                        <img src={upload} alt="Upload" />
                      )}
                    </div>
                    {!document.type1Front && (
                      <div className="flex w-full flex-col items-center justify-center">
                        <input
                          id="type1Front"
                          type="file"
                          className="hidden"
                          accept=".jpg,.png,.gif,.jpeg"
                          onChange={handleFileChange}
                          disabled={disableInput1}
                        />
                        <p
                          className={`text-xs ${
                            disableInput1 ? 'text-gray-300' : 'text-[#4f2fde]'
                          } dark:text-gray-400`}>
                          Upload front side
                        </p>
                      </div>
                    )}
                  </label>
                  {document.type1Front && !showDocument1Info && (
                    <label className="mb-2 w-[90%] cursor-pointer rounded-md py-1 text-center text-[12px] hover:bg-gray-200">
                      Change Front Image
                      <input
                        id="type1Front"
                        type="file"
                        className="hidden"
                        accept=".jpg,.png,.gif,.jpeg"
                        onChange={handleFileChange}
                        disabled={disableInput1}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* back side */}
            {documentType1 !== 'panCard' &&
              documentType1 !== 'companyLogo' &&
              documentType1 !== 'gstDoc' &&
              documentType1 !== 'aadharCard' && (
                <div className="mr-auto w-[48%]">
                  <div className="flex w-full items-center justify-center">
                    <div className="flex h-44 w-full cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                      <label htmlFor="type1Back" className="w-full">
                        <div
                          className={`flex flex-col items-center justify-center ${
                            document.type1Back ? 'bg-none px-8 py-2' : 'bg-[#f0f5ff] p-8 hover:bg-[#ecf3ff]'
                          } w-full`}>
                          {document.type1Back ? (
                            <img
                              src={document.type1Back}
                              alt="Preview"
                              className="h-32 cursor-default rounded-lg object-cover"
                            />
                          ) : (
                            <img src={upload} alt="Upload" />
                          )}
                        </div>
                        {!document.type1Back && (
                          <div className="flex w-full flex-col items-center justify-center">
                            <input
                              id="type1Back"
                              type="file"
                              className="hidden"
                              accept=".jpg,.png,.gif,.jpeg"
                              onChange={handleFileChange}
                              disabled={disableInput1}
                            />
                            <p
                              className={`text-xs ${
                                disableInput1 ? 'text-gray-300' : 'text-[#4f2fde]'
                              } dark:text-gray-400`}>
                              Upload back side
                            </p>
                          </div>
                        )}
                      </label>
                      {document.type1Back && (
                        <label className="mb-2 w-[90%] cursor-pointer rounded-md py-1 text-center text-[12px] hover:bg-gray-200">
                          Change Front Image
                          <input
                            id="type1Back"
                            type="file"
                            className="hidden"
                            accept=".jpg,.png,.gif,.jpeg"
                            onChange={handleFileChange}
                            disabled={disableInput1}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              )}
          </div>
          {!showDocument1Info ? (
            <div className="mt-6 flex justify-start gap-4">
              <button
                className={`w-full px-12 py-2 text-[12px] ${
                  isSumbit1Disabled()
                    ? 'border border-red-600 bg-white text-red-600'
                    : 'border border-[#e5e5e5] bg-[#FAFAFA] text-red-400'
                } rounded-md transition-colors duration-200`}
                disabled={!isSumbit1Disabled()}
                onClick={() => {
                  handleDocument1Submission();
                }}>
                Sumbit Document 1
              </button>
            </div>
          ) : (
            <div className="mt-6 flex flex-row gap-4">
              {/* <div className="w-[48%]">
                                <Field
                                    type={'text'}
                                    id={"documentNumber"}
                                    label={'Document Number'}
                                    inputClassNames={'text-[12px] bg-[#E9ECEF] font-normal'}
                                    labelClassNames={'text-[12px] text-[#191919]'}
                                    required={true}
                                    // value={document1number}
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
                            </div> */}
            </div>
          )}
        </div>

        {/* Document 2 */}
        {KYCType == 'company' && (
          <div className={`w-1/2 ${disableDocument2 && !disableDocument1 ? 'opacity-20' : 'opacity-100'}`}>
            <div className="flex flex-row justify-between text-[14px] font-medium">
              <div>Document 2</div>
              {disableDocument2 && disableDocument1 && (
                <button
                  className="text-[#735ae5]"
                  onClick={() => {
                    setDisableDocument2(false);
                    setShowDocument2Info(false);
                    setDocumentType2('');
                    setDocument((prev) => ({
                      ...prev,
                      type2Front: '',
                      type2Back: '',
                    }));
                  }}>
                  Change Document 2
                </button>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-2 mt-2 text-[12px] font-medium">Document Type</label>
              <select
                name="document"
                disabled={disableDocument2}
                id="document"
                value={documentType2}
                onChange={handleSetDocumentType2}
                className={`rounded-md border border-gray-200 px-3 py-1.5 text-[12px] focus:outline-none ${
                  disableDocument2 ? 'cursor-not-allowed bg-[#E6E6E6]' : ''
                }`}>
                <option value="" hidden>
                  Select Document Type
                </option>
                {optionsForTwo.map((option) => (
                  <option value={option.value} className="p-2" key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <p className="mb-2 mt-2 text-[12px] font-medium">Document Images</p>
            <div className="mt-2 flex flex-row">
              {/* front side */}
              <div className="mr-auto w-[48%]">
                <div className="flex w-full items-center justify-center">
                  <div className="flex h-44 w-full cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                    <label htmlFor="type2Front" className="w-full">
                      <div
                        className={`flex flex-col items-center justify-center ${
                          document.type2Front ? 'bg-none px-8 py-2' : 'bg-[#f0f5ff] p-8 hover:bg-[#ecf3ff]'
                        } w-full`}>
                        {document.type2Front ? (
                          <img
                            src={document.type2Front}
                            alt="Preview"
                            className="h-32 cursor-default rounded-lg object-cover"
                          />
                        ) : (
                          <img src={upload} alt="Upload" />
                        )}
                      </div>
                      {!document.type2Front && (
                        <div className="flex w-full flex-col items-center justify-center">
                          <input
                            id="type2Front"
                            type="file"
                            className="hidden"
                            accept=".jpg,.png,.gif,.jpeg"
                            onChange={handleFileChange}
                            disabled={disableInput2}
                          />
                          <p
                            className={`text-xs ${
                              disableInput2 ? 'text-gray-300' : 'text-[#4f2fde]'
                            } dark:text-gray-400`}>
                            Upload front side
                          </p>
                        </div>
                      )}
                    </label>
                    {document.type2Front && (
                      <label className="mb-2 w-[90%] cursor-pointer rounded-md py-1 text-center text-[12px] hover:bg-gray-200">
                        Change Front Image
                        <input
                          id="type2Front"
                          type="file"
                          className="hidden"
                          accept=".jpg,.png,.gif,.jpeg"
                          onChange={handleFileChange}
                          disabled={disableInput2}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* back side */}
              {documentType2 !== 'panCard' &&
                documentType2 !== 'companyLogo' &&
                documentType2 !== 'gstDoc' && (
                  <div className="mr-auto w-[48%]">
                    <div className="flex w-full items-center justify-center">
                      <div className="flex h-44 w-full cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                        <label htmlFor="type2Back" className="w-full">
                          <div
                            className={`flex flex-col items-center justify-center ${
                              document.type2Back ? 'bg-none px-8 py-2' : 'bg-[#f0f5ff] p-8 hover:bg-[#ecf3ff]'
                            } w-full`}>
                            {document.type2Back ? (
                              <img
                                src={document.type2Back}
                                alt="Preview"
                                className="h-32 cursor-default rounded-lg object-cover"
                              />
                            ) : (
                              <img src={upload} alt="Upload" />
                            )}
                          </div>
                          {!document.type2Back && (
                            <div className="flex w-full flex-col items-center justify-center">
                              <input
                                id="type2Back"
                                type="file"
                                className="hidden"
                                accept=".jpg,.png,.gif,.jpeg"
                                onChange={handleFileChange}
                                disabled={disableInput2}
                              />
                              <p
                                className={`text-xs ${
                                  disableInput2 ? 'text-gray-300' : 'text-[#4f2fde]'
                                } dark:text-gray-400`}>
                                Upload back side
                              </p>
                            </div>
                          )}
                        </label>
                        {document.type2Back && (
                          <label className="mb-2 w-[90%] cursor-pointer rounded-md py-1 text-center text-[12px] hover:bg-gray-200">
                            Change Front Image
                            <input
                              id="type2Back"
                              type="file"
                              className="hidden"
                              accept=".jpg,.png,.gif,.jpeg"
                              onChange={handleFileChange}
                              disabled={disableInput2}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                )}
            </div>
            {!showDocument2Info ? (
              <div className="mt-6 flex justify-start gap-4">
                <button
                  className={`w-full px-12 py-2 text-[12px] ${
                    isSumbit2Disabled()
                      ? 'border border-red-600 bg-white text-red-600'
                      : 'border border-[#e5e5e5] bg-[#FAFAFA] text-red-400'
                  } rounded-md transition-colors duration-200`}
                  disabled={!isSumbit2Disabled()}
                  onClick={() => {
                    handleDocument2Submission();
                  }}>
                  Sumbit Document 2
                </button>
              </div>
            ) : (
              <div className="mt-6 flex w-full flex-row gap-4">
                {/* <div className="w-[48%]">
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
                            </div> */}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-row items-start gap-4">
        {/* Document 3 */}
        {KYCType == 'company' && (
          <div
            className={`w-1/2 ${
              disableDocument3 && disableDocument2 && !disableDocument1 ? 'opacity-20' : 'opacity-100'
            }`}>
            <div className="flex flex-row justify-between text-[14px] font-medium">
              <div>Document 3</div>
              {disableDocument3 && disableDocument2 && disableDocument1 && (
                <button
                  className="text-[#735ae5]"
                  onClick={() => {
                    setDisableDocument3(false);
                    setShowDocument3Info(false);
                    setDocumentType3('');
                    setDocument((prev) => ({
                      ...prev,
                      type3Front: '',
                      type3Back: '',
                    }));
                  }}>
                  Change Document 3
                </button>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-2 mt-2 text-[12px] font-medium">Document Type</label>
              <select
                name="document"
                disabled={disableDocument3}
                id="document"
                value={documentType3}
                onChange={handleSetDocumentType3}
                className={`rounded-md border border-gray-200 px-3 py-1.5 text-[12px] focus:outline-none ${
                  disableDocument3 ? 'cursor-not-allowed bg-[#E6E6E6]' : ''
                }`}>
                <option value="" hidden>
                  Select Document Type
                </option>
                {optionsForThree.map((option) => (
                  <option value={option.value} className="p-2" key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <p className="mb-2 mt-2 text-[12px] font-medium">Document Images</p>
            <div className="mt-2 flex flex-row">
              {/* front side */}
              <div className="mr-auto w-[48%]">
                <div className="flex w-full items-center justify-center">
                  <div className="flex h-44 w-full cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                    <label htmlFor="type3Front" className="w-full">
                      <div
                        className={`flex flex-col items-center justify-center ${
                          document.type3Front ? 'bg-none px-8 py-2' : 'bg-[#f0f5ff] p-8 hover:bg-[#ecf3ff]'
                        } w-full`}>
                        {document.type3Front ? (
                          <img
                            src={document.type3Front}
                            alt="Preview"
                            className="h-32 cursor-default rounded-lg object-cover"
                          />
                        ) : (
                          <img src={upload} alt="Upload" />
                        )}
                      </div>
                      {!document.type3Front && (
                        <div className="flex w-full flex-col items-center justify-center">
                          <input
                            id="type3Front"
                            type="file"
                            className="hidden"
                            accept=".jpg,.png,.gif,.jpeg"
                            onChange={handleFileChange}
                            disabled={disableInput3}
                          />
                          <p
                            className={`text-xs ${
                              disableInput3 ? 'text-gray-300' : 'text-[#4f2fde]'
                            } dark:text-gray-400`}>
                            Upload front side
                          </p>
                        </div>
                      )}
                    </label>
                    {document.type3Front && (
                      <label className="mb-2 w-[90%] cursor-pointer rounded-md py-1 text-center text-[12px] hover:bg-gray-200">
                        Change Front Image
                        <input
                          id="type3Front"
                          type="file"
                          className="hidden"
                          accept=".jpg,.png,.gif,.jpeg"
                          onChange={handleFileChange}
                          disabled={disableInput3}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* back side */}
              {documentType3 !== 'panCard' &&
                documentType3 !== 'companyLogo' &&
                documentType3 !== 'gstDoc' && (
                  <div className="mr-auto w-[48%]">
                    <div className="flex w-full items-center justify-center">
                      <div className="flex h-44 w-full cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                        <label htmlFor="type2Back" className="w-full">
                          <div
                            className={`flex flex-col items-center justify-center ${
                              document.type3Back ? 'bg-none px-8 py-2' : 'bg-[#f0f5ff] p-8 hover:bg-[#ecf3ff]'
                            } w-full`}>
                            {document.type3Back ? (
                              <img
                                src={document.type3Back}
                                alt="Preview"
                                className="h-32 cursor-default rounded-lg object-cover"
                              />
                            ) : (
                              <img src={upload} alt="Upload" />
                            )}
                          </div>
                          {!document.type3Back && (
                            <div className="flex w-full flex-col items-center justify-center">
                              <input
                                id="type2Back"
                                type="file"
                                className="hidden"
                                accept=".jpg,.png,.gif,.jpeg"
                                onChange={handleFileChange}
                                disabled={disableInput3}
                              />
                              <p
                                className={`text-xs ${
                                  disableInput3 ? 'text-gray-300' : 'text-[#4f2fde]'
                                } dark:text-gray-400`}>
                                Upload back side
                              </p>
                            </div>
                          )}
                        </label>
                        {document.type3Back && (
                          <label className="mb-2 w-[90%] cursor-pointer rounded-md py-1 text-center text-[12px] hover:bg-gray-200">
                            Change Front Image
                            <input
                              id="type2Back"
                              type="file"
                              className="hidden"
                              accept=".jpg,.png,.gif,.jpeg"
                              onChange={handleFileChange}
                              disabled={disableInput3}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                )}
            </div>
            {!showDocument3Info ? (
              <div className="mt-6 flex justify-start gap-4">
                <button
                  className={`w-full px-12 py-2 text-[12px] ${
                    isSumbit3Disabled()
                      ? 'border border-red-600 bg-white text-red-600'
                      : 'border border-[#e5e5e5] bg-[#FAFAFA] text-red-400'
                  } rounded-md transition-colors duration-200`}
                  disabled={!isSumbit3Disabled()}
                  onClick={() => {
                    handleDocument3Submission();
                  }}>
                  Sumbit Document 3
                </button>
              </div>
            ) : (
              <div className="mt-6 flex w-full flex-row gap-4">
                {/* <div className="w-[48%]">
                                <Field
                                    type={'text'}
                                    id={"documentNumber"}
                                    label={'Document Number'}
                                    inputClassNames={'text-[12px] bg-[#E9ECEF] font-normal'}
                                    labelClassNames={'text-[12px] text-[#191919]'}
                                    required={true}
                                    value={document3number}
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
                                    value={document3name}
                                    readOnly={true}
                                />
                            </div> */}
              </div>
            )}
          </div>
        )}

        {/* Document 4 */}
        {KYCType == 'company' && (
          <div
            className={`w-1/2 ${
              !disableDocument4 && disableDocument3 && disableDocument2 && !disableDocument1
                ? 'opacity-20'
                : 'opacity-100'
            }`}>
            <div className="flex flex-row justify-between text-[14px] font-medium">
              <div>Document 4</div>
              {disableDocument4 && disableDocument3 && disableDocument2 && disableDocument1 && (
                <button
                  className="text-[#735ae5]"
                  onClick={() => {
                    setDisableDocument3(false);
                    setShowDocument3Info(false);
                    setDocumentType3('');
                    setDocument((prev) => ({
                      ...prev,
                      type4Front: '',
                      type4Back: '',
                    }));
                  }}>
                  Change Document 4
                </button>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-2 mt-2 text-[12px] font-medium">Document Type</label>
              <select
                name="document"
                disabled={disableDocument4}
                id="document"
                value={documentType4}
                onChange={handleSetDocumentType4}
                className={`rounded-md border border-gray-200 px-3 py-1.5 text-[12px] focus:outline-none ${
                  disableDocument4 ? 'cursor-not-allowed bg-[#E6E6E6]' : ''
                }`}>
                <option value="" hidden>
                  Select Document Type
                </option>
                {optionsForFour.map((option) => (
                  <option value={option.value} className="p-2" key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <p className="mb-2 mt-2 text-[12px] font-medium">Document Images</p>
            <div className="mt-2 flex flex-row">
              {/* front side */}
              <div className="mr-auto w-[48%]">
                <div className="flex w-full items-center justify-center">
                  <div className="flex h-44 w-full cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                    <label htmlFor="type4Front" className="w-full">
                      <div
                        className={`flex flex-col items-center justify-center ${
                          document.type4Front ? 'bg-none px-8 py-2' : 'bg-[#f0f5ff] p-8 hover:bg-[#ecf3ff]'
                        } w-full`}>
                        {document.type4Front ? (
                          <img
                            src={document.type4Front}
                            alt="Preview"
                            className="h-32 cursor-default rounded-lg object-cover"
                          />
                        ) : (
                          <img src={upload} alt="Upload" />
                        )}
                      </div>
                      {!document.type4Front && (
                        <div className="flex w-full flex-col items-center justify-center">
                          <input
                            id="type4Front"
                            type="file"
                            className="hidden"
                            accept=".jpg,.png,.gif,.jpeg"
                            onChange={handleFileChange}
                            disabled={disableInput4}
                          />
                          <p
                            className={`text-xs ${
                              disableInput4 ? 'text-gray-300' : 'text-[#4f2fde]'
                            } dark:text-gray-400`}>
                            Upload front side
                          </p>
                        </div>
                      )}
                    </label>
                    {document.type4Front && (
                      <label className="mb-2 w-[90%] cursor-pointer rounded-md py-1 text-center text-[12px] hover:bg-gray-200">
                        Change Front Image
                        <input
                          id="type4Front"
                          type="file"
                          className="hidden"
                          accept=".jpg,.png,.gif,.jpeg"
                          onChange={handleFileChange}
                          disabled={disableInput4}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* back side */}
              {documentType4 !== 'panCard' &&
                documentType4 !== 'companyLogo' &&
                documentType4 !== 'gstDoc' &&
                documentType4 !== 'companyStamp' && (
                  <div className="mr-auto w-[48%]">
                    <div className="flex w-full items-center justify-center">
                      <div className="flex h-44 w-full cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                        <label htmlFor="type2Back" className="w-full">
                          <div
                            className={`flex flex-col items-center justify-center ${
                              document.type3Back ? 'bg-none px-8 py-2' : 'bg-[#f0f5ff] p-8 hover:bg-[#ecf3ff]'
                            } w-full`}>
                            {document.type3Back ? (
                              <img
                                src={document.type3Back}
                                alt="Preview"
                                className="h-32 cursor-default rounded-lg object-cover"
                              />
                            ) : (
                              <img src={upload} alt="Upload" />
                            )}
                          </div>
                          {!document.type3Back && (
                            <div className="flex w-full flex-col items-center justify-center">
                              <input
                                id="type2Back"
                                type="file"
                                className="hidden"
                                accept=".jpg,.png,.gif,.jpeg"
                                onChange={handleFileChange}
                                disabled={disableInput3}
                              />
                              <p
                                className={`text-xs ${
                                  disableInput3 ? 'text-gray-300' : 'text-[#4f2fde]'
                                } dark:text-gray-400`}>
                                Upload back side
                              </p>
                            </div>
                          )}
                        </label>
                        {document.type3Back && (
                          <label className="mb-2 w-[90%] cursor-pointer rounded-md py-1 text-center text-[12px] hover:bg-gray-200">
                            Change Front Image
                            <input
                              id="type2Back"
                              type="file"
                              className="hidden"
                              accept=".jpg,.png,.gif,.jpeg"
                              onChange={handleFileChange}
                              disabled={disableInput3}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                )}
            </div>
            {!showDocument4Info ? (
              <div className="mt-6 flex justify-start gap-4">
                <button
                  className={`w-full px-12 py-2 text-[12px] ${
                    isSumbit4Disabled()
                      ? 'border border-red-600 bg-white text-red-600'
                      : 'border border-[#e5e5e5] bg-[#FAFAFA] text-red-400'
                  } rounded-md transition-colors duration-200`}
                  disabled={!isSumbit4Disabled()}
                  onClick={() => {
                    handleDocument4Submission();
                  }}>
                  Sumbit Document 4
                </button>
              </div>
            ) : (
              <div className="mt-6 flex w-full flex-row gap-4">
                {/* <div className="w-[48%]">
                                <Field
                                    type={'text'}
                                    id={"documentNumber"}
                                    label={'Document Number'}
                                    inputClassNames={'text-[12px] bg-[#E9ECEF] font-normal'}
                                    labelClassNames={'text-[12px] text-[#191919]'}
                                    required={true}
                                    value={document4number}
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
                                    value={document4name}
                                    readOnly={true}
                                />
                            </div> */}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-start gap-4">
        <button
          className={`w-4/12 px-12 py-2 text-[12px] ${
            isCompleteKYC()
              ? 'border border-red-600 bg-white text-red-600'
              : 'cursor-not-allowed border border-[#e5e5e5] bg-[#FAFAFA] text-red-400'
          } rounded-md transition-colors duration-200`}
          disabled={!isCompleteKYC()}
          onClick={() => {
            completeKYC();
          }}>
          Complete KYC
        </button>
      </div>
    </div>
  );
};

export default Document_Upload;
