import { forwardTableData, forwardTableHeadData } from '../../constants';

function ForwardTable() {
  return (
    <div>
      <table className="min-w-full rounded-xl text-[12px]">
        <thead className="bg-white">
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
            forwardTableData.map((data, index) => {
              return (
                <tr key={index}>
                  <td className="border px-4 py-2 text-left">{data.couriers}</td>
                  <td className="border px-4 py-2 text-left">{data.mode}</td>
                  <td className="border px-4 py-2 text-left">{data.minWeight}</td>
                  <td className="border px-4 py-2 text-left">
                    {data.zoneA.forward} | {data.zoneA.rto}
                  </td>
                  <td className="border px-4 py-2 text-left">
                    {data.zoneB.forward} | {data.zoneB.rto}
                  </td>
                  <td className="border px-4 py-2 text-left">
                    {data.zoneC.forward} | {data.zoneC.rto}
                  </td>
                  <td className="border px-4 py-2 text-left">
                    {data.zoneD.forward} | {data.zoneD.rto}
                  </td>
                  <td className="border px-4 py-2 text-left">
                    {data.zoneE.forward} | {data.zoneE.rto}
                  </td>
                  <td className="border px-4 py-2 text-left">
                    {data.codCharges.inRupess} | {data.codCharges.inPercentage}
                  </td>
                  <td className="border px-4 py-2 text-left">{data.otherCharges}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default ForwardTable;
