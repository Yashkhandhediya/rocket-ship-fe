const DrawerWithSidebar = ({ isOpen, onClose, rightHeading, rightComponent, leftHeading, leftComponent }) => {
  return (
    <>
      <div
        className={`dark:bg-gray-800 fixed right-0 top-0 z-40 h-screen w-[95%] overflow-y-auto bg-white transition-transform ${
          isOpen ? 'transform-none' : 'translate-x-full'
        }`}
        tabIndex="-1">
        <div className="flex h-full w-full flex-wrap md:overflow-hidden">
          <div className="w-full bg-[#f0f0f0] px-2 md:w-3/12 lg:w-2/12">
            <div className="h-full p-4">
              <div className="text-left mb-6">
                <h5
                  id="drawer-right-label"
                  className="dark:text-gray-400 inline-flex items-center text-lg font-medium leading-5 text-gray-900">
                  {leftHeading}
                </h5>
              </div>
              <div className="h-full w-full">{leftComponent}</div>
            </div>
          </div>
          <div className="w-full bg-[#f8f8f8] md:w-9/12 lg:w-10/12">
            <div className="h-full p-[1.375rem]">
              <div className="flex justify-between text-left">
                <h5
                  id="drawer-right-label"
                  className="dark:text-gray-400 inline-flex items-center text-lg font-medium leading-5 text-gray-900">
                  {rightHeading}
                </h5>
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                  onClick={onClose}>
                  <svg
                    className="h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close menu</span>
                </button>
              </div>
              <div className="h-full w-full">{rightComponent}</div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="dark:bg-gray-900/80 fixed inset-0 z-30 bg-gray-900/50" onClick={() => {}}></div>
      )}
    </>
  );
};

export default DrawerWithSidebar;
