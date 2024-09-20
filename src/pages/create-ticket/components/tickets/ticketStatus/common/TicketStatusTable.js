import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { statusTableHeadData } from '../../../../constants';
import { statusTableData } from '../../../../constants';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

function TicketStatusTable() {
  return (
    <table className="mt-10 min-w-full overflow-hidden rounded-lg text-[12px] shadow">
      <thead className=" bg-white">
        <tr>
          {statusTableHeadData &&
            statusTableHeadData.map((data, index) => {
              return (
                <>
                  <th key={index} className="px-4 py-2 text-left">
                    {data}
                  </th>
                </>
              );
            })}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {statusTableData &&
          statusTableData.map((data) => {
            return (
              <tr key={data.id} className={`bg-white  text-[13px] font-semibold text-gray-500`}>
                <td className=" px-4 py-4 text-left">
                  <div className="flex flex-col">
                    <p> {data.ticketId?.id}</p>
                    <p className="text-gray-500">{data.ticketId?.date}</p>
                  </div>
                </td>
                <td className=" px-4 py-4 text-left">{data.awbs}</td>
                <td className=" px-4 py-4 text-left">{data.subCategory}</td>
                <td>
                  <p className="w-1/2 rounded-lg bg-orange-100 p-1 text-center text-gray-500 text-orange-400 shadow">
                    {data.ticketStatus}
                  </p>
                </td>
                <td className=" px-4 py-4 text-left">
                  <div className="flex flex-col">
                    <p> {data.resolutionDueBy?.time}</p>
                    <p className="mt-1 w-2/3 rounded-lg bg-orange-100 p-1 text-center text-[10px] text-gray-500 text-orange-400 shadow">
                      {data.resolutionDueBy?.overDueBy}
                    </p>
                  </div>
                </td>
                <td className=" px-4 py-4 text-left">{data.lastUpdated}</td>
                <td className=" px-4 py-4 text-left">
                  <div className="flex flex-col">
                    <button className="rounded bg-gray-300 p-1">Updated</button>
                    <button className="text-red-700">View history</button>
                  </div>
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faEllipsisH}
                    className="relative cursor-pointer rounded-full bg-red-100 p-2 text-lg text-red-800"
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default TicketStatusTable;
