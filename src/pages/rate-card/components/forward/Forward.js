import React, { useState } from 'react';
import ForwardTable from './ForwardTable';
import SelectFilter from '../SelectFilter';
import { useDispatch } from 'react-redux';

function Forward() {
  const [filteredData, setFilteredData] = useState([]);
  const dataFiltered = (data) => {
    setFilteredData(data);
  };

  console.log(filteredData);
  return (
    <div>
      <SelectFilter dataFiltered={dataFiltered} />
      <ForwardTable filteredData={filteredData} />
    </div>
  );
}

export default Forward;
