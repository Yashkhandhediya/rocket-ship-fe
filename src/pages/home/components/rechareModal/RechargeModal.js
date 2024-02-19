import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../../../../common/utils/env.config";
import { toast } from "react-toastify";
import { logo_main } from "../../../../common/images";

const RechargeModal = ({ setShowRechargeModal }) => {
  const [amount, setAmount] = useState(500);
  const [couponCode, setCouponCode] = useState(''); // eslint-disable-line
  const [couponCodeAmount, setCouponCodeAmount] = useState(0); // eslint-disable-line

  const formData = new FormData();
  formData.append('amount', amount * 100);

  const handlePayment = async (response) => {
    const formData = new FormData();
    formData.append("razorpay_payment_id", response.razorpay_payment_id);
    formData.append("razorpay_order_id", response.razorpay_order_id);
    formData.append("razorpay_signature", response.razorpay_signature);
    try {
      const data = await axios.post(`${BACKEND_URL}/payment/verify-payment`, formData);
      if (data.message === "Payment Successful") {
        toast("Payment Successful", { type: "success" });
        setShowRechargeModal(false);
      }
    } catch (error) {
      console.log(error); // eslint-disable-line
      toast("Payment Failed", { type: "error" });
    }
  };

  const handlePaymentFailed = (response) => {
    toast("Payment Failed", { type: "error" });
    setShowRechargeModal(false);
    console.log(response); // eslint-disable-line
  };

  const handleCreatePayment = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/payment/razorpay`, formData);
      const options = {
        key: "rzp_live_Rdekve3rpZ5hXx",
        amount: amount,
        currency: "INR",
        name: "Cargo Cloud",
        description: `Recharge Wallet Amount ${amount}`,
        image: logo_main,
        order_id: response.data.id,
        handler: handlePayment,
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", handlePaymentFailed);

      rzp1.open();
    } catch (error) {
      console.log(error); // eslint-disable-line
      toast("Payment Failed", { type: "error" });
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-0 my-6 w-full max-w-md">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="border-blueGray-200 flex w-full items-start text-black justify-between rounded-t p-5 py-3">
              <div className="text-xl font-bold">
                <div>Recharge Your Wallet</div>
                <div className="text-[12px] font-normal ">Current Wallet Amount <span className="text-green-600 font-semibold">₹0.00</span></div>
              </div>
              <button
                className="border-0 bg-transparent p-1 pt-0 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                onClick={() => setShowRechargeModal(false)}>
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
                  <label htmlFor="amount" className="text-[#505050] text-[12px]">Enter Amount in Multiples of 100 Below</label>
                  <div className="flex flex-row">
                    <button className="bg-white text-black border-2 border-gray-300 border-r-0 px-2 text-[18px] rounded rounded-r-none" disabled>₹</button>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      placeholder="Enter Amount"
                      className="border-2 border-l-0 rounded-l-none text-[#454545] focus:outline-non focus:ring-0 focus:border-gray-300 border-gray-300 rounded-md p-2 w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                    />
                  </div>
                  {(amount < 500 || amount % 100 !== 0) && <div className="block text-red-500 text-[10px]">Please enter in the multiples of 100</div>}
                  <div className="text-[#555555] text-[10px]">Min value:₹500 & Max value: ₹50,00,000</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#505050] text-[12px] mt-4">
                    Or Select From Below
                  </div>
                  <div className="flex flex-row px-3 justify-between mt-2">
                    <button
                      className="bg-[#FCFEFF] text-[#505050] border-2 border-gray-300 px-3 py-[1px] text-[12px] rounded-xl"
                      onClick={() => setAmount(500)}
                    >₹500</button>
                    <button
                      className="bg-[#FCFEFF] text-[#505050] border-2 border-gray-300 px-3 py-[1px] text-[12px] rounded-xl"
                      onClick={() => setAmount(1000)}
                    >₹1000</button>
                    <button
                      className="bg-[#FCFEFF] text-[#505050] border-2 border-gray-300 px-3 py-[1px] text-[12px] rounded-xl"
                      onClick={() => setAmount(2500)}
                    >₹2500</button>
                    <button
                      className="bg-[#FCFEFF] text-[#505050] border-2 border-gray-300 px-3 py-[1px] text-[12px] rounded-xl"
                      onClick={() => setAmount(5000)}
                    >₹5000</button>
                    <button
                      className="bg-[#FCFEFF] text-[#505050] border-2 border-gray-300 px-3 py-[1px] text-[12px] rounded-xl"
                      onClick={() => setAmount(10000)}
                    >₹10000</button>
                  </div>
                </div>
              </div>
              <div className="flex bg-[#F6F6F6] flex-col rounded mt-3 p-2 px-4">
                <div className="flex flex-row justify-between text-[12px] font-normal text-[#707070]">
                  <span>Recharge Amount</span>
                  <span>₹{amount}</span>
                </div>
                <div className="flex flex-row justify-between text-[12px] border-0 pb-2 border-b font-normal text-[#707070]">
                  <span>Coupon Code Amount</span>
                  <span>₹{couponCodeAmount}</span>
                </div>
                <div className="flex flex-row justify-between text-[12px] pt-2 font-medium text-black">
                  <span>Total Amount</span>
                  <span>₹{parseInt(amount, 10) + parseInt(couponCodeAmount, 10)}</span>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex flex-col items-center justify-center rounded-b-md">
              <div className="flex items-center justify-center px-6 mt-4">
                <button
                  className="mb-1 mr-1 rounded-lg bg-[#B07828] px-6 py-2 text-sm text-white shadow outline-none transition-all duration-150 border ease-linear hover:shadow-lg focus:outline-none font-semibold"
                  type="button"
                  onClick={() => {
                    handleCreatePayment();
                  }}
                >
                  Continue to Payment
                </button>
              </div>
            </div>

          </div>
        </div >
      </div >
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}

export default RechargeModal
