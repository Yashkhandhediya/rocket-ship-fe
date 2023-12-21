import Sidebar from '../sidebar/Sidebar';

const PageWithSidebar = ({ children }) => {
  return (
    <div className="h-screen max-h-screen w-screen overflow-hidden">
      <aside>
        <Sidebar />
      </aside>
      <main className="ml-[70px] h-full overflow-auto" style={{ scrollbarGutter: 'stable' }}>
        {children}
      </main>
    </div>
  );
};

export default PageWithSidebar;
