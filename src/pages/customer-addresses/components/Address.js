import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function Address({ data }) {
  const { buyerId } = useParams();

  return (
    <div className="h-60 w-[450px] rounded-xl bg-white p-4 text-gray-500">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-semibold">Address</h3>
        <Link to={`/customer/${buyerId}/address/edit/${data?.id}`}>
          <FontAwesomeIcon icon={faEdit} />
        </Link>
      </div>
      <div className="flex gap-4 py-4 text-[12px]">
        <div className="flex w-1/2 flex-col gap-5 text-left">
          <p>
            <strong>Line 1</strong> : {data?.complete_address}
          </p>
          <p>
            <strong>City</strong> : {data?.city}
          </p>
          <p>
            <strong>State</strong> : {data?.state}
          </p>
        </div>
        <div className="flex w-1/2 flex-col gap-5 text-left">
          <p>
            <strong>Line 2</strong> : {data?.complete_address}
          </p>
          <p>
            <strong>Pincode</strong> : {data?.pincode}
          </p>
          <p>
            <strong>Country</strong> : {data?.country}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Address;
