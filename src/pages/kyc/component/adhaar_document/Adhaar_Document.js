import { useState } from 'react';
import { Field } from '../../../../common/components';
import { OTP_Input } from '../otp_Input';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../../common/utils/env.config';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../../../common/utils/config';
import { useNavigate } from 'react-router-dom';

const Adhaar_Document = ({ triggerValidation, setTriggerValidations, setIsKYCCompleted }) => {
  const [isValidAdhaar, setIsValidAdhaar] = useState(true);
  const [adhaarNumber, setAdhaarNumber] = useState('');
  const [showOTPBox, setShowOTPBox] = useState(false);
  const [id, setId] = useState(null);
  const [disableInput, setDisableInput] = useState(false);
  const navigate = useNavigate();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: ACCESS_TOKEN,
  };
  const handleSetAdhaarNumber = (event) => {
    const inputAdhaarNumber = event.target.value;
    // Remove non-digit characters
    const sanitizedAdhaarNumber = inputAdhaarNumber.replace(/\D/g, '');

    // Format with hyphens every 4 digits
    const formattedAdhaarNumber = sanitizedAdhaarNumber.replace(/(\d{4})(?=\d)/g, '$1-');

    // Limit to 12 digits after applying formatting
    const limitedAdhaarNumber = formattedAdhaarNumber.slice(0, 14); // Increased limit to accommodate hyphens

    setAdhaarNumber(limitedAdhaarNumber);
    setIsValidAdhaar(/^[2-9]{1}[0-9]{3}-[0-9]{4}-[0-9]{4}$/.test(adhaarNumber));
  };

  const handleSendOTP = () => {
    try {
      //if otp is sent successfully
      setShowOTPBox(true);
      setTriggerValidations(true);
      setDisableInput(true);
      // API call to send OTP
      let temp_number = adhaarNumber.replace(/-/g, '');
      axios
        .post(BACKEND_URL + `/kyc/adhaar_generate_otp?id_number=${temp_number}`, { headers: headers })
        .then((res) => {
          console.log('Response OTP', res.data);
          setId(res.data.reference_id);
          toast.success('otp send successfully');
        });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Session expired. Please login again.');
        sessionStorage.clear();
        navigate('/login');
      } else {
        // Show error message
        toast.error('Please enter a valid Adhaar number', { type: 'error' });
      }
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-4">
        <div className="w-[25%]">
          <Field
            type={'text'}
            id={`adhaarNumber`}
            label={'Document Number'}
            inputClassNames={'text-[12px]'}
            labelClassNames={'text-[12px]'}
            placeHolder={'Enter your adhaar number'}
            required={true}
            value={adhaarNumber}
            onChange={handleSetAdhaarNumber}
            triggerValidation={triggerValidation}
            onBlur={() => {
              setIsValidAdhaar(/^[2-9]{1}[0-9]{3}-[0-9]{4}-[0-9]{4}$/.test(adhaarNumber));
            }}
            isDisabled={disableInput}
            autoComplete="off"
          />
          {!isValidAdhaar && <p className="mt-1 text-xs text-red-500">Please enter Document number.</p>}
        </div>
        {disableInput && (
          <span
            className="cursor-pointer pt-5 text-[0.75rem] text-[#7973ef]"
            onClick={() => {
              setShowOTPBox(false);
              setDisableInput(false);
            }}>
            Change
          </span>
        )}
      </div>
      {!showOTPBox && (
        <div className="mt-6 flex justify-start gap-4">
          <button
            type="button"
            className={`dark:focus:ring-sky-900 rounded-lg ${
              isValidAdhaar && adhaarNumber.length
                ? 'bg-sky-500'
                : 'border border-[#e5e5e5] bg-sky-500 text-[#c6c6c6]'
            } px-8 py-2 text-[0.8rem] font-medium text-white transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-sky-300`}
            disabled={!isValidAdhaar}
            onClick={() => handleSendOTP()}>
            {'Send OTP'}
          </button>
        </div>
      )}
      {showOTPBox && (
        <OTP_Input handleSendOTP={handleSendOTP} timer={30} setIsKYCCompleted={setIsKYCCompleted} id={id} />
      )}
    </div>
  );
};

export default Adhaar_Document;
