import { noOrdersFound } from '../../../../common/images';

const NoOrdersFound = () => {
  return (
    <div className="grid min-h-72 h-[calc(100vh-33rem)] w-full place-items-center bg-white p-4">
      <img src={noOrdersFound} alt="no orders found" className='w-[210px]'/>
      <div className='text-[#848484] text-base mt-5'>{"No Orders Found"}</div>
    </div>
  );
};

export default NoOrdersFound;
