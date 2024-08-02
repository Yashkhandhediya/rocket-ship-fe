import { useState, useEffect, useRef } from 'react';
import { KYC_Document, KYC_adhaar } from '../../../../common/icons';
import { Adhaar_Document } from '../adhaar_document';
import { Document_Upload } from '../document_upload';
import { KYC_type } from '../bussiness-type/BussinessType';
import { BACKEND_URL } from '../../../../common/utils/env.config';
import { ACCESS_TOKEN } from '../../../../common/utils/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DocumentVerification = ({ currentStep, handleChangeStep, setIsKYCCompleted }) => {
  const [openAccordion, setOpenAccordion] = useState(0);
  const [triggerBuyerValidations, setTriggerBuyerValidations] = useState(false);
  const [isOTPPopupVisible, setIsOTPPopupVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [gst, setGst] = useState('');
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = Array(6)
    .fill(0)
    .map(() => useRef(null));
  const handleAccordionToggle = (index) => {
    setOpenAccordion((prev) => (prev === index ? 0 : index));
  };

  const handleVerifyClick = async () => {
    if (username.trim() === '' || gst.trim() === '') {
      alert('Username and GST number cannot be empty');
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/kyc/gst_generate_otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: ACCESS_TOKEN },
        body: JSON.stringify({ username, gstin: gst }),
      });
      if (response.ok) {
        setIsOTPPopupVisible(true);
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to generate OTP');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        sessionStorage.clear();
        navigate('/login');
      } else {
        alert('An error occurred while generating OTP');
      }
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    if (value.length >= 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs[index - 1]?.current?.focus();
    }
  };

  useEffect(() => {
    if (isOTPPopupVisible) {
      inputRefs[0]?.current?.focus();
    }
  }, [isOTPPopupVisible]);

  const handleOTPSubmit = async () => {
    try {
      const response = await fetch(BACKEND_URL + '/kyc/gst_submit_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: ACCESS_TOKEN,
        },
        body: JSON.stringify({ username, gstin: gst, otp: otp.join('') }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('OTP submitted successfully');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to submit OTP');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Session expired. Please login again.');
        sessionStorage.clear();
        navigate('/login');
      } else {
        alert('An error occurred while submitting OTP');
      }
    } finally {
      setIsOTPPopupVisible(false);
    }
  };

  return (
    <div>
      {KYC_type === 'user' ? (
        <div>
          <div className="mb-6 text-xl font-bold">
            Please select any of the 2 options below to verify your KYC
          </div>

          <div id="accordion-collapse" data-accordion="collapse" className="w-[90%]">
            {/* First Collapse */}
            <div className="mb-6">
              <h2 id={'accordion-collapse-heading-1'}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between border border-gray-200 bg-white px-5 py-3 font-medium rtl:text-right ${
                    openAccordion === 1 ? 'border-1 rounded-t-xl border-[#ACCBFB]' : 'rounded-xl'
                  } gap-3`}
                  data-accordion-target={'#accordion-collapse-body-1'}
                  aria-expanded={openAccordion === 1}
                  aria-controls={'accordion-collapse-body-1'}
                  onClick={() => handleAccordionToggle(1)}
                  style={{ color: '#191919' }} //for styling
                >
                  <div className="flex flex-row gap-4">
                    <img src={KYC_adhaar} alt="KYC using Adhaar" />
                    <div className="flex flex-col justify-start gap-1">
                      <div className="flex gap-1.5">
                        <span className="text-[0.9rem]">Express KYC using Aadhar OTP </span>
                        <span className="text-[0.65rem] font-normal text-[#6C757D]">
                          ((No Document Upload Required))
                        </span>
                      </div>
                      <div className="max-w-max rounded-full bg-[#FFF5EB] px-5 text-left text-[0.65rem] font-normal text-[#D96C00]">
                        Get KYC verified within 30 seconds
                      </div>
                    </div>
                  </div>
                  <svg
                    data-accordion-icon
                    className={`h-5 w-5 shrink-0 ${
                      openAccordion === 1 ? 'rotate-0' : 'rotate-180'
                    } origin-center transform transition-transform duration-300 ease-in-out`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </h2>
              <div
                id={'accordion-collapse-body-1'}
                className={`${
                  openAccordion === 1 ? 'block' : 'hidden'
                } border-1 rounded-b-xl border border-t-0 border-[#ACCBFB] bg-white p-4`}
                aria-labelledby={'accordion-collapse-heading-1'}>
                <div className="py-4 font-normal">
                  <Adhaar_Document
                    triggerValidation={triggerBuyerValidations}
                    setTriggerValidations={setTriggerBuyerValidations}
                    setIsKYCCompleted={setIsKYCCompleted}
                  />
                </div>
              </div>
            </div>

            <div className="w-full text-center text-lg">OR</div>

            {/* Second Collapse */}
            <div className="mb-6 mt-6">
              <h2 id={'accordion-collapse-heading-2'}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between border border-gray-200 bg-white px-5 py-3 text-sm font-medium rtl:text-right ${
                    openAccordion === 2 ? 'border-1 rounded-t-xl border-[#ACCBFB]' : 'rounded-xl'
                  } gap-3`}
                  data-accordion-target={'#accordion-collapse-body-2'}
                  aria-expanded={openAccordion === 2}
                  aria-controls={'accordion-collapse-body-2'}
                  onClick={() => handleAccordionToggle(2)}
                  style={{ color: '#191919' }} //for styling
                >
                  <div className="flex flex-row gap-4">
                    <img src={KYC_Document} alt="KYC using Adhaar" />
                    <div className="flex flex-col justify-start gap-1">
                      <div className="flex gap-1.5">
                        <span className="text-[0.9rem]">KYC by uploading ID & Address Proofs</span>
                        <span className="text-[0.65rem] font-normal text-[#6C757D]">
                          (Document Upload Required)
                        </span>
                      </div>
                      <div className="max-w-max rounded-full bg-[#FFF5EB] px-5 text-left text-[0.65rem] font-normal text-[#D96C00]">
                        KYC verification might take 2-3 business days
                      </div>
                    </div>
                  </div>
                  <svg
                    data-accordion-icon
                    className={`h-5 w-5 shrink-0 ${
                      openAccordion === 2 ? 'rotate-0' : 'rotate-180'
                    } origin-center transform transition-transform duration-300 ease-in-out`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </h2>
              <div
                id={'accordion-collapse-body-2'}
                className={`${
                  openAccordion === 2 ? 'block' : 'hidden'
                } border-1 rounded-b-xl border border-t-0 border-[#ACCBFB] bg-white p-4`}
                aria-labelledby={`accordion-collapse-heading-2 `}>
                <div className="py-4 font-normal">
                  <Document_Upload setIsKYCCompleted={setIsKYCCompleted} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-start gap-4">
            <button
              type="button"
              className="dark:focus:ring-sky-900 rounded-lg bg-sky-600 px-10 py-2 text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-300"
              // onClick={() => changeNextStep('NEXT')}
            >
              {'Next'}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 mt-6">
            <h2 id={'accordion-collapse-heading-3'}>
              <button
                type="button"
                className={`flex w-full items-center justify-between border border-gray-200 bg-white px-5 py-3 text-sm font-medium rtl:text-right ${
                  openAccordion === 3 ? 'border-1 rounded-t-xl border-[#ACCBFB]' : 'rounded-xl'
                } gap-3`}
                data-accordion-target={'#accordion-collapse-body-3'}
                aria-expanded={openAccordion === 3}
                aria-controls={'accordion-collapse-body-3'}
                onClick={() => handleAccordionToggle(3)}
                style={{ color: '#191919' }} // for styling
              >
                <div className="flex flex-row gap-4">
                  <img src={KYC_Document} alt="KYC using Adhaar" />
                  <div className="flex flex-col justify-start gap-1">
                    <div className="flex gap-1.5">
                      <span className="text-[0.9rem]">KYC by GST validation</span>
                    </div>
                    <div className="max-w-max rounded-full bg-[#FFF5EB] px-5 text-left text-[0.65rem] font-normal text-[#D96C00]">
                      KYC verification might take 2-3 business days
                    </div>
                  </div>
                </div>
                <svg
                  data-accordion-icon
                  className={`h-5 w-5 shrink-0 ${
                    openAccordion === 3 ? 'rotate-0' : 'rotate-180'
                  } origin-center transform transition-transform duration-300 ease-in-out`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </h2>
            <div
              id={'accordion-collapse-body-3'}
              className={`${
                openAccordion === 3 ? 'block' : 'hidden'
              } border-1 rounded-b-xl border border-t-0 border-[#ACCBFB] bg-white p-4`}
              aria-labelledby={`accordion-collapse-heading-3 `}>
              <div className="flex py-4 font-normal">
                <form className="flex flex-col">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="username" className="mb-1 font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="rounded border border-gray-300 px-2 py-1"
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                      />
                    </div>
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <label htmlFor="gst" className="mb-1 font-medium text-gray-700">
                          GST No
                        </label>
                        <input
                          type="text"
                          id="gst"
                          name="gst"
                          className="w-full rounded border border-gray-300 px-2 py-1"
                          placeholder="Enter your GST number"
                          onChange={(e) => setGst(e.target.value)}
                          value={gst}
                        />
                      </div>
                      {!isOTPPopupVisible && (
                        <button
                          type="button"
                          className="rounded bg-blue-500 px-3 py-1 text-white"
                          onClick={handleVerifyClick}>
                          Send OTP
                        </button>
                      )}
                    </div>
                  </div>
                  {isOTPPopupVisible && (
                    <div className="mt-6">
                      <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="otp">
                        Enter OTP
                      </label>
                      <div className="flex space-x-2">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            ref={inputRefs[index]}
                            type="text"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            maxLength="1"
                            className="focus:shadow-outline w-12 appearance-none rounded border px-3 py-2 text-center leading-tight text-gray-700 shadow focus:outline-none"
                          />
                        ))}
                      </div>
                      <button
                        onClick={handleOTPSubmit}
                        className="focus:shadow-outline mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none">
                        Submit OTP
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
          <div className="w-full text-center text-lg">OR</div>
          <div className="mb-6 mt-6">
            <h2 id={'accordion-collapse-heading-2'}>
              <button
                type="button"
                className={`flex w-full items-center justify-between border border-gray-200 bg-white px-5 py-3 text-sm font-medium rtl:text-right ${
                  openAccordion === 2 ? 'border-1 rounded-t-xl border-[#ACCBFB]' : 'rounded-xl'
                } gap-3`}
                data-accordion-target={'#accordion-collapse-body-2'}
                aria-expanded={openAccordion === 2}
                aria-controls={'accordion-collapse-body-2'}
                onClick={() => handleAccordionToggle(2)}
                style={{ color: '#191919' }} //for styling
              >
                <div className="flex flex-row gap-4">
                  <img src={KYC_Document} alt="KYC using Adhaar" />
                  <div className="flex flex-col justify-start gap-1">
                    <div className="flex gap-1.5">
                      <span className="text-[0.9rem]">KYC by uploading ID & Address Proofs</span>
                      <span className="text-[0.65rem] font-normal text-[#6C757D]">
                        (Document Upload Required)
                      </span>
                    </div>
                    <div className="max-w-max rounded-full bg-[#FFF5EB] px-5 text-left text-[0.65rem] font-normal text-[#D96C00]">
                      KYC verification might take 2-3 business days
                    </div>
                  </div>
                </div>
                <svg
                  data-accordion-icon
                  className={`h-5 w-5 shrink-0 ${
                    openAccordion === 2 ? 'rotate-0' : 'rotate-180'
                  } origin-center transform transition-transform duration-300 ease-in-out`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </h2>
            <div
              id={'accordion-collapse-body-2'}
              className={`${
                openAccordion === 2 ? 'block' : 'hidden'
              } border-1 rounded-b-xl border border-t-0 border-[#ACCBFB] bg-white p-4`}
              aria-labelledby={`accordion-collapse-heading-2 `}>
              <div className="py-4 font-normal">
                <Document_Upload setIsKYCCompleted={setIsKYCCompleted} KYCType={KYC_type} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentVerification;
