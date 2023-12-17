import { shipRocket, shortShipRocket } from '../../icons';
import { Link } from 'react-router-dom';
import { sidebarLinks } from './contants';

const Sidebar = () => {

  return (
    <div
      id="mySidebar"
      className="group/sidebar transition-all duration-500 fixed left-0 top-0 h-full w-[70px] overflow-x-hidden overflow-y-hidden bg-[#06064d] text-white hover:w-[218px] hover:overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar]:w-1">
      <div className="sticky top-0 z-10 h-[62px] w-full bg-[#06064d] pb-4 pl-5 pr-3.5 pt-2.5 translate-y-0">
        <img src={shortShipRocket} className="object-contain h-[34px] group-hover/sidebar:hidden" />
        <img
          src={shipRocket}
          className="hidden object-contain h-[34px] min-w-[158px] group-hover/sidebar:block "
        />
      </div>
      <hr className="mb-4 border-[#06064d] text-[#0000001a] md:hidden" />
      <div>
        {sidebarLinks.map((nav, i) => {
          return (
            <Link to={nav?.path} key={i} className='translate-y-0'>
              <div className="group/sidebarItem mx-3.5 mb-3 flex items-center rounded-[4px] p-2 text-white hover:bg-white hover:text-[#06064d]">
                <img src={nav.icon} className="h-6 w-6 group-hover/sidebarItem:hidden" />
                <img src={nav.hoverIcon} className="hidden h-6 w-6 group-hover/sidebarItem:block" />
                <span className="ml-3 truncate text-xs group-hover/sidebarItem:text-[#06064d] ">
                  {nav.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
