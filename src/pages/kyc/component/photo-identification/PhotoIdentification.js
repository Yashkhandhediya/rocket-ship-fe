// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const PhotoIndentification = ({ currentStep, handleChangeStep }) => {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [videoInitialized, setVideoInitialized] = useState(false);
    const [canvasInitialized, setCanvasInitialized] = useState(false);
    const [selfieText, setSelfieText] = useState('Take Selfie');
    const [type, setType] = useState('open'); // open, capture, retake
    const [capturedImage, setCapturedImage] = useState(null);

    const handleCamera = async (type) => {
        if (type === 'open') {
            await handleOpenCamera();
        }
        if (type === 'capture') {
            handleCaptureImage();
        }
        if (type === 'retake') {
            setVideoInitialized(false);
            setCapturedImage(null);
            await handleOpenCamera();
        }
    };

    const handleOpenCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setVideoInitialized(true);
            }
            setSelfieText('Capture Selfie');
            setType('capture');
        } catch (error) {
            toast('Please allow camera access', { type: 'error' });
        }
    }
    const handleCaptureImage = () => {
        try {
            if (videoRef.current && canvasRef.current) {
                const video = videoRef.current;
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');

                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;

                context.save();
                context.scale(-1, 1);
                context.drawImage(video, 0, 0, -canvas.width, canvas.height);
                context.restore();
                const imageDataURL = canvas.toDataURL('image/png');
                setCapturedImage(imageDataURL);

                const stream = videoRef.current.srcObject;
                if (stream) {
                    const tracks = stream.getTracks();
                    tracks.forEach(track => track.stop());
                }
            }
            setSelfieText('Change Image');
            setType('retake');
            toast('Your selfie has been successfully verified', { type: 'success' });
        } catch (error) {
            toast('Error while capturing image', { type: 'error' });
        }
    };

    const changeNextStep = (type) => {
        if (type === 'NEXT') {
            if (capturedImage) {
                handleChangeStep(currentStep + 1);
            }
            else {
                toast('Please capture your image to proceed', { type: 'error' });
            }
        } else if (currentStep > 0) {
            handleChangeStep(currentStep - 1);
        }
    };

    useEffect(() => {
        if (videoRef.current && !canvasInitialized) {
            const canvas = document.createElement('canvas');
            canvasRef.current = canvas;
            setCanvasInitialized(true);
        }
    }, [canvasInitialized]);

    return (
        <div>
            <div className="font-bold text-xl mb-6">
                Photo Identification
            </div>
            <div className="w-[85%] h-2/3 bg-white rounded-md shadow-md flex flex-col items-center justify-center py-12 mb-6">
                <div className={`video_div w-1/2 border-dashed bg-[#FAFAFA] border-purple-200 rounded-2xl border-2 h-full flex justify-center items-center ${videoInitialized ? '' : 'py-24'} mb-6`}>
                    {capturedImage ? (
                        <img src={capturedImage} alt="Captured" width={'100%'} className="rounded-2xl" />
                    ) :
                        <video ref={videoRef} width={'auto'} height={'auto'} autoPlay playsInline className="rounded-2xl transform scale-x-[-1] object-cover" />
                    }
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                </div>
                <div>
                    <button
                        type="button"
                        className="dark:focus:ring-purple-900 rounded-lg bg-white px-14 py-1.5 text-sm font-medium text-purple-500 border-2 border-purple-500 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-300"
                        onClick={() => handleCamera(type)}
                    >
                        {selfieText}
                    </button>
                </div>
                {type === 'open' &&
                    <div className="text-sm text-gray-400 mt-4">
                        Switch On Camera to take your selfie for photo identification
                    </div>
                }
            </div>
            {capturedImage &&
                <div className="flex justify-start gap-4">
                    <button
                        type="button"
                        className="dark:focus:ring-purple-900 rounded-lg bg-purple-600 px-10 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300"
                        onClick={() => changeNextStep('NEXT')}
                    >
                        {'Next'}
                    </button>
                </div>
            }
        </div>
    );
};

export default PhotoIndentification;