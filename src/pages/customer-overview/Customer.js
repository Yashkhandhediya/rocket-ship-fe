import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

function Customer({ children }) {
  const { buyerId } = useParams();

  return (
    <PageWithSidebar>
      <div className="ml-2">
        <div className="flex items-center justify-between bg-red-100 p-1">
          <div className="flex items-center gap-2">
            <NavLink to={`/customers`}>
              <FontAwesomeIcon icon={faArrowLeft} className="rounded bg-red-800 p-1 text-lg text-white" />
            </NavLink>
            <NavLink
              to={`/customer-overview/${buyerId}`}
              className="border-r border-r-gray-300 px-4 text-[17px] font-semibold">
              Customer Overview
            </NavLink>
            <NavLink to={`/customer-addresses/${buyerId}`} className="text-[17px]">
              Addresses
            </NavLink>
          </div>
          <button className="flex items-center gap-2 rounded bg-gray-200 px-4 py-1 text-sm text-red-800">
            <FontAwesomeIcon icon={faPlus} />
            <span>Add Cutomer</span>
          </button>
        </div>
        {children}
      </div>
    </PageWithSidebar>
  );
}

export default Customer;
