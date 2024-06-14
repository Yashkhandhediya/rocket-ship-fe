import React from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomerTable from './components/CustomerTable';
import { Link } from 'react-router-dom';

function Customers() {
  return (
    <PageWithSidebar>
      <div className="px-2">
        <div className="flex justify-between border-b border-zinc-300 p-2">
          <h1 className="text-xl">All Customers</h1>
          <Link to={`/add-customer`} className="rounded bg-zinc-200 px-4 py-1 text-sm text-red-800">
            <FontAwesomeIcon icon={faPlus} /> Add Customer
          </Link>
        </div>
        <CustomerTable />
      </div>
    </PageWithSidebar>
  );
}

export default Customers;
