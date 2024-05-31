import { forwardTableData, forwardTableHeadData } from '../../constants';

function ForwardTable() {
  return (
    <div>
      <table className="min-w-full rounded-xl text-[12px]">
        <thead className="bg-white">
          {forwardTableHeadData &&
            forwardTableHeadData.map((data, index) => {
              return (
                <tr key={index}>
                  {typeof data.headerName !== 'object' ? (
                    <th className="px-4 py-2 text-left">{data.headerName}</th>
                  ) : (
                    <th className=" px-4 py-2 text-left">
                      <div className="flex flex-col text-center">
                        <span>{data.headerName.name}</span>
                        <span className="mb-3 text-gray-400">{data.headerName.area}</span>
                        <span>
                          {data.headerName.forward} | {data.headerName.rto}
                        </span>
                      </div>
                    </th>
                  )}
                </tr>
              );
            })}
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2 text-left">John Doe</td>
            <td className="border px-4 py-2 text-left">30</td>
            <td className="border px-4 py-2 text-left">john@example.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ForwardTable;
