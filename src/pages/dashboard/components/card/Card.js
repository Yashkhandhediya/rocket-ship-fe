import React from 'react'

const Card = ({ bgColor, icon, title, mainText, subText }) => (
    <div className={`h-40 ${bgColor} flex items-center border shadow-md rounded-md sm:w-full md:w-full mt-4 lg:w-[32%]`}>
      <div className="text-white border bg-white rounded-full p-2 mr-4 ml-20">
        {icon}
      </div>
      <div>
        <p className="text-sm text-left font-medium text-gray-600">{title}</p>
        <p className="text-lg text-left font-semibold">{mainText}</p>
        <p className="text-xs text-left font-semibold text-gray-500">{subText}</p>
      </div>
    </div>
  );

export default Card
