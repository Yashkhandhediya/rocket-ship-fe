import { noOrdersFound } from '../../../../common/images';

const NoOrdersFound = () => {
  return (
    <div className="grid h-auto w-full place-items-center bg-white p-10">
      <img src={noOrdersFound} alt="no orders found" className='w-[210px]'/>
      <div className='text-[#848484] text-base mt-5'>{"No Orders Found"}</div>
    </div>
  );
};

export default NoOrdersFound;
