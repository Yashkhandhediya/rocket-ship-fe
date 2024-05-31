import { forwardTableData, forwardTableHeadData } from '../../constants';
import { faBus } from '@fortawesome/free-solid-svg-icons';

function ForwardTable() {
  return (
    <>
      <table className="mt-10 min-w-full overflow-hidden rounded-lg text-[12px] shadow">
        <thead className=" bg-white">
          <tr>
            {forwardTableHeadData &&
              forwardTableHeadData.map((data, index) => {
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
                          <span>
                            {data.headerName.forward} | {data.headerName.rto}
                          </span>
                        </div>
                      </th>
                    )}
                  </>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {forwardTableData &&
            forwardTableData.map((data) => {
              return (
                <tr
                  key={data.id}
                  className={`${
                    data.id % 2 !== 0 ? 'bg-blue-100' : 'bg-white'
                  } text-[13px] font-semibold text-gray-400`}>
                  <td className=" px-4 py-4 text-left">{data.couriers}</td>
                  <td className=" px-4 py-2 text-left">{data.mode === 'bus' && <faBus />}</td>
                  <td className=" px-4 py-2 text-left">{data.minWeight}</td>
                  <td className=" px-4 py-2 text-left">
                    {data.zoneA.forward} | &#8377;{data.zoneA.rto}
                  </td>
                  <td className=" px-4 py-2 text-left">
                    {data.zoneB.forward} | &#8377;{data.zoneB.rto}
                  </td>
                  <td className=" px-4 py-2 text-left">
                    {data.zoneC.forward} | &#8377;{data.zoneC.rto}
                  </td>
                  <td className=" px-4 py-2 text-left">
                    {data.zoneD.forward} | &#8377;{data.zoneD.rto}
                  </td>
                  <td className=" px-4 py-2 text-left">
                    {data.zoneE.forward} | &#8377;{data.zoneE.rto}
                  </td>
                  <td className=" px-4 py-2 text-left">
                    &#8377;{data.codCharges.inRupess} | {data.codCharges.inPercentage}
                  </td>
                  <td className=" px-4 py-2 text-left">{data.otherCharges}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default ForwardTable;
