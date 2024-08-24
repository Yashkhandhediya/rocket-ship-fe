import React from 'react';
import CustomSingleSelect from './CustomSingleSelect';
import { useSelector } from 'react-redux';

function CustomSelect() {
  const data = useSelector((state) => state?.rateCardData) || {};

  const convertIntoArray = (obj) => {
    if (!obj) {
      return;
    }
    const array = Object.entries(obj).map(([key, value]) => ({
      id: key,
      type: value,
    }));
    return array;
  };

  const partnerDictArray = convertIntoArray(data.partner_dict);
  const modeTypeArray = convertIntoArray(data.mode_type_dict);
  const weightArray = convertIntoArray(data.weights);

  const customSelectData = [
    {
      selectName: 'Sort by:Low to High Weight',
      lists: ['Sort by:Low to High Weight', 'Sort by:High to Low Weight'],
    },
    {
      selectName: 'Select Couriers',
      lists: partnerDictArray,
    },
    {
      selectName: 'Select Modes',
      lists: modeTypeArray,
    },
    {
      selectName: 'Select Weight',
      lists: weightArray,
    },
  ];
  const [sortData, ...otherSelectData] = customSelectData;
  return (
    <div className="mt-8 flex justify-between">
      <div className="flex gap-5">
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
