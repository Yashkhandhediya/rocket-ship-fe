import DataTable from 'react-data-table-component';

export const New = () => {
  const columns = [
    {
      name: 'Order Details',
      selector: (row) => row.orderDetails,
    },
    {
      name: 'Customer details',
      selector: (row) => row.customerDetails,
    },
    {
      name: 'Package Details',
      selector: (row) => row.packageDetails,
    },
    {
      name: 'Payment',
      selector: (row) => row.payment,
    },
    {
      name: 'Pickup Address',
      wrap:true,
      selector: (row) => row.pickupAddress,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
    },
    {
      name: 'Action',
      button: true,
      cell: (row) => <button id={row.id} className='bg-indigo-700 text-white px-2 py-1.5 rounded'>{"Track Order"}</button>,
    },
  ];

  const data = [
    {
      id: 1,
      orderDetails: 'Beetlejuice',
      customerDetails: '1988',
      packageDetails: "Package Details 1",
      payment: "COD",
      pickupAddress: "mock-202, temporary society , near mock location, landmark, city, state, country pincode",
      status: "Picked Up",
    },
    {
      id: 2,
      orderDetails: 'Ghostbusters',
      customerDetails: '1984',
      packageDetails: "Package Details 2",
      payment: "Prepaid",
      pickupAddress: "mock-586, mock residency, near other location, landmark, city, state, country pincode",
      status: "Picked Up",
    },
  ];

  return (
    <div className='mt-5'>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default New;
