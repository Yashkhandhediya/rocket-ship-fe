import { useState } from 'react';
import { downArrow } from '../../../common/icons';

const DetailsCard = ({ children, headingIcon, heading, headingClassNames, toggle }) => {
  const [toggleBody, setToggleBody] = useState(toggle ? false : true);
  return (
    <div className="my-4 rounded-lg bg-white p-4 pt-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.161)]">
      <div
        className={`flex items-center  text-sm font-bold text-black 
        ${!toggle || toggleBody ? 'mb-3 border-b-2 border-b-[#f4f4f4] pb-2.5' : ''} ${
          headingClassNames ?? ''
        }`}>
        {headingIcon && <img src={headingIcon} className="mr-3.5 h-[46px] w-[46px]" />}
        <div>{heading}</div>
        {toggle && (
          <span
            className={`ml-auto grid h-[30px] w-[30px] cursor-pointer place-items-center rounded-full border border-[#7f7f7f] duration-1000 ${
              toggleBody ? 'rotate-180' : ''
            }`}
            onClick={() => setToggleBody(!toggleBody)}>
            <img src={downArrow} className="h-[1.5rem] w-[1.5rem]" />
          </span>
        )}
      </div>
        <div className={`w-full ${toggleBody ? 'h-auto' : 'h-0 overflow-hidden'}`}>
          {children}
        </div>
    </div>
  );
};

export default DetailsCard;
