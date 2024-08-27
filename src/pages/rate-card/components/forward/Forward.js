import React, { useState } from 'react';
import ForwardTable from './ForwardTable';
import SelectFilter from '../SelectFilter';
import { useDispatch } from 'react-redux';

function Forward() {
  const [filteredForwardData, setForwardFilteredData] = useState([]);
  const dataFiltered = (data) => {
    setForwardFilteredData(data);
  };

  return (
    <div>
      <SelectFilter dataFiltered={dataFiltered} />
      <ForwardTable filteredData={filteredForwardData} />
    </div>
  );
}

export default Forward;
