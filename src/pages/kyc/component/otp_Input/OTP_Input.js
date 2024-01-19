import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

const OTP_Input = ({ handleSendOTP, timer, setIsKYCCompleted }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [seconds, setSeconds] = useState(timer);
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    const isOtpEntered = otp.every((digit) => digit !== '');

    const handleInputChange = (index, value) => {
        if (isNaN(value)) return; // Allow only numeric input

        const newOtp = [...otp];
        newOtp[index] = value;

        setOtp(newOtp);

        // Move to the next input box
        if (index < inputRefs.length - 1 && value !== '') {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace to clear the current box and move back
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputRefs[index - 1].current.focus();
        }
    };

    const completeKYC = () => {
        if (isOtpEntered) {
            // API call to verify OTP
            toast.success('KYC completed successfully', { type: 'success' })
            setIsKYCCompleted(true)
        }
        else {
            // Show error message
            toast.error('Please enter a valid OTP', { type: 'error' })
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="flex flex-col gap-4 mt-4">
            <p className='text-[12px]'>OTP has been generated successfully. Please Check your registered mobile number for OTP.</p>
            <p className='text-[12px] font-medium'>Enter OTP</p>
            <div className="flex items-center justify-start space-x-4">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        value={digit}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        maxLength="1"
                        className="w-10 h-10 text-[12px] text-center border border-[#D3D3D3] rounded-md"
                    />
                ))}
            </div>
            <div className="flex justify-start mt-2 gap-4 items-center text-[12px] font-medium">
                <button className={`px-12 py-2 text-white ${isOtpEntered ? "bg-purple-600" : "bg-[#FAFAFA] border text-[#c6c6c6] border-[#e5e5e5]"} transition-colors duration-200 rounded-md`}
                    disabled={!isOtpEntered}
                    onClick={() => { completeKYC() }}
                >
                    Complete KYC
                </button>
                {seconds > 0 ?
                    <div>Resend OTP in 00:{seconds} sec</div>
                    :
                    <button className="text-[#7973ef] cursor-pointer"
                        onClick={() => {
                            setSeconds(timer)
                            handleSendOTP()
                        }}>
                        Resend OTP
                    </button>
                }
            </div>
        </div>
    )
}

export default OTP_Input;