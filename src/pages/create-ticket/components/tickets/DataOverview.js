import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { overviewData } from '../../constants';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'flowbite-react';
function DataOverview() {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <p className="pb-2 text-sm font-semibold text-gray-500">Last 30-Days Data Overview</p>
      <div className="flex flex-wrap gap-2.5">
        {overviewData &&
          overviewData.map((data, index) => {
            return (
              <div
                key={index}
                className="flex w-80 cursor-pointer items-center justify-between rounded border bg-zinc-50 px-3 py-2 shadow">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={data.icon}
                    className={`text-xl ${data.iconColor?.text} ${data.iconColor?.background} rounded-full p-2`}
                  />
                  <p className="flex items-center gap-1 text-[12px]">
                    {data.title}
                    <Tooltip
                      style="light"
                      placement="right"
                      content={data.description}
                      className="w-48 text-center text-[12px] font-medium">
                      <FontAwesomeIcon icon={faQuestionCircle} className="text-sm text-gray-400" />
                    </Tooltip>
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    {typeof data.tickets === 'object' ? data.tickets.time : data.tickets}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DataOverview;
