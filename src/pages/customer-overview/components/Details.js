import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';

function Details({ title, info }) {
  const { buyerId } = useParams();

  return (
    <div className="h-60 w-full rounded-xl bg-white p-4 text-gray-500">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {title !== 'Other Details' && (
          <Link
            to={
              title === 'Customer Contact Details' ? `/customer/edit/${buyerId}` : `/customer/edit/${buyerId}`
            }>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        )}
      </div>
      <div className="flex gap-4 py-4 text-[12px]">
        <div className="flex w-1/2 flex-col gap-5 text-left">
          {title === 'Delivery Address (default)' && (
            <>
              <p>
                <strong>Line 1</strong> : {info?.address}
              </p>
              <p>
                <strong>City</strong> : {info?.city}
              </p>
              <p>
                <strong>State</strong> : {info?.state}
              </p>
            </>
          )}
          {title === 'Customer Contact Details' && (
            <>
              <p>
                <strong>Name</strong> : {info?.name}
              </p>
              <p>
                <strong>Phone</strong> : {info?.phone}
              </p>
              <p>
                <strong>Email</strong> : {info?.email}
              </p>
            </>
          )}
          {title === 'Other Details' && (
            <>
              <p>
                <strong>Source</strong> : {info?.source}
              </p>
              <p>
                <strong>Available On</strong> : {info?.source}
              </p>
              <p>
                <strong>Created Date</strong> : {info?.createdDate}
              </p>
            </>
          )}
        </div>
        {title === 'Delivery Address (default)' && (
          <div className="flex w-1/2 flex-col gap-5 text-left">
            <p>
              <strong>Line 2</strong> : {info?.address}
            </p>
            <p>
              <strong>Pincode</strong> : {info?.pincode}
            </p>
            <p>
              <strong>Country</strong> : {info?.country}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;
