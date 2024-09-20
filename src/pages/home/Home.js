import { useState } from "react";
import PageWithSidebar from "../../common/components/page-with-sidebar/PageWithSidebar"
import { useNavigate } from "react-router-dom"
import { RechargeModal } from "./components/rechareModal";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../common/utils/env.config";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const id_user = localStorage.getItem('user_id')
    const [showPopup, setShowPopup] = useState(false);
    const [rechargeAmount,setRechargeAmount] = useState('')
    const [showRechargeModal, setShowRechargeModal] = useState(false);

    const handleRecharge = () => {
      const headers={'Content-Type': 'application/json'};
      axios.post(BACKEND_URL + `/company/request_balance/?user_id=${parseInt(id_user)}&amount=${parseInt(rechargeAmount)}`).
      then((res) => {
          console.log("Recharge Responsee",res)
          // let newVal = localStorage.getItem('balance') - rechargeAmount
          // localStorage.setItem('balance',newVal)
          toast.success('Request Recharge successful!');
          setRechargeAmount('')
      }).catch((err) => {
          console.log("Error In Rechargeee")
      })
      setShowPopup(false);
      // window.location.reload()
    };

  return (
    <PageWithSidebar>
      <div className="flex flex-col w-full h-screen bg-[#f8f8f8] pl-6 mt-4 py-2 px-2">
      {localStorage.getItem('is_kyc') == 1 && <div className="w-[99%] p-2 mt-2 ml-2 mr-4 mb-4 bg-red-600 border shadow-md rounded-lg hover:underline" style={{ textAlign: 'center' }}>
          <marquee className='text-white font-semibold'><Link to={'/seller/kyc'} >Click here to complete your KYC and get non-disrupted shipping and COD remittances</Link></marquee>
      </div>}
      {localStorage.getItem('is_kyc') == 2 && <div className="w-[99%] font-semibold text-md p-2 mt-2 ml-2 mr-4 mb-4 bg-yellow-400 border shadow-md rounded-lg hover:underline" style={{ textAlign: 'center' }}>
          <marquee className='text-white'>KYC Verification Is Pending</marquee>
      </div>}
        <div className="flex flex-col bg-white h-auto rounded w-full py-6 px-5 shadow">
          <p className="text-[20px] text-black font-[500] mb-6">
            Get started in a few easy steps:
          </p>
          <div className="flex gap-8 flex-row">
            <div className="flex w-[32%] bg-red-100 justify-start items-center h-96 flex-col rounded-lg">
              <div className="flex flex-col items-center justify-center mt-12 h-2/3">
                <div className="border-2 border-[#0E85007d] w-[6.5rem] flex justify-center items-center rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0E8500" className="w-[6.5rem] h-[6.5rem]">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-[20px] mt-8 font-medium">
                  First Order Added
                </div>
              </div>
              <div className="flex justify-center text-[#E02424] text-[14px] font-normal items-center h-1/3">
                <button className={`py-1.5 w-48 border border-[#E02424] rounded-md bg-white ${(localStorage.getItem('is_kyc') == 1 || localStorage.getItem('is_kyc') == 2) ? 'cursor-not-allowed' : ''}`}
                  onClick={() => {
                    navigate('/orders')
                  }}
                  disabled={(localStorage.getItem('is_kyc') == 1 || localStorage.getItem('is_kyc') == 2)}
                >
                  View Order
                </button>
              </div>
            </div>
            {localStorage.getItem('is_company') == 1 && <div className="flex w-[32%] bg-red-100 justify-start items-center h-96 flex-col rounded-lg">
              <div className="flex flex-col items-center justify-center mt-12 h-2/3">
                <div className="bg-white w-11 p-0.5 flex justify-center items-center rounded-full">
                  <svg className="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#0E8500" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M12.3 3.3a1 1 0 0 1 1.4 0L16.4 6h-2.8l-1.3-1.3a1 1 0 0 1 0-1.4Zm.1 2.7L9.7 3.3a1 1 0 0 0-1.4 0L5.6 6h6.8ZM4.6 7A2 2 0 0 0 3 9v10c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.5-2h-13Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-[20px] items-center w-2/3 flex flex-col mt-8 font-medium">
                  Recharge Your Wallet
                  <p className="text-[12px] text-center mt-4 font-normal">
                    Start your shipping journey with a recharge as low as Rs. 500 to your wallet
                  </p>
                </div>
              </div>
              <div className="flex justify-center text-white text-[14px] font-medium items-center h-1/3">
                <button className={`py-1.5 w-48 bg-[#E02424] rounded-md ${(localStorage.getItem('is_kyc') == 1 || localStorage.getItem('is_kyc') == 2) ? 'cursor-not-allowed' : ''}`}
                  onClick={() => setShowRechargeModal(true)}
                  disabled={(localStorage.getItem('is_kyc') == 1 || localStorage.getItem('is_kyc') == 2)}
                >
                  Recharge
                </button>
                {showRechargeModal && <RechargeModal showRechargeModal={showRechargeModal} setShowRechargeModal={setShowRechargeModal} />}
              </div>
            </div>}
            {localStorage.getItem('is_company') == 0 &&  <div className="flex w-[32%] bg-red-100 justify-start items-center h-96 flex-col rounded-lg">
              <div className="flex flex-col items-center justify-center mt-12 h-2/3">
                <div className="bg-white w-11 p-0.5 flex justify-center items-center rounded-full">
                  <svg className="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#0E8500" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M12.3 3.3a1 1 0 0 1 1.4 0L16.4 6h-2.8l-1.3-1.3a1 1 0 0 1 0-1.4Zm.1 2.7L9.7 3.3a1 1 0 0 0-1.4 0L5.6 6h6.8ZM4.6 7A2 2 0 0 0 3 9v10c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.5-2h-13Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-[20px] items-center w-2/3 flex flex-col mt-8 font-medium">
                  Recharge Your Wallet
                  <p className="text-[12px] text-center mt-4 font-normal">
                    Start your shipping journey with a recharge as low as Rs. 500 to your wallet
                  </p>
                </div>
              </div>
              <div className="flex justify-center text-white text-[14px] font-medium items-center h-1/3">
                <button className={`py-1.5 w-48 bg-[#E02424] rounded-md ${(localStorage.getItem('is_kyc') == 1 || localStorage.getItem('is_kyc') == 2) ? 'cursor-not-allowed' : ''}`}
                  onClick={() => setShowPopup(true)}
                  disabled={(localStorage.getItem('is_kyc') == 1 || localStorage.getItem('is_kyc') == 2)}
                >
                  Request
                </button>
              </div>
            </div>}
            <div className="flex w-[32%] bg-red-100 justify-start items-center h-96 flex-col rounded-lg">
              <div className="flex flex-col items-center justify-center mt-12 h-2/3">
                <div className="bg-white w-11 p-0.5 flex justify-center items-center rounded-full">
                  <svg className="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#0E8500" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M12.3 3.3a1 1 0 0 1 1.4 0L16.4 6h-2.8l-1.3-1.3a1 1 0 0 1 0-1.4Zm.1 2.7L9.7 3.3a1 1 0 0 0-1.4 0L5.6 6h6.8ZM4.6 7A2 2 0 0 0 3 9v10c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.5-2h-13Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-[20px] items-center w-2/3 flex flex-col mt-8 font-medium">
                  Ship Your First Order
                  <p className="text-[12px] text-center mt-4 font-normal">
                    Select a courier of your choice and schedule a pickup when ready.
                  </p>
                </div>
              </div>
              <div className="flex justify-center text-white text-[14px] font-medium items-center h-1/3">
                <button className={`py-1.5 w-48 bg-[#E02424] rounded-md ${(localStorage.getItem('is_kyc') == 1 || localStorage.getItem('is_kyc') == 2) ? 'cursor-not-allowed' : ''}`}
                  onClick={() => {
                    navigate('/orders')
                  }}
                  disabled={(localStorage.getItem('is_kyc') == 1 || localStorage.getItem('is_kyc') == 2)}
                >
                  Ship Now
                </button>
              </div>
              {showPopup && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Request Amount</h2>
                <input
                  type="number"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="border border-gray-400 rounded-lg px-3 py-2 mb-4"
                />
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleRecharge}
                  >
                    Request
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 ml-2 rounded-lg"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
            </div>
          </div>
        </div>
        <div className="h-48">
          {/* Rest of the components */}
        </div>
      </div>
    </PageWithSidebar>
  )
}

export default Home
