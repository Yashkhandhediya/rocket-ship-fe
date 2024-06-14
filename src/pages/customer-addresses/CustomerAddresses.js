import React from 'react';
import Customer from '../customer-overview/Customer';
import Address from './components/Address';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';

function CustomerAddresses() {
  return (
    <PageWithSidebar>
      <Customer>
        <div className="flex gap-6 bg-zinc-200 px-4 py-8">
          <Address />
          <Address />
          <Address />
        </div>
      </Customer>
    </PageWithSidebar>
  );
}

export default CustomerAddresses;
