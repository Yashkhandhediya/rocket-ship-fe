import { useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { useNavigate } from 'react-router-dom';
import { RechargeModal } from './components/rechareModal';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN } from '../../common/utils/config';

const Home = () => {
  const navigate = useNavigate();
  const id_user = sessionStorage.getItem('user_id');
  const [showPopup, setShowPopup] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [showRechargeModal, setShowRechargeModal] = useState(false);

  const handleRecharge = () => {
    const headers = { 'Content-Type': 'application/json', Authorization: ACCESS_TOKEN };
    axios
      .post(
        BACKEND_URL +
          `/company/request_balance/?user_id=${parseInt(id_user)}&amount=${parseInt(rechargeAmount)}`,
        { headers },
      )
      .then((res) => {
        console.log('Recharge Responsee', res);
        // let newVal = sessionStorage.getItem('balance') - rechargeAmount
        // sessionStorage.setItem('balance',newVal)
        toast.success('Request Recharge successful!');
        setRechargeAmount('');
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          toast.error('Session expired. Please login again.');
          sessionStorage.clear();
          navigate('/login');
        } else {
          console.log('Error In Rechargeee');
        }
      });
    setShowPopup(false);
    // window.location.reload()
  };

  return (
    <PageWithSidebar>
      <div className="mt-4 flex h-screen w-full flex-col bg-[#f8f8f8] px-2 py-2 pl-6">
        {sessionStorage.getItem('is_kyc') == 1 && (
          <div
            className="mb-4 ml-2 mr-4 mt-2 w-[99%] rounded-lg border bg-red-600 p-2 shadow-md hover:underline"
            style={{ textAlign: 'center' }}>
            <marquee className="font-semibold text-white">
              <Link to={'/seller/kyc'}>
                Click here to complete your KYC and get non-disrupted shipping and COD remittances
              </Link>
            </marquee>
          </div>
        )}
        {sessionStorage.getItem('is_kyc') == 2 && (
          <div
            className="text-md mb-4 ml-2 mr-4 mt-2 w-[99%] rounded-lg border bg-yellow-400 p-2 font-semibold shadow-md hover:underline"
            style={{ textAlign: 'center' }}>
            <marquee className="text-white">KYC Verification Is Pending</marquee>
          </div>
        )}
        <div className="flex h-auto w-full flex-col rounded bg-white px-5 py-6 shadow">
          <p className="mb-6 text-[20px] font-[500] text-black">Get started in a few easy steps:</p>
          <div className="flex flex-row gap-8">
            <div className="flex h-96 w-[32%] flex-col items-center justify-start rounded-lg bg-red-100">
              <div className="mt-12 flex h-2/3 flex-col items-center justify-center">
                <div className="flex w-[6.5rem] items-center justify-center rounded-full border-2 border-[#0E85007d]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#0E8500"
                    className="h-[6.5rem] w-[6.5rem]">
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="mt-8 text-[20px] font-medium">First Order Added</div>
              </div>
              <div className="flex h-1/3 items-center justify-center text-[14px] font-normal text-[#E02424]">
                <button
                  className={`w-48 rounded-md border border-[#E02424] bg-white py-1.5 ${
                    sessionStorage.getItem('is_kyc') == 1 || sessionStorage.getItem('is_kyc') == 2
                      ? 'cursor-not-allowed'
                      : ''
                  }`}
                  onClick={() => {
                    navigate('/orders');
                  }}
                  disabled={sessionStorage.getItem('is_kyc') == 1 || sessionStorage.getItem('is_kyc') == 2}>
                  View Order
                </button>
              </div>
            </div>
            {sessionStorage.getItem('is_company') == 1 && (
              <div className="flex h-96 w-[32%] flex-col items-center justify-start rounded-lg bg-red-100">
                <div className="mt-12 flex h-2/3 flex-col items-center justify-center">
                  <div className="flex w-11 items-center justify-center rounded-full bg-white p-0.5">
                    <svg
                      className="dark:text-white h-10 w-10 text-gray-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#0E8500"
                      viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M12.3 3.3a1 1 0 0 1 1.4 0L16.4 6h-2.8l-1.3-1.3a1 1 0 0 1 0-1.4Zm.1 2.7L9.7 3.3a1 1 0 0 0-1.4 0L5.6 6h6.8ZM4.6 7A2 2 0 0 0 3 9v10c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.5-2h-13Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="mt-8 flex w-2/3 flex-col items-center text-[20px] font-medium">
                    Recharge Your Wallet
                    <p className="mt-4 text-center text-[12px] font-normal">
                      Start your shipping journey with a recharge as low as Rs. 500 to your wallet
                    </p>
                  </div>
                </div>
                <div className="flex h-1/3 items-center justify-center text-[14px] font-medium text-white">
                  <button
                    className={`w-48 rounded-md bg-[#E02424] py-1.5 ${
                      sessionStorage.getItem('is_kyc') == 1 || sessionStorage.getItem('is_kyc') == 2
                        ? 'cursor-not-allowed'
                        : ''
                    }`}
                    onClick={() => setShowRechargeModal(true)}
                    disabled={sessionStorage.getItem('is_kyc') == 1 || sessionStorage.getItem('is_kyc') == 2}>
                    Recharge
                  </button>
                  {showRechargeModal && (
                    <RechargeModal
                      showRechargeModal={showRechargeModal}
                      setShowRechargeModal={setShowRechargeModal}
                    />
                  )}
                </div>
              </div>
            )}
            {sessionStorage.getItem('is_company') == 0 && (
              <div className="flex h-96 w-[32%] flex-col items-center justify-start rounded-lg bg-red-100">
                <div className="mt-12 flex h-2/3 flex-col items-center justify-center">
                  <div className="flex w-11 items-center justify-center rounded-full bg-white p-0.5">
                    <svg
                      className="dark:text-white h-10 w-10 text-gray-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#0E8500"
                      viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M12.3 3.3a1 1 0 0 1 1.4 0L16.4 6h-2.8l-1.3-1.3a1 1 0 0 1 0-1.4Zm.1 2.7L9.7 3.3a1 1 0 0 0-1.4 0L5.6 6h6.8ZM4.6 7A2 2 0 0 0 3 9v10c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.5-2h-13Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="mt-8 flex w-2/3 flex-col items-center text-[20px] font-medium">
                    Recharge Your Wallet
                    <p className="mt-4 text-center text-[12px] font-normal">
                      Start your shipping journey with a recharge as low as Rs. 500 to your wallet
                    </p>
                  </div>
                </div>
                <div className="flex h-1/3 items-center justify-center text-[14px] font-medium text-white">
                  <button
                    className={`w-48 rounded-md bg-[#E02424] py-1.5 ${
                      sessionStorage.getItem('is_kyc') == 1 || sessionStorage.getItem('is_kyc') == 2
                        ? 'cursor-not-allowed'
                        : ''
                    }`}
                    onClick={() => setShowPopup(true)}
                    disabled={sessionStorage.getItem('is_kyc') == 1 || sessionStorage.getItem('is_kyc') == 2}>
                    Request
                  </button>
                </div>
              </div>
            )}
            <div className="flex h-96 w-[32%] flex-col items-center justify-start rounded-lg bg-red-100">
              <div className="mt-12 flex h-2/3 flex-col items-center justify-center">
                <div className="flex w-11 items-center justify-center rounded-full bg-white p-0.5">
                  <svg
                    className="dark:text-white h-10 w-10 text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#0E8500"
                    viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M12.3 3.3a1 1 0 0 1 1.4 0L16.4 6h-2.8l-1.3-1.3a1 1 0 0 1 0-1.4Zm.1 2.7L9.7 3.3a1 1 0 0 0-1.4 0L5.6 6h6.8ZM4.6 7A2 2 0 0 0 3 9v10c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.5-2h-13Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="mt-8 flex w-2/3 flex-col items-center text-[20px] font-medium">
                  Ship Your First Order
                  <p className="mt-4 text-center text-[12px] font-normal">
                    Select a courier of your choice and schedule a pickup when ready.
                  </p>
                </div>
              </div>
              <div className="flex h-1/3 items-center justify-center text-[14px] font-medium text-white">
                <button
                  className={`w-48 rounded-md bg-[#E02424] py-1.5 ${
                    sessionStorage.getItem('is_kyc') == 1 || sessionStorage.getItem('is_kyc') == 2
                      ? 'cursor-not-allowed'
                      : ''
                  }`}
                  onClick={() => {
                    navigate('/orders');
                  }}
                  disabled={sessionStorage.getItem('is_kyc') == 1 || sessionStorage.getItem('is_kyc') == 2}>
                  Ship Now
                </button>
              </div>
              {showPopup && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25">
                  <div className="rounded-lg bg-white p-6">
                    <h2 className="mb-4 text-lg font-semibold">Request Amount</h2>
                    <input
                      type="number"
                      value={rechargeAmount}
                      onChange={(e) => setRechargeAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="mb-4 rounded-lg border border-gray-400 px-3 py-2"
                    />
                    <div className="flex justify-end">
                      <button
                        className="rounded-lg bg-blue-500 px-4 py-2 text-white"
                        onClick={handleRecharge}>
                        Request
                      </button>
                      <button
                        className="ml-2 rounded-lg bg-red-500 px-4 py-2 text-white"
                        onClick={() => setShowPopup(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-48">{/* Rest of the components */}</div>
      </div>
    </PageWithSidebar>
  );
};

export default Home;
