import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

export const New = () => {
  const [newOrders, setNewOrders] = useState([]);
  const columns = [
    {
      name: 'Order Details',
      selector: (row) => (
        <div>
          <div>{row?.order_type_id}</div>
          <div>{row?.created_date}</div>
          <div>{row.channel}</div>
        </div>
      ),
    },
    {
      name: 'Customer details',
      selector: (row) => (
        <div>
          <div>{row?.buyer_info?.first_name}</div>
          <div>{row?.buyer_info?.email_address}</div>
          <div>{row?.buyer_info?.contact_no}</div>
        </div>
      ),
    },
    {
      name: 'Package Details',
      selector: (row) => (
        <div>
          <div>{row?.deadweight}</div>
          <div>{row?.height}x{row.width}x{row.length}</div>
          <div>{row?.volumatric_weight}</div>
        </div>
      ),
    },
    {
      name: 'Payment',
      selector: (row) => <div>
        <div>{row?.total_amount}</div>
        <div>{row?.payment_type_name}</div>
      </div>,
    },
    {
      name: 'Pickup Address',
      wrap: true,
      selector: (row) => <div>
        <div>{row?.user_info?.address_line1}</div>
        <div>{row?.user_info?.address_line2}</div>
        <div>{row?.user_info?.landmark}</div>
        <div>{row?.user_info?.city}-{row?.user_info?.pincode}</div>
      </div>,
    },
    {
      name: 'Status',
      selector: (row) => <div>
        <div>{row?.status_name}</div>
      </div>,
    },
    {
      name: 'Action',
      button: true,
      cell: (row) => (
        <button id={row.id} className="rounded bg-indigo-700 px-2 py-1.5 text-white">
          {'Track Order'}
        </button>
      ),
    },
  ];

  const fetchNewOrders = () => {
    axios.get('http://43.252.197.60:8030/order/get_filtered_orders').then(async (resp) => {
      if (resp.status === 200) {
        setNewOrders(resp.data);
        console.log('-=-=-=-Response-=-=-=', resp.data)
      } else {
        alert('There is some error while fetching orders.');
      }
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
