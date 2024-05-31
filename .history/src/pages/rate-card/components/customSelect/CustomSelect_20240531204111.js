import React from 'react';
import { customSelectData } from '../../constants';
import CustomSingleSelect from './CustomSingleSelect';

function CustomSelect() {
  const [sortData, ...otherSelectData] = customSelectData;
  console.log(sortData, otherSelectData);
  return (
    <div className="flex justify-between">
      <div>
        {otherSelectData &&
          otherSelectData.map((data, index) => {
            return (
              <div key={index} className="flex">
                <CustomSingleSelect key={index} data={data} />
              </div>
            );
          })}
      </div>
      <CustomSingleSelect data={sortData} />
    </div>
  );
}

export default CustomSelect;
