import React, { useEffect, useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { CustomMultiSelect } from '../../common/components';
import { catalogue, ordersActivityLogs, tableHeadData, timeData } from './constants';
import RangeDatePicker from '../reports/components/RangeDatePicker';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import Loader from '../../common/loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

function ActivityLogs() {
  const [data, setData] = useState([]);
  const [actionType, setActionType] = useState('Bulk Order Import');
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');

  const user_id = is_company == 1 ? id_company : id_user;

  const handleDateChange = (ranges) => {
    console.log(ranges);
    setDateRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  };

  console.log(dateRange);

  const fetchBulkActivityData = async () => {
    console.log(dateRange);

    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/bulk_action/get_bulk_action?user_id=${user_id}`, {
        filter_fields: { action_type: actionType },
        paginate: {
          page_number: 1,
          number_of_rows: 10,
        },
        date_dict: {
          date_from: format(dateRange.startDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
          date_to: format(dateRange.endDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
        },
      });
      if (response?.data.status_code == 500) {
        toast('No Data', { type: 'error' });
        setData([]);
      } else {
        setData(response?.data);
      }
      console.log(response?.data);
    } catch (err) {
      toast('There is some error while fetching Data', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/bulk_action/get_error_sheet?bulk_action_id=${id}`);
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBulkActivityData();
  }, [dateRange, actionType]);

  return (
    <PageWithSidebar>
      {loading && <Loader />}
      <div className="p-6">
        <div>
          <p className="text-xl font-bold">Bulk Activity Log</p>
          <div className="mt-2 w-56">
            <RangeDatePicker onDateChange={handleDateChange} />
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-[16%] rounded-lg bg-white px-4 py-2">
            <ul>
              <li className="font-bold text-gray-500">Orders</li>
              {ordersActivityLogs.map((data, index) => {
                return (
                  <li
                    className="mt-1 cursor-pointer px-1 pt-1 text-[13px] font-semibold text-gray-500 hover:bg-red-50"
                    key={index}
                    onClick={() => setActionType(data)}>
                    {data}
                  </li>
                );
              })}
            </ul>
            <ul>
              {/* <li className="mt-3 font-bold text-gray-500">Catalog</li> */}
              {catalogue.map((data, index) => {
                return (
                  <li
                    className="mt-1 cursor-pointer px-1 pt-1 text-[13px] font-semibold text-gray-500 hover:bg-red-50"
                    key={index}>
                    {data}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-[82%]">
            <p className="text-[16px] font-bold">{actionType}</p>
            <table className="mt-3 w-full rounded-lg bg-white text-[13px]">
              <thead>
                <tr>
                  {tableHeadData.map((data, index) => {
                    return (
                      <th className="p-3 text-left" key={index}>
                        {data}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data?.length != 0 ? (
                  data?.map((actionData) => {
                    return (
                      <tr key={actionData.id}>
                        <td className="p-3 text-left">
                          {format(actionData?.start_time, 'dd MMM yyyy | h:mm a')}
                        </td>
                        <td className="p-3 text-left">
                          {' '}
                          {format(actionData?.end_time, 'dd MMM yyyy | h:mm a')}
                        </td>
                        <td className="p-3 text-left">{actionData?.total_count}</td>
                        <td className="p-3 text-left">{actionData?.success_count}</td>
                        <td className="p-3 text-left">{actionData?.error_count}</td>
                        <td className="p-3 text-left">
                          <button className="text-red-800" onClick={() => handleDownload(actionData.id)}>
                            <FontAwesomeIcon icon={faDownload} />
                            {` Errors`}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="p-3 text-left">-</td>
                    <td className="p-3 text-left">-</td>
                    <td className="p-3 text-left">-</td>
                    <td className="p-3 text-left">-</td>
                    <td className="p-3 text-left">-</td>
                    <td className="p-3 text-left">-</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default ActivityLogs;
