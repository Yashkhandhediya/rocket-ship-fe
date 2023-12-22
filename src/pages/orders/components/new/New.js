import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, generatePath } from 'react-router-dom';
import { toast } from 'react-toastify';

export const New = () => {
  const [newOrders, setNewOrders] = useState([]);
  const columns = [
    {
      name: 'Order Details',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div className="pb-0.5">
            {/* <Link to={`/track-order/${row?.order_type_id}`} className="border-b-2 border-b-purple-700 text-purple-700">{row?.order_type_id}</Link> */}
            <Link
              to={generatePath(`/track-order/:orderId`, { orderId: row?.order_type_id })}
              className="border-b-2 border-b-purple-700 text-purple-700">
              {row?.order_type_id}
            </Link>
          </div>
          <div className="text-xs">{row?.created_date}</div>
          <div>{row.channel}</div>
          <div className="">
            <span className="border-b-2 border-dashed border-b-purple-700 text-purple-700">
              {'View Products'}
            </span>
          </div>
        </div>
      ),
    },
    {
      name: 'Customer details',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div>{row?.buyer_info?.first_name}</div>
          <div>{row?.buyer_info?.email_address}</div>
          <div>{row?.buyer_info?.contact_no}</div>
        </div>
      ),
    },
    {
      name: 'Package Details',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div>
            {'Deat wt.: '}
            {row?.deadweight}
          </div>
          <div>
            {row?.height?.toFixed(2)}x{row.width?.toFixed(2)}x{row.length?.toFixed(2)} {' (cm)'}
          </div>
          <div>
            {'Volumetric wt.: '} {row?.volumatric_weight} {' Kg'}
          </div>
        </div>
      ),
    },
    {
      name: 'Payment',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div>
            {'₹ '}
            {row?.total_amount?.toFixed(2)}
          </div>
          <div>{row?.payment_type_name}</div>
        </div>
      ),
    },
    {
      name: 'Pickup Address',
      wrap: true,
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div>{row?.user_info?.address_line1}</div>
          <div>{row?.user_info?.address_line2}</div>
          <div>{row?.user_info?.landmark}</div>
          <div>
            {row?.user_info?.city}-{row?.user_info?.pincode}
          </div>
        </div>
      ),
    },
    {
      name: 'Status',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div>{row?.status_name}</div>
        </div>
      ),
    },
    {
      name: 'Action',
      button: true,
      cell: (row) => (
        <button id={row.id} className="rounded bg-indigo-700 px-2 py-1.5 text-white">
          {'Ship Now'}
        </button>
      ),
    },
  ];

  const fetchNewOrders = () => {
    axios
      .get('http://43.252.197.60:8030/order/get_filtered_orders')
      .then(async (resp) => {
        if (resp.status === 200) {
          setNewOrders(resp?.data || []);
        } else {
          toast('There is some error while fetching orders.', { type: 'error' });
        }
      })
      .catch(() => {
        toast('There is some error while fetching orders.', { type: 'error' });
      });
  };

  useEffect(() => {
    fetchNewOrders();
  }, []);

  return (
    <div className="mt-5">
      <DataTable columns={columns} data={newOrders} />
    </div>
  );
};

export default New;
