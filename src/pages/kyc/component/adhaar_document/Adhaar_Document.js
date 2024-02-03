import { useState } from 'react'
import { Field } from '../../../../common/components'
import { OTP_Input } from '../otp_Input';
import { toast } from 'react-toastify';

const Adhaar_Document = ({ triggerValidation,setTriggerValidations,setIsKYCCompleted}) => {
    const [isValidAdhaar, setIsValidAdhaar] = useState(true);
    const [adhaarNumber, setAdhaarNumber] = useState('')
    const [showOTPBox, setShowOTPBox] = useState(false)
    const [disableInput, setDisableInput] = useState(false)
    const handleSetAdhaarNumber = (event) => {
        const inputAdhaarNumber = event.target.value;
        // Remove non-digit characters
        const sanitizedAdhaarNumber = inputAdhaarNumber.replace(/\D/g, '');

        // Format with hyphens every 4 digits
        const formattedAdhaarNumber = sanitizedAdhaarNumber.replace(/(\d{4})(?=\d)/g, '$1-');

        // Limit to 12 digits after applying formatting
        const limitedAdhaarNumber = formattedAdhaarNumber.slice(0, 14); // Increased limit to accommodate hyphens

        setAdhaarNumber(limitedAdhaarNumber);
        setIsValidAdhaar(/^[2-9]{1}[0-9]{3}-[0-9]{4}-[0-9]{4}$/.test(adhaarNumber))
    }

    const handleSendOTP = () => {
        try {
            //if otp is sent successfully
            setShowOTPBox(true)
            setTriggerValidations(true)
            setDisableInput(true)
            // API call to send OTP
        } catch (error) {
            // Show error message
            toast.error('Please enter a valid Adhaar number', { type: 'error' })
        }
    }

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
                        placeHolder={"Enter your adhaar number"}
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
                    {!isValidAdhaar && (
                        <p className="mt-1 text-xs text-red-500">Please enter Document number.</p>
                    )}
                </div>
                {disableInput &&
                    <span className='text-[0.75rem] pt-5 text-[#7973ef] cursor-pointer' onClick={() => {
                        setShowOTPBox(false)
                        setDisableInput(false)
                    }}>Change</span>
                }
            </div>
            {!showOTPBox &&
                <div className="flex justify-start gap-4 mt-6">
                    <button
                        type="button"
                        className={`dark:focus:ring-red-900 rounded-lg ${isValidAdhaar && adhaarNumber.length ? "bg-red-600" : "bg-[#FAFAFA] border text-[#c6c6c6] border-[#e5e5e5]"} transition-colors duration-300 px-8 py-2 text-[0.8rem] font-medium text-white focus:outline-none focus:ring-4 focus:ring-red-300`}
                        disabled={!isValidAdhaar}
                        onClick={() => handleSendOTP()}
                    >
                        {'Send OTP'}
                    </button>
                </div>
            }
            {showOTPBox && <OTP_Input handleSendOTP={handleSendOTP}
                timer={30}
                setIsKYCCompleted={setIsKYCCompleted}
            />}
        </div>
    )
}

export default Adhaar_Document