import React, { useEffect, useState } from 'react';
import { tableData, tableHeadData } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple } from '@fortawesome/free-solid-svg-icons';
import SelectFilter from './SelectFilter';
import { useSelector } from 'react-redux';

function Reverse() {
  const [filteredReverseData, setReverseFilteredData] = useState([]);
  // const rateCardData = useSelector((state) => state?.rateCardData);

  const dataFiltered = (data) => {
    setReverseFilteredData(data);
    console.log(data);
  };

  // const reversedData = filteredReverseData?.length == 0 ? rateCardData : filteredReverseData || {};

  return (
    <div>
      <SelectFilter dataFiltered={dataFiltered} />
      <table className="mt-10 min-w-full overflow-hidden rounded-lg text-[12px] shadow">
        <thead className=" bg-white">
          <tr>
            {tableHeadData &&
              tableHeadData.map((data, index) => {
                return (
                  <>
                    {typeof data.headerName !== 'object' ? (
                      <th key={index} className="px-4 py-2 text-left">
                        {data.headerName}
                      </th>
                    ) : (
                      <th key={index} className=" px-4 py-2 text-left">
                        <div className="flex flex-col text-center">
                          <span>{data.headerName.name}</span>
                          <span className="mb-3 text-gray-400">{data.headerName.area}</span>
                          <span>reverse rates</span>
                        </div>
                      </th>
                    )}
                  </>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {filteredReverseData &&
            filteredReverseData?.rate?.map((rateData, index) => {
              return (
                <tr
                  key={rateData?.id}
                  className={`${
                    index % 2 !== 1 ? 'bg-blue-100' : 'bg-white'
                  } text-[13px] font-semibold text-gray-400`}>
                  <td className=" px-4 py-4 text-center">{rateData?.partner_name}</td>
                  <td className=" px-4 py-2 text-center">
                    {/* {rateData?.mode >= 1 && <FontAwesomeIcon icon={faBusSimple} size="2x" />} */}
                    {rateData?.mode_type_name}
                  </td>
                  <td className=" px-4 py-2 text-center">{rateData?.weight}</td>
                  <td className=" px-4 py-2 text-center">&#8377;{rateData?.a_reverse || 0}</td>
                  <td className=" px-4 py-2 text-center">&#8377;{rateData?.b_reverse || 0}</td>
                  <td className=" px-4 py-2 text-center">&#8377;{rateData?.c_reverse || 0}</td>
                  <td className=" px-4 py-2 text-center">&#8377;{rateData?.d_reverse || 0}</td>
                  <td className=" px-4 py-2 text-center">&#8377;{rateData?.e_reverse || 0}</td>
                  <td className=" px-4 py-2 text-center">{`NA`}</td>
                  <td className=" px-4 py-2 text-center">{rateData?.other_charges}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Reverse;
