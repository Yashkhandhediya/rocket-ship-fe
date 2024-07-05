import { Link } from "react-router-dom";
import PageWithSidebar from "../../../common/components/page-with-sidebar/PageWithSidebar";
import { useEffect, useState } from "react";
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { BACKEND_URL } from "../../../common/utils/env.config";
import { toast } from "react-toastify";


const Save_Detail = ({info}) => {

  const [data,setData] = useState(info)
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: '',
    accountType: '',
    accountNo: '',
    ifscCode: ''
  });


//   const handleData = () => {
//     // You can use this data to send to the server
//     axios.get(BACKEND_URL + `/bankdetails/bank_details_get?user_id=${sessionStorage.getItem('user_id')}`)
//     .then((res) => {
//       console.log("Response Bank Detail",res)
//       setData(res.data)
//     }).catch((err) => {
//       console.log("Error In Bank Details",err)
//       toast("Error In Fetching Bank Details",{type:'error'})
//     })
//     console.log(bankDetails); //eslint-disable-line
//   }

  useEffect(() => {
    // handleData()
    if(data.length > 0){
        setBankDetails({
            ...bankDetails,
            accountHolderName: data[0].account_holder_name,
            accountType: data[0].account_type_id == 0 ? 'Savings' : 'Current',
            accountNo: data[0].account_number,
            ifscCode: data[0].ifsc_code
        })
    }
  },[])


  return (
    <div>
      <div className="header bg-[#FAFBFC] border-b border-[#b3b3b3] p-2 text-xl mx-2">Settings-Bank Details</div>
      <div className="bg-[#EDEDED] w-full px-6 pb-16 mx-2">
        <div className="pt-2 pb-5 text-[#656565] font-bold">
          <Link to={'/settings'} className="text-green-500 font-semibold">Settings</Link> &gt; COD Payments &gt; Bank Details
        </div>
        <div className="bg-white flex flex-col gap-3 p-4">
          <div className="text-[#656565] text-lg font-bold pt-6">Bank Account Details</div>
          <div className="text-[12px]">As a verification process, we will make a transaction of Rs. 1.0 to your bank account. Your account gets verified when the amount is credited successfully in your bank account.</div>
          <div className="text-[15px] font-bold">{`Note: Account holder's name should be the same as the name mentioned in the KYC document`}</div>
          <div className="text-xs font-semibold bg-[#bd7b30] text-white p-4">Congrats ! Your Bank details have been verified.</div>
          <div className="flex -mt-3 w-full flex-wrap border text-[#666666] text-[12px] font-bold px-3 py-5 gap-5 gap-x-7 min-h-72">
            <div className="flex flex-col lg:order-1 items-start justify-start lg:w-[48%] w-full gap-2">
              <label htmlFor="holder_name">
                {`Account holder's name`} <span className="text-red-500 font-bold text-[16px]">*</span>
              </label>
              <input
                type="text"
                id="holder_name"
                name="holder_name"
                className="border border-[#b3b3b3] rounded-sm text-[12px] font-normal p-2 w-full h-8 focus:ring-0 focus:border-green-400 bg-[#dddddd] cursor-not-allowed"
                value={bankDetails.accountHolderName}
              />
            </div>
            <div className="flex flex-col lg:order-2 items-start justify-start lg:w-[48%] w-full gap-2">
              <label htmlFor="account_type">
                {`Account Type.`} <span className="text-red-500 font-bold text-[16px]">*</span>
              </label>
              <input
                type="text"
                id="account_type"
                name="account_type"
                className="border border-[#b3b3b3] rounded-sm text-[12px] font-normal p-2 w-full h-8 focus:ring-0 focus:border-green-400 bg-[#dddddd] cursor-not-allowed"
                value={bankDetails.accountType}
                readOnly
              />
            </div>
            <div className="flex flex-col lg:order-3 items-start justify-start lg:w-[48%] w-full gap-2">
              <label htmlFor="account_no">
                {`Account No.`} <span className="text-red-500 font-bold text-[16px]">*</span>
              </label>
              <input
                type="number"
                id="account_no"
                name="account_no"
                className="border border-[#b3b3b3] rounded-sm text-[12px] font-normal p-2 w-full h-8 focus:ring-0 focus:border-green-400 bg-[#dddddd] cursor-not-allowed"
                value={bankDetails.accountNo}
                readOnly
              />
            </div>
            <div className="flex flex-col lg:order-4 items-start justify-start lg:w-[48%] w-full gap-2">
              <label htmlFor="ifsc_code" className="w-full flex justify-between">
                <div>{`IFSC Code`} <span className="text-red-500 font-bold text-[16px]">*</span></div>
              </label>
              <input
                type="text"
                id="ifsc_code"
                name="ifsc_code"
                className="border border-[#b3b3b3] rounded-sm text-[12px] font-normal p-2 w-full h-8 focus:ring-0 focus:border-green-400 bg-[#dddddd] cursor-not-allowed"
                value={bankDetails.ifscCode}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Save_Detail;
