import React from 'react';
import loaderGif from './loader.gif';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center text-white backdrop-blur-sm">
      {/* <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-gray-600 border-t-transparent"></div>
       */}
      <img src={loaderGif} />
    </div>
  );
};

export default Loader;
