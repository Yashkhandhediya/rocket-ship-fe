import { useEffect, useState } from "react";

const IFSC_modal = ({ setShowOptional, setDetails, details }) => {

  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    branchName: '',
    ifscCode: ''
  });

  const handleSave = () => {
    setDetails({ ...details, ifscCode: bankDetails.ifscCode })
    setShowOptional(false);
  };

  useEffect(() => {
    setBankDetails({ ...bankDetails, ifscCode: 'XXXX123456' });
  }, [bankDetails.branchName]);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-start mt-16 justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none shadow-lg">
        <div className="relative mx-0 my-6 w-full max-w-2xl">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-xl border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="border-blueGray-200 flex w-full items-center justify-between rounded-t border-b border-solid p-5">
              <h3 className="text-xl font-bold text-[#707070]">{'Add Product and Package Details'}</h3>
              <button
                className="border-0 bg-transparent p-1 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                onClick={() => setShowOptional(false)}>
                <span className="block h-6 w-6 bg-transparent text-black opacity-50 outline-none focus:outline-none">
                  ×
                </span>
              </button>
              {/* To do : Active this button and move it to the right corner */}
            </div>
            {/*body*/}
            <div className="flex flex-col p-6 text-[13px] text-[#707070] gap-4">
              <div className="flex flex-col">
                <label htmlFor="bank_name" className="font-semibold">Bank Name</label>
                <input type="text" id="bank_name" name="bank_name" value={bankDetails.bankName}
                  className={`border border-[#b3b3b3] rounded-sm text-[12px] font-normal p-2 w-full h-8 bg-white focus:ring-0 focus:border-green-400`}
                  onChange={(e) => {
                    setBankDetails({ ...bankDetails, bankName: e.target.value })
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="bank_branch" className="font-semibold">Branch Name</label>
                <input type="text" id="bank_branch" name="bank_branch" value={bankDetails.branchName}
                  className={`border border-[#b3b3b3] rounded-sm text-[12px] font-normal p-2 w-full h-8 focus:ring-0 focus:border-green-400 ${bankDetails.bankName.length > 0 ? 'bg-white' : 'bg-[#dddddd] cursor-not-allowed'}`}
                  onChange={(e) => {
                    setBankDetails({ ...bankDetails, branchName: e.target.value })
                  }}
                  disabled={bankDetails.bankName.length === 0}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="ifsc_code" className="font-semibold">IFSC Code</label>
                <input type="text" id="ifsc_code" name="ifsc_code"
                  value={bankDetails.branchName.length > 0 ? bankDetails.ifscCode : ''}
                  className={`border border-[#b3b3b3] rounded-sm text-[12px] font-normal p-2 w-full h-8 focus:ring-0 focus:border-green-400 bg-[#dddddd] cursor-not-allowed`}
                  readOnly
                />
              </div>
            </div>

            {/*footer*/}
            <div className="flex flex-col items-center justify-center rounded-b-md">
              <div className="flex items-center justify-center px-6">
                <button
                  className={`mb-4 rounded-lg ${bankDetails.ifscCode.length > 0 ? 'bg-[#B07828] hover:shadow-lg' : 'bg-[#fddeb2]'} px-4 py-2 text-sm text-white shadow outline-none transition-all duration-150 border ease-linear focus:outline-none font-semibold`}
                  type="button"
                  onClick={() => handleSave()}
                  disabled={bankDetails.ifscCode.length === 0}
                >
                  Add IFSC
                </button>
              </div>
            </div>
          </div>
        </div >
      </div >
      <div className="fixed inset-0 z-40 bg-black opacity-40 backdrop:blur-md"></div>
    </>
  );
}

export default IFSC_modal
