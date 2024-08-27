import React from 'react';
import { NavLink } from 'react-router-dom';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';

function CatalogueTab({ children }) {
  return (
    <PageWithSidebar>
      <div className="ml-4 mt-4 flex gap-2 border-b pb-4 text-base">
        <div className="ml-4  flex h-52 w-1/4 flex-col gap-2 rounded-lg bg-white px-2 py-4 text-sm shadow">
          <NavLink to={`/catalogue`} className="px-2 py-1">
            Channel Product
          </NavLink>
          <NavLink to={`/manage-inventory`} className="px-2 py-1">
            Manage Inventory
          </NavLink>
          <NavLink to={`/all-products`} className="px-2 py-1">
            All Products
          </NavLink>
          <NavLink to={`/categories`} className="px-2 py-1">
            Categories
          </NavLink>
          <NavLink to={`/tax-classes`} className="px-2 py-1">
            Tax Classes
          </NavLink>
        </div>
        {children}
      </div>
    </PageWithSidebar>
  );
}

export default CatalogueTab;
