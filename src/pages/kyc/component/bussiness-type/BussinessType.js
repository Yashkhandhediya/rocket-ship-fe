import { useState } from 'react';
import { toast } from 'react-toastify';

export let KYC_type = 'company';
const BussinessType = ({ currentStep, handleChangeStep }) => {
  const is_company = sessionStorage.getItem('is_company');
  const [bussinessData, setBussinessData] = useState({
    bussinessType: '',
    companyType: '',
  });

  const handleTypeChange = (e) => {
    const { name, value } = e.target;
    setBussinessData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCompanyTypeChange = (e) => {
    const { name, value } = e.target;
    setBussinessData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (is_company == 0) {
    KYC_type = 'user';
  }

  const changeNextStep = (type) => {
    if (type === 'NEXT') {
      if (
        bussinessData.bussinessType === 'individual' ||
        bussinessData.bussinessType === 'sole' ||
        bussinessData.bussinessType === 'company'
      ) {
        if (bussinessData.bussinessType === 'company' && !bussinessData.companyType) {
          toast('Please select company type', { type: 'error' });
        } else {
          handleChangeStep(currentStep + 1);
          if (bussinessData.bussinessType === 'company') {
            KYC_type = 'company';
          } else {
            KYC_type = 'user';
          }
        }
      } else {
        toast('Please enter all required fields', { type: 'error' });
      }
    } else if (currentStep > 0) {
      handleChangeStep(currentStep - 1);
    }
  };

  return (
    <div>
      <div className="mb-6 text-xl font-bold">Please Confirm Your Bussiness Type</div>
      <div className="mb-3 w-full">
        {KYC_type === 'user' && (
          <div
            className={`mb-6 flex w-[85%] rounded-lg px-8 py-8 shadow-sm ${
              bussinessData.bussinessType === 'individual'
                ? 'border-[1px] border-[#B4D2FE] bg-[#F4F8FF]'
                : 'bg-white'
            }`}>
            <label
              htmlFor="individualRadio"
              className="mb-2 cursor-pointer items-center text-sm font-bold text-gray-900">
              <input
                type="radio"
                id="individualRadio"
                className="mr-8"
                value="individual"
                name="bussinessType"
                // checked={paymentDetails?.type === 'individual'}
                onChange={handleTypeChange}
              />
              Individual
              <div className="ml-12 text-xs font-[400]">
                A seller who is selling through online selling platforms, and has not registered his/her firm
                under Companies Act 2013
              </div>
            </label>
          </div>
        )}
        {/* <div className={`w-[85%] flex shadow-sm rounded-lg py-8 px-8 mb-6 ${bussinessData.bussinessType === 'sole' ? 'bg-[#F4F8FF] border-[1px] border-[#B4D2FE]' : 'bg-white'}`}>
                    <label
                        htmlFor="soleRadio"
                        className="mb-2 items-center text-sm font-bold text-gray-900 cursor-pointer">
                        <input
                            type="radio"
                            id="soleRadio"
                            className="mr-8"
                            value="sole"
                            name="bussinessType"
                            //   checked={paymentDetails?.type === 'sole'}
                            onChange={handleTypeChange}
                        />
                        Sole Proprietor
                        <div className="text-xs font-[400] ml-12">
                            {"Registered company as 'Sole Proprietor' under Companies Act 2013"}
                        </div>
                        {/* <CustomTooltip text="COD will be remitted to your account as per your selected payment cycle.">
                    <img src={infoIcon} className="ms-2" />
                  </CustomTooltip> 
                    </label>
                </div> */}
        {KYC_type === 'company' && (
          <div
            className={`mb-6 flex w-[85%] rounded-lg px-8 py-8 shadow-sm ${
              bussinessData.bussinessType === 'company'
                ? 'border-[1px] border-[#B4D2FE] bg-[#F4F8FF]'
                : 'bg-white'
            }`}>
            <label
              htmlFor="companyRadio"
              className="mb-2 cursor-pointer items-center text-sm font-bold text-gray-900">
              <input
                type="radio"
                id="companyRadio"
                className="mr-8"
                value="company"
                name="bussinessType"
                //   checked={paymentDetails?.type === 'company'}
                onChange={handleTypeChange}
              />
              Company
              <div className="ml-12 text-xs font-[400]">
                {"Registered company as 'LLP','Private','Subsidiary','Holding',etc, under Companies Act 2013"}
              </div>
              {/* <CustomTooltip text="COD will be remitted to your account as per your selected payment cycle.">
                    <img src={infoIcon} className="ms-2" />
                  </CustomTooltip> */}
            </label>
          </div>
        )}
        {bussinessData.bussinessType === 'company' && (
          <select
            name="companyType"
            id="company-type"
            className="rounded-lg"
            onChange={handleCompanyTypeChange}
            value={bussinessData.companyType}>
            <option value="" hidden>
              Select Company Type
            </option>
            <option value="partnership">Partnership</option>
            <option value="llp">Limited Liability Private</option>
            <option value="privatelc">Private Limited Company</option>
            <option value="publiclc">Public Limited Company</option>
          </select>
        )}
      </div>
      <div className="flex justify-start gap-4">
        <button
          type="button"
          className="dark:focus:ring-sky-900 rounded-lg bg-sky-500 px-12 py-2 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300"
          onClick={() => changeNextStep('NEXT')}>
          {'Next'}
        </button>
      </div>
    </div>
  );
};

export default BussinessType;
