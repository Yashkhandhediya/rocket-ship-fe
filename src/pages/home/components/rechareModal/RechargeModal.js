import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../../../common/utils/env.config';
import { toast } from 'react-toastify';
import { logo_main } from '../../../../common/images';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../../../common/utils/config';

const RechargeModal = ({ setShowRechargeModal }) => {
  const [amount, setAmount] = useState(500);
  const [couponCode, setCouponCode] = useState(''); // eslint-disable-line
  const [couponCodeAmount, setCouponCodeAmount] = useState(0); // eslint-disable-line
  const balance = sessionStorage.getItem('balance') == 0 ? '0.00' : sessionStorage.getItem('balance');
  const navigate = useNavigate();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: ACCESS_TOKEN,
  };
  const formData = new FormData();
  formData.append('amount', amount * 100);

  const handlePayment = async (response) => {
    const formData = new FormData();
    formData.append('razorpay_payment_id', response.razorpay_payment_id);
    formData.append('razorpay_order_id', response.razorpay_order_id);
    formData.append('razorpay_signature', response.razorpay_signature);
    try {
      const data = await axios.post(`${BACKEND_URL}/payment/verify-payment`, formData, { headers: headers });
      if (data.data.status === 'Payment Verified') {
        toast('Payment Successful', { type: 'success' });
        setShowRechargeModal(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Session expired. Please login again.');

        sessionStorage.clear();
        navigate('/login');
      } else {
        console.log(error); // eslint-disable-line
        toast('Payment Failed', { type: 'error' });
      }
    }
  };

  const handlePaymentFailed = (response) => {
    toast('Payment Failed', { type: 'error' });
    setShowRechargeModal(false);
    console.log(response); // eslint-disable-line
  };

  const handleCreatePayment = async () => {
    // const id_user = sessionStorage.getItem('user_id')
    const id_company = sessionStorage.getItem('company_id');
    // console.log("USERRRRRRRRRRR",id_user)

    // formData.append("user_id",id_user)
    formData.append('company_id', id_company);
    try {
      const response = await axios.post(`${BACKEND_URL}/payment/razorpay`, formData, { headers: headers });
      const options = {
        key: process.env.RAZORPAY_API_KEY,
        amount: amount,
        currency: 'INR',
        name: 'Cargo Cloud',
        description: `Recharge Wallet Amount ${amount}`,
        image: logo_main,
        order_id: response.data.id,
        handler: handlePayment,
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.on('payment.failed', handlePaymentFailed);

      rzp1.open();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Session expired. Please login again.');

        sessionStorage.clear();
        navigate('/login');
      } else {
        console.log(error); // eslint-disable-line
        toast('Payment Failed', { type: 'error' });
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-0 my-6 w-full max-w-md">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="border-blueGray-200 flex w-full items-start justify-between rounded-t p-5 py-3 text-black">
              <div className="text-xl font-bold">
                <div>Recharge Your Wallet</div>
                <div className="text-[12px] font-normal ">
                  Current Wallet Amount <span className="font-semibold text-green-600">₹{balance}</span>
                </div>
              </div>
              <button
                className="border-0 bg-transparent p-1 pt-0 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                onClick={() => {
                  setShowRechargeModal(false);
                  window.location.reload();
                }}>
                <span className="block h-6 w-6 bg-transparent text-black opacity-50 outline-none focus:outline-none">
                  ×
                </span>
              </button>
              {/* To do : Active this button and move it to the right corner */}
            </div>
            {/*body*/}
            <div className="relative flex-auto px-5">
              <div className="flex flex-col rounded bg-red-100 p-2 px-4">
                {/* Input */}
                <div className="flex flex-col">
                  <label htmlFor="amount" className="text-[12px] text-[#505050]">
                    Enter Amount in Multiples of 100 Below
                  </label>
                  <div className="flex flex-row">
                    <button
                      className="rounded rounded-r-none border-2 border-r-0 border-gray-300 bg-white px-2 text-[18px] text-black"
                      disabled>
                      ₹
                    </button>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      placeholder="Enter Amount"
                      className="focus:outline-non w-full rounded-md rounded-l-none border-2 border-l-0 border-gray-300 p-2 text-[#454545] [appearance:textfield] focus:border-gray-300 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                    />
                  </div>
                  {(amount < 500 || amount % 100 !== 0) && (
                    <div className="block text-[10px] text-red-500">Please enter in the multiples of 100</div>
                  )}
                  <div className="text-[10px] text-[#555555]">Min value:₹500 & Max value: ₹50,00,000</div>
                </div>
                <div className="flex flex-col">
                  <div className="mt-4 text-[12px] text-[#505050]">Or Select From Below</div>
                  <div className="mt-2 flex flex-row justify-between px-3">
                    <button
                      className="rounded-xl border-2 border-gray-300 bg-[#FCFEFF] px-3 py-[1px] text-[12px] text-[#505050]"
                      onClick={() => setAmount(500)}>
                      ₹500
                    </button>
                    <button
                      className="rounded-xl border-2 border-gray-300 bg-[#FCFEFF] px-3 py-[1px] text-[12px] text-[#505050]"
                      onClick={() => setAmount(1000)}>
                      ₹1000
                    </button>
                    <button
                      className="rounded-xl border-2 border-gray-300 bg-[#FCFEFF] px-3 py-[1px] text-[12px] text-[#505050]"
                      onClick={() => setAmount(2500)}>
                      ₹2500
                    </button>
                    <button
                      className="rounded-xl border-2 border-gray-300 bg-[#FCFEFF] px-3 py-[1px] text-[12px] text-[#505050]"
                      onClick={() => setAmount(5000)}>
                      ₹5000
                    </button>
                    <button
                      className="rounded-xl border-2 border-gray-300 bg-[#FCFEFF] px-3 py-[1px] text-[12px] text-[#505050]"
                      onClick={() => setAmount(10000)}>
                      ₹10000
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex flex-col rounded bg-[#F6F6F6] p-2 px-4">
                <div className="flex flex-row justify-between text-[12px] font-normal text-[#707070]">
                  <span>Recharge Amount</span>
                  <span>₹{amount}</span>
                </div>
                <div className="flex flex-row justify-between border-0 border-b pb-2 text-[12px] font-normal text-[#707070]">
                  <span>Coupon Code Amount</span>
                  <span>₹{couponCodeAmount}</span>
                </div>
                <div className="flex flex-row justify-between pt-2 text-[12px] font-medium text-black">
                  <span>Total Amount</span>
                  <span>₹{parseInt(amount, 10) + parseInt(couponCodeAmount, 10)}</span>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex flex-col items-center justify-center rounded-b-md">
              <div className="mt-4 flex items-center justify-center px-6">
                <button
                  className="mb-1 mr-1 rounded-lg border bg-[#B07828] px-6 py-2 text-sm font-semibold text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={() => {
                    handleCreatePayment();
                  }}>
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
};

export default RechargeModal;
