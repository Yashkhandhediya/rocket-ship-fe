import { stepperTickmark } from '../../../../common/icons';

const Stepper = ({ step }) => {
  const is_company = sessionStorage.getItem('is_company')
  let labels = {};

  if (is_company == 0) {
    
    labels = {
      1: 'Bussiness Type',
      2: 'Photo Identification',
      3: 'Document Verification',
    };
  } else {
    
    labels = {
      1: 'Bussiness Type',
      2: 'Document Verification',
    };
  }

  const renderStepperCount = (count) => {
    const isDisabled = count > step + 1;

    return step + 1 > count ? (
      <li className="mb-4 flex text-center text-sm font-normal text-[#00000061]">
        <img src={stepperTickmark} className="mr-2.5 h-[22px] w-[22px] rounded-full bg-green-700" />
        {labels[count]}
      </li>
    ) : (
      <li
        className={`mb-4 flex text-center text-sm  ${isDisabled ? 'text-[#00000061]' : 'text-gray-800'} ${
          step + 1 == count ? 'font-medium' : ''
        }`}>
        <div
          className={`mr-2.5 h-[22px] w-[22px] rounded-full border ${
            isDisabled ? 'border-[#d3d3d3s] opacity-60' : 'border-red-700'
          } bg-white`}>
          {count}
        </div>
        {labels[count]}
      </li>
    );
  };

  return (
    <div>
      <ol className="flex flex-col gap-2 md:block">
        {/* <li className="mb-4 flex text-center text-sm font-medium text-gray-800"> */}
        {renderStepperCount(1)}
        {/* Buyers Details
        </li> */}
        {/* <li className="mb-4 flex text-center text-sm font-medium text-gray-800"> */}
        {renderStepperCount(2)}
        {/* Pickup Details
        </li> */}
        {/* <li className="mb-4 flex text-center text-sm font-medium text-gray-800"> */}
        {is_company == 0 && renderStepperCount(3)}
        {/* Order Details
        </li> */}
        {/* <li className={"mb-4 flex text-center text-sm font-medium text-gray-800"}> */}
      </ol>
    </div>
  );
};

export default Stepper;
