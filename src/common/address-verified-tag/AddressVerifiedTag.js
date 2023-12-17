import { varifiedTickmark } from '../icons';

const AddressVerifiedTag = () => {
  return (
    <>
      <span className="absolute right-0 top-4 z-10 flex text-[8px] font-bold text-white ">
        <img src={varifiedTickmark} className="pr-0.5" />
        {'Verified'}
      </span>
      <div className="absolute  right-[-0.6rem] top-4 w-16 border-l-[15px] border-t-[15px] border-green-600 border-l-transparent after:absolute after:right-0 after:top-0 after:border-l-0 after:border-r-[9px] after:border-t-[5px] after:border-l-transparent after:border-r-transparent after:border-t-green-600"></div>
    </>
  );
};

export default AddressVerifiedTag;
