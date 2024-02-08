import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const OTP_Modal = ({ setShow, number,setPhoneVerified,setRTOPhoneVerified,type }) => {

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
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


    const verifyOTP = () => {
        if (isOtpEntered) {
            // API call to verify OTP
            toast.success('OTP Verified successfully', { type: 'success' })
            setShow(false);
            if(type === 'phone'){
                setPhoneVerified(true);
            }
            else{
                setRTOPhoneVerified(true);
            }
        }
        else {
            // Show error message
            toast.error('Please enter a valid OTP', { type: 'error' })
        }
    }

    return (
        <>
            <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                <div className="relative mx-0 my-6 w-full max-w-sm">
                    {/*content*/}
                    <div className="relative flex w-full flex-col shadow-2xl border-black rounded-lg bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex w-full items-center justify-between rounded-t p-0">
                            <div></div>
                            <h3 className="text-xl font-semibold pt-1">{'Verify OTP'}</h3>
                            <button
                                className="border-0 bg-transparent p-1 pr-0 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                                onClick={() => setShow(false)}>
                                <span className="block h-6 w-6 bg-transparent text-black text-[18px] font-bold outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                            {/* To do : Active this button and move it to the right corner */}
                        </div>
                        {/*body*/}
                        <div className="relative flex-auto flex flex-col p-6 gap-3 text-[#888888] items-center justify-center text-center text-[14px]">
                            <div>A 6 digit OTP has been sent to the mobile number {number}. Please enter it below.</div>
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
                                        className="w-10 h-10 text-[12px] text-center border border-[#a1a1a1] cursor-pointer rounded-md focus:outline-none focus:ring-0 focus:border-[#a1a1a1]"
                                    />
                                ))}
                            </div>
                            <div className="flex justify-start items-center text-[12px] font-medium">
                                <button className="text-green-500 cursor-pointer">
                                    Resend OTP
                                </button>
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex flex-row items-center justify-center px-6 rounded-b-md">
                            <button className={`px-12 mb-4 py-2 border-[#d3d3d3] text-white ${isOtpEntered ? "bg-red-600" : "bg-[#DDDDDD] text-[#00000080]"} transition-colors duration-200 rounded-md`}
                                disabled={!isOtpEntered}
                                onClick={() => { verifyOTP() }}
                            >
                                Verify OTP
                            </button>
                        </div>

                    </div>
                </div >
            </div >
            <div className="fixed inset-0 z-[59] shadow-2xl bg-black opacity-45"></div>
        </>
    )
}

export default OTP_Modal
