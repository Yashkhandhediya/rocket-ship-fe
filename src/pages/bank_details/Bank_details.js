import { Link } from 'react-router-dom';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { useEffect, useState } from 'react';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IFSC_modal } from './components';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import Save_Detail from './components/Save_Detail';
import apiClient from '../../common/utils/apiClient';

const Bank_details = () => {
  const [showOptional, setShowOptional] = useState(false);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState([]);
  // This is a dummy data, you can replace it with your own data
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: '',
    accountType: '',
    accountNo: '',
    reEnterAccountNo: '',
    ifscCode: '',
  });

  const handleData = () => {
    apiClient
      .get(BACKEND_URL + `/bankdetails/bank_details_get?user_id=${localStorage.getItem('user_id')}`)
      .then((res) => {
        console.log('Response Bank Detail', res);
        if (res.data.length > 0) {
          setShow(true);
        }
        setInfo(res.data);
      })
      .catch((err) => {
        console.log('Error In Bank Details', err);
        toast('Error In Fetching Bank Details', { type: 'error' });
      });
  };

  useEffect(() => {
    handleData();
  }, []);

  // This function is used to handle the form submit
  const handleSumbit = () => {
    // You can use this data to send to the server
    apiClient
      .post(BACKEND_URL + `/bankdetails/bank_details_post`, {
        user_id: localStorage.getItem('user_id'),
        account_holder_name: bankDetails.accountHolderName,
        account_number: bankDetails.accountNo,
        account_type_id: parseInt(bankDetails.accountType == 'savings' ? 0 : 1),
        ifsc_code: bankDetails.ifscCode,
        re_enter_account_number: bankDetails.reEnterAccountNo,
      })
      .then((res) => {
        console.log('Response Bank Detail', res);
        toast('Back Details Saved Successfully.', { type: 'success' });
        setShow(true);
      })
      .catch((err) => {
        console.log('Error In Bank Details', err);
        toast('Error In Saving Bank Details', { type: 'error' });
      });
    console.log(bankDetails); //eslint-disable-line
  };

  return (
    <PageWithSidebar>
      {!show && showOptional && (
        <IFSC_modal setShowOptional={setShowOptional} setDetails={setBankDetails} details={bankDetails} />
      )}
      {!show && (
        <div className="header mx-2 border-b border-[#b3b3b3] bg-[#FAFBFC] p-2 text-xl">
          Settings-Bank Details
        </div>
      )}
      {!show && (
        <div className="mx-2 w-full bg-[#EDEDED] px-6 pb-16">
          <div className="pb-5 pt-2 font-bold text-[#656565]">
            <Link to={'/settings'} className="font-semibold text-green-500">
              Settings
            </Link>{' '}
            &gt; COD Payments &gt; Bank Details
          </div>
          <div className="flex flex-col gap-3 bg-white p-4">
            <div className="pt-6 text-lg font-bold text-[#656565]">Bank Account Details</div>
            <div className="text-[12px]">
              As a verification process, we will make a transaction of Rs. 1.0 to your bank account. Your
              account gets verified when the amount is credited successfully in your bank account.
            </div>
            <div className="text-[15px] font-bold">{`Note: Account holder's name should be the same as the name mentioned in the KYC document`}</div>
            <div className="flex min-h-72 w-full flex-wrap gap-5 gap-x-7 border px-3 py-5 text-[12px] font-bold text-[#666666]">
              <div className="flex w-full flex-col items-start justify-start gap-2 lg:order-1 lg:w-[48%]">
                <label htmlFor="holder_name">
                  {`Account holder's name`} <span className="text-[16px] font-bold text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="holder_name"
                  name="holder_name"
                  className="h-7 w-full rounded-sm border border-[#b3b3b3] bg-white p-2 text-[12px] font-normal focus:border-green-400 focus:ring-0"
                  value={bankDetails.accountHolderName}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountHolderName: e.target.value })}
                />
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2 lg:order-2 lg:w-[48%]">
                <label htmlFor="account_type">
                  {`Account Type`} <span className="text-[16px] font-bold text-red-500">*</span>
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
                  className="h-7 w-full rounded-sm border border-[#b3b3b3] bg-white py-0 text-[12px] font-normal focus:border-green-400 focus:ring-0"
                  onChange={(e) => {
                    setBankDetails({ ...bankDetails, accountType: e.target.value });
                  }}>
                  <option value="">Select Account Type</option>
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                </select>
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2 lg:order-3 lg:w-[48%]">
                <label htmlFor="account_no">
                  {`Account No.`} <span className="text-[16px] font-bold text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="account_no"
                  name="account_no"
                  className="h-7 w-full rounded-sm border border-[#b3b3b3] bg-white p-2 text-[12px] font-normal [appearance:textfield] focus:border-green-400 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  value={bankDetails.accountNo}
                  onChange={(e) => {
                    setBankDetails({ ...bankDetails, accountNo: e.target.value });
                  }}
                />
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2 lg:order-5 lg:w-[48%]">
                <label htmlFor="re-enter_account_no">
                  {`Re-Enter Account No.`} <span className="text-[16px] font-bold text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="re-enter_account_no"
                  name="re-enter_account_no"
                  className="h-7 w-full rounded-sm border border-[#b3b3b3] bg-white p-2 text-[12px] font-normal [appearance:textfield] focus:border-green-400 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  value={bankDetails.reEnterAccountNo}
                  onChange={(e) => {
                    setBankDetails({ ...bankDetails, reEnterAccountNo: e.target.value });
                  }}
                />
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2 lg:order-4 lg:w-[48%]">
                <label htmlFor="ifsc_code" className="flex w-full justify-between">
                  <div>
                    {`IFSC Code`} <span className="text-[16px] font-bold text-red-500">*</span>
                  </div>
                  <div
                    onClick={() => {
                      setShowOptional(true);
                    }}>{`(IFSC Lookup)`}</div>
                </label>
                <input
                  type="text"
                  id="ifsc_code"
                  name="ifsc_code"
                  className="h-7 w-full rounded-sm border border-[#b3b3b3] bg-white p-2 text-[12px] font-normal focus:border-green-400 focus:ring-0"
                  value={bankDetails.ifscCode}
                  onChange={(e) => {
                    setBankDetails({ ...bankDetails, ifscCode: e.target.value });
                  }}
                />
              </div>
            </div>
            <div>
              <button
                className="flex h-8 items-center gap-4 rounded bg-[#B07828] text-white"
                onClick={() => {
                  handleSumbit();
                }}>
                <div className="flex h-8 items-center justify-center rounded-l bg-[#895d20] px-3">
                  <FontAwesomeIcon icon={faSave} />
                </div>
                <div className="pr-3">Save Bank Details</div>
              </button>
            </div>
          </div>
        </div>
      )}
      {show && <Save_Detail info={info} />}
    </PageWithSidebar>
  );
};

export default Bank_details;
