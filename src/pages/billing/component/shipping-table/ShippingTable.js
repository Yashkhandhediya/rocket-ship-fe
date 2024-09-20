import { Link } from 'react-router-dom';

const ShippingTable = ({ data }) => {
  console.log("GHHHHHHHHH",data)
  const getDate = (date) => {
    const [day, month, year] = date.split('-').reverse();
    const d = day.slice(0, 2);
    return `${d}-${month}-${year}`;
  };

  return (
    <>
      <tr className={`bg-zinc-100 text-[13px] font-semibold transition hover:bg-white`}>
        <td className="border border-gray-200 px-4 py-4 text-left">
          <p className="text-red-800">{data.order_id}</p>
        </td>
        <td className="border border-gray-200 px-4 py-4 text-left text-red-800">{data.awb_number}</td>
        <td className=" border border-gray-200 px-4 py-4 text-left">{data?.courier}</td>
        <td className=" border border-gray-200 px-4 py-4 text-left">{data?.shipment_status}</td>
        <td className=" border border-gray-200 px-4 py-4 text-left">{getDate(data?.awb_assigned_date)}</td>
        <td className=" border border-gray-200 px-4 py-4 text-left">{data?.applied_weight_charges}</td>
        <td className=" border border-gray-200 px-4 py-4 text-left">{data?.excess_weight_charges}</td>
        <td className=" border border-gray-200 px-4 py-4 text-left">{data?.on_hold_amount}</td>

        <td className=" border border-gray-200 px-4 py-4 text-left">
          {/* {data?.total_freight_charges.map((charge, index) => {
            return <p key={index}>{charge === 'null' ? '' : charge}</p>;
          })} */}
          <p>{data?.total_freight_charges === 'null' ? '0' : data?.total_freight_charges}</p>
        </td>
        <td className="flex flex-col border border-gray-200 px-4 py-4 text-left">
          <div>
            {data?.entered_weight_dimensions.map((dimension, index) => {
              if (index === 0) {
                return <p key={index}>{dimension} kg</p>;
              }
            })}
          </div>
          <div className="flex">
            {data?.entered_weight_dimensions.map((dimension, index) => {
              if (index > 0) {
                return <p key={index}>{index === 3 ? `${dimension} cm` : `${dimension}x`}</p>;
              }
            })}
          </div>
        </td>
        <td className=" border border-gray-200 px-4 py-4 text-left">{data.charged_weight_dimensions}</td>
        <td className=" flex w-full justify-center px-4 py-4 text-left">
          <Link to={`/passbook`} className="rounded bg-red-800 px-4 py-1 text-white">
            View
          </Link>
        </td>
      </tr>
    </>
  );
};

export default ShippingTable;
