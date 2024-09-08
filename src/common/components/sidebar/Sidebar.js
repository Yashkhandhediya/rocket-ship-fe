import { Link } from 'react-router-dom';
import { sidebarLinks } from './contants';
import { useState } from 'react';
import { logo, logo_main } from '../../images';

const Sidebar = () => {
  const [openAccordion, setOpenAccordion] = useState(0);
  const handleAccordionToggle = (index) => {
    setOpenAccordion((prev) => (prev === index ? 0 : index));
  };
  const handleMouseLeave = () => {
    setOpenAccordion(0);
  };

  return (
    <div
      id="mySidebar"
      className="group/sidebar hover:z-100 fixed left-0 top-0 z-50 h-full w-[70px] overflow-x-hidden overflow-y-hidden bg-[#912517] text-white transition-all duration-500 hover:w-[218px] hover:overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar]:w-1"
      onMouseLeave={handleMouseLeave}>
      <div className="z-100 sticky top-0 h-[62px] w-full translate-y-0 bg-[#912517] pb-4 pl-5 pr-3.5 pt-2.5">
        <img src={logo_main} className="h-[34px] object-contain group-hover/sidebar:hidden" />
        <img src={logo} className="hidden h-[34px] min-w-[155px] object-contain group-hover/sidebar:block " />
      </div>
      <hr className="mb-4 border-[#c] text-[#0000001a] md:hidden" />
      <div>
        {sidebarLinks.map((nav, i) => {
          return nav.path ? (
            <Link to={nav?.path} key={i} className="translate-y-0">
              <div className="group/sidebarItem mx-3.5 mb-3 flex items-center rounded-[4px] p-2 text-white hover:bg-white hover:text-[#c38d8d]">
                <img src={nav.icon} className="h-6 w-6 group-hover/sidebarItem:hidden" />
                <img src={nav.hoverIcon} className="hidden h-6 w-6 group-hover/sidebarItem:block" />
                <span className="ml-3 truncate text-xs group-hover/sidebarItem:text-[#912517] ">
                  {nav.title}
                </span>
              </div>
            </Link>
          ) : nav.subMenuOptions ? (
            <>
              <div
                key={i}
                className="group/sidebarItem mx-3.5 mb-3 flex cursor-pointer items-center rounded-[4px] p-2 text-white hover:bg-white hover:text-[#980909]"
                onClick={() => handleAccordionToggle(i)}
                aria-expanded={openAccordion === i}>
                <img src={nav.icon} className="h-6 w-6 group-hover/sidebarItem:hidden" />
                <img src={nav.hoverIcon} className="hidden h-6 w-6 group-hover/sidebarItem:block" />
                <div className="ml-3 flex w-full justify-between truncate text-xs group-hover/sidebarItem:text-[#980909] ">
                  <span>{nav.title}</span>
                  <span className="flex w-full justify-end">
                    <svg
                      data-accordion-icon
                      className={`h-5 w-5 shrink-0 truncate group-hover/sidebarItem:text-[#980909] ${
                        openAccordion === i ? 'rotate-180' : 'rotate-0'
                      } shrink-0 origin-center transform transition-transform duration-300 ease-in-out`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </div>
              </div>
              <div
                id={'accordion-collapse-body-1'}
                className={`${openAccordion === i ? 'block' : 'hidden'}`}
                aria-labelledby={'accordion-collapse-heading-1'}>
                <div className="ml-6 font-normal">
                  {nav.subMenuOptions &&
                    nav.subMenuOptions.map((subNav, i) => {
                      console.log(subNav);
                      return (
                        subNav != null && (
                          <Link to={subNav.path} key={i} className="translate-y-0">
                            <div className="group/sidebarItem mx-3.5 mb-3 flex items-center rounded-[4px] p-2 text-white hover:bg-white hover:text-[#980909]">
                              <span className="ml-3 truncate text-xs group-hover/sidebarItem:text-[#980909] ">
                                {subNav.title}
                              </span>
                            </div>
                          </Link>
                        )
                      );
                    })}
                </div>
              </div>
            </>
          ) : (
            <div key={i} className="translate-y-0" onClick={nav?.onClick}>
              <div className="group/sidebarItem mx-3.5 mb-3 flex items-center rounded-[4px] p-2 text-white hover:bg-white hover:text-[#980909]">
                <img src={nav.icon} className="h-6 w-6 group-hover/sidebarItem:hidden" />
                <img src={nav.hoverIcon} className="hidden h-6 w-6 group-hover/sidebarItem:block" />
                <span className="ml-3 truncate text-xs group-hover/sidebarItem:text-[#980909] ">
                  {nav.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
