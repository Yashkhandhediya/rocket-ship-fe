import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../../../../common/utils/env.config';
import apiClient from '../../../../common/utils/apiClient';

const Completed_KYC = () => {
  const [userImg, setUserImg] = useState(null);
  const id_user = localStorage.getItem('user_id');
  const handleImage = () => {
    apiClient
      .get(BACKEND_URL + `/kyc/?id=${id_user}&type=selfie`, { responseType: 'blob' })
      .then((res) => {
        console.log('Recharge Responsee', res);
        const imgUrl = URL.createObjectURL(res.data);
        setUserImg(imgUrl);
        console.log('PICCCCCCCCCCCCCc', userImg);
        // let newVal = localStorage.getItem('balance') - rechargeAmount
        // localStorage.setItem('balance',newVal)
        // window.location.reload()
      })
      .catch((err) => {
        console.log('Error In Rechargeee', err);
      });
  };

  useEffect(() => {
    handleImage();
  }, []);

  return (
    <div className="mt-4 flex flex-col justify-center gap-8 px-52">
      <div className="flex flex-row items-center gap-4 rounded-xl bg-[#D7FAD4] px-5 py-1">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 text-green-600">
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-0">
          <div className="text-[14px] font-bold leading-[1.3rem] text-green-600">Congratulations!</div>
          <div className="text-[12px] leading-[1.3rem] text-green-600">
            Your KYC details have been successfully verified , now enjoy uninterrupted shipping with Cloud
            Cargo
          </div>
        </div>
      </div>
      <div className="flex-rown flex items-center gap-4 rounded-md bg-white px-5 py-5 shadow-md">
        <div className="flex w-[15%] justify-center align-middle">
          {/* https://as1.ftcdn.net/v2/jpg/02/22/85/16/1000_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg */}
          <img src={userImg} alt="Seller picture" className="h-40 w-40 rounded-md object-cover" />
        </div>
        <div className="w-4/5">
          {/* top details */}
          <div className="mb-3 flex flex-row justify-between text-[12px] text-[#9A9A9A]">
            <div>
              <span>KYC Status : </span>
              <span className="font-bold text-green-600">Verified</span>
            </div>
            {/* <div>
                            <span>Verified on : </span>
                            <span className="text-black font-bold">Oct 24, 2023</span>
                        </div>
                        <div>
                            <span>Current Business Type : </span>
                            <span className="text-black font-bold">Individual</span>
                        </div> */}
          </div>
          <hr className="bg-[#9A9A9A]" />
          {/* bottom details */}
          <div className="mt-2 flex flex-col justify-start text-[12px] text-[#9A9A9A]">
            <div>
              <span>Verification method used : </span>
              <span className="font-bold text-black">KYC By Uploading Id And Address Proof</span>
            </div>
            {/* <div className="pl-5 mt-5 flex flex-row gap-20 mb-3">
                            <div>
                                <div>
                                    <span>Document 1 Type : </span>
                                    <span className="text-black font-bold">Adhaar Card</span>
                                </div>
                                <div>
                                    <span>Document 1 Number : </span>
                                    <span className="text-black font-bold">999999999999</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <span>Document 2 Type : </span>
                                    <span className="text-black font-bold">Adhaar Card</span>
                                </div>
                                <div>
                                    <span>Document 2 Number : </span>
                                    <span className="text-black font-bold">999999999999</span>
                                </div>
                            </div>
                        </div> */}
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col justify-start gap-4 bg-white shadow-md rounded-md py-5 px-5">
                <div className="text-[12px]">
                    Upgraded your bussiness type ?  Do KYC as a Sole Proprietorship or Company by clicking upgrade your KYC
                </div>
                <button className="px-8 py-1 text-[14px] w-48 text-white bg-red-600 transition-colors duration-200 rounded-md">Upgrade Your KYC</button>
            </div> */}
    </div>
  );
};

export default Completed_KYC;
