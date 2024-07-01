import { Link, useNavigate  } from "react-router-dom";
import PageWithSidebar from "../../common/components/page-with-sidebar/PageWithSidebar"
import { useEffect, useState } from "react";
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IFSC_modal } from "./components";
import axios from "axios";
import { BACKEND_URL } from "../../common/utils/env.config";
import { toast } from "react-toastify";
import Save_Detail from "./components/Save_Detail";
import { ACCESS_TOKEN } from "../../common/utils/config";


const Bank_details = () => {
  const navigate = useNavigate();
  const [showOptional, setShowOptional] = useState(false);
  const [show,setShow] = useState(false)
  const [info,setInfo] = useState([])
  const headers = {             
    'Content-Type': 'application/json',
    'Authorization': ACCESS_TOKEN};
  // This is a dummy data, you can replace it with your own data
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: '',
    accountType: '',
    accountNo: '',
    reEnterAccountNo: '',
    ifscCode: ''
  });


  const handleData = () => {
    axios.get(BACKEND_URL + `/bankdetails/bank_details_get`,
    {headers:headers}
  )
    .then((res) => {
      console.log("Response Bank Detail",res)
      if(res.data.length > 0){
        setShow(true)
      }
      setInfo(res.data)
    }).catch((err) =>  {
      if (err.response && err.response.status === 401) {
        localStorage.clear()
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } else {
        console.log("Error In Bank Details", err);
        toast("Error In Fetching Bank Details", { type: 'error' });
      }
    });
  };

  useEffect(() => {
    handleData()
  },[])

  // This function is used to handle the form submit
  const handleSumbit = () => {
    // You can use this data to send to the server
    axios.post(BACKEND_URL + `/bankdetails/bank_details_post`,{
      
      account_holder_name: bankDetails.accountHolderName,
      account_number: bankDetails.accountNo,
      account_type_id: parseInt(bankDetails.accountType == 'savings' ? 0 : 1),
      ifsc_code: bankDetails.ifscCode,
      re_enter_account_number: bankDetails.reEnterAccountNo
    }, {headers:headers})
    .then((res) => {
      console.log("Response Bank Detail",res)
      toast("Back Details Saved Successfully.",{type:'success'})
      setShow(true)
    }).catch((err) => {
      console.log("Error In Bank Details",err)
      toast("Error In Saving Bank Details",{type:'error'})
      if (err.response && err.response.status === 401) {
        localStorage.clear()
        toast.error('Session expired. Please login again.');
        navigate('/login'); // Navigate to '/login' on 401 Unauthorized
      }
    });
    
  console.log(bankDetails); // Logging bankDetails without change
}


  return (
    <PageWithSidebar>
      {!show && showOptional && <IFSC_modal setShowOptional={setShowOptional} setDetails={setBankDetails} details={bankDetails}/>}
      {!show && <div className="header bg-[#FAFBFC] border-b border-[#b3b3b3] p-2 text-xl mx-2">Settings-Bank Details</div>}
      {!show && <div className="bg-[#EDEDED] w-full px-6 pb-16 mx-2">
        <div className="pt-2 pb-5 text-[#656565] font-bold">
          <Link to={'/settings'} className="text-green-500 font-semibold">Settings</Link> &gt; COD Payments &gt; Bank Details
        </div>
        <div className="bg-white flex flex-col gap-3 p-4">
          <div className="text-[#656565] text-lg font-bold pt-6">Bank Account Details</div>
          <div className="text-[12px]">As a verification process, we will make a transaction of Rs. 1.0 to your bank account. Your account gets verified when the amount is credited successfully in your bank account.</div>
          <div className="text-[15px] font-bold">{`Note: Account holder's name should be the same as the name mentioned in the KYC document`}</div>
          <div className="flex w-full flex-wrap border text-[#666666] text-[12px] font-bold px-3 py-5 gap-5 gap-x-7 min-h-72">
            <div className="flex flex-col lg:order-1 items-start justify-start lg:w-[48%] w-full gap-2">
              <label htmlFor="holder_name">
                {`Account holder's name`} <span className="text-red-500 font-bold text-[16px]">*</span>
              </label>
              <input
                type="text"
                id="holder_name"
                name="holder_name"
                className="border border-[#b3b3b3] rounded-sm text-[12px] font-normal p-2 w-full h-7 bg-white focus:ring-0 focus:border-green-400"
                value={bankDetails.accountHolderName}
                onChange={(e) => setBankDetails({ ...bankDetails, accountHolderName: e.target.value })}
              />
            </div>
            <div className="flex flex-col lg:order-2 items-start justify-start lg:w-[48%] w-full gap-2">
              <label htmlFor="account_type">
                {`Account Type`} <span className="text-red-500 font-bold text-[16px]">*</span>
              </label>
              {/* <input
                type="text"
                id="account_type"
                name="account_type"
                className="border border-[#b3b3b3] rounded-sm text-[12px] font-normal p-2 w-full h-7 bg-white focus:ring-0 focus:border-green-400"
                value={bankDetails.accountType}
                onChange={(e) => {
                  setBankDetails({ ...bankDetails, accountType: e.target.value })
                }} /> */}
              <select
                id="account_type"
                name="account_type"
                className="border border-[#b3b3b3] rounded-sm text-[12px] font-normal py-0 w-full h-7 bg-white focus:ring-0 focus:border-green-400"
                onChange={(e) => {
                  setBankDetails({ ...bankDetails, accountType: e.target.value })
                }}>
                <option value="">Select Account Type</option>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
              </select>
            </div>
            <div className="flex flex-col lg:order-3 items-start justify-start lg:w-[48%] w-full gap-2">
              <label htmlFor="account_no">
                {`Account No.`} <span className="text-red-500 font-bold text-[16px]">*</span>
              </label>
              <input
                type="number"
                id="account_no"
                name="account_no"
                className="border border-[#b3b3b3] rounded-sm text-[12px] font-normal p-2 w-full h-7 bg-white focus:ring-0 focus:border-green-400 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                value={bankDetails.accountNo}
                onChange={(e) => {
                  setBankDetails({ ...bankDetails, accountNo: e.target.value })
                }}
              />
            </div>
            <div className="flex flex-col lg:order-5 items-start justify-start lg:w-[48%] w-full gap-2">
              <label htmlFor="re-enter_account_no">
                {`Re-Enter Account No.`} <span className="text-red-500 font-bold text-[16px]">*</span>
              </label>
              <input
                type="number"
                id="re-enter_account_no"
                name="re-enter_account_no"
                className="border border-[#b3b3b3] rounded-sm text-[12px] font-normal p-2 w-full h-7 bg-white focus:ring-0 focus:border-green-400 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                value={bankDetails.reEnterAccountNo}
                onChange={(e) => {
                  setBankDetails({ ...bankDetails, reEnterAccountNo: e.target.value })
                }}
              />
            </div>
            <div className="flex flex-col lg:order-4 items-start justify-start lg:w-[48%] w-full gap-2">
              <label htmlFor="ifsc_code" className="w-full flex justify-between">
                <div>{`IFSC Code`} <span className="text-red-500 font-bold text-[16px]">*</span></div>
                <div onClick={() => { setShowOptional(true) }}>{`(IFSC Lookup)`}</div>
              </label>
              <input
                type="text"
                id="ifsc_code"
                name="ifsc_code"
                className="border border-[#b3b3b3] rounded-sm text-[12px] font-normal p-2 w-full h-7 bg-white focus:ring-0 focus:border-green-400"
                value={bankDetails.ifscCode}
                onChange={(e) => {
                  setBankDetails({ ...bankDetails, ifscCode: e.target.value })
                }}
              />
            </div>
          </div>
          <div>
            <button className="rounded flex gap-4 h-8 items-center text-white bg-[#B07828]"
              onClick={() => {
                handleSumbit();
              }}>
              <div className="bg-[#895d20] rounded-l px-3 h-8 flex items-center justify-center" >
                <FontAwesomeIcon icon={faSave} />
              </div>
              <div className="pr-3">Save Bank Details</div>
            </button>
          </div>
        </div>
      </div>}
      {show && <Save_Detail info={info} />}
    </PageWithSidebar>
  )
}

export default Bank_details
