import { Navbar } from '../navbar';
import Sidebar from '../sidebar/Sidebar';

const is_super = sessionStorage.getItem('is_super');
const PageWithSidebar = ({ children }) => {
  return (
    <div className="h-screen max-h-screen w-screen overflow-hidden bg-[#f8f8f8]">
      <aside>
        <Sidebar />
      </aside>
      <main className="ml-[70px] h-full w-[97%] overflow-auto" style={{ scrollbarGutter: 'stable' }}>
        {is_super != 3 ? <Navbar /> : null}
        {children}
      </main>
    </div>
  );
};

export default PageWithSidebar;
