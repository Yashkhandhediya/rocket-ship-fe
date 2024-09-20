import React from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { Link, NavLink } from 'react-router-dom';

function ReturnPolicySettings({ children }) {
  return (
    <PageWithSidebar>
      <div className="px-4 pt-8">
        <p className="text-xl font-bold">Return & Refunds</p>
        <p className="text-sm font-medium">Set up Returns & Refunds policy as per your preference</p>
        <Link className="py-3 text-[12px] font-semibold text-red-800">FAQs</Link>
        <div className="my-8 flex gap-2">
          <div className="flex h-24 w-1/5 flex-col gap-2 rounded-lg bg-white px-2 py-4 text-[12px] shadow">
            <NavLink to={`/return-settings`} className="px-2">
              Return Policy Settings
            </NavLink>
            <NavLink to={`/refund-settings`} className="px-2">
              Refund Settings
            </NavLink>
          </div>
          {children}
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default ReturnPolicySettings;
