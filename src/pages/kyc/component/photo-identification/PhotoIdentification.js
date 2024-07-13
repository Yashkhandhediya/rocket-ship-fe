// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../../common/utils/env.config';

const PhotoIndentification = ({ currentStep, handleChangeStep }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoInitialized, setVideoInitialized] = useState(false);
  const [canvasInitialized, setCanvasInitialized] = useState(false);
  const [selfieText, setSelfieText] = useState('Take Selfie');
  const [type, setType] = useState('open'); // open, capture, retake
  const [capturedImage, setCapturedImage] = useState(null);
  const user_name = sessionStorage.getItem('user_name');
  const id_user = sessionStorage.getItem('user_id');

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
  };
  const handleCaptureImage = () => {
    const headers = { 'Content-Type': 'application/json' };
    // debugger
    try {
      if (videoRef.current && canvasRef.current) {
        // debugger
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        context.save();
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, -canvas.width, canvas.height);
        context.restore();

        // let upLoadImg = capturedImage
        // upLoadImg = new File([
        //     new Blob([upLoadImg])
        //   ], "jt.jpeg")
        // console.log("UPLOAD IMAGE ",upLoadImg)
        // const formData = new FormData();
        // formData.append("file", upLoadImg);
        // // const binaryImage = atob(imageDataURL.split(',')[1]);
        // console.log("IMAJJJJJJJJJ",capturedImage,formData)
        // axios.post(BACKEND_URL + `/kyc/upload_selfie?image_id=${id_user}&type="selfie"&username=${user_name}`,{
        //     file:imageDataURL
        // },{headers}).then((res) => {
        //     console.log("Image KYC Response",res)
        // }).catch((err) => {
        //     console.log("Error in KYC",err)
        // })

        canvas.toBlob((blob) => {
          const imageDataURL = canvas.toDataURL('image/png');
          setCapturedImage(imageDataURL);
          const formData = new FormData();
          formData.append('file', blob, 'selfie.png');
          const headers = { 'Content-Type': 'multipart/form-data' };
          axios
            .post(
              BACKEND_URL + `/kyc/upload_selfie?image_id=${id_user}&type=selfie&user_name=${user_name}`,
              formData,
              { headers },
            )
            .then((res) => {
              console.log('Image KYC Response', res);
              toast('Your selfie has been successfully verified', { type: 'success' });
            })
            .catch((err) => {
              console.log('Error in KYC', err);
              toast('Error while verifying selfie', { type: 'error' });
            });
        }, 'image/png');

        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
      setSelfieText('Change Image');
      setType('retake');
      // toast('Your selfie has been successfully verified', { type: 'success' });
    } catch (error) {
      toast('Error while capturing image', { type: 'error' });
    }
  };

  const changeNextStep = (type) => {
    if (type === 'NEXT') {
      if (capturedImage) {
        handleChangeStep(currentStep + 1);
      } else {
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
      <div className="mb-6 text-xl font-bold">Photo Identification</div>
      <div className="mb-6 flex h-2/3 w-[85%] flex-col items-center justify-center rounded-md bg-white py-12 shadow-md">
        <div
          className={`video_div flex h-full w-1/2 items-center justify-center rounded-2xl border-2 border-dashed border-sky-200 bg-[#FAFAFA] ${
            videoInitialized ? '' : 'py-24'
          } mb-6`}>
          {capturedImage ? (
            <img src={capturedImage} alt="Captured" width={'100%'} className="rounded-2xl" />
          ) : (
            <video
              ref={videoRef}
              width={'auto'}
              height={'auto'}
              autoPlay
              playsInline
              className="scale-x-[-1] transform rounded-2xl object-cover"
            />
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
        <div>
          <button
            type="button"
            className="dark:focus:ring-sky-900 rounded-lg border-2 border-sky-500 bg-white px-14 py-1.5 text-sm font-medium text-sky-500 hover:bg-sky-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-sky-300"
            onClick={() => handleCamera(type)}>
            {selfieText}
          </button>
        </div>
        {type === 'open' && (
          <div className="mt-4 text-sm text-gray-400">
            Switch On Camera to take your selfie for photo identification
          </div>
        )}
      </div>
      {capturedImage && (
        <div className="flex justify-start gap-4">
          <button
            type="button"
            className="dark:focus:ring-sky-900 rounded-lg bg-sky-600 px-10 py-2 text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-300"
            onClick={() => changeNextStep('NEXT')}>
            {'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoIndentification;
