const RightDrawer = ({ isOpen, heading, onClose, children, drawerWrapperClassNames,bodyClassNames, footer, width }) => {
  return (
    <>
      <div
        className={`dark:bg-gray-800 fixed right-0 top-0 z-40 h-screen text-start ${
          width ? `w-[${width}] max-w-[${width}]` : 'w-[80%] max-w-[80vw]'
        } rounded-lg bg-white transition-transform ${isOpen ? 'transform-none' : 'translate-x-full'} ${
          drawerWrapperClassNames || ''
        }`}
        tabIndex="-1">
        <div className="px-5 py-3">
          <h5
            id="drawer-right-label"
            className="dark:text-gray-400 inline-flex items-center text-lg font-semibold text-gray-900">
            {heading}
          </h5>
          <button
            type="button"
            className="dark:hover:bg-gray-600 dark:hover:text-white absolute end-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
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
        <div className="w-full border border-gray-100" />

        <div className={`h-[calc(100%-64px)] w-full overflow-auto px-5 ${bodyClassNames}`} style={{ scrollbarGutter: 'stable' }}>
          {children}
        </div>
        {footer && <div className={`fixed bottom-0 z-50 w-[${width}] px-5 bg-white`}>{footer}</div>}
      </div>
      {isOpen && (
        <div className="dark:bg-gray-900/80 fixed inset-0 z-30 bg-gray-900/50" onClick={onClose}></div>
      )}
    </>
  );
};

export default RightDrawer;
