import { shipRocket, shortShipRocket } from '../../icons';
import { Link } from 'react-router-dom';
import { sidebarLinks } from './contants';

const Sidebar = () => {
  return (
    <div
      id="mySidebar"
      className="group/sidebar hover:z-100 fixed left-0 top-0 z-10 h-full w-[70px] overflow-x-hidden overflow-y-hidden bg-[#06064d] text-white transition-all duration-500 hover:w-[218px] hover:overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar]:w-1">
      <div className="z-100 sticky top-0 h-[62px] w-full translate-y-0 bg-[#06064d] pb-4 pl-5 pr-3.5 pt-2.5">
        <img src={shortShipRocket} className="h-[34px] object-contain group-hover/sidebar:hidden" />
        <img
          src={shipRocket}
          className="hidden h-[34px] min-w-[158px] object-contain group-hover/sidebar:block "
        />
      </div>
      <hr className="mb-4 border-[#06064d] text-[#0000001a] md:hidden" />
      <div>
        {sidebarLinks.map((nav, i) => {
          return nav.path ? (
            <Link to={nav?.path} key={i} className="translate-y-0">
              <div className="group/sidebarItem mx-3.5 mb-3 flex items-center rounded-[4px] p-2 text-white hover:bg-white hover:text-[#06064d]">
                <img src={nav.icon} className="h-6 w-6 group-hover/sidebarItem:hidden" />
                <img src={nav.hoverIcon} className="hidden h-6 w-6 group-hover/sidebarItem:block" />
                <span className="ml-3 truncate text-xs group-hover/sidebarItem:text-[#06064d] ">
                  {nav.title}
                </span>
              </div>
            </Link>
          ) : (
            <div
              className="group/sidebarItem mx-3.5 mb-3 flex cursor-pointer items-center rounded-[4px] p-2 text-white hover:bg-white hover:text-[#06064d]"
              onClick={nav?.onClick}>
              <img src={nav.icon} className="h-6 w-6 group-hover/sidebarItem:hidden" />
              <img src={nav.hoverIcon} className="hidden h-6 w-6 group-hover/sidebarItem:block" />
              <span className="ml-3 truncate text-xs group-hover/sidebarItem:text-[#06064d] ">
                {nav.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
