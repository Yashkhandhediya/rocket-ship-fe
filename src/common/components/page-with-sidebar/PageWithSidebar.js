import Sidebar from '../sidebar/Sidebar';

const PageWithSidebar = ({children}) => {
  return (
    <div className="h-screen max-h-screen w-screen overflow-hidden">
      <aside>
        <Sidebar />
      </aside>
      <main className='h-full overflow-auto ml-[70px]' style={{ scrollbarGutter: "stable"}}>{children}</main>
    </div>
  );
};

export default PageWithSidebar;
