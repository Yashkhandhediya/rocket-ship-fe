
const DetailsCard = ({ children, headingIcon, heading }) => {
  return (
    <div className="my-4 rounded-lg bg-white p-4 pt-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.161)]">
      <div className="mb-3 flex border-b-2 border-b-[#f4f4f4] pb-2.5 text-sm font-bold text-black items-center">
        {headingIcon && <img src={headingIcon} className='mr-3.5 w-[46px] h-[46px]'/>}
        <div>{heading}</div>
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default DetailsCard;
