import React from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { ordersTabs } from './common/constants';
import { Tabs } from '../../common/components';

const PincodeZoneMapping = () => {
  return (
    <PageWithSidebar>
      <h1 className="ml-4 mt-2 text-xl font-bold">Shipping Rate Calculator</h1>
      <div className="ml-4">
        <Tabs tabs={ordersTabs} tabClassNames={'mr-6 px-3 py-3.5 text-[#7f7f7f] font-medium'} />
      </div>
    </PageWithSidebar>
  );
};

export default PincodeZoneMapping;
