import React from 'react';
import { customSelectData } from '../../constants';
import CustomSingleSelect from './CustomSingleSelect';

function CustomSelect() {
  const [sortData, ...otherSelectData] = customSelectData;
  console.log(sortData);
  return (
    <div className="flex gap-4">
      {otherSelectData &&
        otherSelectData.map((data, index) => {
          return (
            <div key={index}>
              <CustomSingleSelect key={index} data={data} />
            </div>
          );
        })}
      <CustomSingleSelect data={sortData} />
    </div>
  );
}

export default CustomSelect;
